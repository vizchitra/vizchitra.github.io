import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		document: {
			banner: 'blob' as const
		},
		pageMeta: {
			title: 'Guides',
			description:
				'Guides to support you from first idea to final delivery for your VizChitra session',
			ogImage: 'https://vizchitra.com/images/preview/preview-guides.jpg'
		},
		pageLayout: {
			banner: 'blob' as const
		}
	};
};
