<script lang="ts">
	import { Box } from '$lib/components';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<Box radius="lg" class="mx-auto w-full max-w-7xl {className}">
	{@render children?.()}
</Box>
