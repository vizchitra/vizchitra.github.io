<script lang="ts">
	import { onMount } from 'svelte';
	import { markdownToHtml } from '$lib/utils/markdown';
	import Header from '$lib/components/structure/Header.svelte';
	import { Heading, Prose } from '$lib/components/typography';
	import { Container } from '$lib/components/layout';
	import { ProposalBadge } from '$lib/components/proposals';
	import { sessionColorMap } from '$lib/utils/sessions';
	import SessionPanel from '$lib/studio/editor/SessionPanel.svelte';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const session = $derived(data.session);
	const color = $derived(sessionColorMap[session.sessionType] ?? 'blue');

	const backLink = $derived.by(() => {
		if (!browser) return { href: '/2026/sessions', label: 'Back to All Sessions' };
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

	// ── Studio panel state ────────────────────────────────────────────────────
	let isStudioUser = $state(false);
	let isEditing = $state(false);

	// Live-editable short fields (mirrored from session data, updated via panel)
	let liveType = $state(session.sessionType);
	let liveTime = $state(session.time);
	let liveVenue = $state(session.venue);
	let liveSpeaker = $state(session.speakerName);
	let liveDesignation = $state(session.designation);
	let liveOrganisation = $state(session.organisation);

	// Live-editable markdown fields (edited inline on page)
	let liveDescription = $state(session.longDescription ?? '');
	let liveSpeakerAbout = $state(session.speakerAbout ?? '');

	// Rendered HTML for the markdown fields (starts with server-side render)
	let liveDescriptionHtml = $state(data.descriptionHtml);
	let liveSpeakerAboutHtml = $state(data.speakerAboutHtml);

	// Re-render markdown live as user types
	$effect(() => {
		const md = liveDescription;
		markdownToHtml(md).then((html) => {
			liveDescriptionHtml = html;
		});
	});

	$effect(() => {
		const md = liveSpeakerAbout;
		markdownToHtml(md).then((html) => {
			liveSpeakerAboutHtml = html;
		});
	});

	// Snapshots for cancel revert
	let savedFields: Record<string, string> = {};

	onMount(async () => {
		try {
			const res = await fetch('/api/studio/me');
			if (res.ok) isStudioUser = true;
		} catch {
			// Not authenticated
		}
	});

	function startEdit() {
		savedFields = {
			sessionType: liveType,
			time: liveTime,
			venue: liveVenue,
			speakerName: liveSpeaker,
			designation: liveDesignation,
			organisation: liveOrganisation,
			longDescription: liveDescription,
			speakerAbout: liveSpeakerAbout
		};
		isEditing = true;
	}

	function stopEdit() {
		isEditing = false;
	}

	function cancelEdit() {
		liveType = savedFields.sessionType ?? session.sessionType;
		liveTime = savedFields.time ?? session.time;
		liveVenue = savedFields.venue ?? session.venue;
		liveSpeaker = savedFields.speakerName ?? session.speakerName;
		liveDesignation = savedFields.designation ?? session.designation;
		liveOrganisation = savedFields.organisation ?? session.organisation;
		liveDescription = savedFields.longDescription ?? session.longDescription ?? '';
		liveSpeakerAbout = savedFields.speakerAbout ?? session.speakerAbout ?? '';
		isEditing = false;
	}

	function handleFieldChange(field: string, value: string) {
		if (field === 'sessionType') liveType = value;
		else if (field === 'time') liveTime = value;
		else if (field === 'venue') liveVenue = value;
		else if (field === 'speakerName') liveSpeaker = value;
		else if (field === 'designation') liveDesignation = value;
		else if (field === 'organisation') liveOrganisation = value;
	}
</script>

<!-- SessionPanel: fixed sidebar, studio users only -->
{#if isStudioUser}
	<SessionPanel
		slug={session.slug}
		sessionType={liveType}
		date={session.date}
		time={liveTime}
		venue={liveVenue}
		title={session.title}
		subtitle={session.subtitle}
		speakerName={liveSpeaker}
		designation={liveDesignation}
		organisation={liveOrganisation}
		longDescription={liveDescription}
		speakerAbout={liveSpeakerAbout}
		socialImage={data.pageMeta?.ogImage}
		{isEditing}
		onStartEdit={startEdit}
		onStopEdit={stopEdit}
		onCancel={cancelEdit}
		onFieldChange={handleFieldChange}
	/>
{/if}

<Header banner="curve" />

<Container>
	<header class="max-w-4xl pt-18 pb-6 md:pt-14">
		<div class="space-y-4">
			<Prose>
				<h6>
					<a href={backLink.href}>{backLink.label.replace('Back to ', '')}</a> | VizChitra 2026
				</h6>
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
			<div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-3">
				<p class="font-display text-viz-grey-dark text-base uppercase md:text-lg">
					{#if formattedDate}<span class="font-bold">{formattedDate}</span
						>{/if}{#if session.time}{#if formattedDate}<span class="mx-2">·</span>{/if}<span
							class="font-bold">{session.time} | {period}</span
						>{/if}{#if session.venue}<span class="mx-2">·</span><span class="font-light"
							>{session.venue}</span
						>{/if}
				</p>

				<a
					href="https://tickets.vizchitra.com/"
					target="_blank"
					rel="noopener noreferrer"
					class="font-display bg-viz-{color}-dark hover:bg-viz-{color} inline-flex items-center gap-2 rounded-full px-5 py-2 text-base font-bold text-white uppercase transition-colors md:text-lg"
				>
					Purchase Tickets
					<svg
						class="h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</a>
			</div>
		</div>

		<!-- Description -->
		<section class="mb-8 md:mb-10">
			<Heading tag="h2" align="left" class="pb-4">About this session</Heading>
			{#if isStudioUser && isEditing}
				<textarea
					bind:value={liveDescription}
					rows={10}
					class="border-viz-grey/30 bg-viz-grey-subtle text-viz-grey-dark focus:border-viz-yellow w-full rounded border p-3 font-mono text-sm focus:outline-none"
					placeholder="About this session (markdown supported)"
				></textarea>
			{:else}
				<div class="prose text-viz-grey/90 md:prose-lg markdown-content max-w-none">
					<Prose>
						{@html liveDescriptionHtml}
					</Prose>
				</div>
			{/if}
		</section>

		<!-- About the speaker -->
		{#if liveSpeakerAbout || (isStudioUser && isEditing)}
			<section class="mb-8 md:mb-10">
				<Heading tag="h2" align="left" class="pb-4">About the speaker</Heading>
				{#if isStudioUser && isEditing}
					<textarea
						bind:value={liveSpeakerAbout}
						rows={8}
						class="border-viz-grey/30 bg-viz-grey-subtle text-viz-grey-dark focus:border-viz-yellow w-full rounded border p-3 font-mono text-sm focus:outline-none"
						placeholder="About the speaker (markdown supported)"
					></textarea>
				{:else}
					<div class="prose text-viz-grey/90 md:prose-lg markdown-content max-w-none">
						<Prose>
							{@html liveSpeakerAboutHtml}
						</Prose>
					</div>
				{/if}
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
