import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import yaml from 'js-yaml';

// Import all markdown files as raw strings so we can extract frontmatter for prerender entries.
const contentModules = import.meta.glob('../../../content/*.md', {
	query: '?raw',
	import: 'default'
});

const contentMap: Record<string, string> = {};
for (const path in contentModules) {
	const fileName = path.split('/').pop()?.replace('.md', '') || '';
	contentMap[fileName] = path;
}

export const prerender = true;

export const entries = async () => {
	return Object.keys(contentMap).map((slug) => ({ slug }));
};

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	if (!contentMap[slug]) {
		throw error(404, `Content page "${slug}" not found`);
	}

	try {
		const contentPath = contentMap[slug];
		const content = await contentModules[contentPath](); // raw markdown string

		// Extract frontmatter (simple YAML between --- blocks)
		const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
		const match = (content as string).match(frontmatterRegex);
		let frontmatter = {};
		if (match) {
			frontmatter = yaml.load(match[1]) || {};
		}

		return {
			slug,
			frontmatter
		};
	} catch (err) {
		console.error('[slug] error loading:', err);
		throw error(500, `Failed to load content for "${slug}"`);
	}
};
