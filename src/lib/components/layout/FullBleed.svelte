<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, ClassValue } from 'svelte/elements';

	type Space = '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

	/**
	 * FullBleed - Full-viewport-width breakout wrapper
	 *
	 * Breaks content out of its parent container to span the full viewport width.
	 * Use inside Container to create edge-to-edge sections within a constrained layout.
	 *
	 * @prop paddingX - Horizontal padding using spacing tokens (default: '0')
	 * @prop paddingY - Vertical padding using spacing tokens (default: '0')
	 *
	 * @example
	 * <FullBleed paddingX="xl">
	 *   <Grid>...</Grid>
	 * </FullBleed>
	 */
	interface Props extends HTMLAttributes<HTMLDivElement> {
		paddingX?: Space;
		paddingY?: Space;
		class?: ClassValue;
		children?: Snippet;
	}

	let { paddingX = '0', paddingY = '0', class: className = '', children, ...rest }: Props =
		$props();

	const paddingXValue = $derived(paddingX === '0' ? '0' : `var(--spacing-viz-${paddingX})`);
	const paddingYValue = $derived(paddingY === '0' ? '0' : `var(--spacing-viz-${paddingY})`);
</script>

<div
	{...rest}
	class={['fullbleed-wrapper', className]}
	style:--fullbleed-padding-x={paddingXValue}
	style:--fullbleed-padding-y={paddingYValue}
>
	{@render children?.()}
</div>

<style>
	.fullbleed-wrapper {
		/* Breakout to full viewport width from container */
		width: 100vw;
		margin-left: calc(50% - 50vw);
		margin-right: calc(50% - 50vw);
		padding-left: var(--fullbleed-padding-x, 0);
		padding-right: var(--fullbleed-padding-x, 0);
		padding-top: var(--fullbleed-padding-y, 0);
		padding-bottom: var(--fullbleed-padding-y, 0);
		box-sizing: border-box;
	}
</style>
