<script lang="ts">
	import { dev } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';
	import { editMode } from './EditModeStore';
	import { panelStore } from './PanelStore';
	import {
		COLLECTION_FIELD_SPECS,
		collectionFromPath,
		validateFrontmatter
	} from '$lib/studio/contentSchemas';

	interface Props {
		filePath: string;
		frontmatter: Record<string, unknown>;
		getMarkdown: () => string;
		getFrontmatter: () => Record<string, unknown>;
		onFrontmatterChange: (updated: Record<string, unknown>) => void;
		/** og:image URL for social preview */
		socialImage?: string;
		/** Optional Svelte 5 snippet rendered as a collapsible "Card preview" section below the social image */
		previewCard?: import('svelte').Snippet;
	}

	let {
		filePath,
		frontmatter,
		getMarkdown,
		getFrontmatter,
		onFrontmatterChange,
		socialImage,
		previewCard
	}: Props = $props();

	// ── Schema ───────────────────────────────────────────────────
	const collection = $derived(collectionFromPath(filePath));
	const fieldSpecs = $derived(collection ? COLLECTION_FIELD_SPECS[collection] : {});

	// ── Panel state ──────────────────────────────────────────────
	let collapsed = $state(false);

	// Keep PanelStore in sync so the root layout can reserve space
	$effect(() => {
		panelStore.set(collapsed ? 'collapsed' : 'open');
	});
	onDestroy(() => panelStore.set('hidden'));

	// ── Edit state ───────────────────────────────────────────────
	const isEditing = $derived($editMode.isEditing && $editMode.filePath === filePath);
	const isDirty = $derived($editMode.isDirty);

	// ── Frontmatter local copy ───────────────────────────────────
	let localValues: Record<string, unknown> = $state({});
	let fieldErrors = $state<Record<string, string>>({});

	$effect(() => {
		localValues = { ...frontmatter };
	});

	function updateField(key: string, value: unknown) {
		localValues = { ...localValues, [key]: value };
		// Clear the error for this field as the user edits
		if (fieldErrors[key]) fieldErrors = { ...fieldErrors, [key]: '' };
		editMode.markDirty();
		onFrontmatterChange(localValues);
	}

	// ── Save / stage ─────────────────────────────────────────────
	let saving = $state(false);
	let saveStatus = $state<'idle' | 'saved' | 'staged' | 'error'>('idle');
	let errorMessage = $state<string | null>(null);
	let stagedCount = $state(0);

	// Load staged count on mount (prod only)
	onMount(() => {
		if (!dev) {
			fetch('/api/studio/staged')
				.then((r) => r.json())
				.then((d: { files?: string[] }) => {
					stagedCount = d.files?.length ?? 0;
				})
				.catch(() => {});
		}
	});

	async function save() {
		// Validate before sending
		const errors = validateFrontmatter(filePath, localValues);
		if (Object.keys(errors).length > 0) {
			fieldErrors = errors;
			return;
		}
		fieldErrors = {};

		saving = true;
		saveStatus = 'idle';
		errorMessage = null;

		const body = getMarkdown();
		const fm = getFrontmatter();

		try {
			const endpoint = dev ? '/api/studio/save' : '/api/studio/stage';
			const res = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ filePath, body, frontmatter: fm })
			});

			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				const serverError = (data as { error?: string }).error;
				errorMessage = serverError
					? `Save failed: ${serverError}`
					: `Save failed (HTTP ${res.status})`;
				saveStatus = 'error';
				return;
			}

			if (dev) {
				saveStatus = 'saved';
				editMode.startEdit(filePath); // reset dirty, stay in edit mode
			} else {
				const data = (await res.json()) as { stagedCount?: number };
				stagedCount = data.stagedCount ?? stagedCount + 1;
				saveStatus = 'staged';
				editMode.stopEdit(); // exit edit mode so publish UI appears
			}
		} catch {
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
		saveStatus = 'idle';
		fieldErrors = {};
	}

	// ── Display helpers ──────────────────────────────────────────
	const fileName = $derived(filePath.split('/').pop() ?? filePath);
	const fileDir = $derived(filePath.split('/').slice(0, -1).join('/'));
</script>

<!-- Collapsed strip — click anywhere to expand -->
{#if collapsed}
	<button
		type="button"
		onclick={() => (collapsed = false)}
		aria-label="Expand Studio panel"
		class="border-grey-800 bg-grey-900 text-viz-grey-muted hover:text-viz-grey-light fixed top-0 right-0 z-50 flex h-full w-11 cursor-pointer flex-col items-center border-l transition-colors"
	>
		<!-- Icon + vertical STUDIO label at top -->
		<span class="flex flex-col items-center gap-3 pt-4">
			<img src="/favicon.svg" alt="" class="h-6 w-6 opacity-70" />
			<span
				class="text-[9px] font-semibold uppercase"
				style="writing-mode: vertical-rl; letter-spacing: 0.4em; line-height: 1;"
			>
				STUDIO
			</span>
		</span>

		<!-- Expand chevron at bottom -->
		<svg
			class="mt-auto mb-4 h-4 w-4"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			aria-hidden="true"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
		</svg>

		{#if stagedCount > 0}
			<span
				class="bg-viz-yellow text-grey-900 absolute top-[4.5rem] flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"
			>
				{stagedCount}
			</span>
		{/if}
	</button>

	<!-- Full panel -->
{:else}
	<aside
		class="border-grey-800 bg-grey-900 text-viz-grey-light fixed top-0 right-0 z-50 flex h-full w-72 flex-col border-l"
	>
		<!-- Panel header -->
		<div class="border-grey-800 flex items-center justify-between border-b px-4 py-3">
			<a
				href="/studio"
				class="text-viz-grey-muted hover:text-viz-grey-light flex items-center gap-2 transition-colors"
				title="Go to Studio"
			>
				<img src="/favicon.svg" alt="" class="h-5 w-5 opacity-70" />
				<span class="text-xs font-semibold tracking-widest uppercase">Studio</span>
			</a>
			<button
				type="button"
				onclick={() => (collapsed = true)}
				class="text-viz-grey-muted hover:text-viz-grey-light flex h-6 w-6 items-center justify-center rounded transition-colors"
				aria-label="Collapse Studio panel"
				title="Collapse panel"
			>
				<svg
					class="h-4 w-4"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>

		<!-- File path -->
		<div class="border-grey-800 border-b px-4 py-3">
			<p class="text-viz-grey-muted mb-0.5 text-[10px] tracking-widest uppercase">{fileDir}/</p>
			<p class="text-viz-grey-light font-mono text-sm font-medium">{fileName}</p>
		</div>

		<!-- Edit / viewing state indicator -->
		<div class="border-grey-800 border-b px-4 py-3">
			<div class="flex items-center gap-2">
				{#if isEditing}
					<span
						class="h-2 w-2 flex-shrink-0 rounded-full {isDirty ? 'bg-amber-400' : 'bg-emerald-500'}"
					></span>
				{/if}
				<span class="text-viz-grey-muted text-xs">
					{#if isEditing}{isDirty ? 'Unsaved changes' : 'No changes'}{:else}Viewing{/if}
				</span>
			</div>
		</div>

		<!-- Scrollable body: frontmatter + previews -->
		<div class="flex-1 overflow-y-auto">
			<!-- Frontmatter fields -->
			<div class="border-grey-800 border-b px-4 py-3">
				<h3 class="text-viz-grey-muted mb-3 text-[10px] tracking-widest uppercase">Frontmatter</h3>
				{#each Object.entries(fieldSpecs) as [key, spec]}
					<div class="mb-3">
						<label class="text-viz-grey-muted mb-1 block text-xs font-medium" for="fm-{key}">
							{key}{spec.required ? '' : ' '}
							{#if !spec.required}<span class="text-[10px] opacity-50">(optional)</span>{/if}
						</label>

						{#if spec.type === 'checkbox'}
							<input
								id="fm-{key}"
								type="checkbox"
								checked={(localValues[key] as boolean) ?? (spec.default as boolean) ?? false}
								disabled={!isEditing}
								onchange={(e) => updateField(key, (e.target as HTMLInputElement).checked)}
								class="accent-viz-yellow h-4 w-4 disabled:opacity-50"
							/>
						{:else if spec.type === 'select'}
							<select
								id="fm-{key}"
								value={(localValues[key] as string) ?? ''}
								disabled={!isEditing}
								onchange={(e) =>
									updateField(key, (e.target as HTMLSelectElement).value || undefined)}
								class="border-grey-700 bg-grey-800 text-viz-grey-light focus:border-viz-yellow w-full rounded border px-2.5 py-1.5 text-xs focus:outline-none disabled:opacity-50
									{fieldErrors[key] ? 'border-red-500' : ''}"
							>
								{#if !spec.required}<option value="">— none —</option>{/if}
								{#each spec.options ?? [] as opt}
									<option value={opt}>{opt}</option>
								{/each}
							</select>
						{:else if spec.type === 'textarea'}
							<textarea
								id="fm-{key}"
								rows={spec.rows ?? 3}
								value={(localValues[key] as string) ?? ''}
								disabled={!isEditing}
								oninput={(e) => updateField(key, (e.target as HTMLTextAreaElement).value)}
								class="border-grey-700 bg-grey-800 text-viz-grey-light placeholder-grey-600 focus:border-viz-yellow w-full rounded border px-2.5 py-1.5 text-xs focus:outline-none disabled:opacity-50
									{fieldErrors[key] ? 'border-red-500' : ''}"
							></textarea>
						{:else}
							<input
								id="fm-{key}"
								type={spec.type === 'number' ? 'number' : 'text'}
								value={(localValues[key] as string | number) ?? ''}
								disabled={!isEditing}
								oninput={(e) =>
									updateField(
										key,
										spec.type === 'number'
											? Number((e.target as HTMLInputElement).value)
											: (e.target as HTMLInputElement).value
									)}
								class="border-grey-700 bg-grey-800 text-viz-grey-light focus:border-viz-yellow w-full rounded border px-2.5 py-1.5 text-xs focus:outline-none disabled:opacity-50
									{fieldErrors[key] ? 'border-red-500' : ''}"
							/>
						{/if}

						{#if fieldErrors[key]}
							<p class="mt-0.5 text-[10px] text-red-400">{fieldErrors[key]}</p>
						{/if}
					</div>
				{/each}

				<!-- Fallback: fields present in frontmatter but not in schema (read-only) -->
				{#each Object.keys(frontmatter).filter((k) => !fieldSpecs[k]) as key}
					<div class="mb-3 opacity-50">
						<span class="text-viz-grey-muted mb-1 block text-xs font-medium">{key}</span>
						<p
							class="border-grey-700 bg-grey-800 text-viz-grey-muted w-full rounded border px-2.5 py-1.5 font-mono text-xs"
						>
							{String(frontmatter[key]).slice(0, 60)}{String(frontmatter[key]).length > 60
								? '…'
								: ''}
						</p>
					</div>
				{/each}
			</div>

			<!-- Social og:image preview -->
			{#if socialImage}
				<div class="border-grey-800 border-b">
					<details class="group">
						<summary
							class="text-viz-grey-muted hover:text-viz-grey-light flex cursor-pointer list-none items-center justify-between px-4 py-2.5 text-[10px] font-semibold tracking-widest uppercase transition-colors"
						>
							Social preview
							<svg
								class="h-3 w-3 transition-transform group-open:rotate-180"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
							</svg>
						</summary>
						<div class="px-4 pb-3">
							<img
								src={socialImage}
								alt="Social preview"
								class="border-grey-700 w-full rounded border object-cover"
							/>
						</div>
					</details>
				</div>
			{/if}

			<!-- Card preview (passed as snippet by parent page) -->
			{#if previewCard}
				<div class="border-grey-800 border-b">
					<details class="group">
						<summary
							class="text-viz-grey-muted hover:text-viz-grey-light flex cursor-pointer list-none items-center justify-between px-4 py-2.5 text-[10px] font-semibold tracking-widest uppercase transition-colors"
						>
							Card preview
							<svg
								class="h-3 w-3 transition-transform group-open:rotate-180"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
							</svg>
						</summary>
						<div class="px-4 pb-3">
							{@render previewCard()}
						</div>
					</details>
				</div>
			{/if}
		</div>

		<!-- Footer actions -->
		<div class="border-grey-800 space-y-2 border-t px-4 py-3">
			{#if isEditing}
				<!-- Save status -->
				{#if saveStatus === 'error'}
					<p class="text-xs text-red-400">{errorMessage}</p>
				{:else if saveStatus === 'saved'}
					<p class="text-xs text-emerald-400">✓ Saved to disk</p>
				{:else if saveStatus === 'staged'}
					<p class="text-xs text-emerald-400">
						✓ Staged. <a href="/studio" class="underline">Go to Studio</a> to publish when ready.
					</p>
				{/if}

				<div class="flex gap-2">
					<button
						type="button"
						onclick={cancel}
						class="border-grey-700 text-viz-grey-muted hover:border-grey-600 hover:text-viz-grey-light flex-1 rounded border px-3 py-1.5 text-xs transition-colors"
					>
						Cancel
					</button>
					<button
						type="button"
						onclick={save}
						disabled={saving}
						class="bg-viz-yellow text-grey-900 relative flex-1 rounded px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
					>
						{#if isDirty}
							<span class="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-amber-500"></span>
						{/if}
						{saving ? 'Saving…' : 'Save'}
					</button>
				</div>
			{:else}
				<button
					type="button"
					onclick={() => {
						editMode.startEdit(filePath);
						saveStatus = 'idle';
					}}
					class="bg-viz-yellow text-grey-900 w-full rounded px-3 py-2 text-xs font-semibold transition-opacity hover:opacity-90"
				>
					Edit page
				</button>
			{/if}

			<!-- Staged nudge (prod only, when staged changes exist and not editing) -->
			{#if !dev && stagedCount > 0 && !isEditing}
				<a
					href="/studio"
					class="bg-viz-teal text-grey-900 mt-1 block w-full rounded px-3 py-2 text-center text-xs font-semibold transition-opacity hover:opacity-90"
				>
					{stagedCount} staged change{stagedCount !== 1 ? 's' : ''} — publish in Studio
				</a>
			{/if}
		</div>
	</aside>
{/if}
