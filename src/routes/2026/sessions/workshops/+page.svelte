<script lang="ts">
	import { Header, Container, Stack, Grid, Prose, FullBleed } from '$lib/components';
	import SessionCardExpanded from '$lib/components/sessions/SessionCardExpanded.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Header banner="curve" />

<Container>
	<Stack>
		<Prose>
			<h1>Workshops</h1>
			<p>
				Explore the workshops lined up for VizChitra 2026 — hands-on sessions with leading
				practitioners.
			</p>
		</Prose>

		<div class="flex flex-wrap items-center gap-2">
			<span class="text-viz-grey/50 ml-auto text-sm">
				{data.sessions.filter((s) => !s.tbd).length} confirmed ·
				{data.sessions.filter((s) => s.tbd).length} coming soon
			</span>
		</div>

		<!-- Workshop cards grid -->
		<FullBleed paddingX="xl">
			<div class="grid-containe mx-auto w-full max-w-[1500px]">
				<Grid maxColumns={4} minWidth="450px" gap={6}>
					{#each data.sessions as session, i (session.tbd ? `tbd-${session.sessionType}-${i}` : session.slug)}
						<SessionCardExpanded
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
							descriptionHtml={session.descriptionHtml}
						/>
					{/each}
				</Grid>
			</div>
		</FullBleed>

		{#if data.sessions.length === 0}
			<div class="py-16 text-center">
				<p class="text-viz-grey text-lg">No workshops found.</p>
			</div>
		{/if}
	</Stack>
</Container>
