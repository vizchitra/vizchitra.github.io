<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, ClassValue } from 'svelte/elements';

	type Position = 'center' | 'top' | 'bottom' | 'left' | 'right' | string;
	type Ratio = 'square' | 'portrait' | 'landscape' | 'video' | 'ultrawide' | string;
	type Width = string;

	/**
	 * Frame - Maintains aspect ratio while containing images/videos
	 *
	 * @prop ratio - Aspect ratio: 'square', 'portrait', 'landscape', 'video', 'ultrawide', or custom (e.g., '2/1')
	 * @prop position - Content position: 'center', 'top', 'bottom', 'left', 'right', or CSS object-position value
	 * @prop width - Optional width constraint (e.g., '100%', '400px')
	 * @prop height - Optional height constraint (e.g., '80svh', '400px')
	 * @prop tag - HTML element tag (default: 'div')
	 *
	 * @example
	 * <Frame ratio="video" position="center" width="100%">
	 *   <img src="image.jpg" alt="Description" />
	 * </Frame>
	 */
	interface Props extends HTMLAttributes<HTMLElement> {
		ratio?: Ratio;
		position?: Position;
		class?: ClassValue;
		width?: Width;
		height?: Width;
		tag?: string;
		children?: Snippet;
	}

	let {
		ratio = 'landscape',
		position = 'center',
		class: className = '',
		width,
		height,
		children,
		...rest
	}: Props = $props();

	const ratioTokens: Record<string, string> = {
		square: '1/1',
		portrait: '3/4',
		landscape: '4/3',
		video: '16/9',
		ultrawide: '21/9'
	};

	const resolvedRatio = $derived(ratioTokens[ratio] || ratio);

	const hasWidth = $derived(!!width);
	const hasHeight = $derived(!!height);
</script>

<div
	{...rest}
	class={['frame', className]}
	style:--position={position}
	style:--width={width}
	style:height
	style:aspect-ratio={hasWidth && hasHeight ? undefined : resolvedRatio}
>
	{@render children?.()}
</div>

<style>
	.frame {
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		width: var(--width);
		height: auto;
		/* This ensures children fill the frame */
	}

	/* Target nested images or videos automatically */
	.frame :global(> img),
	.frame :global(> video) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: var(--position, center);
	}
</style>
