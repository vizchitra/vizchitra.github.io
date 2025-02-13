<script lang="ts">
	import BannerPolygon from '$lib/components/BannerPolygon.svelte';
	import { formatSlantedText } from '$lib/utils/utils.js';

	export let data;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="banner-container full-bleed">
	<BannerPolygon />
</div>

<p>
	{#each formatSlantedText('If data is the new soil, What will you grow') as letter}
		<span class="slanted-text text-[30px]" style="--letter-slant: {letter.slant}">
			{letter.letter}
		</span>
	{/each}
</p>

<style>
	.banner-container {
		height: 100vh;
		width: 100vw;
		position: relative;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
