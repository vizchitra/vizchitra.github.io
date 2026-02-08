<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, ClassValue } from 'svelte/elements';

	type Width = 'narrow' | 'content' | 'wide' | 'full';
	type Space = '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

	/**
	 * Container - Centered content wrapper with width constraints and padding
	 *
	 * The primary page structure wrapper. Centers content horizontally, applies
	 * maximum width constraints, and adds responsive padding. Ensures consistent
	 * content layout across all pages.
	 *
	 * @prop width - Max-width constraint ('narrow', 'content', 'wide', 'full') (default: 'content')
	 * @prop paddingX - Horizontal padding using spacing tokens (default: 'md')
	 * @prop paddingY - Vertical padding using spacing tokens (default: '3xl')
	 * @prop tag - HTML element to render (default: 'div')
	 *
	 * @example
	 * <Container width="content" paddingY="lg">
	 *  <Stack gap="lg">
	 *   <Prose>
	 *       <!-- Page content -->
	 *   </Prose>
	 *  </Stack>
	 * </Container>
	 */
	interface Props extends HTMLAttributes<HTMLElement> {
		tag?: string;
		paddingY?: Space;
		paddingX?: Space;
		width?: Width;
		class?: ClassValue;
		children?: Snippet;
	}

	let {
		tag = 'div',
		paddingY = '3xl',
		width = 'content',
		paddingX = 'lg',
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const widthClasses: Record<Width, string> = {
		narrow: 'max-w-3xl',
		content: 'max-w-5xl',
		wide: 'max-w-7xl',
		full: 'w-full'
	};

	const paddingXValue = $derived(paddingX === '0' ? '0' : `var(--spacing-viz-${paddingX})`);
	const paddingYValue = $derived(paddingY === '0' ? '0' : `var(--spacing-viz-${paddingY})`);
</script>

<svelte:element
	this={tag}
	{...rest}
	class={['container-wrapper mx-auto', widthClasses[width], className]}
	style:--container-padding-x={paddingXValue}
	style:--container-padding-y={paddingYValue}
>
	{@render children?.()}
</svelte:element>

<style>
	.container-wrapper {
		padding-left: var(--container-padding-x, var(--spacing-viz-xl));
		padding-right: var(--container-padding-x, var(--spacing-viz-xl));
		padding-top: var(--container-padding-y, var(--spacing-viz-3xl));
		padding-bottom: var(--container-padding-y, var(--spacing-viz-3xl));
	}
</style>
