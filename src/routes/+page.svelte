<script lang="ts">
	import BannerPolygon from '$lib/components/BannerPolygon.svelte';
	import PolygonDivider from '$lib/components/PolygonDivider.svelte';
	import VizchitraLogo from '$lib/assets/images/viz-logo.svg?raw';
	import { formatSlantedText } from '$lib/utils/utils.js';

	export let data;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="banner-container full-bleed relative">
	<BannerPolygon />
	<div
		class="logo-container pointer-events-none absolute top-1/2 left-1/2 mb-2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-0 rounded-md bg-white px-8 py-4 shadow-lg"
	>
		<div class="logo w-[150px]">
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
</div>

<div class="mt-20 flex flex-col items-start gap-10">
	<div class="content flex flex-col gap-2">
		<h2 class="font-display font-bold">OUR MISSION</h2>

		<p class="mb-4 max-w-[55ch] text-[22px]">
			To foster a vibrant <span class="font-semibold">community of data storytellers in India</span
			>, bridging technical analysis & design expertise to shape perspectives & drive change
		</p>

		<p class="mx-auto mb-8">
			{#each formatSlantedText('AN INDIAN DATA VISUALIZATION COMMUNITY') as letter}
				<span class="slanted-text text-[24px]" style="--letter-slant: {letter.slant}">
					{letter.letter}
				</span>
			{/each}
		</p>

		<div class="pillars">
			<p class="mb-1 max-w-[55ch] text-[22px]">
				The VizChitra community plans to drive this using these three main pillars of work:
			</p>
			<ol>
				<li class="mb-[8px]">
					<h3 class="font-display block text-[22px] leading-[1.5] font-bold">
						1. Consider & Curate:
					</h3>
					<p class="text-[22px]">
						Build a rhythm of curated events to spread the practice of data visualisation
					</p>
				</li>
				<li class="mb-[8px]">
					<h3 class="font-display block text-[22px] leading-[1.5] font-bold">
						2. Cultivate & Care:
					</h3>
					<p class="text-[22px]">
						Nurture a fertile space for learning & sharing of data visualisation skills
					</p>
				</li>
				<li class="mb-[8px]">
					<h3 class="font-display block text-[22px] leading-[1.5] font-bold">
						3. Create & Collaborate:
					</h3>
					<p class="text-[22px]">
						Express and co-create to push the boundaries of data visualization
					</p>
				</li>
			</ol>
		</div>

		<PolygonDivider></PolygonDivider>
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
