<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, ClassValue } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLElement> {
		tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		align?: 'left' | 'center' | 'right';
		children?: Snippet;
		class?: ClassValue;
	}

	let { tag = 'h2', align = 'left', children, class: className = '', ...rest }: Props = $props();

	const alignClasses = {
		left: 'text-left',
		center: 'text-center',
		right: 'text-right'
	};

	// Define the Hierarchy "Bundles"
	const tagClasses: Record<string, string> = {
		h1: 'text-viz-4xl font-[350] leading-[1.25] tracking-[-0.01] max-w-prose text-balance',
		h2: 'text-viz-2xl font-[350] leading-[1.25] max-w-prose text-balance',
		h3: 'text-viz-xl font-[350] leading-[1.25] uppercase tracking-wide opacity-90 max-w-prose',
		h4: 'text-viz-lg font-[550] leading-[1.25]  max-w-prose',
		h5: 'text-viz-lg font-[650] leading-[1.25] opacity-60 max-w-prose',
		h6: 'text-viz-lg font-[750] leading-[1.25] uppercase tracking-[-0.1] max-w-prose'
	};
</script>

<svelte:element this={tag} {...rest} class={[alignClasses[align], tagClasses[tag], className]}>
	{@render children?.()}
</svelte:element>
