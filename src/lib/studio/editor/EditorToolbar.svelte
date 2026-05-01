<script lang="ts">
	import type { EditorView } from 'prosemirror-view';
	import { toggleMark, setBlockType, wrapIn } from 'prosemirror-commands';
	import { wrapInList } from 'prosemirror-schema-list';
	import { schema } from 'prosemirror-markdown';

	interface Props {
		view: EditorView | null;
	}

	let { view }: Props = $props();

	function cmd(command: (state: any, dispatch: any) => boolean) {
		if (!view) return;
		command(view.state, view.dispatch);
		view.focus();
	}

	function isMarkActive(markType: any): boolean {
		if (!view) return false;
		const sel = view.state.selection;
		const { from, to, empty } = sel;
		const fromNode = sel.$from;
		if (empty) return markType.isInSet(view.state.storedMarks || fromNode.marks()) !== null;
		return view.state.doc.rangeHasMark(from, to, markType);
	}

	function isBlockType(nodeType: any, attrs?: Record<string, unknown>): boolean {
		if (!view) return false;
		const fromNode = view.state.selection.$from;
		const node = fromNode.node();
		if (attrs) {
			return node.type === nodeType && Object.entries(attrs).every(([k, v]) => node.attrs[k] === v);
		}
		return node.type === nodeType;
	}
</script>

<div
	class="flex flex-wrap items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1.5 shadow-sm"
	role="toolbar"
	aria-label="Text formatting"
>
	<!-- Bold -->
	<button
		type="button"
		onclick={() => cmd(toggleMark(schema.marks.strong))}
		class="rounded px-2 py-1 text-sm font-bold transition hover:bg-gray-100 {isMarkActive(
			schema.marks.strong
		)
			? 'bg-gray-200'
			: ''}"
		title="Bold (Mod+B)"
		aria-pressed={isMarkActive(schema.marks.strong)}
	>
		B
	</button>

	<!-- Italic -->
	<button
		type="button"
		onclick={() => cmd(toggleMark(schema.marks.em))}
		class="rounded px-2 py-1 text-sm italic transition hover:bg-gray-100 {isMarkActive(
			schema.marks.em
		)
			? 'bg-gray-200'
			: ''}"
		title="Italic (Mod+I)"
		aria-pressed={isMarkActive(schema.marks.em)}
	>
		I
	</button>

	<div class="mx-1 h-5 w-px bg-gray-200"></div>

	<!-- H1 -->
	<button
		type="button"
		onclick={() => cmd(setBlockType(schema.nodes.heading, { level: 1 }))}
		class="rounded px-2 py-1 text-sm font-bold transition hover:bg-gray-100 {isBlockType(
			schema.nodes.heading,
			{ level: 1 }
		)
			? 'bg-gray-200'
			: ''}"
		title="Heading 1"
	>
		H1
	</button>

	<!-- H2 -->
	<button
		type="button"
		onclick={() => cmd(setBlockType(schema.nodes.heading, { level: 2 }))}
		class="rounded px-2 py-1 text-sm font-bold transition hover:bg-gray-100 {isBlockType(
			schema.nodes.heading,
			{ level: 2 }
		)
			? 'bg-gray-200'
			: ''}"
		title="Heading 2"
	>
		H2
	</button>

	<!-- H3 -->
	<button
		type="button"
		onclick={() => cmd(setBlockType(schema.nodes.heading, { level: 3 }))}
		class="rounded px-2 py-1 text-sm font-bold transition hover:bg-gray-100 {isBlockType(
			schema.nodes.heading,
			{ level: 3 }
		)
			? 'bg-gray-200'
			: ''}"
		title="Heading 3"
	>
		H3
	</button>

	<!-- Paragraph -->
	<button
		type="button"
		onclick={() => cmd(setBlockType(schema.nodes.paragraph))}
		class="rounded px-2 py-1 text-sm transition hover:bg-gray-100 {isBlockType(
			schema.nodes.paragraph
		)
			? 'bg-gray-200'
			: ''}"
		title="Paragraph"
	>
		¶
	</button>

	<div class="mx-1 h-5 w-px bg-gray-200"></div>

	<!-- Blockquote -->
	<button
		type="button"
		onclick={() => cmd(wrapIn(schema.nodes.blockquote))}
		class="rounded px-2 py-1 text-sm transition hover:bg-gray-100"
		title="Blockquote"
	>
		"
	</button>

	<!-- Bullet list -->
	<button
		type="button"
		onclick={() => cmd(wrapInList(schema.nodes.bullet_list))}
		class="rounded px-2 py-1 text-sm transition hover:bg-gray-100"
		title="Bullet list"
	>
		• —
	</button>

	<!-- Ordered list -->
	<button
		type="button"
		onclick={() => cmd(wrapInList(schema.nodes.ordered_list))}
		class="rounded px-2 py-1 text-sm transition hover:bg-gray-100"
		title="Ordered list"
	>
		1. —
	</button>
</div>
