<script lang="ts">
	import { Header, SessionCard, Container, Stack, Grid, Prose, FullBleed } from '$lib/components';
	import { sessionColorMap } from '$lib/utils/sessions';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selectedFormat = $state('all');

	let filteredSessions = $derived(
		selectedFormat === 'all'
			? data.sessions
			: data.sessions.filter((s) => s.sessionType === selectedFormat)
	);
</script>

<Header banner="curve" />

<Container>
	<Stack>
		<Prose>
			<h1>Sessions</h1>
			<p>
				Explore the sessions lined up for VizChitra 2026 — talks, dialogues, workshops, and
				exhibitions.
			</p>
		</Prose>

		<!-- Format filter -->
		<div class="flex flex-wrap items-center gap-2">
			<button
				class="rounded-full border px-4 py-1.5 text-sm font-medium transition-colors {selectedFormat ===
				'all'
					? 'bg-viz-grey border-viz-grey text-white'
					: 'border-viz-grey/20 text-viz-grey hover:border-viz-grey/40'}"
				onclick={() => (selectedFormat = 'all')}
			>
				All
			</button>
			{#each data.formats as format}
				{@const color = sessionColorMap[format] ?? 'blue'}
				<button
					class="rounded-full border px-4 py-1.5 text-sm font-medium transition-colors {selectedFormat ===
					format
						? `bg-viz-grey border-viz-grey text-white`
						: `border-viz-grey/20 text-viz-grey hover:border-viz-${color}-solid/40`}"
					onclick={() => (selectedFormat = format)}
				>
					{format}
				</button>
			{/each}

			<span class="text-viz-grey/50 ml-auto text-sm">
				{filteredSessions.filter((s) => !s.tbd).length} confirmed ·
				{#if filteredSessions.filter((s) => s.tbd).length > 0}
					{filteredSessions.filter((s) => s.tbd).length} coming soon
				{/if}
			</span>
		</div>

		<!-- Session cards grid -->
		<FullBleed paddingX="xl">
			<Grid maxColumns={4} minWidth="300px" gap={6}>
				{#each filteredSessions as session, i (session.tbd ? `tbd-${session.sessionType}-${i}` : session.slug)}
					<SessionCard
						title={session.title}
						speakerName={session.speakerName}
						designation={session.designation}
						organisation={session.organisation}
						sessionType={session.sessionType}
						subtitle={session.subtitle}
						date={session.date}
						slug={session.slug}
						speakerImage={session.speakerImage}
						tbd={session.tbd}
					/>
				{/each}
			</Grid>
		</FullBleed>

		{#if filteredSessions.length === 0}
			<div class="py-16 text-center">
				<p class="text-viz-grey text-lg">No sessions found for this format.</p>
			</div>
		{/if}
	</Stack>
</Container>
