<script lang="ts">
	import type { Snippet } from 'svelte';

	type HeightPreset = 'sm' | 'md' | 'lg';
	type GradientDirection = 'top' | 'bottom' | 'both' | 'none';

	interface Props {
		children?: Snippet;
		height?: HeightPreset;
		overflow?: boolean;
		gradient?: GradientDirection;
		class?: string;
	}

	let {
		children,
		height = 'md',
		overflow = true,
		gradient = 'none',
		class: className = ''
	}: Props = $props();

	const heightMap = {
		sm: 'h-[300px]',
		md: 'h-[400px]',
		lg: 'h-[500px]'
	};

	const gradientMap = {
		top: 'bg-gradient-to-b from-white to-transparent',
		bottom: 'bg-gradient-to-t from-white to-transparent',
		both: 'bg-gradient-to-b from-white via-transparent to-white',
		none: ''
	};

	const heightClass = $derived(heightMap[height]);
	const gradientClass = $derived(gradientMap[gradient]);
	const overflowClass = $derived(overflow ? 'overflow-hidden' : '');
</script>

<div class="relative {heightClass} w-full rounded-2xl {gradientClass} {overflowClass} {className}">
	<div class="absolute inset-0">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
