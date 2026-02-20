import { redirect } from '@sveltejs/kit';
import { readFileSync } from 'node:fs';

// Parse redirect paths from Cloudflare _redirects file
// This is done once at startup in dev/build
let redirects;

try {
	const content = readFileSync('_redirects', 'utf-8');
	redirects = content
		.split('\n')
		.filter((line) => line.trim() && !line.startsWith('#'))
		.map((line) => {
			const [from, to, code] = line.split(/\s+/);
			return { from, to, code: parseInt(code || '302') };
		});
} catch (e) {
	console.warn('No _redirects file found or failed to parse');
	redirects = [];
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	// Check for redirects
	const path = event.url.pathname;
	const match = redirects.find((r) => r.from === path);

	if (match) {
		throw redirect(match.code, match.to);
	}

	return resolve(event);
}
