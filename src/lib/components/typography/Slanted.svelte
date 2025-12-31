<script lang="ts">
	import { formatSlantedText } from '$lib/utils/slanted';

	export let color: string = 'pink';
	export let align: string = 'center';
	export let tag: string = 'span';
	export let plain: boolean = false;
	export let textContent: string = '';
	export let className: string = '';
	export let classes: string = '';

	$: finalClass = className ? className : classes;
	$: baseClass = plain ? '' : 'content-subheading mt-12 mb-12';
	$: alignClass = align ? `text-${align}` : '';
	$: colorClass = color ? `text-viz-${color}-dark` : '';
	$: letters = textContent ? formatSlantedText(textContent) : [];
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
