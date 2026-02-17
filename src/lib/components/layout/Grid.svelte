<script lang="ts">
	interface Props {
		columns?: number;
		maxColumns?: number;
		minWidth?: string;
		gap?: number;
		class?: string;
		children?: import('svelte').Snippet;
	}

	let {
		columns,
		maxColumns,
		minWidth = '280px',
		gap = 8,
		class: className = '',
		children
	}: Props = $props();

	const gapSize = $derived(`${gap * 0.25}rem`);

	const cols = $derived.by(() => {
		if (columns) {
			return `repeat(${columns}, 1fr)`;
		} else if (maxColumns) {
			const effectiveMinWidth = `max(${minWidth}, calc((100% - ${maxColumns - 1} * ${gapSize}) / ${maxColumns}))`;
			return `repeat(auto-fit, minmax(${effectiveMinWidth}, 1fr))`;
		} else {
			return `repeat(auto-fit, minmax(min(${minWidth}, 100%), 1fr))`;
		}
	});
</script>

<div
	class={['grid-layout', className]}
	style:--grid-gap={gapSize}
	style:--grid-cols={cols}
>
	{@render children?.()}
</div>

<style>
	.grid-layout {
		display: grid;
		gap: var(--grid-gap);
		grid-template-columns: var(--grid-cols);
	}
</style>
