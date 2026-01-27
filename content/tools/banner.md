---
title: Banner Patterns | VizChitra
description: Interactive and Static banner components - using Voronoi Polygon & Ridge Curve fill styles.
layout: full
banner: curve
---

<script lang="ts">
	let bannerType = 'curve';
</script>

<Header title="Banner Patterns" banner="polygon" />

<Text type="lead">Interactive and Static banner components - using Vornoi Polygon & Ridge Curve fill styles used across the site.</Text>

<!-- Banner Type Selector -->
<ToolsCard widthClass="w-full">
	<FormControl label="Fill Type:" htmlFor="banner-select" class="text-lg font-bold">
		<select
			id="banner-select"
			bind:value={bannerType}
			class="border-viz-grey focus:border-viz-blue text-md rounded-md border-2 bg-white px-sm py-xs font-medium focus:outline-none"
		>
			<option value="polygon">Voronoi Polygons</option>
			<option value="curve">Ridge Curves</option>
		</select>
	</FormControl>
</ToolsCard>

<ToolsCard widthClass="w-full">
	<h2 class="text-viz-black text-2xl font-bold capitalize">Header Banner</h2>
	<p class="text-viz-grey pb-xs text-sm">Interactive - Fade Bottom</p>
	<PreviewContainer height="md" overflow={bannerType !== 'curve'} gradient="bottom">
		<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
			{#if bannerType === 'curve'}
				<BannerCurve direction="header" />
			{:else}
				<BannerPolygon fadeDirection="bottom" />
			{/if}
			<h3 class="rounded-2xl bg-white px-sm py-xs text-2xl font-bold shadow">Page Title</h3>
		</div>
	</PreviewContainer>
</ToolsCard>

<ToolsCard widthClass="w-full">
	<h2 class="text-viz-black text-2xl font-bold capitalize">Footer</h2>
	<p class="text-viz-grey pb-xs text-sm">Static - Fade Top</p>
	<PreviewContainer height="md" overflow={bannerType !== 'curve'} gradient="top">
		<div class="pointer-events-none absolute inset-0 flex items-end justify-center pb-lg">
			{#if bannerType === 'curve'}
				<BannerCurve staticBanner direction="footer" />
			{:else}
				<BannerPolygon staticBanner fadeDirection="top" />
			{/if}
			<p class="rounded-lg bg-white px-sm py-xs text-sm opacity-75 shadow">
				2026 VizChitra. All rights reserved.
			</p>
		</div>
	</PreviewContainer>
</ToolsCard>

<ToolsCard widthClass="w-full">
	<h2 class="text-viz-black text-2xl font-bold capitalize">Header Banner</h2>
	<p class="text-viz-grey pb-xs text-sm">Interactive - No Fade</p>
	<PreviewContainer height="md" overflow={true} gradient="none">
		{#if bannerType === 'curve'}
			<BannerCurve direction="header" />
		{:else}
			<BannerPolygon />
		{/if}
	</PreviewContainer>
</ToolsCard>

<ToolsCard widthClass="w-full">
	<h2 class="text-viz-black text-2xl font-bold capitalize">Footer Banner</h2>
	<p class="text-viz-grey pb-xs text-sm">Static - No Fade</p>
	<PreviewContainer height="md" overflow={true} gradient="none">
		{#if bannerType === 'curve'}
			<BannerCurve staticBanner direction="footer" />
		{:else}
			<BannerPolygon staticBanner />
		{/if}
	</PreviewContainer>
</ToolsCard>

<ToolsCard widthClass="w-full">
	<h2 class="text-viz-black text-2xl font-bold capitalize">Header Banner</h2>
	<p class="text-viz-grey pb-xs text-sm">Interactive - With Content Overlay</p>
	<PreviewContainer height="lg" overflow={true} gradient="none" class="bg-white shadow-lg">
		<div class="absolute inset-0">
			{#if bannerType === 'curve'}
				<BannerCurve />
			{:else}
				<BannerPolygon />
			{/if}
		</div>
		<div
			class="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center p-lg"
		>
			<div class="rounded-2xl bg-white/90 p-lg backdrop-blur-sm">
				<h3 class="mb-sm text-3xl font-bold">
					{bannerType === 'curve' ? 'Flowing Ridge Lines' : 'Dynamic Polygons'}
				</h3>
				<p class="text-lg text-grey">Interactive banner that responds to mouse movement</p>
			</div>
		</div>
	</PreviewContainer>
</ToolsCard>
