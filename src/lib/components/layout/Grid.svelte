<script lang="ts">
	interface Props {
		columns?: number;
		minWidth?: string;
		gap?: number;
		class?: string;
		children?: import('svelte').Snippet;
	}

	let { columns, minWidth = '280px', gap = 8, class: className = '', children }: Props = $props();

	let style = $derived.by(() => {
		const gapSize = `${gap * 0.25}rem`;
		const cols = columns
			? `repeat(${columns}, 1fr)`
			: `repeat(auto-fit, minmax(min(${minWidth}, 100%), 1fr))`;

		return `display: grid; gap: ${gapSize}; grid-template-columns: ${cols};`;
	});
</script>

<div {style} class={className}>
	{@render children?.()}
</div>
