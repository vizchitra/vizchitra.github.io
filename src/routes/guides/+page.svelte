<script lang="ts">
	import { Heading } from '$lib/components/typography';
	import Header from '$lib/components/structure/Header.svelte';
	import PatternRough from '$lib/components/patterns/PatternRough.svelte';
	import Container from '$lib/components/layout/Container.svelte';
	import FullBleed from '$lib/components/layout/FullBleed.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Prose from '$lib/components/typography/Prose.svelte';

	type CardColor = 'pink' | 'blue' | 'teal' | 'yellow' | 'orange';

	interface DeckCard {
		title: string;
		description: string;
		color: CardColor;
		href: string;
		angle: number;
	}

	const cards: DeckCard[] = [
		{
			title: 'TALKS',
			description: 'Engaging presentations on data visualization topics',
			color: 'blue',
			href: '/guides/talks',
			angle: 50
		},
		{
			title: 'DIALOGUES',
			description: 'Open discussions sessions with peer-based learning',
			color: 'teal',
			href: '/guides/dialogues',
			angle: 120
		},
		{
			title: 'WORKSHOPS',
			description: 'Hands-on learning and skill building sessions',
			color: 'pink',
			href: '/guides/workshops',
			angle: 146
		},
		{
			title: 'EXHIBITION',
			description: 'Showcase of interactive data visualisation projects',
			color: 'orange',
			href: '/guides/exhibition',
			angle: 23
		},
		{
			title: 'PANELS',
			description: 'A focussed moderated discussion with experts.',
			color: 'yellow',
			href: '/guides/panels',
			angle: 132
		}
	];

	// Map color names to CSS variables
	const colorVars: Record<CardColor, string> = {
		pink: 'var(--color-viz-pink)',
		blue: 'var(--color-viz-blue)',
		teal: 'var(--color-viz-teal)',
		yellow: 'var(--color-viz-yellow)',
		orange: 'var(--color-viz-orange)'
	};

	const textColor: Record<CardColor, string> = {
		pink: 'text-pink-900',
		blue: 'text-blue-900',
		teal: 'text-teal-900',
		yellow: 'text-yellow-900',
		orange: 'text-orange-900'
	};
</script>

<Header title="Guides for VizChitra" banner="blob" interactive show="title"></Header>

<Container>
	<Stack>
		<Prose>
			<h1>Guides</h1>
			<p>
				These guides are designed to support you (and us) to navigate the actions required from
				first idea to final delivery for your VizChitra session.
			</p>
			<p>
				They bring together best practices, practical tips, and curated resources to help you
				prepare, refine, and share your work with confidence across the entire journey. Think of
				this as a working reference you can return to at every stage of your journey.
			</p>
			<p>
				Please consider these as living documents - which we will continue to update as we go
				through this process and will add more questions and answers to it as they emerge. If you
				have suggestions, improvements, or additions, please open an issue or submit a pull request
				on <a href="https://github.com/vizchitra/vizchitra.github.io">our GitHub repository</a>.
			</p>
			<div id="list"></div>
		</Prose>
		<FullBleed paddingY="md">
			<div class="deck">
				<div class="deck-inner">
					{#each cards as card}
						<a href={card.href} class="deck-card row-span-3 grid grid-rows-subgrid hover:scale-102">
							<PatternRough
								color={colorVars[card.color]}
								fillStyle="cross-hatch"
								fillWeight={0.5}
								hachureAngle={card.angle}
								opacity={0.4}
							/>
							<div class="card-content self-start py-1 text-xs font-medium {textColor[card.color]}">
								VIZCHITRA GUIDES
							</div>
							<h3
								class="font-display-sans card-content m-0 self-start text-2xl font-bold {textColor[
									card.color
								]}"
							>
								{card.title}
							</h3>
							<p
								class="text-md card-content text-viz-black max-w-sm self-end justify-self-end bg-white/20 text-right font-medium italic"
							>
								{card.description}
							</p>
						</a>
					{/each}
				</div>
			</div>
		</FullBleed>
	</Stack>
</Container>

<style>
	.deck {
		container-type: inline-size;
		width: 100%;
	}

	/* Default: Vertical layout */
	.deck-inner {
		display: grid;
		/* 5 cards × 3 rows each: flexible description row + auto title row + auto footer row */
		grid-template-rows: repeat(5, auto auto minmax(8rem, 1fr));
	}

	.deck-card {
		position: relative;
		min-height: 8rem;
		padding: 2rem 1.5rem;
		margin-top: -1rem;
		clip-path: polygon(0 1rem, 100% 0, 100% calc(100% - 1rem), 0 100%);
	}

	.card-content {
		position: relative;
		z-index: 1;
	}

	.deck-card:first-child {
		margin-top: 0;
		clip-path: polygon(0 0, 100% 0, 100% calc(100% - 1rem), 0 100%);
	}

	.deck-card:last-child {
		clip-path: polygon(0 1rem, 100% 0, 100% 100%, 0 100%);
	}

	/* Wide: Horizontal layout */
	@container (min-width: 60rem) {
		.deck-inner {
			grid-template-columns: repeat(5, 1fr);
			/* Fixed row heights: guide row + title row + description row + */
			grid-template-rows: auto auto minmax(14rem, 1fr);

			& p {
				text-align: right;
			}
		}

		.deck-card {
			/* Height controlled by grid-template-rows, not min-height */
			padding: 1.5rem 2rem;
			margin-top: 0;
			margin-left: -1rem;
			clip-path: polygon(1rem 0, 100% 0, calc(100% - 1rem) 100%, 0 100%);
		}

		.deck-card:first-child {
			margin-left: 0;
			clip-path: polygon(0 0, 100% 0, calc(100% - 1rem) 100%, 0 100%);
		}

		.deck-card:last-child {
			clip-path: polygon(1rem 0, 100% 0, 100% 100%, 0 100%);
		}
	}
</style>
