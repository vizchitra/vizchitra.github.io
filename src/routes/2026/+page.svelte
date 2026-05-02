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
		Cluster
	} from '$lib/components';
	import SessionCardExpanded from '$lib/components/sessions/SessionCardExpanded.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Hero banner="spinner" />

<Container>
	<Stack>
		<Heading tag="h1" class="py-8">
			<LogoType year="2026" />
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

		<Text type="body">
			<ColorSpan color="black">Conference Day on July 4<sup>th</sup>, 2026 (Saturday)</ColorSpan>:
			Full day of sessions including
			<ColorSpan color="blue">Talks</ColorSpan>,
			<ColorSpan color="teal">Dialogues</ColorSpan>, and the
			<ColorSpan color="orange">Exhibition</ColorSpan> at Bangalore International Center (BIC), Bengaluru.
		</Text>
		<Text>
			<ColorSpan color="black">Workshop Day on July 3<sup>rd</sup>, 2026 (Friday)</ColorSpan>:
			Multiple half-day hands-on
			<ColorSpan color="pink">Workshops</ColorSpan> in central Bengaluru near BIC, with details coming
			soon.
		</Text>

		<Cluster justify="start" class="pt-8">
			<Button href="https://tickets.vizchitra.com" color="pink" external={true}>Get Tickets</Button>
		</Cluster>

		<FullBleed>
			<Cluster class="pt-8">
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
						href="/2026"
						variation={0.5}
					/>
				</Stack>
			</Cluster>
		</FullBleed>

		<DividerCurves />

		<!-- ── Browse Submissions ─────────────────────────────────────────── -->

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

		<div class="mt-6 mb-1 flex flex-row items-end gap-1">
			<span class="block pb-px text-lg text-[#666] md:text-[18px]">
				Click on the cards to learn more</span
			>
			<svg
				width="23"
				height="21"
				viewBox="0 0 23 21"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M15.5299 20.6648C15.6209 20.9255 15.906 21.0631 16.1668 20.9721L20.4155 19.4895C20.6762 19.3985 20.8138 19.1134 20.7228 18.8526C20.6319 18.5919 20.3467 18.4543 20.086 18.5453L16.3094 19.8632L14.9914 16.0866C14.9005 15.8258 14.6154 15.6882 14.3546 15.7792C14.0939 15.8702 13.9563 16.1553 14.0473 16.416L15.5299 20.6648ZM3.9998 5.99999L4.22341 6.4472C8.11498 4.5014 12.6393 4.55262 15.3118 6.70208C17.9167 8.79707 19.0096 13.1178 15.5517 20.2827L16.002 20.5L16.4523 20.7174C19.9924 13.3822 19.0843 8.45288 15.9386 5.92284C12.8605 3.44726 7.88477 3.49847 3.77619 5.55278L3.9998 5.99999Z"
					fill="#666666"
				/>
			</svg>
		</div>

		{#if data.selectedSessions.length > 0}
			<DividerCurves />

			<Heading tag="h2" class="font-normal">
				<Slanted color="teal" textContent="CONFIRMED SESSIONS" />
			</Heading>

			<Text type="body">
				Here are some of the confirmed sessions for VizChitra 2026. More announcements coming soon!
			</Text>

			<FullBleed paddingX="md">
				<div class="sessions-grid mx-auto w-full max-w-[1500px] justify-center gap-6">
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
							venue={session.venue}
							slug={session.slug}
							speakerImage={session.speakerImage}
							tbd={session.tbd}
							descriptionHtml={session.descriptionHtml}
						/>
					{/each}
				</div>
			</FullBleed>

			<Cluster justify="start">
				<Button href="/2026/sessions" color="teal">View all Sessions</Button>
			</Cluster>
		{/if}

		<FullBleed>
			<Cluster>
				<CallCard
					title="Talks"
					subtitle="Best for deep dives into projects, case studies or bodies of work."
					pattern="waves"
					tone="blue"
					titlePosition="top-6 left-4 text-left"
					subtitlePosition="bottom-5 left-4 text-left"
					href="/2026/proposals"
				/>

				<CallCard
					title="Dialogues"
					subtitle="Best for shared questions, challenges, or themes."
					pattern="river"
					tone="teal"
					titlePosition="top-20 left-4 text-left"
					subtitlePosition="top-30 left-4 text-left"
					href="/2026/proposals"
				/>

				<CallCard
					title="Workshops"
					subtitle="Best for practice-oriented, skill-building sessions"
					pattern="circle"
					tone="pink"
					titlePosition="top-35 left-1/2 -translate-x-1/2 text-center"
					subtitlePosition="top-45 left-1/2 -translate-x-1/2 text-center"
					href="/2026/proposals"
					variation={0.5}
				/>

				<CallCard
					title="Exhibition"
					subtitle="Focused on climate & ecological change"
					pattern="stream"
					tone="orange"
					titlePosition="top-10 left-1/2 -translate-x-1/2 text-center"
					subtitlePosition="bottom-5 left-1/2 -translate-x-1/2 text-center"
					href="/2026/exhibition"
				/>
			</Cluster>
		</FullBleed>
	</Stack>
</Container>

<style>
	.sessions-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(320px, 400px));
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
