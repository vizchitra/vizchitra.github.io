import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		document: {
			banner: 'blob' as const
		}
	};
};
