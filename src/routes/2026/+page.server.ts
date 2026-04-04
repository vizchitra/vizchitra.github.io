import type { PageServerLoad } from './$types';
import { resolveConfirmedSessions } from '$lib/utils/sessions';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const selectedSessions = resolveConfirmedSessions();

	return {
		selectedSessions,
		pageMeta: {
			title: 'VizChitra 2026',
			description: 'VizChitra 2026 is happening on 3rd and 4th July, 2026 in Bangalore',
			ogImage: 'https://vizchitra.com/images/preview/preview-2026.jpg',
			noSuffix: true
		}
	};
};
