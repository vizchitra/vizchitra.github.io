<script lang="ts">
	import type { ProposalStatus } from '$lib/types/proposals';

	interface Props {
		status: ProposalStatus;
	}

	let { status }: Props = $props();

	const statusConfig = {
		Selected: {
			bg: 'bg-green-100',
			text: 'text-green-800',
			border: 'border-green-300',
			dot: 'bg-green-500'
		},
		'Under Review': {
			bg: 'bg-blue-100',
			text: 'text-blue-800',
			border: 'border-blue-300',
			dot: 'bg-blue-500'
		},

		'Not Selected': {
			bg: 'bg-red-100',
			text: 'text-red-800',
			border: 'border-red-300',
			dot: 'bg-red-500'
		}
	};

	const config = $derived(statusConfig[status]);
</script>

<span
	class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold {config.bg} {config.text} {config.border}"
>
	<span class="h-1.5 w-1.5 rounded-full {config.dot}"></span>
	{status}
</span>
