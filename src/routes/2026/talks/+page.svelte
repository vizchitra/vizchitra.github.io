<script lang="ts">
	import { Header, Container, Stack, Prose, FullBleed } from '$lib/components';
	import SessionCardExpanded from '$lib/components/sessions/SessionCardExpanded.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Header banner="curve" />

<Container>
	<Stack>
		<Prose>
			<h1>Talks on 4th July, 2026</h1>
			<p>
				Explore the talks lined up for VizChitra 2026 — perspectives from leading practitioners in
				data visualisation.
			</p>
		</Prose>

		<FullBleed paddingX="md">
			<div class="sessions-grid mx-auto mt-5 w-full max-w-[1500px] justify-center gap-6">
				{#each data.sessions as session, i (session.tbd ? `tbd-${session.sessionType}-${i}` : session.slug)}
					<SessionCardExpanded
						title={session.title}
						speakerName={session.speakerName}
						designation={session.designation}
						organisation={session.organisation}
						sessionType={session.sessionType}
						subtitle={session.subtitle}
						date={session.date}
						time={session.time}
						slot={session.slot}
						venue={session.venue}
						slug={session.slug}
						speakerImage={session.speakerImage}
						tbd={session.tbd}
						showViewDetailsButton={true}
						descriptionHtml={session.descriptionHtml}
						from="talks"
					/>
				{/each}
			</div>
		</FullBleed>

		{#if data.sessions.length === 0}
			<div class="py-16 text-center">
				<p class="text-viz-grey text-lg">No talks found.</p>
			</div>
		{/if}
	</Stack>
</Container>

<style>
	.sessions-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(320px, 550px));
	}

	@media (max-width: 1400px) {
		.sessions-grid {
			grid-template-columns: repeat(2, minmax(320px, 550px));
		}
	}

	@media (max-width: 850px) {
		.sessions-grid {
			grid-template-columns: repeat(1, minmax(300px, 550px));
		}
	}
</style>
