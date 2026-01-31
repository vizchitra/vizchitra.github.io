import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const modules = import.meta.glob('../../../content/**/*.md', { eager: true });

function getPage(slug: string) {
	const s = slug || 'index';
	const path = modules[`../../../content/${s}.md`]
		? `../../../content/${s}.md`
		: `../../../content/${s}/index.md`;
	const mod = modules[path] as any;
	if (!mod) throw error(404, `Page "${s}" not found`);
	return { Component: mod.default, frontmatter: mod.metadata || {} };
}

const getAllSlugs = () => [
	...new Set(
		Object.keys(modules)
			.filter((path) => {
				// Filter out drafts in production
				if (import.meta.env.PROD) {
					const mod = modules[path] as any;
					if (mod?.metadata?.draft) return false;
				}
				return true;
			})
			.map(
				(p) =>
					p
						.replace('../../../content/', '')
						.replace('.md', '')
						.replace(/\/index$/, '') || 'index'
			)
	)
];

export const prerender = true;

export const entries = async () => {
	return getAllSlugs().map((slug) => ({ slug }));
};

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	const page = getPage(slug);

	// Check for drafts in production
	if (import.meta.env.PROD && page.frontmatter.draft) {
		throw error(404, `Page "${slug}" not found`);
	}

	return {
		slug,
		frontmatter: page.frontmatter
	};
};
