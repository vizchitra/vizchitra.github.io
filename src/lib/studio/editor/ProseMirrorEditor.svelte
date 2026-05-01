<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { EditorState } from 'prosemirror-state';
	import { EditorView } from 'prosemirror-view';
	import { schema, defaultMarkdownParser, defaultMarkdownSerializer } from 'prosemirror-markdown';
	import { history, undo, redo } from 'prosemirror-history';
	import { keymap } from 'prosemirror-keymap';
	import { baseKeymap, toggleMark, setBlockType, wrapIn } from 'prosemirror-commands';
	import { wrapInList, splitListItem, liftListItem, sinkListItem } from 'prosemirror-schema-list';
	import { inputRules, wrappingInputRule, textblockTypeInputRule } from 'prosemirror-inputrules';
	import { editMode } from './EditModeStore';

	interface Props {
		markdown: string;
		filePath: string;
	}

	let { markdown, filePath }: Props = $props();

	let editorEl: HTMLDivElement;
	let view: EditorView | null = null;

	// Input rules for auto-formatting
	function buildInputRules() {
		return inputRules({
			rules: [
				// Blockquote: "> "
				wrappingInputRule(/^\s*>\s$/, schema.nodes.blockquote),
				// Bullet list: "- " or "* "
				wrappingInputRule(/^\s*([-*])\s$/, schema.nodes.bullet_list),
				// Ordered list: "1. "
				wrappingInputRule(/^(\d+)\.\s$/, schema.nodes.ordered_list, (match) => ({
					order: +match[1]
				})),
				// H1–H3 via # syntax
				textblockTypeInputRule(/^(#{1,3})\s$/, schema.nodes.heading, (match) => ({
					level: match[1].length
				})),
				// Code block: ```
				textblockTypeInputRule(/^```$/, schema.nodes.code_block)
			]
		});
	}

	function buildKeymap() {
		return keymap({
			...baseKeymap,
			'Mod-z': undo,
			'Mod-y': redo,
			'Shift-Mod-z': redo,
			'Mod-b': toggleMark(schema.marks.strong),
			'Mod-i': toggleMark(schema.marks.em),
			'Mod-`': setBlockType(schema.nodes.code_block),
			Enter: splitListItem(schema.nodes.list_item),
			Tab: sinkListItem(schema.nodes.list_item),
			'Shift-Tab': liftListItem(schema.nodes.list_item)
		});
	}

	/** Get the current markdown content from the editor */
	export function getMarkdown(): string {
		if (!view) return markdown;
		return defaultMarkdownSerializer.serialize(view.state.doc);
	}

	onMount(() => {
		const doc = defaultMarkdownParser.parse(markdown);
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
				if (tr.docChanged) {
					editMode.markDirty();
				}
			}
		});

		// Expose getMarkdown on the element for parent access
		(editorEl as HTMLDivElement & { getMarkdown: () => string }).getMarkdown = getMarkdown;
	});

	onDestroy(() => {
		view?.destroy();
		view = null;
	});
</script>

<div
	bind:this={editorEl}
	class="prosemirror-editor prose prose-gray min-h-[200px] max-w-none rounded-lg border border-blue-300 bg-white p-6 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
></div>

<style>
	:global(.prosemirror-editor .ProseMirror) {
		outline: none;
		min-height: 200px;
	}
	:global(.prosemirror-editor .ProseMirror p) {
		margin: 0.75rem 0;
	}
	:global(.prosemirror-editor .ProseMirror h1) {
		font-size: 1.75rem;
		font-weight: 700;
		margin: 1.25rem 0 0.5rem;
	}
	:global(.prosemirror-editor .ProseMirror h2) {
		font-size: 1.4rem;
		font-weight: 700;
		margin: 1.1rem 0 0.5rem;
	}
	:global(.prosemirror-editor .ProseMirror h3) {
		font-size: 1.2rem;
		font-weight: 600;
		margin: 1rem 0 0.5rem;
	}
	:global(.prosemirror-editor .ProseMirror blockquote) {
		border-left: 3px solid #d1d5db;
		padding-left: 1rem;
		color: #6b7280;
		margin: 0.75rem 0;
	}
	:global(.prosemirror-editor .ProseMirror ul, .prosemirror-editor .ProseMirror ol) {
		padding-left: 1.5rem;
	}
	:global(.prosemirror-editor .ProseMirror li) {
		margin: 0.25rem 0;
	}
	:global(.prosemirror-editor .ProseMirror strong) {
		font-weight: 700;
	}
	:global(.prosemirror-editor .ProseMirror em) {
		font-style: italic;
	}
	:global(.prosemirror-editor .ProseMirror code) {
		background: #f3f4f6;
		border-radius: 3px;
		padding: 0.1em 0.3em;
		font-size: 0.9em;
	}
	:global(.prosemirror-editor .ProseMirror pre) {
		background: #f3f4f6;
		border-radius: 6px;
		padding: 0.75rem 1rem;
		overflow-x: auto;
	}
	:global(.prosemirror-editor .ProseMirror hr) {
		border: none;
		border-top: 2px solid #e5e7eb;
		margin: 1.5rem 0;
	}
</style>
