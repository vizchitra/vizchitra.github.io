import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { allPages } from 'content-collections';

export const prerender = true;

export const entries = async () => {
	return allPages
		.filter((page) => {
			// Filter out drafts in production
			if (import.meta.env.PROD && page.draft) return false;
			return true;
		})
		.map((page) => ({ slug: page.slug }));
};

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	const page = allPages.find((p) => p.slug === slug);

	if (!page) {
		throw error(404, `Page "${slug}" not found`);
	}

	// Check for drafts in production
	if (import.meta.env.PROD && page.draft) {
		throw error(404, `Page "${slug}" not found`);
	}

	return {
		document: page
	};
};
