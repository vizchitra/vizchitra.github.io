import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		document: {
			banner: 'square' as const,
			color: 'grey' as const
		},
		pageMeta: {
			title: 'Tools',
			description: 'Design tools and resources for creating visual content'
		},
		pageLayout: {
			banner: 'square' as const,
			color: 'grey' as const
		}
	};
};
