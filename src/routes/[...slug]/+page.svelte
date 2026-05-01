<script lang="ts">
	import type { PageData } from './$types';
	import { Prose } from '$lib/components/typography';
	import { Container } from '$lib/components/layout';
	import { Header } from '$lib/components/structure';
	import { onMount } from 'svelte';
	import { editMode } from '$lib/studio/editor/EditModeStore';
	import ProseMirrorEditor from '$lib/studio/editor/ProseMirrorEditor.svelte';
	import EditorToolbar from '$lib/studio/editor/EditorToolbar.svelte';
	import FrontmatterDrawer from '$lib/studio/editor/FrontmatterDrawer.svelte';
	import EditBar from '$lib/studio/editor/EditBar.svelte';

	let { data }: { data: PageData } = $props();
	const color = $derived(data.document.color ?? 'grey');
	const banner = $derived(data.document.banner ?? 'curve');

	let isAuthed = $state(false);
	let editorRef: ProseMirrorEditor | null = $state(null);
	let currentFrontmatter = $state<Record<string, unknown>>({});

	onMount(async () => {
		// Initialise frontmatter from server-parsed data
		currentFrontmatter = { ...data.parsedFrontmatter };

		// Check auth silently — edit button only shown after hydration
		try {
			const res = await fetch('/api/studio/me');
			if (res.ok) isAuthed = true;
		} catch {
			// Not authed or network error — stay hidden
		}

		// Warn on navigation away with unsaved changes
		const beforeUnload = (e: BeforeUnloadEvent) => {
			if ($editMode.isDirty) {
				e.preventDefault();
			}
		};
		window.addEventListener('beforeunload', beforeUnload);
		return () => window.removeEventListener('beforeunload', beforeUnload);
	});

	const isEditing = $derived($editMode.isEditing && $editMode.filePath === data.contentPath);

	function startEdit() {
		editMode.startEdit(data.contentPath);
	}

	function getMarkdown(): string {
		return editorRef?.getMarkdown() ?? data.bodyContent ?? '';
	}

	function getFrontmatter(): Record<string, unknown> {
		return currentFrontmatter;
	}

	function onFrontmatterChange(updated: Record<string, unknown>) {
		currentFrontmatter = updated;
	}
</script>

{#if isEditing}
	<EditBar filePath={data.contentPath} {getMarkdown} {getFrontmatter} />
	<FrontmatterDrawer {frontmatter} onchange={onFrontmatterChange} />
{/if}

{#if data.document.banner}
	<Header {color} {banner} />
{/if}

<Container>
	{#if isEditing}
		<div class="mt-4 pt-12">
			<EditorToolbar view={null} />
			<div class="mt-3">
				<ProseMirrorEditor
					bind:this={editorRef}
					markdown={data.bodyContent ?? ''}
					filePath={data.contentPath}
				/>
			</div>
		</div>
	{:else}
		<Prose color={data.document.color}>
			{@html data.document.html}
		</Prose>
	{/if}
</Container>

{#if isAuthed && !isEditing}
	<button
		type="button"
		onclick={startEdit}
		class="fixed right-6 bottom-6 z-40 flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
		aria-label="Edit this page"
	>
		<svg
			class="h-4 w-4"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			aria-hidden="true"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z"
			/>
		</svg>
		Edit
	</button>
{/if}
