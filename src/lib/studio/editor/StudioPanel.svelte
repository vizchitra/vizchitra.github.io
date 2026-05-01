<script lang="ts">
	import { dev } from '$app/environment';
	import { editMode } from './EditModeStore';

	interface Props {
		filePath: string;
		frontmatter: Record<string, unknown>;
		getMarkdown: () => string;
		getFrontmatter: () => Record<string, unknown>;
		onFrontmatterChange: (updated: Record<string, unknown>) => void;
	}

	let { filePath, frontmatter, getMarkdown, getFrontmatter, onFrontmatterChange }: Props = $props();

	// ── Panel state ──────────────────────────────────────────────
	let collapsed = $state(false);

	// ── Edit state ───────────────────────────────────────────────
	const isEditing = $derived($editMode.isEditing && $editMode.filePath === filePath);
	const isDirty = $derived($editMode.isDirty);

	// ── Frontmatter local copy ───────────────────────────────────
	let localValues: Record<string, unknown> = $state({});

	$effect(() => {
		localValues = { ...frontmatter };
	});

	function updateField(key: string, value: unknown) {
		localValues = { ...localValues, [key]: value };
		editMode.markDirty();
		onFrontmatterChange(localValues);
	}

	// ── Save / stage ─────────────────────────────────────────────
	let saving = $state(false);
	let saveStatus = $state<'idle' | 'saved' | 'staged' | 'error'>('idle');
	let errorMessage = $state<string | null>(null);
	let stagedCount = $state(0);

	// Load staged count on mount (prod only)
	$effect(() => {
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
				errorMessage = (data as { error?: string }).error ?? 'Save failed';
				saveStatus = 'error';
				return;
			}

			if (dev) {
				saveStatus = 'saved';
			} else {
				const data = (await res.json()) as { stagedCount?: number };
				stagedCount = data.stagedCount ?? stagedCount + 1;
				saveStatus = 'staged';
			}
			editMode.startEdit(filePath); // reset dirty
		} catch {
			errorMessage = 'Network error — please try again';
			saveStatus = 'error';
		} finally {
			saving = false;
		}
	}

	// ── Publish ──────────────────────────────────────────────────
	let publishing = $state(false);
	let publishStatus = $state<'idle' | 'done' | 'error'>('idle');
	let prUrl = $state<string | null>(null);
	let publishMessage = $state('');

	async function publish() {
		if (!publishMessage.trim()) {
			alert('Please add a description for the pull request.');
			return;
		}
		publishing = true;
		publishStatus = 'idle';
		try {
			const res = await fetch('/api/studio/publish', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: publishMessage })
			});
			if (!res.ok) throw new Error('Publish failed');
			const data = (await res.json()) as { prUrl: string };
			prUrl = data.prUrl;
			publishStatus = 'done';
			stagedCount = 0;
			publishMessage = '';
		} catch {
			publishStatus = 'error';
		} finally {
			publishing = false;
		}
	}

	function cancel() {
		if ($editMode.isDirty) {
			if (!confirm('You have unsaved changes. Discard them?')) return;
		}
		editMode.stopEdit();
		saveStatus = 'idle';
	}

	// ── Display helpers ──────────────────────────────────────────
	const fileName = $derived(filePath.split('/').pop() ?? filePath);
	const fileDir = $derived(filePath.split('/').slice(0, -1).join('/'));

	function fieldType(value: unknown): 'checkbox' | 'textarea' | 'number' | 'text' {
		if (typeof value === 'boolean') return 'checkbox';
		if (typeof value === 'number') return 'number';
		if (typeof value === 'string' && value.length > 60) return 'textarea';
		return 'text';
	}
</script>

<!-- Collapsed strip -->
{#if collapsed}
	<div
		class="border-grey-800 bg-grey-900 fixed top-0 right-0 z-50 flex h-full w-10 flex-col items-center border-l pt-4"
	>
		<button
			type="button"
			onclick={() => (collapsed = false)}
			class="text-viz-grey-muted hover:text-viz-grey-light flex h-8 w-8 items-center justify-center rounded transition-colors"
			aria-label="Expand Studio panel"
			title="Expand panel"
		>
			<svg
				class="h-4 w-4"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				aria-hidden="true"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
			</svg>
		</button>
		{#if stagedCount > 0}
			<span
				class="bg-viz-yellow text-grey-900 mt-3 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"
			>
				{stagedCount}
			</span>
		{/if}
	</div>

	<!-- Full panel -->
{:else}
	<aside
		class="border-grey-800 bg-grey-900 text-viz-grey-light fixed top-0 right-0 z-50 flex h-full w-72 flex-col border-l"
	>
		<!-- Panel header -->
		<div class="border-grey-800 flex items-center justify-between border-b px-4 py-3">
			<span class="text-viz-grey-muted text-xs font-semibold tracking-widest uppercase">Studio</span
			>
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
			{#if isEditing}
				<div class="flex items-center gap-2">
					<span class="h-2 w-2 rounded-full {isDirty ? 'bg-amber-400' : 'bg-emerald-500'}"></span>
					<span class="text-viz-grey-muted text-xs"
						>{isDirty ? 'Unsaved changes' : 'No changes'}</span
					>
				</div>
			{:else}
				<span class="text-viz-grey-muted text-xs">Viewing</span>
			{/if}
		</div>

		<!-- Scrollable body: frontmatter + toolbar -->
		<div class="flex-1 overflow-y-auto">
			<!-- Frontmatter fields -->
			<div class="border-grey-800 border-b px-4 py-3">
				<h3 class="text-viz-grey-muted mb-3 text-[10px] tracking-widest uppercase">Frontmatter</h3>
				{#each Object.entries(frontmatter) as [key, value]}
					<div class="mb-3">
						<label class="text-viz-grey-muted mb-1 block text-xs font-medium" for="fm-{key}"
							>{key}</label
						>
						{#if fieldType(value) === 'checkbox'}
							<input
								id="fm-{key}"
								type="checkbox"
								checked={localValues[key] as boolean}
								disabled={!isEditing}
								onchange={(e) => updateField(key, (e.target as HTMLInputElement).checked)}
								class="accent-viz-yellow h-4 w-4 disabled:opacity-50"
							/>
						{:else if fieldType(value) === 'textarea'}
							<textarea
								id="fm-{key}"
								rows={3}
								value={localValues[key] as string}
								disabled={!isEditing}
								oninput={(e) => updateField(key, (e.target as HTMLTextAreaElement).value)}
								class="border-grey-700 bg-grey-800 text-viz-grey-light placeholder-grey-600 focus:border-viz-yellow w-full rounded border px-2.5 py-1.5 text-xs focus:outline-none disabled:opacity-50"
							></textarea>
						{:else}
							<input
								id="fm-{key}"
								type={fieldType(value) === 'number' ? 'number' : 'text'}
								value={localValues[key] as string | number}
								disabled={!isEditing}
								oninput={(e) =>
									updateField(
										key,
										fieldType(value) === 'number'
											? Number((e.target as HTMLInputElement).value)
											: (e.target as HTMLInputElement).value
									)}
								class="border-grey-700 bg-grey-800 text-viz-grey-light focus:border-viz-yellow w-full rounded border px-2.5 py-1.5 text-xs focus:outline-none disabled:opacity-50"
							/>
						{/if}
					</div>
				{/each}
			</div>
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
						✓ Staged — {stagedCount} file{stagedCount !== 1 ? 's' : ''} pending
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

			<!-- Publish (prod only, when staged changes exist) -->
			{#if !dev && stagedCount > 0 && !isEditing}
				<div class="mt-1 space-y-1.5">
					<textarea
						bind:value={publishMessage}
						placeholder="Describe your changes…"
						rows={2}
						class="border-grey-700 bg-grey-800 text-viz-grey-light placeholder-grey-600 focus:border-viz-teal w-full rounded border px-2.5 py-1.5 text-xs focus:outline-none"
					></textarea>
					{#if publishStatus === 'done' && prUrl}
						<a
							href={prUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="block text-center text-xs text-emerald-400 underline">✓ PR opened →</a
						>
					{:else if publishStatus === 'error'}
						<p class="text-xs text-red-400">Publish failed — try again</p>
					{/if}
					<button
						type="button"
						onclick={publish}
						disabled={publishing}
						class="bg-viz-teal text-grey-900 w-full rounded px-3 py-2 text-xs font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
					>
						{publishing
							? 'Publishing…'
							: `Publish ${stagedCount} change${stagedCount !== 1 ? 's' : ''}`}
					</button>
				</div>
			{/if}
		</div>
	</aside>
{/if}
