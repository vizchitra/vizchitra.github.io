<script lang="ts">
	import type { Proposal } from '$lib/types/proposals';
	import ProposalBadge from './ProposalBadge.svelte';
	import ProposalStatusBadge from './ProposalStatusBadge.svelte';

	interface Props {
		proposal: Proposal;
		href?: string;
	}

	let { proposal, href }: Props = $props();

	const getColor = (): 'pink' | 'blue' | 'yellow' | 'teal' | 'orange' => {
		if (proposal.type === 'cfp') {
			if (proposal.proposalType === 'Talks') return 'blue';
			if (proposal.proposalType === 'Dialogues') return 'teal';
			return 'pink'; // Workshop
		}
		return 'orange'; // Exhibition
	};

	const getTitle = () => {
		return proposal.type === 'cfp' ? proposal.title : proposal.projectTitle;
	};

	const getTypeLabel = () => {
		return proposal.type === 'cfp' ? proposal.proposalType : 'Exhibition';
	};

	const color = $derived(getColor());

	const leftBorderColors = {
		pink: 'border-l-viz-pink-dark',
		blue: 'border-l-viz-blue-dark',
		yellow: 'border-l-viz-yellow-dark',
		teal: 'border-l-viz-teal-dark',
		orange: 'border-l-viz-orange-dark'
	};
</script>

<a
	{href}
	class="group hover:bg-viz-grey/2 relative block border-l-4 py-4 pr-3 pl-4 transition-all duration-150 md:py-6 md:pr-4 md:pl-6 {leftBorderColors[
		color
	]}"
>
	<div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-6">
		<div class="min-w-0 flex-1">
			<h3
				class="font-display-sans text-viz-grey mb-2 text-base leading-snug font-bold transition-colors group-hover:text-viz-{color}-dark md:text-xl md:leading-tight"
			>
				{getTitle()}
			</h3>

			<div class="mb-2 flex flex-wrap items-center gap-1.5 md:mb-3 md:gap-2">
				<ProposalBadge text={getTypeLabel()} {color} />
				{#if proposal.type === 'cfp'}
					<ProposalBadge text={proposal.theme} color="yellow" />
				{/if}
			</div>

			<div class="text-viz-grey-dark/80 wrap-break-words text-sm leading-relaxed md:text-[15px]">
				{@html proposal.summaryHtml || ''}
			</div>
		</div>

		<div
			class="mt-3 flex items-center justify-between md:mt-0 md:w-64 md:flex-col md:items-end md:gap-3"
		>
			<div class="min-w-0 flex-1 md:flex-none md:text-right">
				<p class="font-text-sans text-viz-grey-dark text-md truncate font-semibold md:text-lg">
					{proposal.firstName}
				</p>
				<p class="text-viz-grey-dark/80 md:text-md truncate text-sm">
					{proposal.jobTitle}
				</p>
				{#if proposal.organisation}
					<p class="text-viz-grey-dark/80 md:text-md hidden truncate text-sm md:block">
						{proposal.organisation}
					</p>
				{/if}
			</div>

			<div class="shrink-0 md:mt-auto">
				<ProposalStatusBadge status={proposal.status} />
			</div>
		</div>
	</div>
</a>
