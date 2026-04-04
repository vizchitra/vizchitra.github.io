<script lang="ts">
	import Header from '$lib/components/structure/Header.svelte';
	import { Heading, Prose } from '$lib/components/typography';
	import { Container } from '$lib/components/layout';
	import { ProposalBadge } from '$lib/components/proposals';
	import { sessionColorMap } from '$lib/utils/sessions';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const session = $derived(data.session);
	const color = $derived(sessionColorMap[session.sessionType] ?? 'blue');
</script>

<Header banner="curve" />

<Container>
	<header class="max-w-4xl pt-18 pb-6 md:pt-14">
		<div class="space-y-4">
			<Prose>
				<h6><a href="/2026/sessions">Sessions</a> | VizChitra 2026</h6>
				<h1>{session.title}</h1>
			</Prose>

			<!-- Speaker info -->
			<div class="space-y-1.5 md:space-y-2">
				<p class="font-display-sans text-base md:text-xl text-viz-{color}-dark text-left font-semibold">
					{session.speakerName}
				</p>
				<p class="text-viz-grey-dark/80 text-md text-left font-normal md:text-lg">
					{session.designation}{#if session.organisation}<span
						class="text-viz-grey-dark/80 mx-1.5">·</span
					>{session.organisation}{/if}
				</p>
			</div>
		</div>
	</header>

	<div>
		<!-- Session type badge -->
		<div class="border-viz-grey/10 mb-8 border-b pb-6 md:mb-12 md:pb-8">
			<div class="flex flex-wrap items-center gap-2">
				<ProposalBadge text={session.sessionType} {color} />
			</div>
		</div>

		<!-- Description -->
		<section class="mb-8 md:mb-10">
			<Heading tag="h2" align="left" class="pb-4">About this session</Heading>
			<div class="prose text-viz-grey/90 md:prose-lg markdown-content max-w-none">
				<Prose>
					{@html data.descriptionHtml}
				</Prose>
			</div>
		</section>

		<!-- Related sessions -->
		{#if data.relatedSessions.length > 0}
			<section class="border-viz-grey/10 mt-16 border-t pt-8">
				<Heading tag="h4" align="left" class="pb-4">Other Sessions</Heading>
				<div class="space-y-3">
					{#each data.relatedSessions as related}
						{@const relatedColor = sessionColorMap[related.sessionType] ?? 'blue'}
						<a
							href="/2026/sessions/{related.slug}"
							class="group flex items-center gap-3 transition-colors"
						>
							<ProposalBadge text={related.sessionType} color={relatedColor} />
							<span
								class="text-viz-grey text-sm font-medium transition-colors group-hover:text-viz-{relatedColor}-dark md:text-base"
							>
								{related.title}
								<span class="text-viz-grey/50 font-normal">— {related.speakerName}</span>
							</span>
						</a>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Back link -->
		<div class="border-viz-grey/10 mt-16 border-t pt-8 text-center">
			<a
				href="/2026/sessions"
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
				<span>Back to All Sessions</span>
			</a>
		</div>
	</div>
</Container>
