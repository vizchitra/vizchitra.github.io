<script lang="ts">
	interface Props {
		submissionType: 'cfp' | 'cfe';
		id: string;
		initialStatus: string;
		initialNotes: string;
	}

	const STATUSES = ['Under Review', 'Selected', 'Not Proceeding'] as const;
	type Status = (typeof STATUSES)[number];

	const STATUS_STYLE: Record<Status, string> = {
		'Under Review': 'bg-amber-950/40 text-amber-300 border-amber-800/50',
		Selected: 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50',
		'Not Proceeding': 'bg-[var(--color-grey-800)] text-[var(--color-grey-500)] border-[var(--color-grey-700)]'
	};

	let { submissionType, id, initialStatus, initialNotes }: Props = $props();

	let status = $state<Status>((initialStatus as Status) || 'Under Review');
	let notes = $state(initialNotes ?? '');
	let saving = $state(false);
	let saveState = $state<'idle' | 'saved' | 'error'>('idle');
	let dirty = $state(false);

	function cycleStatus() {
		const idx = STATUSES.indexOf(status);
		status = STATUSES[(idx + 1) % STATUSES.length];
		dirty = true;
		saveState = 'idle';
	}

	async function save() {
		saving = true;
		saveState = 'idle';
		try {
			const res = await fetch('/api/studio/feedback', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ type: submissionType, id, status, notes })
			});
			if (!res.ok) throw new Error('Save failed');
			saveState = 'saved';
			dirty = false;
		} catch {
			saveState = 'error';
		} finally {
			saving = false;
		}
	}
</script>

<section class="mt-16 border-t border-[var(--color-grey-800)] pt-8">
	<h2 class="mb-5 text-sm font-semibold tracking-widest text-[var(--color-grey-500)] uppercase">
		Editorial Notes
	</h2>

	<!-- Status pill — click to cycle -->
	<div class="mb-5 flex items-center gap-3">
		<button
			type="button"
			onclick={cycleStatus}
			class="rounded-full border px-3 py-1 text-xs font-semibold transition-colors {STATUS_STYLE[status]}"
			title="Click to change status"
		>
			{status}
		</button>
		<span class="text-xs text-[var(--color-grey-600)]">Click to change</span>
	</div>

	<!-- Notes — plain contenteditable, medium-style -->
	<div
		role="textbox"
		aria-label="Editorial notes"
		aria-multiline="true"
		contenteditable="true"
		tabindex="0"
		oninput={(e) => {
			notes = (e.target as HTMLElement).innerText;
			dirty = true;
			saveState = 'idle';
		}}
		class="min-h-[6rem] w-full rounded border border-dashed border-[var(--color-grey-700)] bg-transparent px-4 py-3 text-base leading-relaxed text-[var(--color-grey-300)] outline-none focus:border-[var(--color-grey-500)] empty:before:text-[var(--color-grey-600)] empty:before:content-['Add_notes_here…']"
	>
		{initialNotes}
	</div>

	<!-- Save row -->
	<div class="mt-3 flex items-center gap-3">
		<button
			type="button"
			onclick={save}
			disabled={!dirty || saving}
			class="rounded bg-[var(--color-grey-800)] px-4 py-1.5 text-sm font-semibold text-[var(--color-grey-200)] transition-colors hover:bg-[var(--color-grey-700)] disabled:cursor-not-allowed disabled:opacity-40"
		>
			{saving ? 'Saving…' : 'Save'}
		</button>

		{#if saveState === 'saved'}
			<span class="text-sm text-emerald-400">✓ Saved — publish from Studio when ready</span>
		{:else if saveState === 'error'}
			<span class="text-sm text-red-400">⚠ Save failed — try again</span>
		{/if}
	</div>
</section>
