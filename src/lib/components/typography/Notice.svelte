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
		grey: 'bg-grey-light border-grey',
		pink: 'bg-pink-light border-pink-dark',
		blue: 'bg-blue-light border-blue-dark',
		teal: 'bg-teal-light border-teal-dark',
		yellow: 'bg-yellow-light border-yellow-dark',
		orange: 'bg-orange-light border-orange-dark'
	};

	let colorClass = $derived(colorClasses[color]);
</script>

<div class="prose-viz mb-lg p-md md:p-lg rounded-lg border-2 {colorClass} {className}">
	{@render children?.()}
</div>
