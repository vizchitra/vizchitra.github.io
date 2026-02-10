<script lang="ts">
	import { Header, DividerCurves } from '$lib/components/structure';
	import { ProposalCard, ProposalFilters } from '$lib/components/proposals';
	import type { PageData } from './$types';
	import Fuse from 'fuse.js';
	import Prose from '$lib/components/typography/Prose.svelte';
	import Container from '$lib/components/layout/Container.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';

	let { data }: { data: PageData } = $props();

	let selectedType = $state('all');
	let selectedTheme = $state('all');
	let searchQuery = $state('');
	let sortBy = $state<'time' | 'title' | 'name'>('time');

	let filteredProposals = $derived.by(() => {
		// Filter by type and theme
		let filtered = data.proposals.filter((p) => {
			const typeMatch =
				selectedType === 'all' ||
				(p.type === 'cfp' ? p.proposalType === selectedType : selectedType === 'Exhibition');
			const themeMatch = selectedTheme === 'all' || (p.type === 'cfp' && p.theme === selectedTheme);
			return typeMatch && themeMatch;
		});

		// Fuzzy search with Fuse.js
		if (searchQuery.trim()) {
			// Create searchable data with normalized fields
			const searchableData = filtered.map((p) => ({
				...p,
				searchTitle: p.type === 'cfp' ? p.title : p.projectTitle,
				searchDescription: p.type === 'cfp' ? p.description : p.projectDescription
			}));

			const fuse = new Fuse(searchableData, {
				keys: [
					{ name: 'searchTitle', weight: 2 },
					{ name: 'searchDescription', weight: 1 },
					{ name: 'firstName', weight: 1.5 },
					{ name: 'jobTitle', weight: 0.5 }
				],
				threshold: 0.25,
				distance: 100,
				ignoreLocation: true
			});

			const results = fuse.search(searchQuery);
			filtered = results.map((result) => result.item);
		}

		// Sort proposals (reverse chronological by default)
		filtered.sort((a, b) => {
			if (sortBy === 'time') {
				return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
			} else if (sortBy === 'title') {
				const titleA = (a.type === 'cfp' ? a.title : a.projectTitle).toLowerCase();
				const titleB = (b.type === 'cfp' ? b.title : b.projectTitle).toLowerCase();
				return titleA.localeCompare(titleB);
			} else {
				// Sort by name
				return a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase());
			}
		});

		return filtered;
	});
</script>

<Header banner="curve" />

<Container>
	<Stack>
		<Prose>
			<h1>Submissions for VizChitra 2026</h1>
			<p>Browse all submitted proposals for talks, dialogues, workshops, and exhibitions.</p>
		</Prose>

		<ProposalFilters
			types={data.types}
			themes={data.themes}
			bind:selectedType
			bind:selectedTheme
			bind:searchQuery
			bind:sortBy
			resultsCount={filteredProposals.length}
		/>
		<!-- </div> -->

		<!-- <div class="content-container max-w-4xl"> -->
		<div class="space-y-4">
			{#each filteredProposals as proposal}
				<div class="border-viz-grey/10 rounded-lg border transition-shadow hover:shadow-md">
					<ProposalCard {proposal} href="/2026/submissions/{proposal.slug}" />
				</div>
			{/each}
		</div>

		{#if filteredProposals.length === 0}
			<div class="py-16 text-center">
				<p class="text-viz-grey text-lg">No proposals found matching your filters.</p>
			</div>
		{/if}
		<!-- </div> -->
	</Stack>
</Container>
