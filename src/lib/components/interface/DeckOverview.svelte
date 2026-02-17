<script lang="ts">
	import { PatternRough, LogoType } from '$lib/components';

	type CardColor = 'pink' | 'blue' | 'teal' | 'yellow' | 'orange' | 'grey';

	interface DeckCard {
		title: string;
		tagline: string;
		description: string;
		color: CardColor;
		href: string;
		angle: number;
	}

	interface Props {
		card: DeckCard;
		cards: DeckCard[];
		colorVars: Record<CardColor, string>;
		textColor: Record<CardColor, string>;
		isSquare: boolean;
	}

	let { card, cards, colorVars, textColor, isSquare }: Props = $props();
</script>

<div
	class="deck-overview relative flex h-full flex-col justify-between overflow-hidden rounded-lg shadow-xl"
>
	<!-- Deck stripes (same clip-path as guides page) -->
	<div class="absolute inset-0 deck-inner">
		{#each cards as card, i}
			<div
				class="deck-card relative"
				class:first={i === 0}
				class:last={i === cards.length - 1}
			>
				<PatternRough
					color={colorVars[card.color]}
					fillStyle="cross-hatch"
					fillWeight={0.5}
					hachureAngle={card.angle}
					opacity={0.6}
				/>
			</div>
		{/each}
	</div>

	<!-- Logo and text content -->
	<div class="relative z-10 flex h-full flex-col justify-between p-16">
		<!-- Top: Description on the right -->
		<div class="flex justify-end">
			<p
				class="text-viz-grey-dark max-w-[23ch] bg-white/20 text-right text-2xl leading-relaxed font-medium italic"
			>
				{card.description}
			</p>
		</div>

		<!-- Bottom: Content -->
		<div class="flex items-end justify-between gap-8">
			<!-- Left: Label, Title, Tagline -->
			<div class="flex flex-col gap-3">
				<div class="text-xl font-medium {textColor[card.color]}">VIZCHITRA GUIDES</div>
				<h1
					class="font-display-sans m-0 text-7xl leading-tight font-bold {textColor[card.color]}"
				>
					{card.title}
				</h1>
				<h2 class="text-viz-black m-0 text-4xl leading-tight">{card.tagline}</h2>
			</div>

			<!-- Right: Logo -->
			<div class="text-4xl">
				<LogoType year={null} />
			</div>
		</div>
	</div>
</div>

<style>
	.deck-inner {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 0;
	}

	.deck-card {
		margin-left: -3rem;
		clip-path: polygon(3rem 0, 100% 0, calc(100% - 3rem) 100%, 0 100%);
	}

	.deck-card.first {
		margin-left: 0;
		clip-path: polygon(0 0, 100% 0, calc(100% - 3rem) 100%, 0 100%);
	}

	.deck-card.last {
		clip-path: polygon(3rem 0, 100% 0, 100% 100%, 0 100%);
	}
</style>
