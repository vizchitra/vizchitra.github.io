import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { studioConfig } from '../../../studio.config';

export const load: PageServerLoad = ({ locals, platform }) => {
	if (!locals.studioUser) {
		throw redirect(302, '/studio/login');
	}

	const allowedUsers = (platform?.env?.STUDIO_ALLOWED_USERS ?? '')
		.split(',')
		.map((h: string) => h.trim())
		.filter(Boolean);

	return {
		user: locals.studioUser,
		config: studioConfig,
		allowedUsers,
		pageMeta: {
			title: 'Studio',
			description: 'VizChitra content editor'
		}
	};
};
