<script lang="ts">
	// Import reusable components
	import { VideoGrid, RecapVideo, PurposeThree, Mission } from '$lib/components/sections';
	import { DividerPolygon, BannerPolygon } from '$lib/components/structure';
	import { Slanted, VizChitraLogoType, VizChitraLogoTagline } from '$lib/components/typography';
</script>

<div class="w-full">
	<div class="banner-container full-bleed relative h-[80svh]">
		<BannerPolygon />
		<div
			class="logo-container pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3"
		>
			<VizChitraLogoTagline />
		</div>
	</div>
	<div class="mx-auto max-w-3xl px-5 py-12">
		<h2 class="content-heading mb-3 text-center">
			<VizChitraLogoType></VizChitraLogoType>
		</h2>
		<p class="content-text mx-auto mb-1 text-center">
			India's first community-driven conference dedicated to <span
				class="text-viz-pink-dark font-bold">data visualization</span
			>
			brought together practitioners from
			<span class="text-viz-orange-dark font-bold">diverse industries and disciplines</span>
			across the country to foster
			<span class="text-viz-orange-dark font-bold">learning, collaboration,</span>
			and a shared passion for the art of
			<span class="text-viz-pink-dark font-bold">visual data storytelling.</span>
			See the highlights and talk sessions below.
		</p>
	</div>

	<!-- Recap Video Section with Decorative Banners -->

	<RecapVideo />
</div>

<!-- Main content container -->
<VideoGrid />

<div class="max-w-[90dvw] px-5 py-12 md:max-w-7xl">
	<DividerPolygon></DividerPolygon>

	<h2 class="content-heading mt-12 pt-12 text-center">
		<a href="/ethos"
			>Our Ethos @
			<VizChitraLogoType year={null}></VizChitraLogoType>
		</a>
	</h2>
	<h3 class="content-subheading text-viz-pink-dark mt-6 text-center">
		<Slanted textContent="A SPACE TO CONNECT AND CREATE WITH DATA" />
	</h3>
	<p class="content-text mx-auto mt-3 text-center">
		Our goal is to build a community of diverse, interdisciplinary individuals working across the
		visualization spectrum, and facilitate learning and connections between people from different
		industries and disciplines who share a common interest in the power of data and storytelling.
	</p>
	<PurposeThree />
	<h2 class="content-heading mt-18 pt-12 text-center">
		Our Mission @
		<VizChitraLogoType year={null}></VizChitraLogoType>
	</h2>
	<h3 class="content-subheading text-viz-blue-dark mt-6 text-center">
		<Slanted textContent="BUILD AN INDIAN DATA VISUALIZATION COMMUNITY" />
	</h3>
	<p class="content-text mx-auto mt-3 text-center">
		To foster a vibrant <span class="font-bold">community of data storytellers in India</span>,
		bridging technical analysis and design expertise to shape perspectives and drive change
	</p>
	<Mission></Mission>
	<DividerPolygon></DividerPolygon>
</div>

<!-- Mission Section -->
