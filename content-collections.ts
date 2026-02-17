import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMarkdown } from '@content-collections/markdown';
import { z } from 'zod';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import { remarkVizchitraDirectives } from './src/lib/markdown/directive.js';
import { rehypeTableLabels } from './src/lib/markdown/table-labels.js';

/* Markdown Compilation Options */
const markdownOptions = {
	allowDangerousHtml: true,
	remarkPlugins: [remarkGfm, remarkDirective, remarkVizchitraDirectives],
	rehypePlugins: [rehypeTableLabels]
};

/* Pages collection define all standalone md pages */
const pages = defineCollection({
	name: 'pages',
	directory: 'content/pages',
	include: '**/*.md',
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		slug: z.string(),
		banner: z.enum(['polygon', 'curve', 'square', 'blob']).optional(),
		color: z.enum(['grey', 'pink', 'blue', 'teal', 'yellow', 'orange']).optional(),
		draft: z.boolean().optional().default(false),
		content: z.string().optional()
	}),
	transform: async (document, context) => {
		const html = await compileMarkdown(context, document, markdownOptions);
		return {
			...document,
			html
		};
	}
});

/* This collection defines "guides" which are markdown documents that
	 provide instructional content for users. Each guide has a title,
	 description, and the main content in markdown format. The transform
	 function compiles the markdown content to HTML for rendering. */

const guides = defineCollection({
	name: 'guides',
	directory: 'content/guides',
	include: '**/*.md',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		guide: z.enum(['talks', 'workshops', 'dialogues', 'exhibition', 'panels']),
		section: z.string(),
		order: z.number(),
		draft: z.boolean().optional().default(false),
		content: z.string()
	}),
	transform: async (document, context) => {
		// Extract guideId and sectionSlug from the file path
		// e.g., "talks/intro.md"
		const segments = document._meta.path.split('/');
		const html = await compileMarkdown(context, document, markdownOptions);
		return {
			...document,
			html,
			guideId: segments[0],
			guideSlug: document._meta.path.replace(/\.md$/, ''), // full path for routing
			sectionSlug: document.section
		};
	}
});

/* Studio collection for design system workspace - combines testing,
	 documentation, and automated audits in one place */
const studio = defineCollection({
	name: 'studio',
	directory: 'studio',
	include: '**/*.md',
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		category: z.enum(['typography', 'tokens', 'components', 'patterns', 'audit']),
		draft: z.boolean().optional().default(false),
		generated: z.boolean().optional().default(false), // true for audit files
		order: z.number().optional().default(999), // for sorting within category
		content: z.string()
	}),
	transform: async (document, context) => {
		const html = await compileMarkdown(context, document, markdownOptions);
		return {
			...document,
			html,
			slug: document._meta.path.replace(/\.md$/, '')
		};
	}
});

export default defineConfig({
	collections: [guides, studio, pages]
});
