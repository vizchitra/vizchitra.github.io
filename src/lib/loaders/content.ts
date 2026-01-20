import { error } from '@sveltejs/kit';
import yaml from 'js-yaml';

// Import all markdown files as raw strings for frontmatter extraction
// Using /content alias from vite.config.js for consistent paths
const contentModules = import.meta.glob('/content/**/*.md', {
	query: '?raw',
	import: 'default'
});

// Build content map
const contentMap: Record<string, string> = {};
for (const path in contentModules) {
	// Extract slug from path: '../../content/index.md' → 'index'
	let slug = path.replace(/^.*\/content\//, '').replace('.md', '');
	contentMap[slug] = path;
	if (slug.endsWith('/index')) {
		contentMap[slug.replace('/index', '')] = path;
	}
}

// Debug: log content map on startup
if (Object.keys(contentMap).length > 0) {
	console.log(`✅ Content loader initialized: ${Object.keys(contentMap).length} slugs available`);
}

/**
 * Universal content loader for both root and dynamic routes
 * Handles slug normalization and frontmatter extraction
 * @param slug - The slug to load (string or array, or undefined for home)
 * @returns {slug, frontmatter} data for the route
 */
export async function loadContent(slug?: string | string[]) {
	// Normalize slug: handle both string and array inputs
	// If undefined or empty array, default to 'index' (home page)
	let normalizedSlug: string;

	if (!slug) {
		normalizedSlug = 'index';
	} else if (Array.isArray(slug)) {
		normalizedSlug = slug.length ? slug.join('/') : 'index';
	} else {
		normalizedSlug = slug;
	}

	if (!contentMap[normalizedSlug]) {
		throw error(404, `Content page "${normalizedSlug}" not found`);
	}

	try {
		const contentPath = contentMap[normalizedSlug];
		const content = (await contentModules[contentPath]()) as string;

		// Extract frontmatter (simple YAML between --- blocks)
		const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
		const match = content.match(frontmatterRegex);
		let frontmatter = {};
		if (match) {
			frontmatter = yaml.load(match[1]) || {};
		}

		return {
			slug: normalizedSlug,
			frontmatter
		};
	} catch (err) {
		console.error(`Error loading content for slug "${normalizedSlug}":`, err);
		throw error(500, `Failed to load content for "${normalizedSlug}"`);
	}
}

/**
 * Get all content slugs for prerendering
 * Returns array of slug strings for SvelteKit's entries() function
 */
export function getAllSlugs(): string[] {
	return Object.keys(contentMap);
}

/**
 * Get content modules for client-side component loading
 * Used by +page.svelte components to load and render compiled markdown
 */
export function getContentModules() {
	return import.meta.glob('/content/**/*.md', { eager: true });
}
