import { error } from '@sveltejs/kit';

const modules = import.meta.glob('/content/**/*.md', { eager: true });

export function getPage(slug: string | string[] = 'index') {
	const s = Array.isArray(slug) ? slug.join('/') : slug || 'index';
	const path = modules[`/content/${s}.md`] ? `/content/${s}.md` : `/content/${s}/index.md`;
	const mod = modules[path] as any;
	if (!mod) throw error(404, `Page "${s}" not found`);
	return { Component: mod.default, frontmatter: mod.metadata || {} };
}

export const getAllSlugs = () => [
	...new Set(
		Object.keys(modules).map(
			(p) =>
				p
					.replace('/content/', '')
					.replace('.md', '')
					.replace(/\/index$/, '') || 'index'
		)
	)
];
