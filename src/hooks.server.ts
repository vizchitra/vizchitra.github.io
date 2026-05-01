import { redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { getSession } from '$lib/studio/session';

// Parse redirect paths from Cloudflare _redirects file
// This is done once at startup in dev
let redirects: Array<{ from: string; to: string; code: number }> = [];

if (dev) {
	try {
		const fs = await import('node:fs');
		const content = fs.readFileSync('_redirects', 'utf-8');
		redirects = content
			.split('\n')
			.filter((line) => line.trim() && !line.startsWith('#'))
			.map((line) => {
				const [from, to, code] = line.split(/\s+/);
				return { from, to, code: parseInt(code || '302', 10) };
			});
	} catch (e) {
		console.warn('No _redirects file found or failed to parse');
	}
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	// Check for redirects only in dev
	if (dev) {
		const path = event.url.pathname;
		const match = redirects.find((r) => r.from === path);

		if (match) {
			throw redirect(match.code, match.to);
		}
	}

	// Populate studioUser for studio + API studio routes
	const path = event.url.pathname;
	if (path.startsWith('/studio') || path.startsWith('/api/studio')) {
		// Dev bypass: set STUDIO_DEV_USER in .env to skip OAuth entirely
		const devUser = dev && env.STUDIO_DEV_USER;
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
