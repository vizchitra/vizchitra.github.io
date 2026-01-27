<script lang="ts">
	import { Heading, Stack } from '$lib/components';
	import { type Color, getColorTokens } from '$lib/utils/colorTokens';

	interface Props {
		image?: string;
		alt?: string;
		title?: string;
		color?: Color;
		variant?: 'default' | 'bordered';
		href?: string;
		children?: import('svelte').Snippet;
	}

	let {
		image,
		alt = '',
		title = '',
		color = 'pink',
		variant = 'default',
		href,
		children
	}: Props = $props();

	const tokens = $derived(getColorTokens(color, 'pink'));
	let isBordered = $derived(variant === 'bordered');
</script>

{#if isBordered}
	{#if href}
		<a {href} class="group inline-block w-full no-underline">
			<Stack
				space="sm"
				class="p-sm rounded-lg border-2 {tokens.border} group-hover:bg-opacity-50 transition-shadow group-hover:shadow-md"
			>
				{#if title}
					<Heading tag="h3" align="left" class="not-prose font-display-sans text-lg! {tokens.text}">
						{title}
					</Heading>
				{/if}
				<div class="prose-sm">{@render children?.()}</div>
			</Stack>
		</a>
	{:else}
		<Stack space="sm" class="p-sm rounded-lg border-2 {tokens.border}">
			{#if title}
				<Heading tag="h3" align="left" class="not-prose font-display-sans text-lg! {tokens.text}">
					{title}
				</Heading>
			{/if}
			<div class="prose-sm">{@render children?.()}</div>
		</Stack>
	{/if}
{:else if href}
	<a {href} class="group block no-underline">
		<Stack space="md" class="items-start transition-shadow group-hover:shadow-md">
			{#if image}
				<div class="w-full shrink-0 md:w-1/3">
					<img src={image} {alt} class="h-auto w-full rounded-sm object-cover" />
				</div>
			{/if}
			<Stack space="sm" class="w-full {image ? 'md:w-2/3' : ''}">
				{#if title}
					<Heading tag="h3" align="left" class="not-prose font-display-sans text-xl! {tokens.text}">
						{title}
					</Heading>
				{/if}
				<div class="prose max-w-none">{@render children?.()}</div>
			</Stack>
		</Stack>
	</a>
{:else}
	<Stack space="md" class="items-start">
		{#if image}
			<div class="w-full shrink-0 md:w-1/3">
				<img src={image} {alt} class="h-auto w-full rounded-sm object-cover" />
			</div>
		{/if}
		<Stack space="sm" class="w-full {image ? 'md:w-2/3' : ''}">
			{#if title}
				<Heading tag="h3" align="left" class="not-prose font-display-sans text-xl! {tokens.text}">
					{title}
				</Heading>
			{/if}
			<div class="prose max-w-none">{@render children?.()}</div>
		</Stack>
	</Stack>
{/if}
