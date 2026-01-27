<script lang="ts">
	import { Card, Button } from '$lib/components/interface';
	import { Header, DividerCurves } from '$lib/components/structure';
	import { Heading } from '$lib/components/typography';
	import { ProposalBadge, ProposalStatusBadge, UpvoteButton } from '$lib/components/proposals';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { proposal } = data;

	const isCFP = proposal.type === 'cfp';
	const isCFE = proposal.type === 'cfe';
	const isDialogueOrWorkshop = isCFP && ['Dialogues', 'Workshop'].includes(proposal.proposalType);

	// Get color based on type
	const getColor = (): 'pink' | 'blue' | 'yellow' | 'teal' | 'orange' => {
		if (isCFP) {
			return proposal.proposalType === 'Talks'
				? 'blue'
				: proposal.proposalType === 'Dialogues'
					? 'teal'
					: 'pink';
		}
		return 'orange'; // Exhibition
	};
	const color = getColor();

	const title = isCFP ? proposal.title : proposal.projectTitle;
	const description = isCFP ? proposal.description : proposal.projectDescription;

	// Split description into paragraphs
	const paragraphs = description.split('\n').filter((p) => p.trim());
</script>

<svelte:head>
	<title>{title} | VizChitra 2026 Proposals</title>
	<meta name="description" content={paragraphs[0]} />
</svelte:head>

<Header {title} banner="curve" />

<div class="content-container max-w-4xl">
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
		<div class="border-viz-grey/10 mb-6 border-b pb-4 md:mb-8 md:pb-6">
			<!-- Mobile layout -->
			<div class="flex flex-col gap-3 md:hidden">
				<!-- Author info and upvote button row -->
				<div class="flex items-start justify-between gap-3">
					<div class="min-w-0 flex-1">
						<p class="font-display-sans text-base font-bold text-viz-{color}-dark">
							{proposal.firstName}
						</p>
						<p class="text-viz-grey/80 text-xs">
							{proposal.jobTitle}{#if proposal.organisation}, {proposal.organisation}{/if}
						</p>
					</div>
					<div class="shrink-0">
						<UpvoteButton
							slug={proposal.slug}
							initialVotes={data.voteData?.votes ?? 0}
							initialHasVoted={data.voteData?.hasVoted ?? false}
							{color}
							variant="inline"
						/>
					</div>
				</div>

				<!-- Metadata badges -->
				<div class="flex flex-wrap items-center gap-1.5 text-sm">
					<ProposalStatusBadge status={proposal.status} />
					<span class="text-viz-grey/30">·</span>
					<ProposalBadge text={isCFP ? proposal.proposalType : 'Exhibition'} {color} />
					{#if isCFP}
						<span class="text-viz-grey/30">·</span>
						<ProposalBadge text={proposal.theme} color="blue" />
					{/if}
				</div>
			</div>

			<!-- Desktop: Original horizontal layout -->
			<div class="hidden md:flex md:flex-row md:items-start md:justify-between md:gap-6">
				<!-- Left: Badges -->
				<div class="flex flex-wrap items-center gap-2 text-sm">
					<ProposalStatusBadge status={proposal.status} />
					<span class="text-viz-grey/30">·</span>
					<ProposalBadge text={isCFP ? proposal.proposalType : 'Exhibition'} {color} />
					{#if isCFP}
						<span class="text-viz-grey/30">·</span>
						<ProposalBadge text={proposal.theme} color="blue" />
					{/if}
				</div>

				<!-- Right: Author info -->
				<div class="text-right">
					<p class="font-display-sans text-base font-bold text-viz-{color}-dark md:text-lg">
						{proposal.firstName}
					</p>
					<p class="text-viz-grey/80 text-xs md:text-sm">
						{proposal.jobTitle}{#if proposal.organisation}<span class="hidden md:inline"
								>,
							</span><span class="block md:inline">{proposal.organisation}</span>{/if}
					</p>
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
				href="/2026/proposals"
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
