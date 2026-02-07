<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, ClassValue } from 'svelte/elements';

	type Tag = 'p' | 'small';
	type Type = 'lead' | 'body' | 'caption' | 'small';
	type Color = 'black' | 'grey' | 'yellow' | 'blue' | 'teal' | 'pink' | 'orange';
	type Align = 'left' | 'center' | 'right';

	interface Props extends HTMLAttributes<HTMLElement> {
		type?: Type;
		align?: Align;
		color?: Color;
		tag?: Tag;
		class?: string;
		children?: Snippet;
	}

	let {
		type = 'body',
		align = 'left',
		color = 'black',
		tag,
		class: className = '',
		children,
		...rest
	}: Props = $props();

	// Define the Hierarchy "Bundles"
	const typeClasses: Record<string, string> = {
		lead: 'text-body font-normal leading-relaxed text-opacity-80',
		body: 'text-body font-normal leading-normal',
		caption: 'text-body font-medium leading-none uppercase tracking-wide opacity-60',
		small: 'text-body font-normal leading-tight opacity-60'
	};

	const alignClasses: Record<Align, string> = {
		left: 'text-left',
		center: 'text-center',
		right: 'text-right'
	};

	// Color Mapping
	const colorClasses: Record<Color, string> = {
		black: 'text-viz-black',
		grey: 'text-viz-grey-dark',
		yellow: 'text-viz-yellow-dark',
		blue: 'text-viz-blue-dark',
		teal: 'text-viz-teal-dark',
		pink: 'text-viz-pink-dark',
		orange: 'text-viz-orange-dark'
	};

	const finalTag = $derived(tag ?? (type === 'small' ? 'small' : 'p'));
</script>

<svelte:element
	this={finalTag}
	{...rest}
	class={[typeClasses[type], alignClasses[align], colorClasses[color], className]}
>
	{@render children?.()}
</svelte:element>

<style>
	.text {
		/* Optimization: prevent body text from becoming too wide to read */
		max-width: var(--width-prose);
		text-wrap: balance;
	}
</style>
