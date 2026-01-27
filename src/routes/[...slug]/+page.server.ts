import { getAllSlugs } from '$lib/loaders/content';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const entries = async () => {
	return getAllSlugs()
		.filter((s) => s !== 'index')
		.map((slug) => ({ slug }));
};

export const load: PageServerLoad = async ({ params }) => {
	return { slug: params.slug };
};
