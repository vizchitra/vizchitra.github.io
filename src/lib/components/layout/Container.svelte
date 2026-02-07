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
	 * @prop width - Max-width constraint ('prose' for text, 'narrow', 'content', 'wide', 'full') (default: 'content')
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
		paddingX = 'xl',
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

	const padXClasses: Record<Space, string> = {
		'0': 'px-0',
		xs: 'px-viz-xs',
		sm: 'px-viz-sm',
		md: 'px-viz-md',
		lg: 'px-viz-lg',
		xl: 'px-viz-xl',
		'2xl': 'px-viz-2xl',
		'3xl': 'px-viz-3xl',
		'4xl': 'px-viz-4xl',
		'5xl': 'px-viz-5xl'
	};

	const padYClasses: Record<Space, string> = {
		'0': 'py-0',
		xs: 'py-viz-xs',
		sm: 'py-viz-sm',
		md: 'py-viz-md',
		lg: 'py-viz-lg',
		xl: 'py-viz-xl',
		'2xl': 'py-viz-2xl',
		'3xl': 'py-viz-3xl',
		'4xl': 'py-viz-4xl',
		'5xl': 'py-viz-5xl'
	};
</script>

<svelte:element
	this={tag}
	{...rest}
	class={[
		'container mx-auto',
		widthClasses[width],
		padXClasses[paddingX],
		padYClasses[paddingY],
		className
	]}
>
	{@render children?.()}
</svelte:element>
