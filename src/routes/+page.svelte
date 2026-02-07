<script lang="ts">
	import { Button } from '$lib/components/interface';
	import { VideoGrid, RecapVideo, PurposeThree, Mission } from '$lib/components/sections';
	import { DividerCurves, BannerPolygon, Header, Hero } from '$lib/components/structure';
	import { Slanted, SubHeading, Heading } from '$lib/components/typography';
	import { VizChitraLogoType, VizChitraLogoTagline } from '$lib/components/typography';
	// import Page from '../../content/index.md';
</script>

<!-- <Page /> -->

<Hero banner="curve" />

<Heading>
	<VizChitraLogoType year="2026"></VizChitraLogoType>
</Heading>

<SubHeading class="pb-6">
	India's community-driven conference dedicated to <span class="text-viz-yellow-dark font-bold"
		>data visualization</span
	>
	is back again in <span class="text-viz-teal-dark font-bold">2026</span>. This flagship event over
	<span class="text-viz-blue-dark font-bold">two days</span>
	will be in <span class="text-viz-orange-dark font-bold">Bangalore</span> on
	<span class="text-viz-pink-dark font-bold">3rd & 4th July, 2026 </span>
</SubHeading>

<div class="align-center flex justify-center pt-4">
	<Button href="/2026" color="pink">Go to our 2026 page</Button>
</div>

<DividerCurves />

<Heading>
	<VizChitraLogoType year="2025"></VizChitraLogoType>
</Heading>

<SubHeading class="pb-6">Missed the event last year. See the highlights below</SubHeading>

<RecapVideo />

<Heading tag="h2" class="text-viz-pink-dark mt-12 pt-12" href="/ethos">
	Our Ethos @ <VizChitraLogoType year={null}></VizChitraLogoType>
</Heading>

<SubHeading>
	Our goal is to build a community of diverse, interdisciplinary individuals working across the
	visualization spectrum, and facilitate learning and connections between people from different
	industries and disciplines who share a common interest in the power of data and storytelling.
</SubHeading>

<Heading tag="h3" class="pt-4 font-normal">
	<Slanted textContent="A SPACE TO CONNECT AND CREATE WITH DATA" />
</Heading>

<DividerCurves />

<Heading>
	Our Mission @ <VizChitraLogoType year={null}></VizChitraLogoType>
</Heading>

<SubHeading>
	To foster a vibrant <span class="font-bold">community of data storytellers in India</span>
	bridging technical analysis and design expertise to shape perspectives and drive change
</SubHeading>

<Heading tag="h3" class="py-4 font-normal">
	<Slanted color="black" textContent="BUILD AN INDIAN DATA VISUALIZATION COMMUNITY" />
</Heading>

<Mission></Mission>

<DividerCurves />
