<script lang="ts">
	type Status = 'Under Review' | 'Selected' | 'Not Proceeding';

	const STATUS_STYLE: Record<Status, string> = {
		'Under Review': 'bg-amber-950/40 text-amber-300 border-amber-800/50',
		Selected: 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50',
		'Not Proceeding':
			'bg-[var(--color-grey-800)] text-[var(--color-grey-500)] border-[var(--color-grey-700)]'
	};

	interface Props {
		/** Current status — read-only display; controlled by FeedbackPanel */
		status: string;
		initialNotes: string;
		onNotesChange: (notes: string) => void;
	}

	let { status, initialNotes, onNotesChange }: Props = $props();

	const statusStyle = $derived(STATUS_STYLE[status as Status] ?? STATUS_STYLE['Under Review']);
</script>

<section class="mt-16 border-t border-[var(--color-grey-800)] pt-8">
	<!-- Section heading + status badge — same pattern as other content sections on the page -->
	<div class="mb-5 flex items-center gap-3">
		<h2 class="text-sm font-semibold tracking-widest text-[var(--color-grey-500)] uppercase">
			Editorial Notes
		</h2>
		<span class="rounded-full border px-2.5 py-0.5 text-xs font-semibold {statusStyle}">
			{status}
		</span>
		<span class="text-[10px] text-[var(--color-grey-700)] italic">Change status in the panel →</span
		>
	</div>

	<!--
		Notes — contenteditable but styled as page body text (same as the final published output).
		An amber left-border appears on focus to signal editability.
	-->
	<div
		role="textbox"
		aria-label="Editorial notes"
		aria-multiline="true"
		contenteditable="true"
		tabindex="0"
		oninput={(e) => onNotesChange((e.target as HTMLElement).innerText)}
		class="
			text-viz-grey/90 min-h-[4rem] w-full border-l-2 border-transparent
			pl-4 text-base leading-relaxed outline-none
			empty:before:text-[var(--color-grey-600)] empty:before:content-['Add_notes…']
			focus:border-amber-500
		"
	>
		{initialNotes}
	</div>
</section>
