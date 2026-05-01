/**
 * Markdown ↔ ProseMirror document conversion for the Studio editor.
 *
 * Strategy for lossless round-trips:
 *
 * PARSE  (markdown → doc):
 *   1. Scan raw markdown for "raw regions" (GFM tables, remark directives).
 *   2. Replace each raw region with a tiny sentinel `<div data-raw-key="…">`.
 *   3. Convert the remaining markdown to HTML with markdown-it.
 *   4. Combine into a single HTML string and parse with
 *      `DOMParser.fromSchema(editorSchema)`.
 *   5. The sentinel divs resolve to `raw_block` nodes via `parseDOM`
 *      (which reads from `rawBlockRegistry`).
 *
 * SERIALIZE (doc → markdown):
 *   - Standard nodes use `defaultMarkdownSerializer`.
 *   - `raw_block` nodes emit `node.attrs.raw` verbatim, restoring the
 *     original table / directive syntax byte-for-byte.
 */

import MarkdownIt from 'markdown-it';
import { DOMParser as PmDOMParser } from 'prosemirror-model';
import type { Node } from 'prosemirror-model';
import { MarkdownSerializer, defaultMarkdownSerializer } from 'prosemirror-markdown';
import { editorSchema, rawBlockRegistry } from './editorSchema';

// ── markdown-it instance (commonmark, no HTML passthrough needed) ──────────
const md = new MarkdownIt('commonmark');

// ── Raw-region detection ───────────────────────────────────────────────────

/** A contiguous block of markdown text classified as raw or normal. */
interface Segment {
	kind: 'normal' | 'table' | 'directive';
	text: string;
}

const TABLE_ROW_RE = /^\|/;
const TABLE_SEP_RE = /^[-|: ]+$/;
const DIRECTIVE_CONTAINER_RE = /^:::/;
const DIRECTIVE_LEAF_RE = /^::(?!:)/;

/**
 * Split markdown into segments, tagging GFM table blocks and remark
 * directive blocks as raw regions.
 */
function splitIntoSegments(markdownText: string): Segment[] {
	const segments: Segment[] = [];
	const lines = markdownText.split('\n');
	let i = 0;
	let normalLines: string[] = [];

	function flushNormal() {
		if (normalLines.length > 0) {
			segments.push({ kind: 'normal', text: normalLines.join('\n') });
			normalLines = [];
		}
	}

	while (i < lines.length) {
		const line = lines[i];

		// GFM table: one or more consecutive rows containing `|`
		if (TABLE_ROW_RE.test(line)) {
			flushNormal();
			const tableLines: string[] = [];
			while (i < lines.length && (TABLE_ROW_RE.test(lines[i]) || TABLE_SEP_RE.test(lines[i]))) {
				tableLines.push(lines[i]);
				i++;
			}
			segments.push({ kind: 'table', text: tableLines.join('\n') });
			continue;
		}

		// Container directive: ::: … :::
		if (DIRECTIVE_CONTAINER_RE.test(line)) {
			flushNormal();
			const directiveLines: string[] = [line];
			i++;
			while (i < lines.length && !DIRECTIVE_CONTAINER_RE.test(lines[i])) {
				directiveLines.push(lines[i]);
				i++;
			}
			if (i < lines.length) directiveLines.push(lines[i++]); // closing :::
			segments.push({ kind: 'directive', text: directiveLines.join('\n') });
			continue;
		}

		// Leaf directive: ::name (but not :::)
		if (DIRECTIVE_LEAF_RE.test(line)) {
			flushNormal();
			segments.push({ kind: 'directive', text: line });
			i++;
			continue;
		}

		normalLines.push(line);
		i++;
	}

	flushNormal();
	return segments;
}

// ── Parse ──────────────────────────────────────────────────────────────────

/** Parse a markdown string into a ProseMirror document using `editorSchema`. */
export function parseMarkdown(markdownText: string): Node {
	rawBlockRegistry.clear();
	let registryCounter = 0;

	const segments = splitIntoSegments(markdownText);
	const htmlParts: string[] = [];

	for (const seg of segments) {
		if (seg.kind === 'normal') {
			htmlParts.push(md.render(seg.text));
		} else {
			const key = `rb-${registryCounter++}`;
			rawBlockRegistry.set(key, { text: seg.text, kind: seg.kind });
			htmlParts.push(`<div data-raw-key="${key}"></div>`);
		}
	}

	const html = htmlParts.join('\n');

	// Parse with ProseMirror's DOMParser — must run in browser context.
	const container = document.createElement('div');
	container.innerHTML = html;
	return PmDOMParser.fromSchema(editorSchema).parse(container);
}

// ── Serialize ──────────────────────────────────────────────────────────────

/** Serialize a ProseMirror document back to markdown. */
export const editorSerializer = new MarkdownSerializer(
	{
		...defaultMarkdownSerializer.nodes,

		// Emit raw blocks verbatim (restores original table / directive syntax).
		raw_block(state, node) {
			state.write(node.attrs.raw as string);
			state.closeBlock(node);
		}
	},
	defaultMarkdownSerializer.marks
);
