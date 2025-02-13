<script lang="ts">
	import BannerPolygon from '$lib/components/BannerPolygon.svelte';
	import VizchitraLogo from '$lib/assets/images/viz-logo.svg?raw';
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

<div class="flex flex-col items-start gap-10">
	<div class="logo-container mb-2 flex items-center gap-0">
		<div class="logo w-[300px]">
			{@html VizchitraLogo}
		</div>

		<h3
			class="tagline max-w-[20ch] border-l-2 border-black pl-5 text-[1.6rem] leading-none uppercase"
		>
			{#each formatSlantedText('A SPACE TO CONNECT AND CREATE WITH DATA') as letter}
				<span class="slanted-text text-[24px]" style="--letter-slant: {letter.slant}">
					{letter.letter}
				</span>
			{/each}
		</h3>
	</div>

	<div class="content">
		<h2 class="mb-1">
			{#each formatSlantedText('OUR MISSION') as letter}
				<span class="slanted-text text-[32px] font-bold" style="--letter-slant: {letter.slant}">
					{letter.letter}
				</span>
			{/each}
		</h2>

		<p class="max-w-[50ch] text-[22px]">
			To foster a vibrant <strong>community of data storytellers in India</strong>, bridging
			technical analysis & design expertise to shape perspectives & drive change
		</p>
	</div>
</div>

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
