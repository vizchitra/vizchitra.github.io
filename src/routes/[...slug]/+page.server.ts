import type { PageServerLoad } from './$types';
import { loadContent, getAllSlugs } from '$lib/loaders/content';

export const prerender = true;

export const entries = async () => {
	// Get all content slugs for prerendering (excluding 'index' which is handled by root route)
	return getAllSlugs()
		.filter((s) => s !== 'index')
		.map((slug) => ({ slug }));
};

export const load: PageServerLoad = async ({ params }) => {
	// Delegate to universal content loader
	// params.slug is already a string (or undefined), loadContent handles normalization
	return loadContent(params.slug);
};
