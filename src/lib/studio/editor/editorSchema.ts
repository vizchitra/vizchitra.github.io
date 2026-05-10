/**
 * ProseMirror schema for the Studio editor.
 *
 * Extends the prosemirror-markdown base schema with:
 *   - GFM table nodes    (prosemirror-tables)
 *   - block_directive    (:::notice … ::: container; editable prose children)
 *   - leaf_directive     (::name[label]{attrs} atom; reserved for future directives like ::youtube)
 *   - slanted mark       (:slanted[text] inside headings; render-time per-letter effect is build-only)
 *
 * Directive names and types are defined in src/lib/markdown/directives.config.ts.
 */

import { Schema, type NodeSpec, type MarkSpec } from 'prosemirror-model';
import { schema as pmSchema } from 'prosemirror-markdown';
import { tableNodes } from 'prosemirror-tables';

// ── Table nodes ────────────────────────────────────────────────────────────

const pmTableNodes = tableNodes({
	tableGroup: 'block',
	cellContent: 'block+'
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);

// ── block_directive ────────────────────────────────────────────────────────
// Represents :::notice … ::: (containerDirective in mdast-util-directive)

const blockDirectiveSpec: NodeSpec = {
	attrs: { name: { default: '' } },
	content: 'block+',
	group: 'block',
	defining: true,
	parseDOM: [
		{
			tag: 'div[data-directive]',
			getAttrs(dom) {
				return { name: (dom as HTMLElement).getAttribute('data-directive') ?? '' };
			}
		}
	],
	toDOM(node) {
		return ['div', { class: 'pm-block-directive', 'data-directive': node.attrs.name as string }, 0];
	}
};

// ── leaf_directive ─────────────────────────────────────────────────────────
// Represents ::name[label]{key=value} (leafDirective in mdast-util-directive)
// Atom node — no editable children. Reserved for future use (e.g. ::youtube).

const leafDirectiveSpec: NodeSpec = {
	attrs: {
		name: { default: '' },
		label: { default: '' },
		attrs: { default: '{}' } // JSON string of { key: value } pairs
	},
	group: 'block',
	atom: true,
	parseDOM: [
		{
			tag: 'div[data-leaf-directive]',
			getAttrs(dom) {
				const el = dom as HTMLElement;
				return {
					name: el.getAttribute('data-directive') ?? '',
					label: el.getAttribute('data-label') ?? '',
					attrs: el.getAttribute('data-attrs') ?? '{}'
				};
			}
		}
	],
	toDOM(node) {
		return [
			'div',
			{
				class: 'pm-leaf-directive',
				'data-leaf-directive': '',
				'data-directive': node.attrs.name as string,
				'data-label': node.attrs.label as string,
				'data-attrs': node.attrs.attrs as string
			}
		];
	}
};

// ── slanted mark ───────────────────────────────────────────────────────────
// Represents :slanted[text] inside heading nodes.
// The per-letter visual slant effect is applied at render/build time only.

const slantedSpec: MarkSpec = {
	parseDOM: [{ tag: 'span[data-directive="slanted"]' }],
	toDOM() {
		return ['span', { 'data-directive': 'slanted' }, 0];
	}
};

// ── Composed schema ────────────────────────────────────────────────────────

export const editorSchema = new Schema({
	nodes: (pmSchema.spec.nodes as ReturnType<typeof pmSchema.spec.nodes.append>)
		.append(pmTableNodes)
		.append({
			block_directive: blockDirectiveSpec,
			leaf_directive: leafDirectiveSpec
		}),
	marks: (pmSchema.spec.marks as ReturnType<typeof pmSchema.spec.marks.append>).append({
		slanted: slantedSpec
	})
});
