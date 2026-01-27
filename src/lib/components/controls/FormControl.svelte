<script lang="ts">
	import { Cluster } from '$lib/components';
	import type { Snippet } from 'svelte';

	interface Props {
		label: string;
		htmlFor: string;
		children?: Snippet;
		class?: string;
	}

	let { label, htmlFor, children, class: className = '' }: Props = $props();
</script>

<Cluster space="xs" align="center" class="text-sm {className}">
	<label for={htmlFor} class="text-viz-grey-dark font-medium">{label}</label>
	{#if children}
		{@render children()}
	{/if}
</Cluster>
