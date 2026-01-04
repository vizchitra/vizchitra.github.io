---
title: VizChitra
description: The Indian Data Visualization Community
banner: curve
interactive: true
size: large
showLogo: true
---

<script lang="ts">
	import { VideoGrid, RecapVideo, PurposeThree, Mission } from '$lib/components/sections';
	import { DividerCurves, BannerPolygon, Header } from '$lib/components/structure';
	import { Slanted, SubHeading, Heading } from '$lib/components/typography';
	import { VizChitraLogoType, VizChitraLogoTagline } from '$lib/components/typography';
</script>

<Header title="VizChitra" interactive="true" banner="curve" size="large" showLogo=true />

<Heading>
	<VizChitraLogoType year="2026"></VizChitraLogoType>
</Heading>

<SubHeading>
India's community-driven conference dedicated to <span class="text-viz-pink-dark font-bold">data visualization</span >
brought together practitioners from <span class="text-viz-orange-dark font-bold">diverse industries and disciplines</span> across the country to foster <span class="text-viz-orange-dark font-bold">learning, collaboration,</span> and a shared passion for the art of <span class="text-viz-pink-dark font-bold">visual data storytelling.</span> See the highlights and talk sessions below.
</SubHeading>

<DividerCurves/>

<Heading tag="h2" class="mt-12 pt-12" href="/ethos">
	Our Ethos @ <VizChitraLogoType year={null}></VizChitraLogoType>
</Heading>

<Slanted tag="h3" textContent="A SPACE TO CONNECT AND CREATE WITH DATA" />

<SubHeading>
Our goal is to build a community of diverse, interdisciplinary individuals working across the
visualization spectrum, and facilitate learning and connections between people from different
industries and disciplines who share a common interest in the power of data and storytelling.
</SubHeading>

<PurposeThree />

<DividerCurves/>

<Heading> 
Our Mission @ <VizChitraLogoType year={null}></VizChitraLogoType>
</Heading>

<Slanted tag="h3" color="blue" textContent="BUILD AN INDIAN DATA VISUALIZATION COMMUNITY" />

<SubHeading>
To foster a vibrant <span class="font-bold">community of data storytellers in India</span>
bridging technical analysis and design expertise to shape perspectives and drive change
</SubHeading>

<Mission></Mission>

<DividerCurves/>
