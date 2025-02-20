import { redirects } from '$lib/config/redirects';
import { redirect } from '@sveltejs/kit';

export async function GET({ params }) {
	const path = params.path;
	const redirectConfig = redirects.find((r) => r.path === path);

	if (redirectConfig) {
		// Throw a redirect with the appropriate status code
		throw redirect(redirectConfig.type === 'permanent' ? 301 : 302, redirectConfig.url);
	}

	// If no redirect is found, let SvelteKit handle the 404
	return new Response('Not Found', { status: 404 });
}
