<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, ClassValue } from 'svelte/elements';

	type Space = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	type Align = 'start' | 'end' | 'center' | 'baseline' | 'stretch';

	/**
	 * Stack - Vertical flexbox layout with consistent spacing between children
	 *
	 * The primary layout primitive for arranging items vertically. Maintains
	 * consistent spacing and alignment throughout the component hierarchy.
	 *
	 * @prop space - Spacing between items using spacing tokens (default: 'md')
	 * @prop align - Vertical alignment of items ('start', 'end', 'center', 'baseline', 'stretch')
	 *
	 * @example
	 * <Stack space="lg" align="start">
	 *   <Heading>Title</Heading>
	 *   <Text>Description</Text>
	 *   <Button>Action</Button>
	 * </Stack>
	 */
	interface Props extends HTMLAttributes<HTMLDivElement> {
		space?: Space;
		align?: Align;
		class?: ClassValue;
		children?: Snippet;
	}

	let {
		space = 'md',
		align = 'stretch',
		class: className = '',
		children,
		...rest
	}: Props = $props();

	// Map Align keywords to flexbox values
	const alignMap: Record<string, string> = {
		start: 'flex-start',
		end: 'flex-end',
		center: 'center',
		baseline: 'baseline',
		stretch: 'stretch'
	};

	const alignValue = $derived(alignMap[align] ?? align);
	const spaceValue = $derived(`var(--spacing-${space})`);
</script>

<div
	{...rest}
	class={['stack', className]}
	style:--stack-space={spaceValue}
	style:--stack-align={alignValue}
>
	{@render children?.()}
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		align-items: var(--stack-align, center);
		gap: var(--stack-space, var(--spacing-md));
	}
</style>