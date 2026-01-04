<script lang="ts">
	import BreadCrumb from '$lib/components/interface/BreadCrumb.svelte';

	export let trail: Array<{ href: string; label: string }> = [];
	export let title = '';
	export let subtitle: string | null = null;
</script>

<header class="space-y-4">
	<BreadCrumb {trail} current={null} />
	<h1 class="text-viz-black text-3xl font-black">{title}</h1>
	{#if subtitle}
		<p class="text-viz-grey-dark max-w-3xl text-lg">{subtitle}</p>
	{/if}
</header>
