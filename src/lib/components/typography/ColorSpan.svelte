<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		color?: 'pink' | 'orange' | 'yellow' | 'teal' | 'blue' | 'black' | 'grey';
		bold?: boolean;
		children: Snippet;
	}

	let { color = 'pink', bold = true, children }: Props = $props();

	const colorClasses: Record<string, string> = {
		pink: 'text-pink-dark',
		orange: 'text-orange-dark',
		yellow: 'text-yellow-dark',
		teal: 'text-teal-dark',
		blue: 'text-blue-dark',
		black: 'text-black',
		grey: 'text-grey-dark'
	};

	const classes = $derived(
		`${colorClasses[color] ?? colorClasses.pink} ${bold ? 'font-bold' : ''}`
	);
</script>

<span class={classes}>{@render children()}</span>
