<script lang="ts">
	import {
		Flex,
		FullBleed,
		CallCard,
		Button,
		Heading,
		SubHeading,
		Text,
		Slanted,
		LogoType,
		ColorSpan,
		DividerCurves,
		Hero,
		Header,
		Container,
		Stack,
		Cluster,
		CursorHint
	} from '$lib/components';
	import SessionCardExpanded from '$lib/components/sessions/SessionCardExpanded.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Hero banner="spinner" />

<Container>
	<Stack>
		<Heading tag="h1" class="py-8">
			<LogoType year={2026} />
		</Heading>

		<Text type="lead">
			India's community-driven conference dedicated to <strong>data visualization</strong> returns
			to <strong>Bangalore</strong>
			on <strong>3rd & 4th July, 2026</strong>. Join us for <strong>two days</strong> of learning, sharing,
			and connecting with the data visualization community.
		</Text>

		<!-- <Cluster justify="start">
			<Button href="https://tickets.vizchitra.com" color="pink" external={true}>
				Get your Tickets now!
			</Button>
		</Cluster> -->

		<DividerCurves />

		<!-- ── What's On ─────────────────────────────────────────────────── -->

		<Heading tag="h2" class="font-normal">
			<Slanted color="pink" textContent="WHAT'S ON" />
		</Heading>

		<Text>
			<ColorSpan color="black">Workshop Day on July 3<sup>rd</sup>, 2026 (Friday)</ColorSpan>: Three
			hours, hands-on
			<ColorSpan color="pink">Workshop</ColorSpan> facilitated by leading practitioners at Bangalore International
			Centre (BIC) & Underline Center.
		</Text>
		<Text type="body">
			<ColorSpan color="black">Conference Day on July 4<sup>th</sup>, 2026 (Saturday)</ColorSpan>:
			Full day of sessions including
			<ColorSpan color="blue">Talks</ColorSpan>,
			<ColorSpan color="teal">Dialogues</ColorSpan>, and the
			<ColorSpan color="orange">Exhibition</ColorSpan> at Bangalore International Centre (BIC), Bengaluru.
		</Text>

		<Cluster justify="start" class="pt-8">
			<Button href="https://tickets.vizchitra.com" color="pink" external={true}>Get Tickets</Button>
		</Cluster>

		<CursorHint>Click on the cards to learn more</CursorHint>

		<FullBleed>
			<Cluster>
				<Stack>
					<CallCard
						title="Workshops"
						subtitle="The Learning Journey"
						description="Half-day, hands-on sessions with expert facilitators. Skill-building & learning through doing."
						pattern="circle"
						tone="pink"
						titlePosition="top-32 left-1/2 -translate-x-1/2 text-center"
						descriptionPosition="bottom-2 left-1/2 -translate-x-1/2 text-center"
						descriptionWidth="30ch"
						href="/2026/workshops"
						variation={0.5}
					/>
				</Stack>
				<Stack>
					<CallCard
						title="Talks"
						subtitle="The Narrative Journey"
						description="Deep dives into projects & lived experiences. Stories that reshape how we see our viz work."
						pattern="waves"
						tone="blue"
						titlePosition="top-5 left-3 text-left"
						titleWidth="15ch"
						descriptionPosition="bottom-2 left-3 text-left"
						descriptionWidth="30ch"
						href="/2026"
					/>
				</Stack>
				<Stack>
					<CallCard
						title="Dialogues"
						subtitle="The Shared Journey"
						description="Participant-driven, unconference-style sessions. Meaning that emerges through conversation."
						pattern="river"
						tone="teal"
						titlePosition="top-18 left-3 text-left"
						descriptionPosition="top-37 left-3 text-left"
						descriptionWidth="16ch"
						href="/2026"
					/>
				</Stack>
				<Stack>
					<CallCard
						title="Exhibition"
						subtitle="The Immersive Journey"
						description="Data, Otherwise: a curated gallery on climate & ecology viz. Works that slow you down & feel."
						pattern="stream"
						tone="orange"
						titlePosition="top-5 left-1/2 -translate-x-1/2 text-center"
						titleWidth="30ch"
						descriptionPosition="bottom-2 left-1/2 -translate-x-1/2 text-center"
						descriptionWidth="30ch"
						href="/2026"
					/>
				</Stack>
			</Cluster>
		</FullBleed>

		<DividerCurves />

		{#if data.selectedSessions.length > 0}
			<Heading tag="h2" class="font-normal">
				<Slanted color="pink" textContent="TAKING SHAPE: Confimed Sessions" />
			</Heading>

			<Text type="body"
				>The lineup is taking shape for VizChitra 2026. Here's a first look at the Workshop
				Sessions. More to come soon.</Text
			>
			<Cluster justify="start">
				<Button href="/2026/sessions" color="pink">View all Sessions</Button>
			</Cluster>

			<FullBleed paddingX="md">
				<div class="sessions-grid mx-auto w-full justify-center gap-6">
					{#each data.selectedSessions as session (session.slug)}
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
							isExpanded={false}
							descriptionHtml={session.descriptionHtml}
						/>
					{/each}
				</div>
			</FullBleed>
		{/if}

		<!-- ── Browse Submissions ─────────────────────────────────────────── -->

		<DividerCurves />

		<Heading tag="h2" class="font-normal">
			<Slanted color="blue" textContent="BROWSE SUBMISSIONS" />
		</Heading>

		<Text type="body">
			We invited submissions across across four formats—<ColorSpan color="blue">Talks</ColorSpan>,
			<ColorSpan color="teal">Dialogues</ColorSpan>,
			<ColorSpan color="pink">Workshops</ColorSpan>, and
			<ColorSpan color="orange">Exhibition</ColorSpan>. Last day for submissions was on 15 Feb,
			2026. You can explore all the submitted proposals below.
		</Text>

		<!-- <Cluster justify="start">
			<Button href="/2026/proposals" color="pink">Submit your Proposal</Button>
			<Button href="/2026/exhibition" color="orange">Submit for Exhibition</Button>
		</Cluster>

		<Text type="caption">
			Submission Deadline: <strong>15 Feb 2025, 23:59 IST</strong>.
		</Text>

		<DividerCurves />

		<Heading tag="h3" class="font-normal">
			<Slanted color="blue" textContent="BROWSE SUBMISSIONS" />
		</Heading>

		<Text type="body">
			Explore all submitted proposals for VizChitra 2026. Browse talks, dialogues, workshops, and
			exhibitions from our community.
		</Text> -->

		<Cluster justify="start">
			<Button href="/2026/submissions" color="blue">View all Submissions</Button>
		</Cluster>
	</Stack>
</Container>

<style>
	.sessions-grid {
		display: grid;
		max-width: 1440px;
		grid-template-columns: repeat(3, minmax(320px, 450px));
	}

	@media (max-width: 1600px) {
		.sessions-grid {
			grid-template-columns: repeat(2, minmax(320px, 500px));
		}
	}

	@media (max-width: 850px) {
		.sessions-grid {
			grid-template-columns: repeat(1, minmax(300px, 500px));
		}
	}
</style>
