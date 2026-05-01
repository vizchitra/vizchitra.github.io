<script lang="ts">
	import { editMode } from './EditModeStore';

	interface FieldEntry {
		key: string;
		value: unknown;
	}

	interface Props {
		frontmatter: Record<string, unknown>;
		onchange: (updated: Record<string, unknown>) => void;
	}

	let { frontmatter, onchange }: Props = $props();

	const fields: FieldEntry[] = $derived(
		Object.entries(frontmatter).map(([key, value]) => ({ key, value }))
	);

	let localValues: Record<string, unknown> = $state({});

	$effect(() => {
		localValues = { ...frontmatter };
	});

	function update(key: string, value: unknown) {
		localValues = { ...localValues, [key]: value };
		editMode.markDirty();
		onchange(localValues);
	}

	function inputType(value: unknown): string {
		if (typeof value === 'number') return 'number';
		return 'text';
	}

	let isOpen = $state(false);
</script>

<!-- Toggle button (visible when editor is active) -->
<button
	type="button"
	onclick={() => (isOpen = !isOpen)}
	class="fixed top-14 right-4 z-50 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-gray-50"
>
	{isOpen ? '✕ Frontmatter' : '⚙ Frontmatter'}
</button>

<!-- Drawer -->
{#if isOpen}
	<aside
		class="fixed top-0 right-0 z-40 flex h-full w-80 flex-col border-l border-gray-200 bg-white pt-24 shadow-xl"
	>
		<div class="border-b border-gray-100 px-5 py-3">
			<h2 class="text-sm font-semibold text-gray-900">Frontmatter</h2>
		</div>
		<div class="flex-1 overflow-y-auto px-5 py-4">
			{#each fields as field}
				<div class="mb-4">
					<label class="mb-1 block text-xs font-medium text-gray-600" for="fm-{field.key}">
						{field.key}
					</label>
					{#if typeof field.value === 'boolean'}
						<input
							id="fm-{field.key}"
							type="checkbox"
							checked={localValues[field.key] as boolean}
							onchange={(e) => update(field.key, (e.target as HTMLInputElement).checked)}
							class="h-4 w-4 rounded border-gray-300 text-blue-600"
						/>
					{:else if typeof field.value === 'string' && field.value.length > 80}
						<textarea
							id="fm-{field.key}"
							rows={3}
							value={localValues[field.key] as string}
							oninput={(e) => update(field.key, (e.target as HTMLTextAreaElement).value)}
							class="w-full rounded border border-gray-200 px-2.5 py-1.5 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-300 focus:outline-none"
						></textarea>
					{:else}
						<input
							id="fm-{field.key}"
							type={inputType(field.value)}
							value={localValues[field.key] as string | number}
							oninput={(e) =>
								update(
									field.key,
									inputType(field.value) === 'number'
										? parseFloat((e.target as HTMLInputElement).value)
										: (e.target as HTMLInputElement).value
								)}
							class="w-full rounded border border-gray-200 px-2.5 py-1.5 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-300 focus:outline-none"
						/>
					{/if}
				</div>
			{/each}
		</div>
	</aside>
{/if}
