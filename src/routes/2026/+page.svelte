<script lang="ts">
	import BannerPolygon from '$lib/components/BannerPolygon.svelte';
	import VizchitraLogo from '$lib/assets/images/viz-logo-animate.svg?raw';
	import VizChitraLogoType from '$lib/components/VizChitraLogoType.svelte';
	import HomepageSection from '$lib/components/Homepage/HomepageSection.svelte';
	import CustomSlantedText from '$lib/components/Common/CustomSlantedText.svelte';
	import Button from '$lib/components/Button.svelte';
	import Pentagons from '$lib/components/Pentagons.svelte';
	import PolygonDivider from '$lib/components/PolygonDivider.svelte';

	const whyAttend = [
		{
			title: 'Explore & Play',
			description: 'On practices of data exploration, interface & dashboard design for dataviz.',
			backgroundColor: 'var(--color-viz-pink)'
		},
		{
			title: 'Explain & Learn',
			description: 'Centered on fundamentals of process, design & communication for dataviz.',
			backgroundColor: 'var(--color-viz-yellow)'
		},
		{
			title: 'Imagine & Innovate',
			description:
				'Use of new mediums, approaches, AI & tech to shape how we do dataviz in future.',
			backgroundColor: 'var(--color-viz-blue)'
		}
	];
</script>

<svelte:head>
	<title>VizChitra 2026 - India's Data Visualization Conference</title>
	<meta
		name="description"
		content="VizChitra 2026 - India's premier data visualization conference. Submit your proposals and join our community."
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
			class="tagline -mt-8 max-w-[20ch] border-black text-center text-left uppercase md:mt-0 md:border-l-2 md:pl-5"
		>
			<CustomSlantedText textContent="A SPACE TO CONNECT AND CREATE WITH DATA"></CustomSlantedText>
		</h3>
	</div>
</div>

<div class="mt-20 flex flex-col items-center gap-10">
	<HomepageSection>
		<div slot="content">
			<h1 id="intro" class="text-center">
				<VizChitraLogoType year="2026"></VizChitraLogoType>
			</h1>

			<p class="content-text mx-auto mb-8 text-center">
				We're excited to announce <span class="text-viz-pink-dark font-bold">VizChitra 2026</span>,
				the second edition of India's only conference on data visualization!
			</p>

			<div class="mx-auto mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
				<Button href="/2026/submit" class_name="!text-white">Submit Your Proposal</Button>
				<Button href="https://chat.whatsapp.com/G9p4HbALukeAa5NSVn0OoA" external variant="secondary"
					>Join Community</Button
				>
			</div>
		</div>
	</HomepageSection>

	<PolygonDivider />

	<HomepageSection>
		<div slot="content">
			<h2 class="content-heading mb-6 text-center !text-[2rem]">About VizChitra 2026</h2>

			<p class="content-text mb-4">
				Building on the success of <a
					href="/2025/conference"
					class="text-viz-orange-dark font-bold underline">VizChitra 2025</a
				>, we're bringing together
				<span class="text-viz-pink-dark font-bold">data visualization practitioners</span>
				from across India once again. This conference represents a unique opportunity for people from
				<span class="text-viz-orange font-bold">different industries and disciplines</span>
				to come together and share their passion for
				<span class="text-viz-pink-dark font-bold">visual data storytelling.</span>
			</p>
		</div>
	</HomepageSection>

	<div class="mx-auto flex max-w-4xl flex-wrap gap-4 px-4">
		{#each whyAttend as item, i}
			<Pentagons
				title={item.title}
				description={item.description}
				backgroundColor={item.backgroundColor}
				seed={Math.floor(Math.random() * 10)}
			/>
		{/each}
	</div>

	<PolygonDivider />

	<HomepageSection>
		<div slot="content">
			<h2 class="content-heading mb-6 text-center !text-[2rem]">VizChitra 2025 Highlights</h2>

			<p class="content-text mb-8 text-center">
				Last year's inaugural conference was a tremendous success! Check out what made VizChitra
				2025 special:
			</p>

			<div class="mt-8 text-center">
				<Button href="/" class_name="!text-white">Watch 2025 Sessions</Button>
			</div>
		</div>
	</HomepageSection>

	<PolygonDivider />

	<HomepageSection>
		<div slot="content">
			<h2 class="content-heading mb-6 text-center !text-[2rem]">Call for Proposals - Now Open!</h2>

			<p class="content-text mb-6 text-center">
				We're looking for speakers, workshop facilitators, and alternative session hosts for
				VizChitra 2026. Share your expertise, projects, and ideas with India's data visualization
				community. We welcome proposals from all backgrounds and experience levels.
			</p>

			<div class="mb-8 text-center">
				<Button href="/2026/submit" class_name="!text-white text-xl px-8 py-5"
					>Submit Your Proposal</Button
				>
			</div>
		</div>
	</HomepageSection>

	<div class="mb-16"></div>
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
