<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, ClassValue } from 'svelte/elements';

	type Width = 'prose' | 'narrow' | 'content' | 'wide' | 'full';
	type Space = '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

	/**
	 * Container - Centered content wrapper with width constraints and padding
	 *
	 * The primary page structure wrapper. Centers content horizontally, applies
	 * maximum width constraints, and adds responsive padding. Ensures consistent
	 * content layout across all pages.
	 *
	 * @prop width - Max-width constraint ('prose' for text, 'narrow', 'content', 'wide', 'full') (default: 'content')
	 * @prop paddingX - Horizontal padding using spacing tokens (default: 'md')
	 * @prop paddingY - Vertical padding using spacing tokens (default: 'md')
	 * @prop tag - HTML element to render (default: 'div')
	 *
	 * @example
	 * <Container width="content" paddingY="lg">
	 *   <Prose>
	 *     <Stack gap="lg">
	 *       <!-- Page content -->
	 *     </Stack>
	 *   </Prose>
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
		paddingY = 'md',
		width = 'content',
		paddingX = 'md',
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const widthClasses: Record<Width, string> = {
		prose: 'max-w-prose',
		narrow: 'max-w-narrow',
		content: 'max-w-content',
		wide: 'max-w-wide',
		full: 'w-full'
	};

	const padXClasses: Record<Space, string> = {
		'0': 'px-0',
		xs: 'px-xs',
		sm: 'px-sm',
		md: 'px-md',
		lg: 'px-lg',
		xl: 'px-xl',
		'2xl': 'px-2xl'
	};

	const padYClasses: Record<Space, string> = {
		'0': 'py-0',
		xs: 'py-xs',
		sm: 'py-sm',
		md: 'py-md',
		lg: 'py-lg',
		xl: 'py-xl',
		'2xl': 'py-2xl'
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