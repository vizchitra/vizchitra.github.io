<script lang="ts">
	import { Grid } from '$lib/components/layout';
	import { Header, DividerCurves } from '$lib/components/structure';
	import { ProposalCard, ProposalFilters } from '$lib/components/proposals';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selectedType = $state('all');
	let selectedTheme = $state('all');

	let filteredProposals = $derived.by(() => {
		return data.proposals.filter((p) => {
			const typeMatch =
				selectedType === 'all' ||
				(p.type === 'cfp' ? p.proposalType === selectedType : selectedType === 'Exhibition');
			const themeMatch = selectedTheme === 'all' || (p.type === 'cfp' && p.theme === selectedTheme);
			return typeMatch && themeMatch;
		});
	});
</script>

<svelte:head>
	<title>Proposals | VizChitra 2026</title>
	<meta
		name="description"
		content="Browse all submitted proposals for talks, dialogues, workshops, and exhibitions at VizChitra 2026."
	/>
</svelte:head>

<Header title="Proposals for VizChitra 2026" banner="curve" />

<div class="content-container">
	<p class="content-text mb-8 text-center text-balance">
		Browse all submitted proposals for talks, dialogues, workshops, and exhibitions.
	</p>

	<ProposalFilters
		types={data.types}
		themes={data.themes}
		bind:selectedType
		bind:selectedTheme
		resultsCount={filteredProposals.length}
	/>
</div>

<div class="content-container max-w-6xl">
	<div class="space-y-4">
		{#each filteredProposals as proposal}
			<div class="border-viz-grey/10 rounded-lg border transition-shadow hover:shadow-md">
				<ProposalCard {proposal} href="/2026/proposals/{proposal.slug}" />
			</div>
		{/each}
	</div>

	{#if filteredProposals.length === 0}
		<div class="py-16 text-center">
			<p class="text-viz-grey text-lg">No proposals found matching your filters.</p>
		</div>
	{/if}
</div>
