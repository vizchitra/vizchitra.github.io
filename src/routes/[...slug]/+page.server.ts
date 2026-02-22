import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { allPages } from 'content-collections';
import { readFileSync } from 'node:fs';

// Parse redirects from _redirects file (loaded once at build time)
const redirectsContent = readFileSync('_redirects', 'utf-8');
const redirects = new Map<string, { to: string; code: number }>();

redirectsContent
	.split('\n')
	.filter((line) => line.trim() && !line.startsWith('#'))
	.forEach((line) => {
		const [from, to, code] = line.split(/\s+/);
		if (from && to) {
			redirects.set(from, { to, code: parseInt(code || '302', 10) });
		}
	});

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

	// Check if this slug is a redirect path
	const redirectMatch = redirects.get(`/${slug}`);
	if (redirectMatch) {
		throw redirect(redirectMatch.code, redirectMatch.to);
	}

	const page = allPages.find((p) => p.slug === slug);

	if (!page) {
		throw error(404, `Page "${slug}" not found`);
	}

	// Check for drafts in production
	if (import.meta.env.PROD && page.draft) {
		throw error(404, `Page "${slug}" not found`);
	}

	return {
		document: page,
		pageMeta: {
			title: page.title,
			description: page.description
		},
		pageLayout: {
			banner: page.banner,
			color: page.color
		}
	};
};
