import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		document: {
			banner: 'square' as const,
			color: 'grey' as const
		},
		pageMeta: {
			title: 'Color System',
			description: 'Complete color palette and usage guidelines for VizChitra'
		},
		pageLayout: {
			banner: 'square' as const,
			color: 'grey' as const
		}
	};
};
