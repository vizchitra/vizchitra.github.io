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
		let cols: string;

		if (columns) {
			cols = `repeat(${columns}, 1fr)`;
		} else if (maxColumns) {
			cols = `repeat(auto-fit, minmax(min(${minWidth}, 100%), 1fr))`;
		} else {
			cols = `repeat(auto-fit, minmax(min(${minWidth}, 100%), 1fr))`;
		}

		let maxColsStyle = maxColumns ? `--max-cols: ${maxColumns};` : '';

		return `display: grid; gap: ${gapSize}; grid-template-columns: ${cols}; ${maxColsStyle}`;
	});
</script>

{#if maxColumns}
	<div {style} class="max-cols-grid {className}">
		{@render children?.()}
	</div>
{:else}
	<div {style} class={className}>
		{@render children?.()}
	</div>
{/if}

<style>
	.max-cols-grid {
		grid-template-columns: repeat(
			auto-fit,
			minmax(min(var(--min-width, 280px), 100%), 1fr)
		) !important;
		max-width: calc(var(--max-cols) * 25rem + (var(--max-cols) - 1) * 1.5rem);
		margin-inline: auto;
	}
</style>
