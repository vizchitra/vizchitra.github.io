/**
 * Shared Zod schemas for content frontmatter.
 *
 * This is the single source of truth for field definitions.
 * Imported by both:
 *   - content-collections.ts  (build-time validation)
 *   - src/lib/studio/contentSchemas.ts  (Studio editor validation + form UI)
 *
 * Rules:
 *   - Only frontmatter fields here. Body/transform artifacts (html, guideId, etc.) stay in content-collections.ts.
 *   - Use z.coerce.number() so values coming from form inputs (strings) are accepted.
 *   - Validation messages are intentionally human-facing (shown in the Studio form).
 */

import { z } from 'zod';

export const pagesSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	description: z.string().optional(),
	slug: z.string().min(1, 'Slug is required'),
	banner: z.enum(['polygon', 'curve', 'square', 'blob']).optional(),
	color: z.enum(['grey', 'pink', 'blue', 'teal', 'yellow', 'orange']).optional(),
	draft: z.boolean().optional().default(false)
});

export const guidesSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	description: z.string().min(1, 'Description is required'),
	guide: z.enum(['talks', 'workshops', 'dialogues', 'exhibition', 'panels']),
	section: z.string().min(1, 'Section is required'),
	order: z.coerce.number({ message: 'Must be a number' }),
	draft: z.boolean().optional().default(false)
});
