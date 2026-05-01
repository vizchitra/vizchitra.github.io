/**
 * Directive registry — single source of truth for both the build pipeline
 * (directive.js / remark) and the Studio editor parser bridge.
 *
 * Add a new entry here whenever a directive is introduced in content.
 * The editor bridge reads this to build its parse/serialize handlers.
 */

// ── Types ──────────────────────────────────────────────────────────────────

export type DirectiveAttr = {
	key: string;
	type: 'text' | 'select' | 'boolean' | 'number';
	label: string;
	options?: string[];
};

export type DirectiveDefinition =
	| {
			name: string;
			nodeType: 'container';
			description?: string;
			attrs: DirectiveAttr[];
	  }
	| {
			name: string;
			nodeType: 'text';
			description?: string;
			// text directives use [label] content; no configurable attrs currently
	  }
	| {
			name: string;
			nodeType: 'leaf';
			description?: string;
			attrs: DirectiveAttr[];
	  };

// ── Registry ───────────────────────────────────────────────────────────────

export const directives: DirectiveDefinition[] = [
	{
		name: 'notice',
		nodeType: 'container',
		description: 'Highlighted notice block with editable prose children',
		attrs: []
	},
	{
		name: 'slanted',
		nodeType: 'text',
		description:
			'Slanted heading text — stored as a mark in the editor; per-letter transform is render-only'
	}
	// Future example (not yet active):
	// {
	//   name: 'youtube',
	//   nodeType: 'leaf',
	//   description: 'YouTube embed',
	//   attrs: [{ key: 'src', type: 'text', label: 'Video ID' }]
	// }
];

/** Fast lookup map: directive name → definition. */
export const directivesByName: ReadonlyMap<string, DirectiveDefinition> = new Map(
	directives.map((d) => [d.name, d])
);
