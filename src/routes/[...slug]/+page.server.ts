import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import yaml from 'js-yaml';

// Import all markdown files as raw strings so we can extract frontmatter for prerender entries.
const contentModules = import.meta.glob('../../../content/**/*.md', {
	query: '?raw',
	import: 'default'
});

const contentMap: Record<string, string> = {};
for (const path in contentModules) {
	let slug = path.replace('../../../content/', '').replace('.md', '');
	// Handle index.md files: map both '2026/index' and '2026' to the same path
	contentMap[slug] = path;
	if (slug.endsWith('/index')) {
		contentMap[slug.replace('/index', '')] = path;
	}
}

export const prerender = true;

export const entries = async () => {
	const slugs = [];
	for (const slug of Object.keys(contentMap)) {
		const contentPath = contentMap[slug];
		const content = (await contentModules[contentPath]()) as string;

		// Extract frontmatter to check for draft status
		const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
		const match = content.match(frontmatterRegex);
		if (match) {
			const frontmatter = (yaml.load(match[1]) || {}) as any;
			if (import.meta.env.PROD && frontmatter.draft) {
				continue;
			}
		}
		slugs.push({ slug });
	}
	return slugs;
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

		if (import.meta.env.PROD && (frontmatter as any).draft) {
			throw error(404, `Content page "${slug}" not found`);
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
