import { redirect } from '@sveltejs/kit';
import { redirects } from '$lib/config/redirects';

export async function load({ url }) {
	const pathname = url.pathname.replace(/^\//, '');

	if (pathname && pathname in redirects) {
		return redirect(301, redirects[pathname]);
	}
}
