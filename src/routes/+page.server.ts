import type { PageServerLoad } from './$types';
import { loadContent } from '$lib/loaders/content';

export const prerender = true;

export const load: PageServerLoad = async () => {
	return loadContent('index');
};
