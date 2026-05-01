import type { RequestHandler } from './$types';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ platform, url }) => {
	// Dev bypass: when STUDIO_DEV_USER is set, skip OAuth entirely
	if (dev && env.STUDIO_DEV_USER) {
		const next = url.searchParams.get('next') ?? '/studio';
		throw redirect(302, next);
	}

	const clientId = platform?.env?.STUDIO_GITHUB_CLIENT_ID;
	if (!clientId) {
		return new Response('OAuth not configured', { status: 500 });
	}

	// Generate a random CSRF state token and store it in the session KV briefly
	const stateBytes = new Uint8Array(16);
	crypto.getRandomValues(stateBytes);
	const state = Array.from(stateBytes)
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');

	// Store state with 10-minute TTL for CSRF validation
	const kv = platform?.env?.STUDIO_SESSIONS;
	if (kv) {
		await kv.put(`oauth_state:${state}`, '1', { expirationTtl: 600 });
	}

	const next = url.searchParams.get('next') ?? '/studio';
	const callbackUrl = `${url.origin}/studio/auth/callback`;

	const githubUrl = new URL('https://github.com/login/oauth/authorize');
	githubUrl.searchParams.set('client_id', clientId);
	githubUrl.searchParams.set('redirect_uri', callbackUrl);
	githubUrl.searchParams.set('scope', 'read:user');
	githubUrl.searchParams.set('state', `${state}:${encodeURIComponent(next)}`);

	return new Response(null, {
		status: 302,
		headers: { Location: githubUrl.toString() }
	});
};
