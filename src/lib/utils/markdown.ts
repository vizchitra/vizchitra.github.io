/**
 * Shared markdown → HTML utility using the project's remark pipeline.
 *
 * Matches the pipeline used in content-collections.ts:
 *   remark-parse → remark-gfm → remark-directive → remarkVizchitraDirectives
 *   → remark-rehype → rehypeTableLabels → rehype-stringify
 *
 * Use this instead of `marked` wherever markdown needs to be rendered to HTML.
 */
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { remarkVizchitraDirectives } from '$lib/markdown/directive.js';
import { rehypeTableLabels } from '$lib/markdown/table-labels.js';

const processor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkDirective)
	.use(remarkVizchitraDirectives)
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypeTableLabels)
	.use(rehypeStringify);

/** Render a markdown string to an HTML string using the project pipeline. */
export async function markdownToHtml(md: string): Promise<string> {
	if (!md) return '';
	const result = await processor.process(md);
	return String(result);
}
