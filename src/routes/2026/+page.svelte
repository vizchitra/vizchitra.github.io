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

	const typeOrder = ['Workshops', 'Talks', 'Dialogues', 'Exhibition'];

	const sessionGroups = $derived(
		typeOrder
			.map((type) => ({
				type,
				sessions: data.selectedSessions.filter((s) => s.sessionType === type)
			}))
			.filter((g) => g.sessions.length > 0)
	);

	type Pattern = 'circle' | 'waves' | 'river' | 'stream';
	type Tone = 'blue' | 'teal' | 'orange' | 'pink' | 'yellow';

	const typeConfig: Record<
		string,
		{
			pattern: Pattern;
			tone: Tone;
			titlePosition: string;
			href: string;
			subtitle: string;
			description: string;
			descriptionPosition: string;
			descriptionWidth: string;
		}
	> = {
		Workshops: {
			pattern: 'circle',
			tone: 'pink',
			titlePosition: 'pt-28 md:pt-40 text-center',
			href: '/2026/workshops',
			subtitle: 'The Learning Journey',
			description:
				'Half-day, hands-on sessions with expert facilitators. Skill-building & learning through doing.',
			descriptionPosition: 'bottom-5 left-1/2 -translate-x-1/2 text-center',
			descriptionWidth: '30ch'
		},
		Talks: {
			pattern: 'waves',
			tone: 'blue',
			titlePosition: 'pt-2 text-left',
			href: '/2026/talks',
			subtitle: 'The Narrative Journey',
			description:
				'Deep dives into projects & lived experiences. Stories that reshape how we see our viz work.',
			descriptionPosition: 'bottom-5 left-5 md:left-8 text-left',
			descriptionWidth: '30ch'
		},
		Dialogues: {
			pattern: 'river',
			tone: 'teal',
			titlePosition: 'pt-12 text-left',
			href: '/2026/dialogues',
			subtitle: 'The Shared Journey',
			description:
				'Participant-driven, unconference-style sessions. Meaning that emerges through conversation.',
			descriptionPosition: 'top-38 md:top-48 left-5 md:left-8 text-left',
			descriptionWidth: '20ch'
		},
		Exhibition: {
			pattern: 'stream',
			tone: 'orange',
			titlePosition: 'pt-4 text-center',
			href: '/2026/exhibition',
			subtitle: 'The Immersive Journey',
			description:
				'Data, Otherwise: a curated gallery on climate & ecology viz. Works that slow you down & feel.',
			descriptionPosition: 'bottom-2 left-1/2 -translate-x-1/2 text-center',
			descriptionWidth: '20ch'
		}
	};

	// Scroll tracking — one entry per type
	let activeIndex: Record<string, number> = $state({ Workshops: 0, Talks: 0, Dialogues: 0 });

	function handleScroll(type: string, el: HTMLElement) {
		const card = el.querySelector<HTMLElement>('.session-card-wrap');
		if (!card) return;
		activeIndex[type] = Math.round(el.scrollLeft / card.offsetWidth);
	}
</script>

{#snippet sessionRow(type: string)}
	{@const group = sessionGroups.find((g) => g.type === type)}
	{#if group}
		{@const cfg = typeConfig[type]}
		<FullBleed paddingX="md">
			<!-- Dots row: thin strip above, offset to align with session cards -->
			<div class="dots-row">
				{#each group.sessions as _, i}
					<span class="dot" class:dot-active={activeIndex[type] === i}></span>
				{/each}
			</div>
			<div class="type-row" onscroll={(e) => handleScroll(type, e.currentTarget as HTMLElement)}>
				<!-- Fixed left CallCard (sticky on desktop, scrolls on mobile) -->
				<div class="type-label">
					<CallCard
						title={group.type}
						subtitle={cfg.subtitle}
						description={cfg.description}
						pattern={cfg.pattern}
						tone={cfg.tone}
						titlePosition={cfg.titlePosition}
						descriptionPosition={cfg.descriptionPosition}
						descriptionWidth={cfg.descriptionWidth}
						href={cfg.href}
						variation={0.5}
					/>
				</div>
				<div
					class="sessions-scroll"
					onscroll={(e) => handleScroll(type, e.currentTarget as HTMLElement)}
				>
					{#each group.sessions as session (session.slug)}
						<div class="session-card-wrap">
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
								isExpanded={true}
								descriptionHtml={session.descriptionHtml}
							/>
						</div>
					{/each}
				</div>
			</div>
		</FullBleed>
	{/if}
{/snippet}

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

		<Cluster justify="start" class="pt-8">
			<Button href="https://tickets.vizchitra.com" color="pink" external={true}>Get Tickets</Button>
			<Button href="/2026/sessions" color="pink">See all Sessions</Button>
		</Cluster>

		<DividerCurves />

		<!-- ── What's On ─────────────────────────────────────────────────── -->

		<!-- <Heading tag="h2" class="font-normal">
			<Slanted color="pink" textContent="WHAT'S ON" />
		</Heading> -->

		<!-- Workshop Day -->
		<Stack>
			<Heading tag="h2" class="font-normal">
				<Slanted color="pink" textContent="WORKSHOP DAY" />
				<span> on Friday, 03 July 2026</span>
			</Heading>
			<Text>
				<!-- <ColorSpan color="black">Workshop Day on July 3<sup>rd</sup>, 2026 (Friday)</ColorSpan>: -->
				Three hours, hands-on
				<ColorSpan color="pink">Workshop</ColorSpan> facilitated by leading practitioners at Bangalore
				International Centre (BIC) & Underline Center.
			</Text>
			{@render sessionRow('Workshops')}
		</Stack>

		<DividerCurves />

		<!-- Conference Day -->
		<Stack>
			<Heading tag="h2" class="font-normal">
				<Slanted color="pink" textContent="CONFERENCE DAY" />
				<span> on Saturday, 04 July 2026</span>
			</Heading>
			<Text type="body">
				<!-- <ColorSpan color="black">Conference Day on July 4<sup>th</sup>, 2026 (Saturday)</ColorSpan>: -->
				Full day of sessions including
				<ColorSpan color="blue">Talks</ColorSpan>,
				<ColorSpan color="teal">Dialogues</ColorSpan>, and the
				<ColorSpan color="orange">Exhibition</ColorSpan> at Bangalore International Centre (BIC), Bengaluru.
			</Text>
			{@render sessionRow('Talks')}
			{@render sessionRow('Dialogues')}
		</Stack>

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

		<Cluster justify="start">
			<Button href="/2026/submissions" color="blue">View all Submissions</Button>
		</Cluster>
	</Stack>
</Container>

<style>
	/* ── Desktop layout ─────────────────────────────────────────────── */

	.type-row {
		display: flex;
		align-items: flex-start;
		gap: 0;
	}

	.type-label {
		flex: none;
		width: 360px;
		position: sticky;
		left: 0;
		z-index: 10;
	}

	.dots-row {
		display: flex;
		gap: 6px;
		padding: 4px 0 6px;
		margin-left: 376px; /* 360px label + 16px sessions-scroll padding */
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #ccc;
		flex-shrink: 0;
		transition: background 300ms ease;
	}

	.dot-active {
		background: #444;
	}

	.sessions-scroll {
		display: flex;
		overflow-x: auto;
		padding-bottom: 0.75rem;
		padding-left: 16px;
		padding-right: 2rem;
		scroll-snap-type: x mandatory;
		scroll-padding-left: 16px;
		/* hide scrollbar */
		scrollbar-width: none;
	}

	.sessions-scroll::-webkit-scrollbar {
		display: none;
	}

	.session-card-wrap {
		flex: none;
		width: 360px;
		margin-left: -48px;
		scroll-snap-align: start;
		transition: margin 500ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	.session-card-wrap:first-child {
		margin-left: 0;
	}

	.sessions-scroll:hover .session-card-wrap:not(:first-child),
	.sessions-scroll:focus-within .session-card-wrap:not(:first-child) {
		margin-left: 8px;
	}

	/* ── Mobile layout ──────────────────────────────────────────────── */

	@media (max-width: 768px) {
		/* The whole row scrolls — CallCard becomes the first scrollable card */
		.type-row {
			overflow-x: auto;
			scroll-snap-type: x mandatory;
			scrollbar-width: none;
		}

		.type-row::-webkit-scrollbar {
			display: none;
		}

		.type-label {
			position: static;
			width: 280px;
			z-index: auto;
			scroll-snap-align: start;
			flex-shrink: 0;
		}

		.dots-row {
			margin-left: 0;
		}

		.sessions-scroll {
			display: contents;
		}

		.session-card-wrap {
			width: 280px;
			margin-left: 8px;
		}

		.session-card-wrap:first-child {
			margin-left: 8px;
		}
	}
</style>
