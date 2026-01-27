<script lang="ts">
	import { Card, Button } from '$lib/components/interface';
	import { DividerCurves } from '$lib/components/structure';
	import { Heading } from '$lib/components/typography';
	import { ProposalBadge, ProposalStatusBadge, UpvoteButton } from '$lib/components/proposals';
	import type { PageData } from './$types';
	import type { CFPProposal, CFEProposal } from '$lib/types/proposals';

	let { data }: { data: PageData } = $props();
	const proposal = $derived(data.proposal);

	const isCFP = $derived(proposal.type === 'cfp');
	const isCFE = $derived(proposal.type === 'cfe');
	const isDialogueOrWorkshop = $derived(
		isCFP && ['Dialogues', 'Workshop'].includes((proposal as CFPProposal).proposalType)
	);

	// Get color based on type
	const color = $derived(
		(() => {
			if (isCFP) {
				const cfpProposal = proposal as CFPProposal;
				return cfpProposal.proposalType === 'Talks'
					? 'blue'
					: cfpProposal.proposalType === 'Dialogues'
						? 'teal'
						: 'pink';
			}
			return 'orange'; // Exhibition
		})()
	);

	const title = $derived(
		isCFP ? (proposal as CFPProposal).title : (proposal as CFEProposal).projectTitle
	);
	const description = $derived(
		isCFP ? (proposal as CFPProposal).description : (proposal as CFEProposal).projectDescription
	);

	// Split description into paragraphs
	const paragraphs = $derived(description.split('\n').filter((p: string) => p.trim()));
</script>

<svelte:head>
	<title>{title} | VizChitra 2026 Proposals</title>
	<meta name="description" content={paragraphs[0]} />
</svelte:head>

<!-- Clean header with title and speaker -->

<div class="content-container max-w-4xl">
	<header class="max-w-4xl pt-12 pb-8 md:pt-16 md:pb-10">
		<div class="space-y-5">
			<!-- Title -->
			<h1
				class="font-display text-viz-grey text-left text-3xl leading-[1.15] font-bold tracking-tight md:text-4xl md:leading-[1.12] lg:text-5xl"
			>
				{title}
			</h1>

			<!-- Speaker info -->
			<div class="space-y-1.5 md:space-y-2">
				<p
					class="font-display-sans text-base md:text-xl text-viz-{color}-dark text-left font-semibold"
				>
					{proposal.firstName}
				</p>
				<p class="text-viz-grey/65 text-left text-xs font-normal md:text-sm">
					{proposal.jobTitle}{#if proposal.organisation}<span class="text-viz-grey/35 mx-1.5"
							>•</span
						>{proposal.organisation}{/if}
				</p>
			</div>
		</div>
	</header>
	<!-- Desktop: Layout with floating upvote button -->
	<div class="relative">
		<!-- Floating upvote button (desktop only) -->
		<div class="absolute top-0 -right-20 hidden md:block lg:-right-24">
			<div class="sticky top-24">
				<UpvoteButton
					slug={proposal.slug}
					initialVotes={data.voteData?.votes ?? 0}
					initialHasVoted={data.voteData?.hasVoted ?? false}
					{color}
					variant="prominent"
				/>
			</div>
		</div>

		<!-- Main content -->
		<div class="border-viz-grey/10 mb-8 border-b pb-6 md:mb-12 md:pb-8">
			<!-- Metadata badges - centered layout -->
			<div class="flex flex-wrap items-center justify-between gap-3 md:gap-4">
				<div class="flex flex-wrap items-center gap-2 text-sm">
					<ProposalStatusBadge status={proposal.status} />
					<span class="text-viz-grey/30">·</span>
					<ProposalBadge text={isCFP ? proposal.proposalType : 'Exhibition'} {color} />
					{#if isCFP}
						<span class="text-viz-grey/30">·</span>
						<ProposalBadge text={proposal.theme} color="blue" />
					{/if}
				</div>

				<!-- Mobile upvote button -->
				<div class="md:hidden">
					<UpvoteButton
						slug={proposal.slug}
						initialVotes={data.voteData?.votes ?? 0}
						initialHasVoted={data.voteData?.hasVoted ?? false}
						{color}
						variant="inline"
					/>
				</div>
			</div>
		</div>

		<section class="mb-8 md:mb-10">
			<Heading tag="h2" align="left">Description</Heading>
			<div class="prose text-viz-grey/90 md:prose-lg max-w-none">
				{#each paragraphs as paragraph}
					<p class="mb-3 text-sm leading-relaxed break-words md:mb-4 md:text-base">{paragraph}</p>
				{/each}
			</div>
		</section>

		{#if isCFP && proposal.links.length > 0}
			<section class="mb-8 md:mb-10">
				<Heading tag="h3" align="left">Related Links</Heading>
				<ul class="space-y-2">
					{#each proposal.links as link}
						<li>
							<a
								href={link}
								target="_blank"
								rel="noopener noreferrer"
								class="group text-viz-grey/70 decoration-viz-grey/30 inline-flex items-center gap-1.5 text-sm break-all underline decoration-1 underline-offset-2 transition-colors hover:text-viz-{color}-dark hover:decoration-viz-{color}-dark md:gap-2 md:text-[15px]"
							>
								<svg
									class="h-3 w-3 shrink-0 opacity-40 transition-opacity group-hover:opacity-100 md:h-3.5 md:w-3.5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
									/>
								</svg>
								<span class="break-all">{link}</span>
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		{#if isDialogueOrWorkshop}
			{#if proposal.materials || proposal.roomSetup}
				<section class="mb-8 md:mb-10">
					<Heading tag="h3" align="left">Logistics</Heading>
					<div
						class="space-y-3 rounded-lg border-l-4 border-viz-{color}-dark bg-viz-{color}-light/10 p-4 md:space-y-4 md:p-6"
					>
						{#if proposal.materials}
							<div>
								<p
									class="mb-1.5 text-xs font-bold tracking-wide uppercase text-viz-{color}-dark md:mb-2 md:text-sm"
								>
									Materials Required
								</p>
								<p class="text-viz-grey/90 text-sm break-words md:text-base">
									{proposal.materials}
								</p>
							</div>
						{/if}
						{#if proposal.roomSetup}
							<div>
								<p
									class="mb-1.5 text-xs font-bold tracking-wide uppercase text-viz-{color}-dark md:mb-2 md:text-sm"
								>
									Room Setup
								</p>
								<p class="text-viz-grey/90 text-sm break-words md:text-base">
									{proposal.roomSetup}
								</p>
							</div>
						{/if}
					</div>
				</section>
			{/if}
		{/if}

		{#if isCFE}
			<section class="mb-8 md:mb-10">
				<Heading tag="h3" align="left">Data & Visualization</Heading>
				<div
					class="border-viz-orange-dark bg-viz-orange-light/10 space-y-3 rounded-lg border-l-4 p-4 md:space-y-5 md:p-6"
				>
					{#if proposal.dataSource}
						<div>
							<p
								class="text-viz-orange-dark mb-1.5 text-xs font-bold tracking-wide uppercase md:mb-2 md:text-sm"
							>
								Data Source
							</p>
							<p class="text-viz-grey/90 text-sm break-words md:text-base">{proposal.dataSource}</p>
						</div>
					{/if}
					{#if proposal.visualizationMethod}
						<div>
							<p
								class="text-viz-orange-dark mb-1.5 text-xs font-bold tracking-wide uppercase md:mb-2 md:text-sm"
							>
								Visualization Method
							</p>
							<p class="text-viz-grey/90 text-sm break-words md:text-base">
								{proposal.visualizationMethod}
							</p>
						</div>
					{/if}
				</div>
			</section>

			{#if proposal.technicalRequirements}
				<section class="mb-8 md:mb-10">
					<Heading tag="h3" align="left">Technical Requirements</Heading>
					<p class="text-viz-grey/90 text-sm break-words md:text-base">
						{proposal.technicalRequirements}
					</p>
				</section>
			{/if}

			{#if proposal.timeline}
				<section class="mb-8 md:mb-10">
					<Heading tag="h3" align="left">Project Status & Timeline</Heading>
					<p class="text-viz-grey/90 text-sm break-words md:text-base">{proposal.timeline}</p>
				</section>
			{/if}

			{#if proposal.previousProjects}
				<section class="mb-8 md:mb-10">
					<Heading tag="h3" align="left">Previous Work</Heading>
					<a
						href={proposal.previousProjects}
						target="_blank"
						rel="noopener noreferrer"
						class="group text-viz-grey/70 decoration-viz-grey/30 hover:text-viz-orange-dark hover:decoration-viz-orange-dark inline-flex items-center gap-1.5 text-sm break-all underline decoration-1 underline-offset-2 transition-colors md:gap-2 md:text-[15px]"
					>
						<svg
							class="h-3 w-3 shrink-0 opacity-40 transition-opacity group-hover:opacity-100 md:h-3.5 md:w-3.5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
						<span class="break-all">View Portfolio</span>
					</a>
				</section>
			{/if}

			{#if proposal.submissionType === 'Collective' && proposal.teamName}
				<section class="mb-8 md:mb-10">
					<Heading tag="h3" align="left">Team</Heading>
					<div
						class="border-viz-orange-dark bg-viz-orange-light/10 rounded-lg border-l-4 p-4 md:p-6"
					>
						<p class="font-display-sans text-viz-orange-dark mb-2 text-xl font-bold md:text-2xl">
							{proposal.teamName}
						</p>
						{#if proposal.teamBio}
							<p class="text-viz-grey/90 text-sm break-words md:text-base">{proposal.teamBio}</p>
						{/if}
					</div>
				</section>
			{/if}
		{/if}

		<div class="border-viz-grey/10 mt-16 border-t pt-8 text-center">
			<a
				href="/2026/submissions"
				class="group font-text-sans text-viz-grey inline-flex items-center gap-2 transition-colors hover:text-viz-{color}-dark"
			>
				<svg
					class="h-5 w-5 transition-transform group-hover:-translate-x-1"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M11 17l-5-5m0 0l5-5m-5 5h12"
					/>
				</svg>
				<span>Back to All Proposals</span>
			</a>
		</div>
	</div>
	<!-- Close relative div -->
</div>
<!-- Close content-container div -->
