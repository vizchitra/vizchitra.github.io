<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, ClassValue } from 'svelte/elements';

	type Tag = 'h1' | 'h2' | 'h3' | 'h4';
	type Type = 'display' | 'title' | 'subtitle';
	type Color = 'black' | 'grey' | 'yellow' | 'blue' | 'teal' | 'pink' | 'orange';
	type Align = 'left' | 'center' | 'right';

	interface Props extends HTMLAttributes<HTMLElement> {
		type?: Type;
		align?: Align;
		color?: Color;
		tag?: Tag;
		class?: ClassValue;
		children?: Snippet;
	}

	let {
		type = 'title',
		align = 'left',
		color = 'black',
		tag,
		class: className = '',
		children,
		...rest
	}: Props = $props();

	// Define the Hierarchy "Bundles"
	const typeClasses: Record<Type, string> = {
		display: 'text-display font-display font-bold leading-tight tracking-tight',
		title: 'text-title font-display font-semibold leading-tight',
		subtitle: 'text-subtitle font-display font-normal leading-relaxed text-opacity-80'
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

	const finalTag = $derived(tag ?? (type === 'display' ? 'h1' : type === 'title' ? 'h2' : 'h3'));
</script>

<svelte:element
	this={finalTag}
	{...rest}
	class={[typeClasses[type], alignClasses[align], colorClasses[color], className]}
>
	{@render children?.()}
</svelte:element>
