<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import { Frame, Text } from '$lib/components';

	interface Props {
		token: string;
		label?: string;
		ratio?: string;
		width?: string;
		class?: ClassValue;
		children?: Snippet;
	}

	let { token, label, ratio = '5/3', width, class: className = '', children }: Props = $props();

	// Extract label from token if not provided
	// "yellow-100" → "100"
	// "teal-subtle" → "subtle"
	const defaultLabel = $derived(token.split('-').pop() || token);
	const displayLabel = $derived(label ?? defaultLabel);
</script>

<div
	class={['color-swatch', className]}
	style={`--swatch-color: var(--color-${token}); background-color: var(--swatch-color); color: var(--color-black); color: contrast-color(var(--swatch-color));`}
>
	<Frame {ratio} {width}>
		{#if children}
			{@render children()}
		{:else}
			<Text type="caption" align="center">{displayLabel}</Text>
		{/if}
	</Frame>
</div>

<style>
	.color-swatch {
		/* Layout */
		display: block;
		border-radius: var(--radius-sm);
	}
</style>
