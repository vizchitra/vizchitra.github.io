import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		document: {
			banner: 'square' as const,
			color: 'grey' as const
		},
		pageMeta: {
			title: 'Banner Tool',
			description: 'Banner generation tool for VizChitra'
		},
		pageLayout: {
			banner: 'square' as const,
			color: 'grey' as const
		}
	};
};
