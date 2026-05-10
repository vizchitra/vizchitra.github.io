import type { RequestHandler } from './$types';
import { dev } from '$app/environment';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ platform, url }) => {
	// In dev mode, always bypass OAuth — studio is accessible without login
	if (dev) {
		const next = url.searchParams.get('next') ?? '/studio';
		throw redirect(302, next);
	}

	const clientId = platform?.env?.STUDIO_GITHUB_CLIENT_ID;
	if (!clientId) {
		return new Response('OAuth not configured', { status: 500 });
	}

	// Generate a random CSRF state token
	const stateBytes = new Uint8Array(16);
	crypto.getRandomValues(stateBytes);
	const state = Array.from(stateBytes)
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');

	const next = url.searchParams.get('next') ?? '/studio';
	const origin = platform?.env?.STUDIO_BASE_URL ?? url.origin;
	const callbackUrl = `${origin}/studio/auth/callback`;

	const githubUrl = new URL('https://github.com/login/oauth/authorize');
	githubUrl.searchParams.set('client_id', clientId);
	githubUrl.searchParams.set('redirect_uri', callbackUrl);
	githubUrl.searchParams.set('scope', 'read:user');
	githubUrl.searchParams.set('state', `${state}:${encodeURIComponent(next)}`);

	// Store CSRF state in a short-lived cookie (SameSite=Lax so it survives the
	// cross-site redirect back from GitHub; avoids KV eventual-consistency issues)
	const stateCookie = `oauth_state=${state}; Path=/; Max-Age=600; HttpOnly; SameSite=Lax; Secure`;

	return new Response(null, {
		status: 302,
		headers: {
			Location: githubUrl.toString(),
			'Set-Cookie': stateCookie
		}
	});
};
