<script lang="ts">
	import type { Snippet } from 'svelte';

	type Space = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

	interface Props {
		space?: Space;
		children?: Snippet;
		class?: string;
	}

	let { space = 'md', children, class: className = '' }: Props = $props();
</script>

<ol class="ol {className}" style:--list-spacing="var(--spacing-{space})">
	{@render children?.()}
</ol>

<style>
	.ol {
		list-style: decimal;
		list-style-position: outside;
		margin: var(--spacing-lg) 0;
		margin-left: var(--spacing-xl);
		padding: 0;
	}

	:global(.ol > li) {
		margin-top: calc(var(--list-spacing) / 2);
		line-height: var(--leading-normal);
	}

	:global(.ol > li:first-child) {
		margin-top: 0;
	}

	:global(.ol > li + li) {
		margin-top: var(--list-spacing);
	}
</style>
