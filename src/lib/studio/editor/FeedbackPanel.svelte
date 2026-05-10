<script lang="ts">
	import { dev } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';
	import { panelStore } from './PanelStore';

	const STATUSES = ['Under Review', 'Selected', 'Not Proceeding'] as const;
	type Status = (typeof STATUSES)[number];

	interface Props {
		submissionType: 'cfp' | 'cfe';
		id: string;
		initialStatus: string;
		status: string;
		onStatusChange: (s: string) => void;
		getNotes: () => string;
	}

	let { submissionType, id, initialStatus, status, onStatusChange, getNotes }: Props = $props();

	// ── Panel state ──────────────────────────────────────────────
	let collapsed = $state(false);

	$effect(() => {
		panelStore.set(collapsed ? 'collapsed' : 'open');
	});
	onDestroy(() => panelStore.set('hidden'));

	// ── Feedback state ───────────────────────────────────────────
	let dirty = $state(false);
	let saving = $state(false);
	let saveStatus = $state<'idle' | 'staged' | 'error'>('idle');
	let stagedCount = $state(0);
	let errorMessage = $state<string | null>(null);

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

	function setStatus(s: string) {
		onStatusChange(s);
		dirty = true;
		saveStatus = 'idle';
	}

	async function save() {
		saving = true;
		saveStatus = 'idle';
		errorMessage = null;
		try {
			const res = await fetch('/api/studio/feedback', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ type: submissionType, id, status, notes: getNotes() })
			});
			if (!res.ok) throw new Error('Save failed');
			const data = (await res.json()) as { stagedCount?: number };
			stagedCount = data.stagedCount ?? stagedCount + 1;
			saveStatus = 'staged';
			dirty = false;
		} catch {
			saveStatus = 'error';
			errorMessage = 'Save failed — try again';
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

	const filePath = `content/2026/feedback/${submissionType}.json`;
</script>

<!-- Collapsed strip -->
{#if collapsed}
	<button
		type="button"
		onclick={() => (collapsed = false)}
		aria-label="Expand Studio panel"
		class="border-grey-800 bg-grey-900 text-viz-grey-muted hover:text-viz-grey-light fixed top-0 right-0 z-50 flex h-full w-11 cursor-pointer flex-col items-center border-l transition-colors"
	>
		<span class="flex flex-col items-center gap-3 pt-4">
			<img src="/favicon.svg" alt="" class="h-6 w-6 opacity-70" />
			<span
				class="text-[9px] font-semibold uppercase"
				style="writing-mode: vertical-rl; letter-spacing: 0.4em; line-height: 1;"
			>
				STUDIO
			</span>
		</span>
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
			<p class="text-viz-grey-muted mb-0.5 text-[10px] tracking-widest uppercase">
				content/2026/feedback/
			</p>
			<p class="text-viz-grey-light font-mono text-sm font-medium">{submissionType}.json</p>
		</div>

		<!-- Dirty indicator -->
		<div class="border-grey-800 border-b px-4 py-3">
			<div class="flex items-center gap-2">
				<span class="h-2 w-2 flex-shrink-0 rounded-full {dirty ? 'bg-amber-400' : 'bg-emerald-500'}"
				></span>
				<span class="text-viz-grey-muted text-xs">
					{dirty ? 'Unsaved changes' : 'No changes'}
				</span>
			</div>
		</div>

		<!-- Scrollable body: fields -->
		<div class="flex-1 overflow-y-auto">
			<div class="border-grey-800 border-b px-4 py-4">
				<h3 class="text-viz-grey-muted mb-3 text-[10px] tracking-widest uppercase">Feedback</h3>

				<!-- Submission ID (read-only) -->
				<div class="mb-3 opacity-50">
					<span class="text-viz-grey-muted mb-1 block text-xs font-medium">id</span>
					<p
						class="border-grey-700 bg-grey-800 text-viz-grey-muted w-full rounded border px-2.5 py-1.5 font-mono text-xs"
					>
						{id}
					</p>
				</div>

				<!-- Status select -->
				<div class="mb-3">
					<label class="text-viz-grey-muted mb-1 block text-xs font-medium" for="feedback-status">
						status
					</label>
					<select
						id="feedback-status"
						value={status}
						onchange={(e) => setStatus((e.target as HTMLSelectElement).value)}
						class="border-grey-700 bg-grey-800 text-viz-grey-light focus:border-viz-yellow w-full rounded border px-2.5 py-1.5 text-xs focus:outline-none"
					>
						{#each STATUSES as s}
							<option value={s}>{s}</option>
						{/each}
					</select>
				</div>

				<p class="text-viz-grey-muted text-[10px]">
					Edit notes directly on the page. Use Save to stage changes.
				</p>
			</div>
		</div>

		<!-- Footer actions -->
		<div class="border-grey-800 space-y-2 border-t px-4 py-3">
			{#if saveStatus === 'error'}
				<p class="text-xs text-red-400">{errorMessage}</p>
			{:else if saveStatus === 'staged'}
				<p class="text-xs text-emerald-400">✓ Staged! Hit Publish below to go live.</p>
			{/if}

			<button
				type="button"
				onclick={save}
				disabled={saving}
				class="bg-viz-yellow text-grey-900 relative w-full rounded px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
			>
				{#if dirty}
					<span class="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-amber-500"></span>
				{/if}
				{saving ? 'Saving…' : 'Save feedback'}
			</button>

			<!-- Publish (prod only, when staged changes exist) -->
			{#if !dev && stagedCount > 0}
				<div class="mt-1 space-y-1.5">
					<p class="text-[10px] tracking-widest text-[var(--color-grey-500)] uppercase">
						{stagedCount} change{stagedCount !== 1 ? 's' : ''} ready to publish
					</p>
					<textarea
						bind:value={publishMessage}
						placeholder="What did you change? (e.g. 'Marked Atlas of Intangibles as Selected')"
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
