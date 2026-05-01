<script lang="ts">
	import { editMode } from './EditModeStore';
	import { dev } from '$app/environment';

	interface Props {
		filePath: string;
		getMarkdown: () => string;
		getFrontmatter: () => Record<string, unknown>;
	}

	let { filePath, getMarkdown, getFrontmatter }: Props = $props();

	let saving = $state(false);
	let saveStatus = $state<'idle' | 'saved' | 'error'>('idle');
	let prUrl = $state<string | null>(null);
	let errorMessage = $state<string | null>(null);

	const isDirty = $derived($editMode.isDirty);

	async function save() {
		saving = true;
		saveStatus = 'idle';
		prUrl = null;
		errorMessage = null;

		const body = getMarkdown();
		const frontmatter = getFrontmatter();
		const endpoint = dev ? '/api/studio/save' : '/api/studio/pr';

		try {
			const res = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ filePath, body, frontmatter })
			});

			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				errorMessage = (data as { error?: string }).error ?? 'Save failed';
				saveStatus = 'error';
				return;
			}

			const data = (await res.json()) as { prUrl?: string };
			prUrl = data.prUrl ?? null;
			saveStatus = 'saved';
			// Reset dirty flag after successful save
			editMode.startEdit(filePath);
		} catch (e) {
			errorMessage = 'Network error — please try again';
			saveStatus = 'error';
		} finally {
			saving = false;
		}
	}

	function cancel() {
		if ($editMode.isDirty) {
			if (!confirm('You have unsaved changes. Discard them?')) return;
		}
		editMode.stopEdit();
	}
</script>

<div
	class="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-blue-200 bg-blue-50 px-4 py-2.5 text-sm"
>
	<div class="flex items-center gap-3 overflow-hidden">
		<span class="font-medium text-blue-900">Editing</span>
		<code class="truncate rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-800">{filePath}</code>
	</div>

	<div class="flex items-center gap-2">
		{#if saveStatus === 'saved' && prUrl}
			<a
				href={prUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="text-xs text-green-700 underline"
			>
				✓ PR opened
			</a>
		{:else if saveStatus === 'saved'}
			<span class="text-xs text-green-700">✓ Saved</span>
		{:else if saveStatus === 'error'}
			<span class="text-xs text-red-600" title={errorMessage ?? ''}>✗ {errorMessage}</span>
		{/if}

		<button
			type="button"
			onclick={cancel}
			class="rounded px-3 py-1.5 text-gray-600 hover:bg-blue-100"
		>
			Cancel
		</button>

		<button
			type="button"
			onclick={save}
			disabled={saving}
			class="relative flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
		>
			{#if isDirty}
				<span
					class="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-amber-400"
					title="Unsaved changes"
				></span>
			{/if}
			{saving ? 'Saving…' : 'Save'}
		</button>
	</div>
</div>
