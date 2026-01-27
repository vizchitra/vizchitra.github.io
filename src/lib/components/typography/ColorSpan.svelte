<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, ClassValue } from 'svelte/elements';

	type Color = 'black' | 'grey' | 'yellow' | 'blue' | 'teal' | 'pink' | 'orange';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		color?: Color;
		class: ClassValue;
		children: Snippet;
	}

	let { color = 'pink', children, ...rest }: Props = $props();

	const colorClasses: Record<Color, string> = {
		pink: 'text-pink-strong',
		orange: 'text-orange-strong',
		yellow: 'text-yellow-strong',
		teal: 'text-teal-strong',
		blue: 'text-blue-strong',
		black: 'text-black',
		grey: 'text-grey-strong'
	};
</script>

<span {...rest} class={[colorClasses[color], 'font-bold']}>{@render children()}</span>
