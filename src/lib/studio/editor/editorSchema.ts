/**
 * Extended ProseMirror schema that adds a `raw_block` node type.
 *
 * `raw_block` is an atomic (non-editable) block used to preserve
 * markdown content that the editor cannot round-trip safely — specifically:
 *   - GFM tables  (kind: 'table')
 *   - Remark directives  (kind: 'directive')
 *
 * The raw markdown source is stored in `node.attrs.raw` and emitted
 * verbatim by the custom serializer, guaranteeing lossless round-trips.
 *
 * Parsing works via a module-level registry (`rawBlockRegistry`) that is
 * populated by `markdownUtils.ts` before each `DOMParser.parse()` call.
 */

import { Schema } from 'prosemirror-model';
import { schema as pmSchema } from 'prosemirror-markdown';

/** Populated by markdownUtils before each parse; consumed by parseDOM. */
export const rawBlockRegistry = new Map<string, { text: string; kind: string }>();

const rawBlockSpec = {
	group: 'block',
	atom: true,
	attrs: {
		raw: { default: '' },
		kind: { default: 'table' } // 'table' | 'directive'
	},

	toDOM(node: { attrs: { raw: string; kind: string } }) {
		const lineCount = node.attrs.raw.split('\n').length;
		const label = node.attrs.kind === 'table' ? `table (${lineCount} rows)` : `directive block`;
		return [
			'div',
			{
				class: `pm-raw-block pm-raw-block--${node.attrs.kind}`,
				'data-raw-kind': node.attrs.kind,
				title: `Read-only ${label} — edit the source file to change this`
			},
			label
		] as [string, Record<string, string>, string];
	},

	parseDOM: [
		{
			tag: 'div[data-raw-key]',
			getAttrs(dom: HTMLElement) {
				const key = dom.getAttribute('data-raw-key') ?? '';
				const entry = rawBlockRegistry.get(key);
				return entry ? { raw: entry.text, kind: entry.kind } : false;
			}
		}
	]
};

export const editorSchema = new Schema({
	// Append raw_block to the existing node map
	nodes: (pmSchema.spec.nodes as ReturnType<typeof pmSchema.spec.nodes.append>).append({
		raw_block: rawBlockSpec
	}),
	marks: pmSchema.spec.marks
});
