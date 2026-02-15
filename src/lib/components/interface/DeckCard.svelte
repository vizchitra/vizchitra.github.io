<script lang="ts">
	import { PatternRough, LogoType } from '$lib/components';

	type CardColor = 'pink' | 'blue' | 'teal' | 'yellow' | 'orange';

	interface Card {
		title: string;
		tagline: string;
		description: string;
		color: CardColor;
		angle: number;
	}

	interface Props {
		card: Card;
		colorVars: Record<CardColor, string>;
		textColor: Record<CardColor, string>;
	}

	let { card, colorVars, textColor }: Props = $props();

	// Background colors for each card type
	const bgColors: Record<CardColor, string> = {
		pink: 'bg-pink-100',
		blue: 'bg-blue-100',
		teal: 'bg-teal-100',
		yellow: 'bg-yellow-100',
		orange: 'bg-orange-100'
	};
</script>

<div class="share-card relative h-full overflow-hidden rounded-lg shadow-xl {bgColors[card.color]}">
	<PatternRough
		color={colorVars[card.color]}
		fillStyle="cross-hatch"
		fillWeight={0.5}
		hachureAngle={card.angle}
		opacity={0.4}
	/>

	<div class="relative z-10 flex h-full flex-row justify-between p-24">
		<!-- Top section with logo -->
		<div class="flex items-start justify-between gap-4">
			<div class="space-y-4">
				<div class="mb-0 font-medium {textColor[card.color]} text-viz-lg">VIZCHITRA GUIDES</div>
				<h1 class="font-display-sans mb-0 font-bold {textColor[card.color]} text-viz-7xl">
					{card.title}
				</h1>
				<h2 class="text-viz-black text-viz-3xl">
					{card.tagline}
				</h2>
				<p class="text-viz-black text-viz-2xl mt-50 text-right font-medium italic">
					{card.description}
				</p>
			</div>
		</div>

		<!-- Bottom section with description -->

		<div class="text-viz-grey-dark absolute inset-0 z-20 shrink-0 p-24 text-right">
			<h2 class="font-display-sans text-viz-7xl">
				<LogoType year={null} />
			</h2>
		</div>
	</div>
</div>
