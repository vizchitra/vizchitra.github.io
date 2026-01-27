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
		lead: 'text-lead font-normal leading-relaxed text-opacity-80',
		body: 'text-body font-normal leading-normal',
		caption: 'text-caption font-medium leading-none uppercase tracking-wide opacity-60',
		small: 'text-small font-normal leading-tight opacity-60'
	};

	const alignClasses: Record<Align, string> = {
		left: 'text-left',
		center: 'text-center',
		right: 'text-right'
	};

	// Color Mapping
	const colorClasses: Record<Color, string> = {
		black: 'text-black',
		grey: 'text-grey-strong',
		yellow: 'text-yellow-strong',
		blue: 'text-blue-strong',
		teal: 'text-teal-strong',
		pink: 'text-pink-strong',
		orange: 'text-orange-strong'
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
