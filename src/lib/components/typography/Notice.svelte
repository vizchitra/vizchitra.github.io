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

<div
	class="prose prose-lg prose-viz mb-8 max-w-none rounded-lg border-2 p-6 md:p-8 {colorClass} {className}"
>
	{@render children?.()}
</div>
