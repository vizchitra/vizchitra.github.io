<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, ClassValue } from 'svelte/elements';

	type Space = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
	type Align = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
	type Justify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';

	/**
	 * Cluster - Horizontal flexbox layout with wrapping support
	 *
	 * Arranges items horizontally with automatic wrapping. Ideal for tags,
	 * button groups, pills, and any items that should flow left-to-right and
	 * wrap when space is constrained.
	 *
	 * @prop space - Spacing between items using spacing tokens (default: 'md'). Also accepts custom CSS values.
	 * @prop align - Vertical alignment within the cluster ('start', 'end', 'center', 'baseline', 'stretch')
	 * @prop justify - Horizontal distribution ('start', 'end', 'center', 'between', 'around', 'evenly')
	 *
	 * @example
	 * <Cluster space="sm" justify="start">
	 *   <Button>Primary</Button>
	 *   <Button>Secondary</Button>
	 *   <Button>Tertiary</Button>
	 * </Cluster>
	 **/

	interface Props extends HTMLAttributes<HTMLDivElement> {
		space?: Space;
		align?: Align;
		justify?: Justify;
		class?: ClassValue;
		children?: Snippet;
	}

	let {
		space = 'md',
		align = 'center',
		justify = 'center',
		class: className = '',
		children,
		...rest
	}: Props = $props();

	// Map Align keywords to flexbox values
	const AlignMap: Record<string, string> = {
		start: 'flex-start',
		end: 'flex-end',
		center: 'center',
		baseline: 'baseline',
		stretch: 'stretch'
	};

	// Map justify/align keywords to flexbox values
	const JustifyMap: Record<string, string> = {
		start: 'flex-start',
		end: 'flex-end',
		center: 'center',
		between: 'space-between',
		around: 'space-around',
		evenly: 'space-evenly'
	};

	const alignValue = $derived(AlignMap[align] ?? align);
	const justifyValue = $derived(JustifyMap[justify] ?? justify);
	const spaceValue = $derived(`var(--spacing-viz-${space})`);
</script>

<div
	{...rest}
	class={['cluster', className]}
	style:--cluster-space={spaceValue}
	style:--cluster-align={alignValue}
	style:--cluster-justify={justifyValue}
>
	{@render children?.()}
</div>

<style>
	.cluster {
		display: flex;
		flex-wrap: wrap;
		align-items: var(--cluster-align, center);
		justify-content: var(--cluster-justify, center);
		gap: var(--cluster-space, var(--spacing-viz-md));
	}
</style>
