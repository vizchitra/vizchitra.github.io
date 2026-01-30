<script lang="ts">
	import { Heading } from '$lib/components/typography';
	import Header from '$lib/components/structure/Header.svelte';

	type CardColor = 'pink' | 'blue' | 'teal' | 'yellow' | 'orange';

	interface DeckCard {
		title: string;
		description: string;
		color: CardColor;
		href: string;
	}

	const cards: DeckCard[] = [
		{
			title: 'TALKS',
			description: 'Expert presentations on data visualization',
			color: 'pink',
			href: '/guides/talks'
		},
		{
			title: 'WORKSHOPS',
			description: 'Hands-on learning sessions',
			color: 'blue',
			href: '/guides/workshops'
		},
		{
			title: 'DIALOGUES',
			description: 'Interactive discussions and Q&A',
			color: 'teal',
			href: '/guides/dialogues'
		},
		{
			title: 'EXHIBITION',
			description: 'Showcase of visualization projects',
			color: 'yellow',
			href: '/guides/exhibition'
		},
		{
			title: 'PANELS',
			description:
				'A focussed moderated discussion on an engaging topic with domain &  subject matter experts.',
			color: 'orange',
			href: '/guides/panels'
		}
	];

	const bgColors: Record<CardColor, string> = {
		pink: 'bg-pink-100 hover:bg-pink-200 active:bg-pink-200',
		blue: 'bg-blue-100 hover:bg-blue-200 active:bg-blue-200',
		teal: 'bg-teal-100 hover:bg-teal-200 active:bg-teal-200',
		yellow: 'bg-yellow-100 hover:bg-yellow-200 active:bg-yellow-200',
		orange: 'bg-orange-100 hover:bg-orange-200 active:bg-orange-200'
	};

	const textColor: Record<CardColor, string> = {
		pink: 'text-pink-900',
		blue: 'text-blue-900',
		teal: 'text-teal-900',
		yellow: 'text-yellow-900',
		orange: 'text-orange-900'
	};
</script>

<div class="container">
	<h1>Guides</h1>
	<p></p>
</div>

<div class="deck">
	<div class="deck-inner">
		{#each cards as card}
			<a
				href={card.href}
				class="deck-card row-span-2 grid grid-rows-subgrid no-underline {bgColors[
					card.color
				]} hover:scale-102"
			>
				<h3 class="font-display-sans m-0 self-start text-2xl {textColor[card.color]}">
					{card.title}
				</h3>
				<p
					class="text-md max-w-md self-start justify-self-end text-right italic {textColor[
						card.color
					]}"
				>
					{card.description}
				</p>
			</a>
		{/each}
	</div>
</div>

<style>
	.deck {
		container-type: inline-size;
		width: 100%;
	}

	/* Default: Vertical layout */
	.deck-inner {
		display: grid;
		/* 5 cards × 2 rows each: flexible description row + auto title row */
		grid-template-rows: repeat(5, minmax(5rem, 1fr) auto);
	}

	.deck-card {
		min-height: 8rem;
		padding: 1.25rem 1.5rem;
		margin-top: -1rem;
		clip-path: polygon(0 1rem, 100% 0, 100% calc(100% - 1rem), 0 100%);
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
			/* Fixed row heights: description row + title row */
			grid-template-rows: 14rem auto;

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
