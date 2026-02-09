import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		document: {
			banner: 'square' as const,
			color: 'grey' as const
		}
	};
};
