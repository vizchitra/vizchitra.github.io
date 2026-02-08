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

	let style = $derived.by(() => {
		const gapSize = `${gap * 0.25}rem`;

		// Simplified grid: responsive with proper constraints
		let cols: string;
		if (columns) {
			// Fixed number of columns
			cols = `repeat(${columns}, 1fr)`;
		} else if (maxColumns) {
			// Use auto-fit but ensure we don't exceed maxColumns by adjusting minWidth
			// When container is wide, items will be at least (100% / maxColumns) wide
			const effectiveMinWidth = `max(${minWidth}, calc((100% - ${maxColumns - 1} * ${gapSize}) / ${maxColumns}))`;
			cols = `repeat(auto-fit, minmax(${effectiveMinWidth}, 1fr))`;
		} else {
			// Fully responsive
			cols = `repeat(auto-fit, minmax(min(${minWidth}, 100%), 1fr))`;
		}

		return `display: grid; gap: ${gapSize}; grid-template-columns: ${cols};`;
	});
</script>

<div {style} class={className}>
	{@render children?.()}
</div>
