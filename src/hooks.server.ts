import { redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { getSession } from '$lib/studio/session';
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
			event.locals.studioUser = { handle: devUser, sessionId: 'dev' };
		} else {
			const kv = event.platform?.env?.STUDIO_SESSIONS;
			if (kv) {
				const session = await getSession(kv, event.request);
				event.locals.studioUser = session
					? { handle: session.handle, sessionId: session.sessionId }
					: null;
			} else {
				event.locals.studioUser = null;
			}
		}
	} else {
		event.locals.studioUser = null;
	}

	return resolve(event);
}
