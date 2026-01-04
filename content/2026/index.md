---
title: VizChitra 2026
description: India's community-driven data visualization conference returns to Bangalore in 2026
year: 2026
banner: curve
---

<script>
	import { Flex, FullBleed } from '$lib/components/layout';
	import { CallCard } from '$lib/components/interface';
	import { Heading, SubHeading, Slanted, VizChitraLogoType } from '$lib/components/typography';
	import { DividerCurves, Header } from '$lib/components/structure';
</script>

<Header title="VizChitra 2026" banner="curve" interactive={true} size="large" showLogo={true} tagline="A SPACE TO CONNECT AND CREATE WITH DATA" />

<Heading tag="h2">
	<VizChitraLogoType year="2026"></VizChitraLogoType>
</Heading>

<SubHeading class="pb-6">
India's community-driven conference dedicated to <span class="text-viz-yellow-dark font-bold">data visualization</span> returns to <span class="text-viz-orange-dark font-bold">Bangalore</span> on <span class="text-viz-pink-dark font-bold">3rd & 4th July, 2026</span>. Join us for <span class="text-viz-blue-dark font-bold">two days</span> of learning, sharing, and connecting with the data visualization community.
</SubHeading>

<DividerCurves/>

<Slanted tag="h3" color="pink" textContent="APPLICATIONS ARE OPEN" />

<SubHeading class="pb-8">
We invite submissions across across four formats—<span class="font-bold text-viz-blue-dark">Talks</span>, <span class="font-bold text-viz-teal-dark">Dialogues</span>, <span class="font-bold text-viz-pink-dark">Workshops</span>, and <span class="font-bold text-viz-orange-dark">Exhibition</span>. Select the one that best suits your contribution. 
</SubHeading>

<FullBleed class="px-4 md:px-8 py-12">
<Flex direction="row" wrap={true} gap="gap-6" justify="justify-center">

<CallCard
	title="Talks"
	subtitle="Best for deep dives into projects, case studies or bodies of work."
	pattern="waves"
	tone="blue"
	titlePosition="top-1 left-4 text-left"
	subtitlePosition="bottom-0 left-4 text-left"
	href="/2026/proposals"
/>

<CallCard
	title="Dialogues"
	subtitle="Best for shared questions, challenges, or themes."
	pattern="river"
	tone="teal"
	titlePosition="top-12 left-4 text-left"
	subtitlePosition="top-30 left-4 text-left"
	href="/2026/proposals"
/>

<CallCard
	title="Workshops"
	subtitle="Best for practice-oriented, skill-building sessions"
	pattern="circle"
	tone="pink"
	titlePosition="top-25 left-1/2 -translate-x-1/2 text-center"
	subtitlePosition="top-45 left-1/2 -translate-x-1/2 text-center"
	href="/2026/proposals"
  variation={1}
/>

<CallCard
	title="Exhibition"
	subtitle="Focused on climate & ecological change"
	pattern="stream"
	tone="orange"
	titlePosition="top-0 left-1/2 -translate-x-1/2 text-center"
	subtitlePosition="bottom-0 left-1/2 -translate-x-1/2 text-center"
	href="/2026/exhibition"
/>

</Flex>
</FullBleed>

<SubHeading>
The deadline for making your submission is <strong>15 Feb, 2026</strong>.
</SubHeading>
