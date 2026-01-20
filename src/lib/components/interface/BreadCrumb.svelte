<script lang="ts">
	import { Cluster } from '$lib/components';

	interface Props {
		trail?: { href: string; label: string }[];
		current?: string | null;
	}

	let { trail = [], current = null }: Props = $props();
</script>

<nav aria-label="Breadcrumb" class="text-sm">
	<Cluster space="sm" align="center" class="text-grey">
		{#each trail as item, i}
			<span>
				<a href={item.href} class="text-grey uppercase hover:text-black">{item.label}</a>
				<span class="px-sm">/</span>
			</span>
		{/each}
		{#if current}
			<span class="font-medium text-black uppercase">{current}</span>
		{/if}
	</Cluster>
</nav>
