import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMarkdown } from '@content-collections/markdown';
import { z } from 'zod';
import remarkDirective from 'remark-directive';
import { remarkVizchitraDirectives } from './src/lib/markdown/directive.js';

/* Markdown Compilation Options */
const markdownOptions = {
	allowDangerousHtml: true,
	remarkPlugins: [remarkDirective, remarkVizchitraDirectives]
};

/* This collection defines "guides" which are markdown documents that
	 provide instructional content for users. Each guide has a title,
	 description, and the main content in markdown format. The transform
	 function compiles the markdown content to HTML for rendering. */

const guides = defineCollection({
	name: 'guides',
	directory: 'guides',
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

export default defineConfig({
	collections: [guides]
});
