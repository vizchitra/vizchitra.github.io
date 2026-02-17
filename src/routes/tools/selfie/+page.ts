import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		document: {
			banner: 'square' as const,
			color: 'grey' as const
		},
		pageMeta: {
			title: 'Selfie Tool',
			description: 'Selfie / polygon playground for experimenting with shapes and cameras.'
		},
		pageLayout: {
			banner: 'square' as const,
			color: 'grey' as const
		}
	};
};
