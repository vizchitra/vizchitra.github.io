import type { RequestHandler } from './$types';
import { dev } from '$app/environment';
import { createSession, buildSessionCookie, isAllowedUser } from '$lib/studio/session';

async function waitForKvWrite(kv: KVNamespace, key: string): Promise<void> {
	const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
	for (let i = 0; i < 5; i++) {
		// eslint-disable-next-line no-await-in-loop
		const check = await kv.get(key);
		if (check) return;
		// eslint-disable-next-line no-await-in-loop
		await delay(300);
	}
}

export const GET: RequestHandler = async ({ platform, url, request }) => {
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
	const origin = platform?.env?.STUDIO_BASE_URL ?? url.origin;
	const callbackUrl = `${origin}/studio/auth/callback`;

	if (!clientId || !clientSecret) {
		return new Response('OAuth not configured', { status: 500 });
	}

	// Validate CSRF state via cookie (avoids KV eventual-consistency issues across
	// Cloudflare edge locations; SameSite=Lax ensures the cookie survives the redirect)
	const [state, encodedNext] = stateParam.split(':');
	const next = encodedNext ? decodeURIComponent(encodedNext) : '/studio';

	const cookieHeader = request.headers.get('cookie') ?? '';
	const cookieState =
		cookieHeader
			.split(';')
			.map((c) => c.trim())
			.find((c) => c.startsWith('oauth_state='))
			?.slice('oauth_state='.length) ?? '';

	const clearStateCookie = 'oauth_state=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure';

	if (!state || !cookieState || cookieState !== state) {
		return new Response(null, {
			status: 302,
			headers: { Location: '/studio/login?error=invalid_state' }
		});
	}

	// Exchange code for access token; redirect_uri is required when it was sent
	// during the authorization request
	const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			client_id: clientId,
			client_secret: clientSecret,
			code,
			redirect_uri: callbackUrl
		})
	});

	if (!tokenRes.ok) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/studio/login?error=token_exchange',
				'Set-Cookie': clearStateCookie
			}
		});
	}

	const tokenData = (await tokenRes.json()) as { access_token?: string; error?: string };
	if (!tokenData.access_token) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/studio/login?error=no_token',
				'Set-Cookie': clearStateCookie
			}
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
			headers: {
				Location: '/studio/login?error=user_fetch',
				'Set-Cookie': clearStateCookie
			}
		});
	}

	const userData = (await userRes.json()) as { login?: string };
	const handle = userData.login;

	if (!handle) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/studio/login?error=no_handle',
				'Set-Cookie': clearStateCookie
			}
		});
	}

	// Check authorisation
	if (!isAllowedUser(allowedUsers, handle)) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/studio/login?error=unauthorized',
				'Set-Cookie': clearStateCookie
			}
		});
	}

	// Create session in KV
	if (!kv) {
		return new Response('Session store not available', { status: 500 });
	}
	const sessionId = await createSession(kv, handle);
	const sessionCookie = buildSessionCookie(sessionId, !dev);

	// KV is eventually consistent across edge nodes — verify the write is readable
	// before redirecting, otherwise the very next request to /studio may miss the
	// session and bounce the user back to the login page.
	await waitForKvWrite(kv, sessionId);

	// Ensure next is a safe relative path (prevent open redirect)
	const safePath = next.startsWith('/') && !next.startsWith('//') ? next : '/studio';

	const headers = new Headers({ Location: safePath });
	headers.append('Set-Cookie', sessionCookie);
	headers.append('Set-Cookie', clearStateCookie);

	return new Response(null, { status: 302, headers });
};
