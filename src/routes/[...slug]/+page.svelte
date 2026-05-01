<script lang="ts">
	import type { PageData } from './$types';
	import { Prose } from '$lib/components/typography';
	import { Container } from '$lib/components/layout';
	import { Header } from '$lib/components/structure';
	import { onMount } from 'svelte';
	import { editMode } from '$lib/studio/editor/EditModeStore';
	import ProseMirrorEditor from '$lib/studio/editor/ProseMirrorEditor.svelte';
	import StudioPanel from '$lib/studio/editor/StudioPanel.svelte';

	let { data }: { data: PageData } = $props();
	const color = $derived(data.document.color ?? 'grey');
	const banner = $derived(data.document.banner ?? 'curve');

	let isAuthed = $state(false);
	let editorRef: ProseMirrorEditor | null = $state(null);
	let currentFrontmatter = $state<Record<string, unknown>>({});

	onMount(async () => {
		currentFrontmatter = { ...data.parsedFrontmatter };

		try {
			const res = await fetch('/api/studio/me');
			if (res.ok) isAuthed = true;
		} catch {
			// Not authed — panel stays hidden
		}

		const beforeUnload = (e: BeforeUnloadEvent) => {
			if ($editMode.isDirty) e.preventDefault();
		};
		window.addEventListener('beforeunload', beforeUnload);
		return () => window.removeEventListener('beforeunload', beforeUnload);
	});

	const isEditing = $derived($editMode.isEditing && $editMode.filePath === data.contentPath);

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

{#if isAuthed}
	<StudioPanel
		filePath={data.contentPath}
		frontmatter={currentFrontmatter}
		{getMarkdown}
		{getFrontmatter}
		{onFrontmatterChange}
	/>
{/if}

{#if data.document.banner}
	<Header {color} {banner} />
{/if}

<Container>
	{#if isEditing}
		<ProseMirrorEditor
			bind:this={editorRef}
			markdown={data.bodyContent ?? ''}
			filePath={data.contentPath}
			{color}
		/>
	{:else}
		<Prose color={data.document.color}>
			{@html data.document.html}
		</Prose>
	{/if}
</Container>
