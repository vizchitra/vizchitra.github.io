<script lang="ts">
	import { formatSlantedText } from '$lib/utils/slanted';

	interface Props {
		color?: string;
		align?: string;
		tag?: string;
		plain?: boolean;
		textContent?: string;
		className?: string;
		classes?: string;
	}

	let {
		color = 'pink',
		align = 'center',
		tag = 'p',
		plain = false,
		textContent = '',
		className = '',
		classes = ''
	}: Props = $props();

	let finalClass = $derived(className ? className : classes);
	let baseClass = $derived(plain ? '' : 'content-subheading mt-12 font-display mb-12');
	let alignClass = $derived(align ? `text-${align}` : '');
	let colorClass = $derived(color ? `text-viz-${color}-dark` : '');
	let letters = $derived(textContent ? formatSlantedText(textContent) : []);
</script>

<svelte:element
	this={tag}
	class="not-prose {baseClass} {colorClass} {alignClass} font-normal {finalClass}"
>
	{#if letters.length}
		{#each letters as l}
			<span class="slanted-text" style="--letter-slant: {l.slant}">{l.letter}</span>
		{/each}
	{/if}
</svelte:element>
