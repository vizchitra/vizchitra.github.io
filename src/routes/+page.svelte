<script lang="ts">
	import BannerPolygon from '$lib/components/BannerPolygon.svelte';
	import PolygonDivider from '$lib/components/PolygonDivider.svelte';
	import VizchitraLogo from '$lib/assets/images/viz-logo-animate.svg?raw';
	import { formatSlantedText } from '$lib/utils/utils.js';
	import CallToAction from '$lib/components/CallToAction.svelte';
	import VizChitraLogoType from '$lib/components/VizChitraLogoType.svelte';
	import SocialLink from '$lib/components/SocialLink.svelte';
	import { base } from '$app/paths';
	import Button from '$lib/components/Button.svelte';

	export let data;
</script>

<svelte:head>
	<!-- <title>Home</title>
	<meta name="description" content="Svelte demo app" />
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
	/> -->
	<link
		rel="preload"
		href="/fonts/Cairo-Variable-Latin.woff2"
		as="font"
		type="font/woff2"
		crossorigin
	/>
	<link
		rel="preload"
		href="/fonts/IBMPlexSans-Regular-Latin1.woff2"
		as="font"
		type="font/woff2"
		crossorigin
	/>
</svelte:head>

<div class="banner-container full-bleed relative h-[100svh]">
	<BannerPolygon />
	<div
		class="logo-container pointer-events-none absolute top-1/3 left-1/2 mb-2 flex -translate-x-1/2 -translate-y-1/3 flex-col items-center rounded-md bg-white px-2 pt-2 pb-4 shadow-lg md:max-w-none md:flex-row md:gap-0 md:px-8"
	>
		<div class="logo">
			{@html VizchitraLogo}
		</div>

		<h3
			class="tagline -mt-8 max-w-[20ch] border-black text-center text-[1.2rem] leading-none uppercase md:mt-0 md:border-l-2 md:pl-5 md:text-left md:text-[1.6rem]"
		>
			{#each formatSlantedText('A SPACE TO CONNECT AND CREATE WITH DATA') as letter}
				<span
					class="slanted-text text-[18px] md:text-[20px]"
					style="--letter-slant: {letter.slant}"
				>
					{letter.letter}
				</span>
			{/each}
		</h3>
	</div>
</div>

<CallToAction />

<SocialLink />

<div class="mt-20 flex flex-col items-center gap-10">
	<div class="content flex flex-col gap-2">
		<h1>
			<VizChitraLogoType></VizChitraLogoType>
		</h1>

		<p class="mb-4 max-w-[55ch] text-[18px] md:text-[22px]">
			Data visualization practitioners in India have been spread across different communities. As
			the first of its kind <span class="font-semibold">
				data visualization community, VizChitra
			</span> is putting together a conference to bring these people together.
		</p>

		<p class="mx-auto mb-8">
			{#each formatSlantedText('A SPACE TO CONNECT AND CREATE WITH DATA') as letter}
				<span class="slanted-text text-[24px]" style="--letter-slant: {letter.slant}">
					{letter.letter}
				</span>
			{/each}
		</p>

		<div class="pillars">
			<p class="mb-1 max-w-[55ch] text-[18px] md:text-[22px]">
				Our goal is to build a community of diverse, interdisciplinary individuals working across
				the visualization spectrum, and facilitate learning and connections between people from
				different industries & disciplines who share a common interest in the power of data and
				storytelling.
			</p>
		</div>

		<PolygonDivider></PolygonDivider>
	</div>

	<div class="content flex flex-col gap-2">
		<h2 class="font-display !text-[2rem] font-bold">OUR MISSION</h2>

		<p class="mb-4 max-w-[55ch] text-[18px] md:text-[22px]">
			To foster a vibrant <span class="font-semibold">community of data storytellers in India</span
			>, bridging technical analysis & design expertise to shape perspectives & drive change
		</p>

		<p class="mx-auto mb-6 text-center md:mb-8">
			{#each formatSlantedText('AN INDIAN DATA VISUALIZATION COMMUNITY') as letter}
				<span
					class="slanted-text text-[18px] md:text-[24px]"
					style="--letter-slant: {letter.slant}"
				>
					{letter.letter}
				</span>
			{/each}
		</p>

		<div class="pillars">
			<p class="mb-1 max-w-[55ch] text-[18px] md:text-[22px]">
				The VizChitra community plans to drive this using these three main pillars of work:
			</p>
			<ol class="space-y-4 md:space-y-2">
				<li>
					<h3 class="font-display text-[18px] leading-[1.5] font-bold md:text-[22px]">
						1. Consider & Curate:
					</h3>
					<p class="text-[16px] md:text-[22px]">
						Build a rhythm of curated events to spread the practice of data visualization
					</p>
				</li>
				<li>
					<h3 class="font-display text-[18px] leading-[1.5] font-bold md:text-[22px]">
						2. Cultivate & Care:
					</h3>
					<p class="text-[16px] md:text-[22px]">
						Nurture a fertile space for learning & sharing of data visualization skills
					</p>
				</li>
				<li>
					<h3 class="font-display text-[18px] leading-[1.5] font-bold md:text-[22px]">
						3. Create & Collaborate:
					</h3>
					<p class="text-[16px] md:text-[22px]">
						Express and co-create to push the boundaries of data visualization
					</p>
				</li>
			</ol>
		</div>

		<PolygonDivider></PolygonDivider>

		<h2 class="font-display mt-5 !text-[2rem] font-bold">VIZCHITRA 2025</h2>

		<p class="mb-6 max-w-[55ch] text-[18px] md:text-[22px]">
			One day of talks & dialogues & One day of workshops
		</p>

		<div
			class="mb-10 grid grid-cols-1 gap-6 rounded-lg bg-gray-100 p-6 md:grid-cols-2 md:gap-8 md:p-8"
		>
			<div class="space-y-2">
				<h3 class="font-display text-primary text-[22px] leading-[1.5] font-bold">
					CONFERENCE DAY
				</h3>
				<div class="space-y-1">
					<p class="text-[22px] font-semibold">27th June, 2025</p>
					<p class="text-[20px]">Bangalore International Center</p>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="font-display text-primary text-[22px] leading-[1.5] font-bold">WORKSHOP DAY</h3>
				<div class="space-y-1">
					<p class="text-[22px] font-semibold">28th June, 2025</p>
					<p class="text-[20px]">Across Bengaluru</p>
				</div>
			</div>
		</div>
		<Button variant="primary" href="https://hasgeek.com/vizchitra/vizchitra-2025" external
			>Add us to your calendar!</Button
		>

		<PolygonDivider></PolygonDivider>
	</div>
</div>

<style>
	.banner-container {
		width: 100vw;
		position: relative;
	}

	.banner-container::before,
	.banner-container::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		height: 25vh;
		pointer-events: none;
		z-index: 1;
	}

	@media (min-width: 768px) {
		.banner-container::before,
		.banner-container::after {
			height: 40vh;
		}
	}

	.banner-container::before {
		top: 0;
		background: linear-gradient(
			to bottom,
			rgb(255 255 255) 0%,
			rgba(255, 255, 255, 0.8) 5%,
			transparent 100%
		);
	}

	.banner-container::after {
		bottom: 0;
		background: linear-gradient(
			to top,
			rgb(255 255 255) 0%,
			rgba(255, 255, 255, 0.8) 5%,
			transparent 100%
		);
	}
</style>
