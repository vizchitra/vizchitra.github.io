<script lang="ts">
	interface Props {
		image?: string;
		alt?: string;
		title?: string;
		color?: 'pink' | 'blue' | 'yellow' | 'teal' | 'orange';
		variant?: 'default' | 'bordered';
		children?: import('svelte').Snippet;
	}

	let {
		image,
		alt = '',
		title = '',
		color = 'pink',
		variant = 'default',
		children
	}: Props = $props();

	const colors = {
		pink: { text: 'text-viz-pink-dark', border: 'border-viz-pink-dark' },
		blue: { text: 'text-viz-blue-dark', border: 'border-viz-blue-dark' },
		yellow: { text: 'text-viz-yellow-dark', border: 'border-viz-yellow-dark' },
		teal: { text: 'text-viz-teal-dark', border: 'border-viz-teal-dark' },
		orange: { text: 'text-viz-orange-dark', border: 'border-viz-orange-dark' }
	};

	let c = $derived(colors[color] ?? colors.pink);
	let isBordered = $derived(variant === 'bordered');
</script>

{#if isBordered}
	<div class="max-w-[25rem] rounded-lg border-2 p-6 {c.border}">
		{#if title}
			<h3 class="not-prose font-display-sans mb-2 text-lg font-bold {c.text}">{title}</h3>
		{/if}
		<div class="card-prose">{@render children?.()}</div>
	</div>
{:else}
	<div class="flex flex-col gap-6 md:flex-row md:items-start">
		{#if image}
			<div class="w-full shrink-0 md:w-1/3">
				<img src={image} {alt} class="h-auto w-full rounded-sm object-cover" />
			</div>
		{/if}
		<div class="flex w-full flex-col gap-2 {image ? 'md:w-2/3' : ''}">
			{#if title}
				<h3 class="not-prose font-display-sans text-xl font-bold {c.text}">{title}</h3>
			{/if}
			<div class="prose max-w-none">{@render children?.()}</div>
		</div>
	</div>
{/if}

<style>
	.card-prose {
		font-size: 0.975rem;
		line-height: 1.4;
	}
	.card-prose :global(p) {
		margin-block: 0.5rem;
	}
	.card-prose :global(p:first-child) {
		margin-block-start: 0;
	}
	.card-prose :global(ul),
	.card-prose :global(ol) {
		margin-block: 0.5rem;
		padding-inline-start: 1.25rem;
	}
	.card-prose :global(li) {
		margin-block: 0.125rem;
		padding-inline-start: 0.25rem;
	}
	.card-prose :global(li::marker) {
		color: var(--viz-color-grey);
		font-weight: 600;
	}
</style>
