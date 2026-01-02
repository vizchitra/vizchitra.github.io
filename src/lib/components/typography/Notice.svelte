<script lang="ts">
	import type { Snippet } from 'svelte';

	type Color = 'grey' | 'pink' | 'blue' | 'teal' | 'yellow' | 'orange';

	interface Props {
		color?: Color;
		children?: Snippet;
		class?: string;
	}

	let { color = 'grey', children, class: className = '' }: Props = $props();

	const colorClasses: Record<Color, string> = {
		grey: 'bg-gray-100 border-gray-300',
		pink: 'bg-viz-pink-light border-viz-pink-dark',
		blue: 'bg-viz-blue-light border-viz-blue-dark',
		teal: 'bg-viz-teal-light border-viz-teal-dark',
		yellow: 'bg-viz-yellow-light border-viz-yellow-dark',
		orange: 'bg-viz-orange-light border-viz-orange-dark'
	};

	let colorClass = $derived(colorClasses[color]);
</script>

<div class="notice-prose mb-8 rounded-lg border-2 p-6 md:p-8 {colorClass} {className}">
	{@render children?.()}
</div>

<style>
	.notice-prose {
		color: var(--viz-color-black);
	}
	.notice-prose :global(p) {
		margin-block: 0.5rem;
		font-size: 1rem;
		line-height: 1.6;
	}
	.notice-prose :global(p:first-child) {
		margin-block-start: 0;
	}
	.notice-prose :global(p:last-child) {
		margin-block-end: 0;
	}
	.notice-prose :global(ul),
	.notice-prose :global(ol) {
		margin-block: 0.5rem;
		padding-inline-start: 1.5rem;
	}
	.notice-prose :global(li) {
		margin-block: 0.25rem;
	}
	.notice-prose :global(li::marker) {
		color: var(--viz-color-grey-dark);
		font-weight: 600;
	}
	.notice-prose :global(a) {
		color: var(--viz-color-black);
		text-decoration: underline;
	}
	.notice-prose :global(strong) {
		font-weight: 700;
	}
</style>
