import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		document: {
			banner: 'square' as const,
			color: 'orange' as const
		},
		pageMeta: {
			title: 'Team',
			description: 'Meet the team behind VizChitra'
		},
		pageLayout: {
			banner: 'square' as const,
			color: 'orange' as const
		}
	};
};
