<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		color?: 'pink' | 'orange' | 'yellow' | 'teal' | 'blue' | 'black' | 'grey';
		bold?: boolean;
		children: Snippet;
	}

	let { color = 'pink', bold = true, children }: Props = $props();

	const colorClasses: Record<string, string> = {
		pink: 'text-viz-pink-dark',
		orange: 'text-viz-orange-dark',
		yellow: 'text-viz-yellow-dark',
		teal: 'text-viz-teal-dark',
		blue: 'text-viz-blue-dark',
		black: 'text-viz-black',
		grey: 'text-viz-grey-dark'
	};

	const colorClass = $derived(colorClasses[color] ?? colorClasses.pink);
</script>

<span class="{colorClass} {bold ? 'font-bold' : ''}">{@render children()}</span>
