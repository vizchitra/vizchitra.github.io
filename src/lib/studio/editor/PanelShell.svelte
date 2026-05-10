<script lang="ts">
	/**
	 * PanelShell — shared chrome for all Studio side-panels.
	 *
	 * Handles: collapse/expand, header, edit-state indicator, footer
	 * (Edit / Cancel / Save buttons), and the Publish CTA.
	 *
	 * Consuming panels (StudioPanel, FeedbackPanel, SessionPanel…) pass:
	 *   - breadcrumb / fileName for the header breadcrumb
	 *   - edit-state flags + callbacks
	 *   - children snippet  → the scrollable fields body
	 *   - preview snippet   → optional collapsible card/social preview
	 */
	import type { Snippet } from 'svelte';
	import { dev } from '$app/environment';
	import { onDestroy } from 'svelte';
	import { panelStore } from './PanelStore';

	interface Props {
		/** e.g. "content/pages/"  */
		breadcrumb: string;
		/** e.g. "community.md" or "sessions.json" */
		fileName: string;
		/** Text on the start-editing button */
		editLabel?: string;
		isEditing: boolean;
		isDirty?: boolean;
		saving?: boolean;
		saveStatus?: 'idle' | 'saved' | 'staged' | 'error';
		errorMessage?: string | null;
		/** How many files are staged and waiting to publish */
		stagedCount?: number;
		onStartEdit: () => void;
		onSave: () => void;
		onCancel: () => void;
		/** Scrollable body content (fields / editors) */
		children: Snippet;
		/** Optional collapsible preview panel (card + social) */
		preview?: Snippet;
		/** og:image URL — shown in the preview section */
		socialImage?: string;
	}

	let {
		breadcrumb,
		fileName,
		editLabel = 'Edit',
		isEditing,
		isDirty = false,
		saving = false,
		saveStatus = 'idle',
		errorMessage = null,
		stagedCount = 0,
		onStartEdit,
		onSave,
		onCancel,
		children,
		preview,
		socialImage
	}: Props = $props();

	// ── Collapse ─────────────────────────────────────────────────────────────
	let collapsed = $state(false);
	$effect(() => {
		panelStore.set(collapsed ? 'collapsed' : 'open');
	});
	onDestroy(() => panelStore.set('hidden'));

	// ── Publish ──────────────────────────────────────────────────────────────
	let publishing = $state(false);
	let publishStatus = $state<'idle' | 'done' | 'error'>('idle');
	let prUrl = $state<string | null>(null);
	let publishMessage = $state('');
	// Track staged count locally so it resets after publish without prop change
	let localStagedCount = $derived(stagedCount);

	async function publish() {
		if (!publishMessage.trim() || publishing) return;
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
			publishMessage = '';
		} catch {
			publishStatus = 'error';
		} finally {
			publishing = false;
		}
	}
</script>

<!-- ── Collapsed strip ────────────────────────────────────────────────── -->
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
		{#if localStagedCount > 0}
			<span
				class="bg-viz-yellow text-grey-900 absolute top-[4.5rem] flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"
			>
				{localStagedCount}
			</span>
		{/if}
	</button>

	<!-- ── Full panel ──────────────────────────────────────────────────────── -->
{:else}
	<aside
		class="border-grey-800 bg-grey-900 text-viz-grey-light fixed top-0 right-0 z-50 flex h-full w-72 flex-col border-l"
	>
		<!-- Header -->
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

		<!-- File path breadcrumb -->
		<div class="border-grey-800 border-b px-4 py-3">
			<p class="text-viz-grey-muted mb-0.5 text-[10px] tracking-widest uppercase">{breadcrumb}</p>
			<p class="text-viz-grey-light font-mono text-sm font-medium">{fileName}</p>
		</div>

		<!-- Edit-state indicator -->
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

		<!-- Optional preview (card + social) -->
		{#if preview || socialImage}
			<div class="border-grey-800 border-b">
				<details class="group" open>
					<summary
						class="text-viz-grey-muted hover:text-viz-grey-light flex cursor-pointer list-none items-center justify-between px-4 py-2.5 text-[10px] font-semibold tracking-widest uppercase transition-colors"
					>
						Preview
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
					<div class="space-y-3 px-4 pb-3">
						{#if preview}
							{@render preview()}
						{/if}
						{#if socialImage}
							<div>
								<p class="text-viz-grey-muted mb-1.5 text-[10px] tracking-widest uppercase">
									Social
								</p>
								<img
									src={socialImage}
									alt="Social preview"
									class="border-grey-700 w-full rounded border object-cover"
								/>
							</div>
						{/if}
					</div>
				</details>
			</div>
		{/if}

		<!-- Scrollable body -->
		<div class="flex-1 overflow-y-auto">
			{@render children()}
		</div>

		<!-- Footer: Edit / Cancel+Save / Publish -->
		<div class="border-grey-800 space-y-2 border-t px-4 py-3">
			{#if isEditing}
				<!-- Save feedback -->
				{#if saveStatus === 'error'}
					<p class="text-xs text-red-400">{errorMessage ?? 'Save failed — try again'}</p>
				{:else if saveStatus === 'saved'}
					<p class="text-xs text-emerald-400">✓ Saved to disk</p>
				{:else if saveStatus === 'staged'}
					<p class="text-xs text-emerald-400">
						✓ Staged! Hit Publish below when you're ready to go live.
					</p>
				{/if}

				<div class="flex gap-2">
					<button
						type="button"
						onclick={onCancel}
						class="border-grey-700 text-viz-grey-muted hover:border-grey-600 hover:text-viz-grey-light flex-1 rounded border px-3 py-1.5 text-xs transition-colors"
					>
						Cancel
					</button>
					<button
						type="button"
						onclick={onSave}
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
					onclick={onStartEdit}
					class="bg-viz-yellow text-grey-900 w-full rounded px-3 py-2 text-xs font-semibold transition-opacity hover:opacity-90"
				>
					{editLabel}
				</button>
			{/if}

			<!-- Publish CTA (prod only, staged changes pending, not currently editing) -->
			{#if !dev && localStagedCount > 0 && !isEditing}
				<div class="mt-1 space-y-1.5">
					<p class="text-[10px] tracking-widest text-[var(--color-grey-500)] uppercase">
						{localStagedCount} change{localStagedCount !== 1 ? 's' : ''} ready to publish
					</p>
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
						disabled={!publishMessage.trim() || publishing}
						class="bg-viz-teal text-grey-900 w-full rounded px-3 py-2 text-xs font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
					>
						{publishing
							? 'Publishing…'
							: `Publish ${localStagedCount} change${localStagedCount !== 1 ? 's' : ''}`}
					</button>
				</div>
			{/if}
		</div>
	</aside>
{/if}
