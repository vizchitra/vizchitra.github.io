import type { RequestEvent } from '@sveltejs/kit';

const SESSION_COOKIE = 'studio_session';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const SESSION_TTL_SECONDS = SESSION_TTL_MS / 1000;

export interface StudioSession {
	handle: string;
	createdAt: number;
}

// ── Signed cookie session (no KV lookup on every request) ─────────────────────
// Cookie value: base64url(payload).base64url(hmac)
// This eliminates the KV eventual-consistency problem — auth works immediately
// after login even across different Cloudflare edge nodes.

async function getHmacKey(secret: string): Promise<CryptoKey> {
	return crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(secret),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign', 'verify']
	);
}

function b64url(buf: ArrayBuffer | Uint8Array): string {
	const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
	return btoa(String.fromCharCode(...bytes))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=/g, '');
}

function b64urlDecode(s: string): Uint8Array {
	const padded = s.replace(/-/g, '+').replace(/_/g, '/');
	const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4));
	return Uint8Array.from(atob(padded + pad), (c) => c.charCodeAt(0));
}

export async function createSignedSession(handle: string, secret: string): Promise<string> {
	const payload = JSON.stringify({ handle, exp: Date.now() + SESSION_TTL_MS });
	const encodedPayload = b64url(new TextEncoder().encode(payload));
	const key = await getHmacKey(secret);
	const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(encodedPayload));
	return `${encodedPayload}.${b64url(sig)}`;
}

export async function verifySignedSession(
	token: string,
	secret: string
): Promise<{ handle: string } | null> {
	const dot = token.lastIndexOf('.');
	if (dot === -1) return null;
	const encodedPayload = token.slice(0, dot);
	const sigPart = token.slice(dot + 1);
	try {
		const key = await getHmacKey(secret);
		const expectedSig = await crypto.subtle.sign(
			'HMAC',
			key,
			new TextEncoder().encode(encodedPayload)
		);
		const providedSig = b64urlDecode(sigPart);
		// Constant-time compare
		if (expectedSig.byteLength !== providedSig.byteLength) return null;
		const valid = await crypto.subtle.verify(
			'HMAC',
			key,
			providedSig.buffer as ArrayBuffer,
			new TextEncoder().encode(encodedPayload)
		);
		if (!valid) return null;
		const payload = JSON.parse(new TextDecoder().decode(b64urlDecode(encodedPayload))) as {
			handle?: string;
			exp?: number;
		};
		if (!payload.handle || !payload.exp || payload.exp < Date.now()) return null;
		return { handle: payload.handle };
	} catch {
		return null;
	}
}

export function buildSessionCookie(token: string, isProd: boolean): string {
	const parts = [
		`${SESSION_COOKIE}=${token}`,
		'Path=/',
		`Max-Age=${SESSION_TTL_SECONDS}`,
		'HttpOnly',
		'SameSite=Lax'
	];
	if (isProd) parts.push('Secure');
	return parts.join('; ');
}

export function clearSessionCookie(): string {
	return `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`;
}

// ── KV session helpers (kept for logout revocation only) ──────────────────────

export async function deleteSession(kv: KVNamespace, sessionId: string): Promise<void> {
	await kv.delete(sessionId);
}

export function requireAuth(event: RequestEvent): { handle: string } {
	const user = event.locals.studioUser;
	if (!user) {
		const next = encodeURIComponent(event.url.pathname);
		throw new Response(null, {
			status: 302,
			headers: { Location: `/studio/login?next=${next}` }
		});
	}
	return user;
}
