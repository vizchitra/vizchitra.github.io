import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = ({ locals, url }) => {
	// Already authenticated — redirect to studio home or intended destination
	if (locals.studioUser) {
		const next = url.searchParams.get('next') ?? '/studio';
		throw redirect(302, next);
	}

	return {
		error: url.searchParams.get('error') ?? null
	};
};
