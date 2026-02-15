<script lang="ts">
	import { Header, DeckCard, ToolsCard, ToolsHeader } from '$lib/components';

	type CardColor = 'pink' | 'blue' | 'teal' | 'yellow' | 'orange';

	interface DeckCard {
		title: string;
		tagline: string;
		description: string;
		color: CardColor;
		href: string;
		angle: number;
	}

	const cards: DeckCard[] = [
		{
			title: 'TALKS',
			tagline: 'The Narrative Journey',
			description: 'Story-driven presentations rooted in lived experiences',
			color: 'blue',
			href: '/guides/talks',
			angle: 50
		},
		{
			title: 'DIALOGUES',
			tagline: 'The Shared Journey',
			description: 'Participant-led conversation exploring shared questions',
			color: 'teal',
			href: '/guides/dialogues',
			angle: 120
		},
		{
			title: 'WORKSHOPS',
			tagline: 'The Practice Journey',
			description: 'Hands-on session focussed on practice & skill building',
			color: 'pink',
			href: '/guides/workshops',
			angle: 146
		},
		{
			title: 'EXHIBITION',
			tagline: 'The Immersive Journey',
			description: 'Immersive, data-driven work that invite exploration',
			color: 'orange',
			href: '/guides/exhibition',
			angle: 23
		},
		{
			title: 'PANELS',
			tagline: 'The Collective Journey',
			description: 'Moderated discussions that brings multiple perspectives',
			color: 'yellow',
			href: '/guides/panels',
			angle: 132
		}
	];

	// Map color names to hex colors (for html2canvas compatibility)
	const colorVars: Record<CardColor, string> = {
		pink: '#EF75AB',
		blue: '#9FBAFC',
		teal: '#88E0D8',
		yellow: '#FFD485',
		orange: '#FC915B'
	};

	const textColor: Record<CardColor, string> = {
		pink: 'text-pink-900',
		blue: 'text-blue-900',
		teal: 'text-teal-900',
		yellow: 'text-yellow-900',
		orange: 'text-orange-900'
	};

	// Social media card dimensions
	const cardSizes = {
		'twitter-summary': { width: 1200, height: 628, label: 'Twitter/X Card (1200×628)' },
		'twitter-large': { width: 1200, height: 600, label: 'Twitter/X Large (1200×600)' },
		'facebook-og': { width: 1200, height: 630, label: 'Facebook OG (1200×630)' },
		linkedin: { width: 1200, height: 627, label: 'LinkedIn (1200×627)' },
		'instagram-square': { width: 1080, height: 1080, label: 'Instagram Square (1080×1080)' },
		'instagram-story': { width: 1080, height: 1920, label: 'Instagram Story (1080×1920)' }
	};

	let selectedCard = $state(cards[0]);
	let selectedSize = $state<keyof typeof cardSizes>('twitter-summary');
	let canvasRef: HTMLDivElement;
</script>

<Header banner="square" color="grey" />

<section class="mx-auto max-w-7xl space-y-10 px-2 py-12">
	<ToolsHeader
		trail={[
			{ href: '/tools', label: 'Tools' },
			{ href: '/tools/cards', label: 'Share Cards' }
		]}
		title="Share Card Generator"
		subtitle="Generate social media share cards and preview images based on VizChitra guide cards. Perfect for promoting sessions across different platforms."
	/>

	<!-- Card Selector -->
	<ToolsCard widthClass="w-full">
		<div class="grid gap-6 md:grid-cols-2">
			<div>
				<label for="card-select" class="text-viz-black mb-2 block text-lg font-bold"
					>Select Guide:</label
				>
				<select
					id="card-select"
					bind:value={selectedCard}
					class="border-viz-grey focus:border-viz-blue text-md w-full rounded-md border-2 bg-white px-4 py-2 font-medium focus:outline-none"
				>
					{#each cards as card}
						<option value={card}>{card.title} - {card.tagline}</option>
					{/each}
				</select>
			</div>

			<div>
				<label for="size-select" class="text-viz-black mb-2 block text-lg font-bold"
					>Card Size:</label
				>
				<select
					id="size-select"
					bind:value={selectedSize}
					class="border-viz-grey focus:border-viz-blue text-md w-full rounded-md border-2 bg-white px-4 py-2 font-medium focus:outline-none"
				>
					{#each Object.entries(cardSizes) as [key, size]}
						<option value={key}>{size.label}</option>
					{/each}
				</select>
			</div>
		</div>
	</ToolsCard>

	<!-- Preview -->
	<ToolsCard widthClass="w-full">
		<div class="mb-6">
			<h2 class="text-viz-black mb-2 text-2xl font-bold">Preview</h2>
			<p class="text-viz-grey-dark mb-4 text-sm">
				{cardSizes[selectedSize].width}px × {cardSizes[selectedSize].height}px
			</p>
			<div class="bg-viz-blue-subtle rounded-lg border-2 border-blue-300 p-4">
				<h3 class="text-viz-black mb-2 text-sm font-bold">How to Save:</h3>
				<ul class="text-viz-grey-dark space-y-1 text-sm">
					<li><strong>Mac:</strong> Cmd + Shift + 4, then press Space and click the card</li>
					<li><strong>Windows:</strong> Use Snipping Tool or Win + Shift + S</li>
					<li>
						<strong>Browser:</strong> Right-click on card → "Inspect" → Right-click the element → "Capture
						node screenshot"
					</li>
				</ul>
			</div>
		</div>

		<div bind:this={canvasRef} class="flex justify-center">
			<div
				class="share-card-container"
				style="width: {Math.min(cardSizes[selectedSize].width, 1200)}px; max-width: 100%;"
			>
				<div
					style="aspect-ratio: {cardSizes[selectedSize].width} / {cardSizes[selectedSize].height};"
				>
					<DeckCard card={selectedCard} {colorVars} {textColor} />
				</div>
			</div>
		</div>
	</ToolsCard>
</section>
