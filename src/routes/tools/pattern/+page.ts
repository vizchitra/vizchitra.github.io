import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		document: {
			banner: 'square' as const,
			color: 'grey' as const
		},
		pageMeta: {
			title: 'Pattern Gallery',
			description:
				'Preview the hatched SVG pattern set (waves, river, circle, stream) across VizChitra color tones.'
		},
		pageLayout: {
			banner: 'square' as const,
			color: 'grey' as const
		}
	};
};
