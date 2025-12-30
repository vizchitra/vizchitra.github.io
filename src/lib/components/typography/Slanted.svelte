<script lang="ts">
	import { formatSlantedText } from '$lib/utils/utils';

	let {
		textContent = '',
		color = 'pink',
		align = 'center',
		tag = 'h2',
		plain = false,
		class: className = '',
		classes = '',
		children
	} = $props<{
		textContent?: string;
		color?: string;
		align?: string;
		tag?: string;
		plain?: boolean;
		class?: string;
		children?: import('svelte').Snippet;
		classes?: string;
	}>();

	const finalClass = $derived(className ? className : classes);

	// Fallback for character-level slanting if passed via slot
	function slantAction(node: HTMLElement) {
		if (textContent) return;
		const text = node.textContent?.trim();
		if (text) {
			const letters = formatSlantedText(text);
			node.innerHTML = letters
				.map(
					(l) => `<span class="slanted-text" style="--letter-slant: ${l.slant}">${l.letter}</span>`
				)
				.join('');
		}
	}

	// Derived classes for reactivity
	const baseClasses = $derived(plain ? '' : 'content-subheading mt-12');
	const alignClass = $derived(align ? `text-${align}` : '');
	const colorClass = $derived(color ? `text-viz-${color}-dark` : '');
</script>

<svelte:element
	this={tag}
	use:slantAction
	class="not-prose {baseClasses} {colorClass} {alignClass} font-normal {finalClass}"
>
	{#if textContent}
		{#each formatSlantedText(textContent) as letter}
			<span class="slanted-text" style="--letter-slant: {letter.slant}">
				{letter.letter}
			</span>
		{/each}
	{:else if children}
		{@render children()}
	{/if}
</svelte:element>
