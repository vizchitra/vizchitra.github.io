<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Position = 'relative' | 'absolute' | 'fixed' | 'sticky';
	type Overflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		position?: Position;
		/** Can be a boolean for 0px or a specific CSS string (e.g., '1rem') */
		inset?: boolean | string;
		zIndex?: number | string;
		overflow?: Overflow;
		children?: Snippet;
	}

	let {
		position = 'relative',
		inset = false,
		zIndex,
		overflow,
		class: className,
		children,
		...rest
	}: Props = $props();

	// Compute styles into a single string or object to keep the template clean
	const layerStyles = $derived({
		position,
		overflow,
		zIndex: zIndex?.toString(),
		inset: typeof inset === 'string' ? inset : inset ? '0' : undefined
	});
</script>

<div
	{...rest}
	class={['layer', className]}
	style:position={layerStyles.position}
	style:overflow={layerStyles.overflow}
	style:z-index={layerStyles.zIndex}
	style:inset={layerStyles.inset}
>
	{@render children?.()}
</div>

<style>
	.layer-utility {
		/* Ensure the div doesn't break layouts by default */
		display: block;
		box-sizing: border-box;
	}
</style>
