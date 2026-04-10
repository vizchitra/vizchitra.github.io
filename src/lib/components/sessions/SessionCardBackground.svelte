<script lang="ts">
	import PatternWaves from '../patterns/PatternWaves.svelte';
	import PatternRiver from '../patterns/PatternRiver.svelte';

	interface Props {
		sessionType: string;
		color: string;
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

<!-- Swap pattern based on sessionType. Default to waves for now. -->
{#if sessionType === 'Talks'}
	<PatternWaves
		tone={color}
		{variation}
		{width}
		{height}
		layerConfig={wavesLayerConfig}
		class={className}
	/>
{:else if sessionType === 'Dialogues'}
	<PatternRiver tone={color} {variation} {width} {height} class={className} />
{:else}
	<PatternWaves
		tone={color}
		{variation}
		{width}
		{height}
		layerConfig={wavesLayerConfig}
		class={className}
	/>
{/if}
