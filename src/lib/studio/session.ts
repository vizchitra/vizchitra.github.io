import type { RequestEvent } from '@sveltejs/kit';

const SESSION_COOKIE = 'studio_session';
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

export interface StudioSession {
	handle: string;
	createdAt: number;
}

/** Generate a cryptographically random session ID */
function generateSessionId(): string {
	const bytes = new Uint8Array(32);
	crypto.getRandomValues(bytes);
	return Array.from(bytes)
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
}

/** Create a new session in KV and return the session ID */
export async function createSession(kv: KVNamespace, handle: string): Promise<string> {
	const sessionId = generateSessionId();
	const session: StudioSession = { handle, createdAt: Date.now() };
	await kv.put(sessionId, JSON.stringify(session), {
		expirationTtl: SESSION_TTL_SECONDS
	});
	return sessionId;
}

/** Look up a session from KV using the cookie in the request */
export async function getSession(
	kv: KVNamespace,
	request: Request
): Promise<(StudioSession & { sessionId: string }) | null> {
	const cookieHeader = request.headers.get('cookie') ?? '';
	const match = cookieHeader
		.split(';')
		.map((c) => c.trim())
		.find((c) => c.startsWith(`${SESSION_COOKIE}=`));

	if (!match) return null;

	const sessionId = match.slice(SESSION_COOKIE.length + 1);
	if (!sessionId) return null;

	const raw = await kv.get(sessionId);
	if (!raw) return null;

	try {
		const session = JSON.parse(raw) as StudioSession;
		return { ...session, sessionId };
	} catch {
		return null;
	}
}

/** Delete a session from KV */
export async function deleteSession(kv: KVNamespace, sessionId: string): Promise<void> {
	await kv.delete(sessionId);
}

/** Build a Set-Cookie header value for setting the session cookie */
export function buildSessionCookie(sessionId: string, isProd: boolean): string {
	const parts = [
		`${SESSION_COOKIE}=${sessionId}`,
		'Path=/',
		`Max-Age=${SESSION_TTL_SECONDS}`,
		'HttpOnly',
		'SameSite=Strict'
	];
	if (isProd) parts.push('Secure');
	return parts.join('; ');
}

/** Build a Set-Cookie header value that clears the session cookie */
export function clearSessionCookie(): string {
	return `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict`;
}

/** Check whether a GitHub handle is in the allowed users env var */
export function isAllowedUser(allowedUsers: string, handle: string): boolean {
	return allowedUsers
		.split(',')
		.map((h) => h.trim().toLowerCase())
		.includes(handle.toLowerCase());
}

/** Require auth — returns studioUser or redirects to login */
export function requireAuth(event: RequestEvent): { handle: string; sessionId: string } {
	const user = event.locals.studioUser;
	if (!user) {
		// Store intended URL so we can redirect after login
		const next = encodeURIComponent(event.url.pathname);
		throw new Response(null, {
			status: 302,
			headers: { Location: `/studio/login?next=${next}` }
		});
	}
	return user;
}
