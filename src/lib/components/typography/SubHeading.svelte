<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();
</script>

<p class="mx-auto max-w-2xl text-center text-lg leading-normal md:text-xl {className}">
	{@render children?.()}
</p>
