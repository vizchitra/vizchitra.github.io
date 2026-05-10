<script lang="ts">
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	import PanelShell from './PanelShell.svelte';

	const STATUSES = ['Under Review', 'Selected', 'Not Proceeding'] as const;
	type Status = (typeof STATUSES)[number];

	const STATUS_STYLE: Record<Status, string> = {
		'Under Review': 'bg-amber-950/40 text-amber-300 border-amber-800/50',
		Selected: 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50',
		'Not Proceeding':
			'bg-[var(--color-grey-800)] text-[var(--color-grey-500)] border-[var(--color-grey-700)]'
	};

	interface Props {
		submissionType: 'cfp' | 'cfe';
		id: string;
		/** Submission title — shown in preview */
		title?: string;
		/** Submission format — shown in preview */
		format?: string;
		isEditing: boolean;
		onStartEdit: () => void;
		onStopEdit: () => void;
		onCancel: () => void;
		status: string;
		onStatusChange: (s: string) => void;
		getNotes: () => string;
	}

	let {
		submissionType,
		id,
		title = '',
		format = '',
		isEditing,
		onStartEdit,
		onStopEdit,
		onCancel,
		status,
		onStatusChange,
		getNotes
	}: Props = $props();

	// ── Save / stage ─────────────────────────────────────────────────────────
	let saving = $state(false);
	let saveStatus = $state<'idle' | 'saved' | 'staged' | 'error'>('idle');
	let errorMessage = $state<string | null>(null);
	let stagedCount = $state(0);

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

	function startEdit() {
		onStartEdit();
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
			if (dev) {
				saveStatus = 'saved';
			} else {
				stagedCount = data.stagedCount ?? stagedCount + 1;
				saveStatus = 'staged';
			}
			onStopEdit();
		} catch {
			saveStatus = 'error';
			errorMessage = 'Save failed — try again';
		} finally {
			saving = false;
		}
	}

	function cancel() {
		onCancel();
		saveStatus = 'idle';
		errorMessage = null;
	}

	const statusStyle = $derived(STATUS_STYLE[status as Status] ?? STATUS_STYLE['Under Review']);
</script>

<PanelShell
	breadcrumb="content/2026/feedback/"
	fileName="{submissionType}.json"
	editLabel="Edit feedback"
	{isEditing}
	{saving}
	{saveStatus}
	{errorMessage}
	{stagedCount}
	onStartEdit={startEdit}
	onSave={save}
	onCancel={cancel}
>
	{#snippet preview()}
		<!-- Submission card preview -->
		<div class="border-grey-800 mt-1 rounded border px-3 py-2.5">
			<span
				class="mb-1.5 inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold {statusStyle}"
			>
				{status}
			</span>
			<p class="text-viz-grey-light line-clamp-2 text-xs leading-snug font-medium">
				{title || '(untitled)'}
			</p>
			{#if format}
				<p class="text-viz-grey-muted mt-1 text-[10px] tracking-wide uppercase">{format}</p>
			{/if}
		</div>
	{/snippet}

	{#snippet children()}
		<div class="border-grey-800 border-b px-4 py-4">
			<h3 class="text-viz-grey-muted mb-3 text-[10px] tracking-widest uppercase">Feedback</h3>

			<!-- Submission ID (always read-only) -->
			<div class="mb-3 opacity-50">
				<span class="text-viz-grey-muted mb-1 block text-xs font-medium">id</span>
				<p
					class="border-grey-700 bg-grey-800 text-viz-grey-muted w-full rounded border px-2.5 py-1.5 font-mono text-xs"
				>
					{id}
				</p>
			</div>

			<!-- Status — select when editing, read-only pill when viewing -->
			<div class="mb-3">
				<label class="text-viz-grey-muted mb-1 block text-xs font-medium" for="feedback-status">
					status
				</label>
				{#if isEditing}
					<select
						id="feedback-status"
						value={status}
						onchange={(e) => onStatusChange((e.target as HTMLSelectElement).value)}
						class="border-grey-700 bg-grey-800 text-viz-grey-light focus:border-viz-yellow w-full rounded border px-2.5 py-1.5 text-xs focus:outline-none"
					>
						{#each STATUSES as s}
							<option value={s}>{s}</option>
						{/each}
					</select>
				{:else}
					<p
						class="border-grey-700 bg-grey-800 text-viz-grey-muted w-full rounded border px-2.5 py-1.5 text-xs"
					>
						{status}
					</p>
				{/if}
			</div>

			{#if isEditing}
				<p class="text-viz-grey-muted text-[10px]">Edit notes directly on the page below.</p>
			{/if}
		</div>
	{/snippet}
</PanelShell>
