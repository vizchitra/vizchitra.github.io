<script lang="ts">
	import type { EditorView } from 'prosemirror-view';
	import { toggleMark, setBlockType, wrapIn } from 'prosemirror-commands';
	import { wrapInList } from 'prosemirror-schema-list';
	import { editorSchema as schema } from './editorSchema';

	interface Props {
		view: EditorView | null;
		/** Viewport coordinates above which the toolbar should appear. */
		coords: { top: number; left: number } | null;
	}

	let { view, coords }: Props = $props();

	// ── Command helpers ────────────────────────────────────────────────────
	function cmd(command: (state: any, dispatch: any) => boolean, e: MouseEvent) {
		e.preventDefault(); // keep editor focus
		if (!view) return;
		command(view.state, view.dispatch);
		view.focus();
	}

	function isMarkActive(markType: (typeof schema.marks)[string]): boolean {
		if (!view) return false;
		const { from, to, empty } = view.state.selection;
		const fromNode = view.state.selection.$from;
		if (empty) return !!markType.isInSet(view.state.storedMarks ?? fromNode.marks());
		return view.state.doc.rangeHasMark(from, to, markType);
	}

	function isBlock(
		nodeType: (typeof schema.nodes)[string],
		attrs?: Record<string, unknown>
	): boolean {
		if (!view) return false;
		const node = view.state.selection.$from.node();
		if (!attrs) return node.type === nodeType;
		return node.type === nodeType && Object.entries(attrs).every(([k, v]) => node.attrs[k] === v);
	}

	// ── Position ───────────────────────────────────────────────────────────
	/** Keep toolbar inside the viewport horizontally (≥8px from edges). */
	const HALF_WIDTH = 152; // half of approx toolbar width
	const safeLeft = $derived(
		coords ? Math.max(HALF_WIDTH + 8, Math.min(coords.left, window.innerWidth - HALF_WIDTH - 8)) : 0
	);
	const safeTop = $derived(coords ? coords.top - 8 : 0); // 8px gap above selection
</script>

{#if view && coords}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		role="toolbar"
		aria-label="Text formatting"
		class="border-grey-700 bg-grey-900 shadow-grey-950 fixed z-[200] flex items-center gap-0.5 rounded border p-1 shadow-lg"
		style:top="{safeTop}px"
		style:left="{safeLeft}px"
		style:transform="translateY(-100%) translateX(-50%)"
	>
		<!-- Marks -->
		<button
			type="button"
			onmousedown={(e) => cmd(toggleMark(schema.marks.strong), e)}
			class="rounded px-2 py-1 text-xs font-bold transition {isMarkActive(schema.marks.strong)
				? 'bg-grey-700 text-viz-grey-light'
				: 'text-viz-grey-muted hover:bg-grey-800 hover:text-viz-grey-light'}"
			title="Bold (⌘B)">B</button
		>
		<button
			type="button"
			onmousedown={(e) => cmd(toggleMark(schema.marks.em), e)}
			class="rounded px-2 py-1 text-xs italic transition {isMarkActive(schema.marks.em)
				? 'bg-grey-700 text-viz-grey-light'
				: 'text-viz-grey-muted hover:bg-grey-800 hover:text-viz-grey-light'}"
			title="Italic (⌘I)">I</button
		>
		<button
			type="button"
			onmousedown={(e) => cmd(toggleMark(schema.marks.code), e)}
			class="rounded px-2 py-1 font-mono text-xs transition {isMarkActive(schema.marks.code)
				? 'bg-grey-700 text-viz-grey-light'
				: 'text-viz-grey-muted hover:bg-grey-800 hover:text-viz-grey-light'}"
			title="Inline code">`</button
		>

		<!-- Separator -->
		<div class="bg-grey-700 mx-0.5 h-4 w-px"></div>

		<!-- Block types -->
		<button
			type="button"
			onmousedown={(e) => cmd(setBlockType(schema.nodes.heading, { level: 2 }), e)}
			class="rounded px-2 py-1 text-xs font-semibold transition {isBlock(schema.nodes.heading, {
				level: 2
			})
				? 'bg-grey-700 text-viz-grey-light'
				: 'text-viz-grey-muted hover:bg-grey-800 hover:text-viz-grey-light'}"
			title="Heading 2">H2</button
		>
		<button
			type="button"
			onmousedown={(e) => cmd(setBlockType(schema.nodes.heading, { level: 3 }), e)}
			class="rounded px-2 py-1 text-xs font-semibold transition {isBlock(schema.nodes.heading, {
				level: 3
			})
				? 'bg-grey-700 text-viz-grey-light'
				: 'text-viz-grey-muted hover:bg-grey-800 hover:text-viz-grey-light'}"
			title="Heading 3">H3</button
		>
		<button
			type="button"
			onmousedown={(e) => cmd(setBlockType(schema.nodes.paragraph), e)}
			class="rounded px-2 py-1 text-xs transition {isBlock(schema.nodes.paragraph)
				? 'bg-grey-700 text-viz-grey-light'
				: 'text-viz-grey-muted hover:bg-grey-800 hover:text-viz-grey-light'}"
			title="Paragraph">¶</button
		>

		<!-- Separator -->
		<div class="bg-grey-700 mx-0.5 h-4 w-px"></div>

		<!-- Block wraps -->
		<button
			type="button"
			onmousedown={(e) => cmd(wrapIn(schema.nodes.blockquote), e)}
			class="text-viz-grey-muted hover:bg-grey-800 hover:text-viz-grey-light rounded px-2 py-1 text-xs transition"
			title="Blockquote">"</button
		>
		<button
			type="button"
			onmousedown={(e) => cmd(wrapInList(schema.nodes.bullet_list), e)}
			class="text-viz-grey-muted hover:bg-grey-800 hover:text-viz-grey-light rounded px-2 py-1 text-xs transition"
			title="Bullet list">•</button
		>
		<button
			type="button"
			onmousedown={(e) => cmd(wrapInList(schema.nodes.ordered_list), e)}
			class="text-viz-grey-muted hover:bg-grey-800 hover:text-viz-grey-light rounded px-2 py-1 text-xs transition"
			title="Ordered list">1.</button
		>
	</div>
{/if}
