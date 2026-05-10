import type { RequestHandler } from './$types';
import { dev } from '$app/environment';
import { createSession, buildSessionCookie, isAllowedUser } from '$lib/studio/session';

export const GET: RequestHandler = async ({ platform, url }) => {
	const code = url.searchParams.get('code');
	const stateParam = url.searchParams.get('state') ?? '';

	if (!code) {
		return new Response(null, {
			status: 302,
			headers: { Location: '/studio/login?error=missing_code' }
		});
	}

	const kv = platform?.env?.STUDIO_SESSIONS;
	const clientId = platform?.env?.STUDIO_GITHUB_CLIENT_ID;
	const clientSecret = platform?.env?.STUDIO_GITHUB_CLIENT_SECRET;
	const allowedUsers = platform?.env?.STUDIO_ALLOWED_USERS ?? '';

	if (!clientId || !clientSecret) {
		return new Response('OAuth not configured', { status: 500 });
	}

	// Validate CSRF state
	const [state, encodedNext] = stateParam.split(':');
	const next = encodedNext ? decodeURIComponent(encodedNext) : '/studio';

	if (kv && state) {
		const stored = await kv.get(`oauth_state:${state}`);
		if (!stored) {
			return new Response(null, {
				status: 302,
				headers: { Location: '/studio/login?error=invalid_state' }
			});
		}
		// Consume the state token (one-time use)
		await kv.delete(`oauth_state:${state}`);
	}

	// Exchange code for access token
	const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code })
	});

	if (!tokenRes.ok) {
		return new Response(null, {
			status: 302,
			headers: { Location: '/studio/login?error=token_exchange' }
		});
	}

	const tokenData = (await tokenRes.json()) as { access_token?: string; error?: string };
	if (!tokenData.access_token) {
		return new Response(null, {
			status: 302,
			headers: { Location: '/studio/login?error=no_token' }
		});
	}

	// Fetch GitHub user identity
	const userRes = await fetch('https://api.github.com/user', {
		headers: {
			Authorization: `Bearer ${tokenData.access_token}`,
			'User-Agent': 'VizChitra-Studio'
		}
	});

	if (!userRes.ok) {
		return new Response(null, {
			status: 302,
			headers: { Location: '/studio/login?error=user_fetch' }
		});
	}

	const userData = (await userRes.json()) as { login?: string };
	const handle = userData.login;

	if (!handle) {
		return new Response(null, {
			status: 302,
			headers: { Location: '/studio/login?error=no_handle' }
		});
	}

	// Check authorisation
	if (!isAllowedUser(allowedUsers, handle)) {
		return new Response(null, {
			status: 302,
			headers: { Location: '/studio/login?error=unauthorized' }
		});
	}

	// Create session
	if (!kv) {
		return new Response('Session store not available', { status: 500 });
	}
	const sessionId = await createSession(kv, handle);
	const cookie = buildSessionCookie(sessionId, !dev);

	// Ensure next is a safe relative path (prevent open redirect)
	const safePath = next.startsWith('/') && !next.startsWith('//') ? next : '/studio';

	return new Response(null, {
		status: 302,
		headers: {
			Location: safePath,
			'Set-Cookie': cookie
		}
	});
};
