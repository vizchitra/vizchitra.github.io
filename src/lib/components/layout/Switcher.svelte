<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, ClassValue } from 'svelte/elements';

	type Space = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	type Threshold = 'sm' | 'md' | 'lg' | 'xl';

	/**
	 * Switcher - Responsive layout that switches between row and column
	 *
	 * Uses CSS container queries to switch from vertical stack to horizontal row
	 * when the container width exceeds the threshold.
	 *
	 * @prop threshold - Size at which to switch: 'sm' (20rem), 'md' (30rem), 'lg' (40rem), 'xl' (50rem)
	 * @prop space - Spacing between items using spacing tokens (default: 'md')
	 * @prop limit - Maximum items in a row before wrapping (2-6)
	 *
	 * @example
	 * <Switcher threshold="md" space="lg">
	 *   <Card>Item 1</Card>
	 *   <Card>Item 2</Card>
	 * </Switcher>
	 */
	interface Props extends HTMLAttributes<HTMLDivElement> {
		threshold?: Threshold;
		space?: Space;
		limit?: 2 | 3 | 4 | 5 | 6;
		class?: ClassValue;
		children?: Snippet;
	}

	let {
		threshold = 'md',
		space = 'md',
		limit,
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const spaceValue = $derived(`var(--spacing-viz-${space})`);
</script>

<div
	{...rest}
	class={['switcher', className]}
	style:--switcher-space={spaceValue}
	data-threshold={threshold}
	data-limit={limit}
>
	<div class="switcher-inner">
		{@render children?.()}
	</div>
</div>

<style>
	.switcher {
		container-type: inline-size;
		width: 100%;
	}

	.switcher-inner {
		display: grid;
		gap: var(--switcher-space, var(--spacing-md));
		grid-template-columns: 1fr;
	}

	/* Threshold breakpoints using container queries */
	/* sm: 20rem (320px) */
	@container (min-width: 20rem) {
		.switcher[data-threshold='sm'] > .switcher-inner {
			grid-auto-flow: column;
			grid-auto-columns: 1fr;
		}
	}

	/* md: 30rem (480px) */
	@container (min-width: 30rem) {
		.switcher[data-threshold='md'] > .switcher-inner {
			grid-auto-flow: column;
			grid-auto-columns: 1fr;
		}
	}

	/* lg: 40rem (640px) */
	@container (min-width: 40rem) {
		.switcher[data-threshold='lg'] > .switcher-inner {
			grid-auto-flow: column;
			grid-auto-columns: 1fr;
		}
	}

	/* xl: 50rem (800px) */
	@container (min-width: 50rem) {
		.switcher[data-threshold='xl'] > .switcher-inner {
			grid-auto-flow: column;
			grid-auto-columns: 1fr;
		}
	}

	/* Limit: force items beyond limit to full width */
	.switcher[data-limit='2'] > .switcher-inner > :global(:nth-child(n + 3)),
	.switcher[data-limit='3'] > .switcher-inner > :global(:nth-child(n + 4)),
	.switcher[data-limit='4'] > .switcher-inner > :global(:nth-child(n + 5)),
	.switcher[data-limit='5'] > .switcher-inner > :global(:nth-child(n + 6)),
	.switcher[data-limit='6'] > .switcher-inner > :global(:nth-child(n + 7)) {
		grid-column: 1 / -1;
	}
</style>
