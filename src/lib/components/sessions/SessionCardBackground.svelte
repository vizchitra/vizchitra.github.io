<script lang="ts">
	import PatternWaves from '../patterns/PatternWaves.svelte';
	import PatternRiver from '../patterns/PatternRiver.svelte';
	import PatternCircle from '../patterns/PatternCircle.svelte';
	import PatternStream from '../patterns/PatternStream.svelte';

	interface Props {
		sessionType: string;
		color: 'blue' | 'teal' | 'orange' | 'pink' | 'yellow';
		slug: string;
		title: string;
		width: number;
		height: number;
		class?: string;
	}

	let { sessionType, color, slug, title, width, height, class: className = '' }: Props = $props();

	function hashStringToUnit(s: string): number {
		let h = 0;
		for (let i = 0; i < s.length; i++) {
			h = (h * 31 + s.charCodeAt(i)) % 1000000007;
		}
		return (h % 1000000) / 1000000;
	}

	const variation = $derived(hashStringToUnit(slug ?? title));

	const wavesLayerConfig = [
		{ yFactor: 0.3, ampFactor: 1.5, frequency: 1.8, fillKey: 'light' as const, hatched: true },
		{ yFactor: 0.5, ampFactor: 1.2, frequency: 1.5, fill: '#778ECE' }
	];
</script>

<div class="session-card-background relative overflow-visible {className}">
	{#if sessionType === 'Talks'}
		<PatternWaves
			tone={color}
			{variation}
			{width}
			height={height * 0.8}
			layerConfig={wavesLayerConfig}
			class="absolute inset-0 h-full w-full -translate-y-[25%] overflow-visible"
		/>
	{:else if sessionType === 'Dialogues'}
		<PatternRiver
			tone={color}
			{variation}
			{width}
			{height}
			class="absolute inset-0 h-full w-full overflow-visible"
		/>
	{:else if sessionType === 'Workshop'}
		<PatternCircle
			tone={color}
			{variation}
			{width}
			height={height * 0.8}
			showHatch={false}
			class="absolute inset-0 h-full w-full -translate-y-[25%] overflow-visible"
		/>
	{:else if sessionType === 'Exhibition'}
		<PatternStream
			tone={color}
			{variation}
			{width}
			height={height * 0.8}
			class="absolute inset-0 h-full w-full -translate-y-[25%] overflow-visible"
		/>
	{:else}
		<PatternWaves
			tone={color}
			{variation}
			{width}
			height={height * 0.8}
			layerConfig={wavesLayerConfig}
			class="absolute inset-0 h-full w-full -translate-y-[25%] overflow-visible"
		/>
	{/if}
</div>

<style>
	.session-card-background::after {
		/* content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 20%;
		background: linear-gradient(to bottom, var(--color-viz-white), transparent);
		pointer-events: none; */
	}
</style>
