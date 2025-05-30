<script lang="ts">
	import BannerPolygon from '$lib/components/BannerPolygon.svelte';
	import PolygonDivider from '$lib/components/PolygonDivider.svelte';
	import VizchitraLogo from '$lib/assets/images/viz-logo-animate.svg?raw';
	import { formatSlantedText } from '$lib/utils/utils.js';
	import CallToAction from '$lib/components/CallToAction.svelte';
	import VizChitraLogoType from '$lib/components/VizChitraLogoType.svelte';
	import TeamSection from '$lib/components/TeamSection/TeamSection.svelte';
	import HomepageSection from '$lib/components/Homepage/HomepageSection.svelte';
	import ConferenceDetails from '$lib/components/Homepage/ConferenceDetails.svelte';
	import CustomSlantedText from '$lib/components/Common/CustomSlantedText.svelte';
	import KeyNote from '$lib/components/LineUp/KeyNote.svelte';
	import Speakers2025 from '$lib/components/LineUp/Speakers2025.svelte';
	import Workshop2025 from '$lib/components/LineUp/Workshop2025.svelte';

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
			class="tagline -mt-8 max-w-[20ch] border-black text-center uppercase md:mt-0 md:border-l-2 md:pl-5 md:text-left"
		>
			<CustomSlantedText textContent="A SPACE TO CONNECT AND CREATE WITH DATA"></CustomSlantedText>
		</h3>
	</div>
</div>

<CallToAction />

<div class="mt-20 flex flex-col items-center gap-10">
	<!-- OPENING SECTION -->
	<HomepageSection>
		<div slot="content">
			<h1 id="intro">
				<VizChitraLogoType></VizChitraLogoType>
			</h1>

			<p class="mb-8 font-[Cairo] text-2xl">
				This first India conference brings <span class="text-viz-pink-dark font-bold"
					>data visualization practitioners</span
				>
				from across India, representing
				<span class="text-viz-orange font-bold">different industries and disciplines,</span>
				together to facilitate
				<span class="text-viz-orange font-bold">learning and connections</span>
				around a common interest in the power of
				<span class="text-viz-pink-dark font-bold">visual data storytelling.</span>
			</p>

			<!-- <p class="content-text mb-6">
				Data visualization practitioners in India have been spread across different communities. As
				the first of its kind <span class="font-semibold">
					data visualization community, VizChitra
				</span> is putting together a conference to bring these people together.
			</p> -->

			<p class="mx-auto mb-6">
				<CustomSlantedText
					textContent="A SPACE TO CONNECT AND CREATE WITH DATA"
					classes="text-[18px] md:text-[24px]"
				></CustomSlantedText>
			</p>

			<p class="content-text mb-1">
				Our goal is to build a community of diverse, interdisciplinary individuals working across
				the visualization spectrum, and facilitate learning and connections between people from
				different industries and disciplines who share a common interest in the power of data and
				storytelling.
			</p>

			<!-- <PolygonDivider></PolygonDivider> -->
		</div>
	</HomepageSection>

	<HomepageSection>
		<div slot="content">
			<h2 id="speakers" class="content-heading !text-[2rem]">KEYNOTES</h2>
		</div>
	</HomepageSection>

	<KeyNote></KeyNote>

	<HomepageSection>
		<div slot="content">
			<h2 class="content-heading !text-[2rem]">SPEAKERS</h2>
			<Speakers2025></Speakers2025>
		</div>
	</HomepageSection>

	<HomepageSection>
		<div slot="content">
			<h2 id="workshops" class="content-heading !text-[2rem]">WORKSHOPS</h2>
			<p class="text-lg">
				So much fun to look forward to! Bear in mind, workshops are located at <b>two</b> different locations.
				Do check ahead of time.
			</p>
		</div>
	</HomepageSection>

	<Workshop2025></Workshop2025>

	<!-- OUR MISSION -->
	<!-- <HomepageSection>
		<div slot="content">
			<h2 class="content-heading !text-[2rem]">OUR MISSION</h2>

			<p class="content-text mb-4 max-w-[55ch]">
				To foster a vibrant <span class="font-semibold"
					>community of data storytellers in India</span
				>, bridging technical analysis and design expertise to shape perspectives and drive change
			</p>

			<p class="mx-auto mb-6 text-center">
				<CustomSlantedText
					textContent="AN INDIAN DATA VISUALIZATION COMMUNITY"
					classes="text-[18px] md:text-[24px]"
				></CustomSlantedText>
			</p>

			<p class="content-text mb-1">
				The VizChitra community plans to drive this using these three main pillars of work:
			</p>
			<ol class="mt-4 space-y-6">
				<li>
					<h3 class="content-heading">1. Consider and Curate:</h3>
					<p class="content-text">
						Build a rhythm of curated events to spread the practice of data visualization
					</p>
				</li>
				<li>
					<h3 class="content-heading">2. Cultivate and Care:</h3>
					<p class="content-text">
						Nurture a fertile space for learning and sharing of data visualization skills
					</p>
				</li>

				<li>
					<h3 class="content-heading">3. Create and Collaborate:</h3>
					<p class="content-text">
						Express and co-create to push the boundaries of data visualization
					</p>
				</li>
			</ol>

			<PolygonDivider></PolygonDivider>
		</div>
	</HomepageSection> -->

	<!-- TEAM SECTION -->
	<!-- <HomepageSection containerWidth="full">
		<div slot="content" class="">
			<h2 class="font-display mx-auto mb-6 max-w-[750px] text-left !text-[2rem] font-bold">
				MEET THE TEAM
			</h2>

			<TeamSection></TeamSection>
		</div>
	</HomepageSection> -->

	<!-- END CARD -->
	<!-- <HomepageSection>
		<div slot="content">
			<PolygonDivider></PolygonDivider>
			<h2 class="content-heading mt-5 !text-[2rem]">VIZCHITRA 2025</h2>

			<p class="content-text mb-6">One day of talks and dialogues and one day of workshops</p>

			<ConferenceDetails></ConferenceDetails>
			<PolygonDivider></PolygonDivider>
		</div>
	</HomepageSection> -->
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
