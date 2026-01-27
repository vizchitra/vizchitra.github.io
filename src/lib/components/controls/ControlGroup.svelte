<script lang="ts">
	import { Cluster } from '$lib/components';
	import type { Snippet } from 'svelte';

	type Spacing = 'xs' | 'sm' | 'md' | 'lg';

	interface Props {
		children?: Snippet;
		space?: Spacing;
		class?: string;
	}

	let { children, space = 'sm', class: className = '' }: Props = $props();
</script>

<Cluster {space} align="center" class="flex-wrap {className}">
	{#if children}
		{@render children()}
	{/if}
</Cluster>
