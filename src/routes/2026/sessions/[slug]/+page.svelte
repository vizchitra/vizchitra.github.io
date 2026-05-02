<script lang="ts">
	import Header from '$lib/components/structure/Header.svelte';
	import { Heading, Prose } from '$lib/components/typography';
	import { Container } from '$lib/components/layout';
	import { ProposalBadge } from '$lib/components/proposals';
	import { sessionColorMap } from '$lib/utils/sessions';
	import { page } from '$app/state';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const session = $derived(data.session);
	const color = $derived(sessionColorMap[session.sessionType] ?? 'blue');

	const backLink = $derived.by(() => {
		const from = page.url.searchParams.get('from');
		if (from === 'workshops') return { href: '/2026/workshops', label: 'Back to Workshops' };
		return { href: '/2026/sessions', label: 'Back to All Sessions' };
	});

	function formatDate(iso: string): string {
		const d = new Date(iso);
		const day = d.getDate();
		const suffix =
			day % 10 === 1 && day !== 11
				? 'st'
				: day % 10 === 2 && day !== 12
					? 'nd'
					: day % 10 === 3 && day !== 13
						? 'rd'
						: 'th';
		const month = d.toLocaleDateString('en-GB', { month: 'long' });
		return `${day}${suffix} ${month}`;
	}

	const formattedDate = $derived(session.date ? formatDate(session.date) : '');
	const period = $derived(session.time === '10:00 - 13:00' ? 'Morning' : 'Afternoon');
</script>

<Header banner="curve" />

<Container>
	<header class="max-w-4xl pt-18 pb-6 md:pt-14">
		<div class="space-y-4">
			<Prose>
				<h6><a href={backLink.href}>{backLink.label.replace('Back to ', '')}</a> | VizChitra 2026</h6>
				<h1>{session.title} {session.subtitle}</h1>
			</Prose>

			<div class="space-y-1.5 md:space-y-2">
				<p
					class="font-display-sans text-base md:text-xl text-viz-{color}-dark text-left font-semibold"
				>
					{session.speakerName}
				</p>
				<p class="text-viz-grey-dark/80 text-md text-left font-normal md:text-lg">
					{session.designation}{#if session.organisation}<span class="text-viz-grey-dark/80 mx-1.5"
							>·</span
						>{session.organisation}{/if}
				</p>
			</div>
		</div>
	</header>

	<div>
		<!-- Session type badge + logistics -->
		<div class="border-viz-grey/10 mb-8 border-b pb-6 md:mb-12 md:pb-8">
			<div class="flex flex-wrap items-center gap-x-3 gap-y-2">
				<p class="font-display text-viz-grey-dark text-base uppercase md:text-lg">
					{#if formattedDate}<span class="font-bold">{formattedDate}</span
						>{/if}{#if session.time}{#if formattedDate}<span class="mx-2">·</span>{/if}<span
							class="font-bold">{session.time} | {period}</span
						>{/if}{#if session.venue}<span class="mx-2">·</span><span class="font-light"
							>{session.venue}</span
						>{/if}
				</p>
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

		<!-- About the speaker -->
		{#if data.speakerAboutHtml}
			<section class="mb-8 md:mb-10">
				<Heading tag="h2" align="left" class="pb-4">About the speaker</Heading>
				<div class="prose text-viz-grey/90 md:prose-lg markdown-content max-w-none">
					<Prose>
						{@html data.speakerAboutHtml}
					</Prose>
				</div>
			</section>
		{/if}

		<!-- Related sessions -->
		<!-- 
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
		-->

		<!-- Back link -->
		<div class="border-viz-grey/10 mt-16 border-t pt-8 text-center">
			<a
				href={backLink.href}
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
				<span>{backLink.label}</span>
			</a>
		</div>
	</div>
</Container>
