import { redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { verifySignedSession } from '$lib/studio/session';
import redirectsRaw from '../_redirects?raw';

// Parse _redirects once at module load (bundled by Vite — works in CF Workers)
const redirectMap = new Map<string, { to: string; code: number }>(
	redirectsRaw
		.split('\n')
		.filter((line) => line.trim() && !line.startsWith('#'))
		.flatMap((line) => {
			const [from, to, code] = line.split(/\s+/);
			return from && to
				? [
						[from, { to, code: parseInt(code || '302', 10) }] as [
							string,
							{ to: string; code: number }
						]
					]
				: [];
		})
);

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	// Handle redirects in all environments — runs before routing so it catches
	// paths that would otherwise reach prerendered-only routes and return 404.
	const path = event.url.pathname;
	const match = redirectMap.get(path);
	if (match) throw redirect(match.code, match.to);

	// Populate studioUser for studio + API studio routes
	if (path.startsWith('/studio') || path.startsWith('/api/studio')) {
		// In dev mode, always bypass OAuth — no env vars needed
		const devUser = dev && (process.env.STUDIO_DEV_USER || 'dev');
		if (devUser) {
			event.locals.studioUser = { handle: devUser };
		} else {
			const secret = event.platform?.env?.STUDIO_SESSION_SECRET;
			if (secret) {
				const cookieHeader = event.request.headers.get('cookie') ?? '';
				const token =
					cookieHeader
						.split(';')
						.map((c) => c.trim())
						.find((c) => c.startsWith('studio_session='))
						?.slice('studio_session='.length) ?? '';
				const session = token ? await verifySignedSession(token, secret) : null;
				event.locals.studioUser = session ? { handle: session.handle } : null;
			} else {
				event.locals.studioUser = null;
			}
		}
	} else {
		event.locals.studioUser = null;
	}

	return resolve(event);
}
