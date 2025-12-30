<script lang="ts">
	import { formatSlantedText } from '$lib/utils/slanting';

	let {
		color = 'pink',
		align = 'center',
		tag = 'h2',
		plain = false,
		textContent = '',
		class: className = '',
		classes = ''
	} = $props<{
		color?: string;
		align?: string;
		tag?: string;
		plain?: boolean;
		textContent?: string;
		class?: string;
		classes?: string;
	}>();

	function escapeHtml(str: string) {
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	// Helper getters for class strings (evaluate at render time)
	function finalClass() {
		return className ? className : classes;
	}

	function baseClasses() {
		return plain ? '' : 'content-subheading mt-12 mb-12';
	}

	function alignClass() {
		return align ? `text-${align}` : '';
	}

	function colorClass() {
		return color ? `text-viz-${color}-dark` : '';
	}
</script>

<svelte:element
	this={tag}
	class="not-prose {baseClasses()} {colorClass()} {alignClass()} font-normal {finalClass()}"
>
	{#if textContent}
		{#each formatSlantedText(textContent) as l}
			<span class="slanted-text" style="--letter-slant: {l.slant}">{escapeHtml(l.letter)}</span>
		{/each}
	{:else}
		<!-- Render nothing when no textContent provided to enforce textContent-only API -->
	{/if}
</svelte:element>
