<script lang="ts">
	import type { Snippet } from 'svelte';

	type Color = 'pink' | 'blue' | 'teal' | 'orange' | 'yellow' | 'grey' | 'black';

	interface Props {
		color?: Color;
		cite?: string;
		children?: Snippet;
		class?: string;
	}

	let { color = 'pink', cite, children, class: className = '' }: Props = $props();
</script>

<blockquote
	class="blockquote blockquote-{color} {className}"
	style:--blockquote-color="var(--color-{color})"
>
	<div class="blockquote-content">
		{@render children?.()}
	</div>
	{#if cite}
		<footer class="blockquote-cite"><cite>{cite}</cite></footer>
	{/if}
</blockquote>

<style>
	.blockquote {
		margin: var(--spacing-lg) 0;
		padding-left: var(--spacing-md);
		padding-right: var(--spacing-md);
		padding-block: var(--spacing-md);
		border-left: 4px solid var(--blockquote-color);
		font-style: italic;
		opacity: 0.9;
		background-color: rgba(var(--blockquote-color, 0), 0.05);
		border-radius: 0 var(--radius-md) var(--radius-md) 0;
	}

	.blockquote-content {
		font-size: var(--text-body);
		line-height: var(--leading-relaxed);
	}

	.blockquote-cite {
		font-style: normal;
		opacity: 0.7;
		margin-top: var(--spacing-sm);
		font-size: var(--text-caption);
		font-weight: var(--font-weight-medium);
	}

	cite {
		font-style: italic;
	}
</style>
