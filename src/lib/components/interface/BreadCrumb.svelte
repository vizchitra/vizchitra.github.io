<script lang="ts">
	export let trail: { href: string; label: string }[] = [];
	export let current: string | null = null;
</script>

<nav aria-label="Breadcrumb" class="text-sm">
	<ol class="text-viz-grey flex items-center gap-2">
		{#each trail as item, i}
			<li>
				<a href={item.href} class="text-viz-grey hover:text-viz-black uppercase">{item.label}</a>
				<span class="px-2">/</span>
			</li>
		{/each}
		{#if current}
			<li class="text-viz-black font-medium uppercase">{current}</li>
		{/if}
	</ol>
</nav>
