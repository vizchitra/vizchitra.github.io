<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, ClassValue } from 'svelte/elements';

	type Space = '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

	/**
	 * FullBleed - Breaks out of container to span full viewport width
	 *
	 * @prop paddingY - Vertical padding using spacing tokens (default: 'xl')
	 * @prop paddingX - Horizontal padding using spacing tokens (default: '0')
	 *
	 * @example
	 * <FullBleed paddingY="xl" paddingX="md">
	 *   <div>Full-width content with padding</div>
	 * </FullBleed>
	 */
	interface Props extends HTMLAttributes<HTMLElement> {
		paddingY?: Space;
		paddingX?: Space;
		class?: ClassValue;
		children?: Snippet;
	}

	let {
		paddingY = 'xl',
		paddingX = '0',
		class: className = '',
		children,
		...rest
	}: Props = $props();
</script>

<div
	{...rest}
	class={['full-bleed', className]}
	style:--full-bleed-paddingY="var(--spacing-{paddingY})"
	style:--full-bleed-paddingX="var(--spacing-{paddingX})"
>
	{@render children?.()}
</div>

<style>
	.full-bleed {
		width: 100vw;
		margin-left: calc(50% - 50vw);
		margin-right: calc(50% - 50vw);
		position: relative;
		left: 0;
		right: 0;
		padding-block: var(--full-bleed-paddingY);
		padding-inline: var(--full-bleed-paddingX);
	}
</style>
