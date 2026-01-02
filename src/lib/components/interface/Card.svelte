<script lang="ts">
	interface Props {
		image: string;
		alt?: string;
		title?: string;
		color?: string;
		children?: import('svelte').Snippet;
	}

	let { image, alt = '', title = '', color = 'pink', children }: Props = $props();

	let colorClass = $derived(color ? `text-viz-${color}-dark` : '');
</script>

<div class="flex flex-col gap-6 md:flex-row md:items-start">
	<div class="w-full shrink-0 md:w-1/3">
		<img src={image} {alt} class="h-auto w-full rounded-sm object-cover" />
	</div>
	<div class="flex w-full flex-col gap-2 md:w-2/3">
		{#if title}
			<h3 class="not-prose font-display-sans text-xl font-bold {colorClass}">
				{title}
			</h3>
		{/if}
		<div class="prose max-w-none">
			{@render children?.()}
		</div>
	</div>
</div>
