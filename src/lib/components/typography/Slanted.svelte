<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, ClassValue } from 'svelte/elements';
	import { formatSlantedText } from '$lib/utils/slanted';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		color?: 'pink' | 'orange' | 'yellow' | 'teal' | 'blue' | 'black' | 'grey';
		textContent?: string;
		class?: ClassValue;
	}

	let { color = 'pink', textContent = '', class: className = '', ...rest }: Props = $props();

	const colorClasses: Record<string, string> = {
		pink: 'text-viz-pink-dark',
		orange: 'text-viz-orange-dark',
		yellow: 'text-viz-yellow-dark',
		teal: 'text-viz-teal-dark',
		blue: 'text-viz-blue-dark',
		black: 'text-viz-black',
		grey: 'text-viz-grey-dark'
	};

	let letters = $derived(textContent ? formatSlantedText(textContent) : []);
</script>

<span {...rest} class={['font-display', colorClasses[color]]}>
	{#if letters.length}
		{#each letters as l}
			<span class="slanted" style="--letter-slant: {l.slant}">{l.letter}</span>
		{/each}
	{/if}
</span>

<style>
	.slanted {
		font-variation-settings: 'slnt' var(--letter-slant);
	}
</style>
