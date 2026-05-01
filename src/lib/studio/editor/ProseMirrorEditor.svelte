<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { EditorState } from 'prosemirror-state';
	import { EditorView } from 'prosemirror-view';
	import { history, undo, redo } from 'prosemirror-history';
	import { keymap } from 'prosemirror-keymap';
	import { baseKeymap, toggleMark, chainCommands, setBlockType } from 'prosemirror-commands';
	import { wrapInList, splitListItem, liftListItem, sinkListItem } from 'prosemirror-schema-list';
	import { inputRules, wrappingInputRule, textblockTypeInputRule } from 'prosemirror-inputrules';
	import { Prose } from '$lib/components/typography';
	import FloatingToolbar from './FloatingToolbar.svelte';
	import { editorSchema as schema } from './editorSchema';
	import { parseMarkdown, editorSerializer } from './markdownUtils';
	import { editMode } from './EditModeStore';

	interface Props {
		markdown: string;
		filePath: string;
		onViewReady?: (v: EditorView | null) => void;
	}

	let { markdown, filePath, onViewReady }: Props = $props();

	let editorEl: HTMLDivElement;
	let view: EditorView | null = null;

	// ── Floating toolbar state ─────────────────────────────────────────────
	let toolbarCoords = $state<{ top: number; left: number } | null>(null);
	let toolbarView = $state<EditorView | null>(null);

	// ── Input rules ────────────────────────────────────────────────────────
	function buildInputRules() {
		return inputRules({
			rules: [
				wrappingInputRule(/^\s*>\s$/, schema.nodes.blockquote),
				wrappingInputRule(/^\s*([-*])\s$/, schema.nodes.bullet_list),
				wrappingInputRule(/^(\d+)\.\s$/, schema.nodes.ordered_list, (match) => ({
					order: +match[1]
				})),
				textblockTypeInputRule(/^(#{1,3})\s$/, schema.nodes.heading, (match) => ({
					level: match[1].length
				})),
				textblockTypeInputRule(/^```$/, schema.nodes.code_block)
			]
		});
	}

	// ── Keymap ─────────────────────────────────────────────────────────────
	function buildKeymap() {
		return keymap({
			...baseKeymap,
			'Mod-z': undo,
			'Mod-y': redo,
			'Shift-Mod-z': redo,
			'Mod-b': toggleMark(schema.marks.strong),
			'Mod-i': toggleMark(schema.marks.em),
			'Mod-`': setBlockType(schema.nodes.code_block),
			// splitListItem first (inside lists), baseKeymap.Enter elsewhere
			Enter: chainCommands(splitListItem(schema.nodes.list_item), baseKeymap.Enter),
			Tab: sinkListItem(schema.nodes.list_item),
			'Shift-Tab': liftListItem(schema.nodes.list_item)
		});
	}

	// ── Toolbar position tracking ──────────────────────────────────────────
	function updateToolbarCoords(v: EditorView) {
		const { selection } = v.state;
		if (selection.empty) {
			toolbarCoords = null;
			return;
		}
		try {
			const start = v.coordsAtPos(selection.from);
			const end = v.coordsAtPos(selection.to);
			toolbarCoords = {
				top: start.top,
				left: (start.left + end.left) / 2
			};
		} catch {
			toolbarCoords = null;
		}
	}

	// ── Public API ──────────────────────────────────────────────────────────
	export function getMarkdown(): string {
		if (!view) return markdown;
		return editorSerializer.serialize(view.state.doc);
	}

	// ── Mount / destroy ────────────────────────────────────────────────────
	onMount(() => {
		const doc = parseMarkdown(markdown);
		const state = EditorState.create({
			doc,
			plugins: [history(), buildKeymap(), buildInputRules()]
		});

		view = new EditorView(editorEl, {
			state,
			dispatchTransaction(tr) {
				if (!view) return;
				const newState = view.state.apply(tr);
				view.updateState(newState);
				if (tr.docChanged) editMode.markDirty();
				updateToolbarCoords(view);
			}
		});

		// Also update toolbar on mouseup (catches click-drag selections)
		editorEl.addEventListener('mouseup', () =>
			setTimeout(() => view && updateToolbarCoords(view), 0)
		);
		// Hide toolbar while scrolling
		window.addEventListener(
			'scroll',
			() => {
				toolbarCoords = null;
			},
			{
				passive: true,
				capture: true
			}
		);

		toolbarView = view;
		onViewReady?.(view);
	});

	onDestroy(() => {
		view?.destroy();
		view = null;
		toolbarView = null;
		toolbarCoords = null;
		onViewReady?.(null);
	});
</script>

<!-- Floating selection toolbar (fixed-positioned, appears above selection) -->
<FloatingToolbar view={toolbarView} coords={toolbarCoords} />

<!--
  Wrap with <Prose> so ProseMirror's DOM output is styled identically to the
  published page (Cairo headings, en-dash list markers, blockquote border, etc.)
  max-w-none overrides Prose's 65ch cap — layout width is set by <Container>.
-->
<Prose class="max-w-none">
	<div bind:this={editorEl} class="prosemirror-editor min-h-[300px]"></div>
</Prose>

<style>
	/* ProseMirror resets its own outline — Prose/Container handle focus */
	:global(.prosemirror-editor .ProseMirror) {
		outline: none;
	}

	/*
	  Prose.svelte's vertical rhythm rules use `& > * + *` (direct child).
	  ProseMirror inserts an extra `.prosemirror-editor > .ProseMirror` wrapper,
	  so the direct-child selectors don't reach the content. We mirror them here
	  so editor spacing matches the published page exactly.
	*/

	/* A. General stack */
	:global(.prosemirror-editor .ProseMirror > * + *) {
		margin-top: var(--space-flow-0);
	}

	/* B. Extra room before headings */
	:global(.prosemirror-editor .ProseMirror > * + :is(h1, h2, h3, h4)) {
		margin-top: var(--space-flow-3);
	}
	:global(.prosemirror-editor .ProseMirror > * + :is(h5, h6)) {
		margin-top: var(--space-flow-2);
	}

	/* C. Tighten gap after headings */
	:global(
		.prosemirror-editor .ProseMirror h1 + *,
		.prosemirror-editor .ProseMirror h2 + *,
		.prosemirror-editor .ProseMirror h3 + *
	) {
		margin-top: var(--space-flow--1);
	}

	/* D. Even tighter for H1 → lead paragraph */
	:global(.prosemirror-editor .ProseMirror h1 + p) {
		margin-top: var(--space-flow--2);
	}

	/* E. Blockquote after headings gets balanced spacing */
	:global(
		.prosemirror-editor .ProseMirror h1 + blockquote,
		.prosemirror-editor .ProseMirror h2 + blockquote,
		.prosemirror-editor .ProseMirror h3 + blockquote
	) {
		margin-top: var(--space-flow-1);
	}

	/* Opaque read-only raw blocks: tables and directives */
	:global(.prosemirror-editor .ProseMirror .pm-raw-block) {
		display: block;
		padding: 0.4rem 0.75rem;
		margin: 0.75rem 0;
		border-radius: 4px;
		font-family: var(--font-fira, monospace);
		font-size: 0.8rem;
		line-height: 1.4;
		cursor: not-allowed;
		user-select: none;
		background-color: color-mix(in oklch, var(--color-grey-100, #f3f4f6), transparent 40%);
		border: 1px dashed var(--color-grey-400, #9ca3af);
		color: var(--color-grey-500, #6b7280);
	}

	:global(.prosemirror-editor .ProseMirror .pm-raw-block.ProseMirror-selectednode) {
		outline: 2px solid oklch(76% 0.11 82); /* viz-yellow */
		outline-offset: 1px;
	}
</style>
