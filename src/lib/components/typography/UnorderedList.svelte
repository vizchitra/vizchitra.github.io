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

<ul class="ul {className}" style:--list-spacing="var(--spacing-{space})">
	{@render children?.()}
</ul>

<style>
	.ul {
		list-style: disc;
		list-style-position: outside;
		margin: var(--spacing-lg) 0;
		margin-left: var(--spacing-lg);
		padding: 0;
	}

	:global(.ul > li) {
		margin-top: calc(var(--list-spacing) / 2);
		line-height: var(--leading-normal);
	}

	:global(.ul > li:first-child) {
		margin-top: 0;
	}

	:global(.ul > li + li) {
		margin-top: var(--list-spacing);
	}
</style>
