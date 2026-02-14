<script lang="ts">
	import Header from '$lib/components/structure/Header.svelte';
	import { Heading, Prose } from '$lib/components/typography';
	import { Container } from '$lib/components/layout';
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
</script>

<!-- Clean header with title and speaker -->

<Header banner="curve" />

<Container>
	<!-- <div class="content-container mt-12 max-w-4xl"> -->
	<header class="max-w-4xl pt-18 pb-6 md:pt-14">
		<div class="space-y-4">
			<Prose>
				<h6><a href="/2026/submissions">Submissions </a> | VizChitra 2026</h6>
				<h1>{title}</h1>
			</Prose>
			<!-- Title -->
			<!-- <h1
				class="font-display text-viz-grey text-left text-3xl leading-[1.15] font-bold tracking-tight md:text-4xl md:leading-[1.12] lg:text-5xl"
			>
				{title}
			</h1> -->

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
					<ProposalBadge
						text={isCFP ? (proposal as CFPProposal).proposalType : 'Exhibition'}
						{color}
					/>
					{#if isCFP}
						<span class="text-viz-grey/30">·</span>
						<ProposalBadge text={(proposal as CFPProposal).theme} color="yellow" />
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
			<Heading tag="h2" align="left" class="pb-4">Description</Heading>
			<div class="prose text-viz-grey/90 md:prose-lg markdown-content max-w-none">
				<Prose>
					{@html data.descriptionHtml}
				</Prose>
			</div>
		</section>

		{#if isCFP && (proposal as CFPProposal).links.length > 0}
			<section class="mb-8 md:mb-10">
				<Heading tag="h4" align="left" class="pb-4">Related Links</Heading>
				<ul class="space-y-2">
					{#each (proposal as CFPProposal).links as link}
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
			{#if (proposal as CFPProposal).materials}
				<section class="mb-8 md:mb-10">
					<Heading tag="h4" align="left" class="pb-4">Materials Required</Heading>
					<div class="text-viz-grey/90 markdown-content">
						<Prose>
							{@html data.additionalHtml.materials}
						</Prose>
					</div>
				</section>
			{/if}
			{#if (proposal as CFPProposal).roomSetup}
				<section class="mb-8 md:mb-10">
					<Heading tag="h4" align="left" class="pb-4">Room Setup</Heading>
					<div class="text-viz-grey/90 markdown-content">
						<Prose>
							{@html data.additionalHtml.roomSetup}
						</Prose>
					</div>
				</section>
			{/if}
		{/if}

		{#if isCFE}
			{#if (proposal as CFEProposal).dataSource}
				<section class="mb-8 md:mb-10">
					<Heading tag="h4" align="left" class="pb-4">Data Source</Heading>
					<div class="text-viz-grey/90 markdown-content">
						<Prose>
							{@html data.additionalHtml.dataSource}
						</Prose>
					</div>
				</section>
			{/if}

			{#if (proposal as CFEProposal).visualizationMethod}
				<section class="mb-8 md:mb-10">
					<Heading tag="h4" align="left" class="pb-4">Visualization Method</Heading>
					<div class="text-viz-grey/90 markdown-content">
						<Prose>
							{@html data.additionalHtml.visualizationMethod}
						</Prose>
					</div>
				</section>
			{/if}

			{#if (proposal as CFEProposal).technicalRequirements}
				<section class="mb-8 md:mb-10">
					<Heading tag="h4" align="left" class="pb-4">Technical Requirements</Heading>
					<div class="text-viz-grey/90 markdown-content">
						<Prose>
							{@html data.additionalHtml.technicalRequirements}
						</Prose>
					</div>
				</section>
			{/if}

			{#if (proposal as CFEProposal).timeline}
				<section class="mb-8 md:mb-10">
					<Heading tag="h4" align="left" class="pb-4">Project Status & Timeline</Heading>
					<div class="text-viz-grey/90 markdown-content">
						<Prose>
							{@html data.additionalHtml.timeline}
						</Prose>
					</div>
				</section>
			{/if}

			{#if (proposal as CFEProposal).previousProjects}
				<section class="mb-8 md:mb-10">
					<Heading tag="h4" align="left" class="pb-4">Previous Work</Heading>
					<a
						href={(proposal as CFEProposal).previousProjects}
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

			{#if (proposal as CFEProposal).submissionType === 'Collective' && (proposal as CFEProposal).teamName}
				<section class="mb-8 md:mb-10">
					<Heading tag="h4" align="left" class="pb-4">Team</Heading>
					<p class="font-display-sans text-viz-grey mb-2 text-xl font-bold md:text-2xl">
						{(proposal as CFEProposal).teamName}
					</p>
					{#if (proposal as CFEProposal).teamBio}
						<div class="text-viz-grey/90 markdown-content">
							<Prose>
								{@html data.additionalHtml.teamBio}
							</Prose>
						</div>
					{/if}
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
	<!-- </div> -->
</Container>

<!-- Close content-container div -->
