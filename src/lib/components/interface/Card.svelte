<script lang="ts">
	import { Heading } from '$lib/components/typography';

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

<div class="card max-w-md">
	{#if isBordered}
		<div class="card-bordered rounded-lg border-2 bg-white/80 p-6 {c.border}">
			<div class="card-prose">
				{#if title}
					<h3 class="font-body text-viz-md pb-4 font-bold {c.text}">
						{title}
					</h3>
				{/if}
				{@render children?.()}
			</div>
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
					<Heading tag="h3" align="left" class="font-body {c.text}">
						{title}
					</Heading>
				{/if}
				<div class="prose max-w-none">{@render children?.()}</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.card {
		--list-color: var(--color-viz-grey-dark);
		display: grid;
		grid-template-rows: subgrid;
		grid-row: span 3;
		row-gap: 0rem;
	}
	.card-bordered {
		display: grid;
		grid-template-rows: subgrid;
		grid-row: span 3;
	}
	.card-prose {
		font-size: 1rem;
		line-height: 1.5;
		display: grid;
		grid-template-rows: subgrid;
		grid-row: span 3;
	}
	.card-prose :global(p) {
		font-size: var(--text-flow-0);
	}
	.card-prose :global(p:first-child) {
		margin-block-start: 0;
	}
	.card-prose :global(ul),
	.card-prose :global(ol) {
		margin-block: 0.5rem;
		padding-inline-start: 1.25rem;
	}

	.card-prose :global(ul) {
		list-style: disc;
		color: var(--color-viz-grey-dark);
	}

	.card-prose :global(li) {
		font-size: var(--text-flow--1);
		margin-block: 0.125rem;
		padding-inline-start: 0.25rem;
	}
</style>
