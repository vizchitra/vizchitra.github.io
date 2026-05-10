<script lang="ts">
	type Status = 'Under Review' | 'Selected' | 'Not Proceeding';

	const STATUS_STYLE: Record<Status, string> = {
		'Under Review': 'bg-amber-950/40 text-amber-300 border-amber-800/50',
		Selected: 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50',
		'Not Proceeding': 'bg-grey-800 text-grey-500 border-grey-700'
	};

	interface Props {
		/** Whether the editor is in edit mode (controlled by FeedbackPanel via parent) */
		isEditing: boolean;
		/** Current status — read-only display; controlled by FeedbackPanel */
		status: string;
		initialNotes: string;
		onNotesChange: (notes: string) => void;
	}

	let { isEditing, status, initialNotes, onNotesChange }: Props = $props();

	const statusStyle = $derived(STATUS_STYLE[status as Status] ?? STATUS_STYLE['Under Review']);
</script>

<section class="border-grey-800 mt-16 border-t pt-8">
	<!-- Section heading + status badge -->
	<div class="mb-5 flex items-center gap-3">
		<h2 class="text-grey-500 text-sm font-semibold tracking-widest uppercase">Editorial Notes</h2>
		<span class="rounded-full border px-2.5 py-0.5 text-xs font-semibold {statusStyle}">
			{status}
		</span>
	</div>

	<!--
		{#key isEditing} forces a fresh DOM node each time editing starts or stops.
		This ensures contenteditable resets to the correct value on cancel.
	-->
	{#key isEditing}
		{#if isEditing}
			<!--
				Edit mode: contenteditable, amber left-border always visible to signal editable state.
				Styled identically to the read-only view so the final result is WYSIWYG.
			-->
			<div
				role="textbox"
				aria-label="Editorial notes"
				aria-multiline="true"
				contenteditable="true"
				tabindex="0"
				oninput={(e) => onNotesChange((e.target as HTMLElement).innerText)}
				class="text-viz-grey/90 empty:before:text-grey-600 min-h-[4rem] w-full border-l-2 border-amber-500/60 pl-4 text-base leading-relaxed outline-none empty:before:content-['Add_notes…']"
			>
				{initialNotes}
			</div>
		{:else}
			<!-- View mode: plain text, exactly as it will appear when published -->
			{#if initialNotes}
				<p class="text-viz-grey/90 text-base leading-relaxed">{initialNotes}</p>
			{:else}
				<p class="text-grey-700 text-sm italic">No notes yet.</p>
			{/if}
		{/if}
	{/key}
</section>
