<script lang="ts">
	import { PatternRough, LogoType } from '$lib/components';

	type CardColor = 'pink' | 'blue' | 'teal' | 'yellow' | 'orange' | 'grey';

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
</script>

<div
	class="share-card relative flex h-full flex-col justify-between overflow-hidden rounded-lg p-16 shadow-xl"
>
	<PatternRough
		color={colorVars[card.color]}
		fillStyle="cross-hatch"
		fillWeight={0.5}
		hachureAngle={card.angle}
		opacity={0.4}
	/>

	<!-- Top: Description on the right -->
	<div class="relative z-10 flex justify-end">
		<p
			class="text-viz-grey-dark max-w-[23ch] bg-white/20 text-right text-2xl leading-relaxed font-medium italic"
		>
			{card.description}
		</p>
	</div>

	<!-- Bottom: Content -->
	<div class="relative z-10 flex items-end justify-between gap-8">
		<!-- Left: Label, Title, Tagline -->
		<div class="flex flex-col gap-3">
			<div class="text-xl font-medium {textColor[card.color]}">VIZCHITRA GUIDES</div>
			<h1 class="font-display-sans m-0 text-7xl leading-tight font-bold {textColor[card.color]}">
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
