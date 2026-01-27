<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, ClassValue } from 'svelte/elements';

	type Gap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	type Align = 'start' | 'end' | 'center' | 'stretch' | 'baseline';
	type Justify = 'start' | 'end' | 'center' | 'stretch';

	/**
	 * Grid - Auto-fit CSS Grid with responsive column sizing
	 *
	 * @prop minWidth - Minimum column width (default: '280px'). Columns auto-fill based on available space.
	 * @prop space - Spacing between grid items using spacing tokens (default: 'md')
	 * @prop align - Vertical alignment of items within cells (default: 'stretch')
	 * @prop justify - Horizontal alignment of items within cells (default: 'stretch')
	 *
	 * @example
	 * <Grid minWidth="300px" gap="lg" align="start">
	 *   <Card />
	 *   <Card />
	 *   <Card />
	 * </Grid>
	 */
	interface Props extends HTMLAttributes<HTMLDivElement> {
		minWidth?: string;
		gap?: Gap;
		align?: Align; // Vertical alignment of items in cells
		justify?: Justify; // Horizontal alignment of items in cells
		class?: ClassValue;
		children?: Snippet;
	}

	let {
		minWidth = '20rem',
		gap = 'md',
		align = 'center',
		justify = 'center',
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const gapValue = $derived(`var(--spacing-${gap}`);
</script>

<div
	{...rest}
	class={['grid-system', className]}
	style:--grid-min-width={minWidth}
	style:--grid-space={gapValue}
	style:--grid-align={align}
	style:--grid-justify={justify}
>
	{@render children?.()}
</div>

<style>
	.grid-system {
		display: grid;
		width: 100%;
		margin-inline: auto;
		grid-template-columns: repeat(auto-fill, minmax(min(var(--grid-min-width), 100%), 1fr));
		align-items: var(--grid-align, stretch);
		justify-items: var(--grid-justify, stretch);
		gap: var(--grid-space, var(--spacing-md));
	}
	/* Ensure images or pre tags don't break the grid flow */
	.grid-system > :global(*) {
		min-width: 0;
	}
</style>
