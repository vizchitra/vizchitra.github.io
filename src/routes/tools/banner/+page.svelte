<script lang="ts">
	import { BannerCurve, BannerPolygon } from '$lib/components/structure';
	import ToolsCard from '$lib/components/interface/ToolsCard.svelte';
	import ToolsHeader from '$lib/components/interface/ToolsHeader.svelte';

	let bannerType: 'polygon' | 'curve' = 'curve';
</script>

<section class="mx-auto max-w-7xl space-y-10 px-2 py-12">
	<ToolsHeader
		trail={[
			{ href: '/tools', label: 'Tools' },
			{ href: '/tools/banner', label: 'Banners' }
		]}
		title="Banner Variations"
		subtitle="Interactive and Static banner components - using Vornoi Polygon & Ridge Curve fill styles used across the site."
	/>

	<!-- Banner Type Selector -->
	<ToolsCard widthClass="w-full">
		<div class="mb-8 flex items-center gap-4">
			<label for="banner-select" class="text-lg font-bold">Fill Type:</label>
			<select
				id="banner-select"
				bind:value={bannerType}
				class="border-viz-grey focus:border-viz-blue text-md rounded-md border-2 bg-white px-4 py-2 font-medium focus:outline-none"
			>
				<option value="polygon">Voronoi Polygons</option>
				<option value="curve">Ridge Curves</option>
			</select>
		</div>
	</ToolsCard>

	<ToolsCard widthClass="w-full">
		<h2 class="text-viz-black text-2xl font-bold capitalize">Header Banner</h2>
		<p class="text-viz-grey pb-3 text-sm">Interactive • Fade Bottom</p>
		<div
			class="relative h-[400px] w-full rounded-2xl bg-gradient-to-b from-transparent to-white"
			class:overflow-hidden={bannerType !== 'curve'}
		>
			<div class="absolute inset-0">
				{#if bannerType === 'curve'}
					<BannerCurve direction="header" />
				{:else}
					<BannerPolygon fadeDirection="bottom" />
				{/if}
			</div>
			<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
				<h3 class="rounded-2xl bg-white px-4 py-2 text-2xl font-bold shadow">Page Title</h3>
			</div>
		</div>
	</ToolsCard>

	<ToolsCard widthClass="w-full">
		<h2 class="text-viz-black text-2xl font-bold capitalize">Footer</h2>
		<p class="text-viz-grey pb-3 text-sm">Static • Fade Top</p>
		<div
			class="relative h-[400px] w-full rounded-2xl bg-gradient-to-t from-transparent to-white"
			class:overflow-hidden={bannerType !== 'curve'}
		>
			<div class="absolute inset-0">
				{#if bannerType === 'curve'}
					<BannerCurve staticBanner direction="footer" />
				{:else}
					<BannerPolygon staticBanner fadeDirection="top" />
				{/if}
			</div>
			<div class="pointer-events-none absolute inset-0 flex items-end justify-center pb-8">
				<p class="rounded-lg bg-white px-4 py-2 text-sm opacity-75 shadow">
					© 2026 VizChitra. All rights reserved.
				</p>
			</div>
		</div>
	</ToolsCard>

	<ToolsCard widthClass="w-full">
		<h2 class="text-viz-black text-2xl font-bold capitalize">Header Banner</h2>
		<p class="text-viz-grey pb-3 text-sm">Interactive • No Fade</p>
		<div class="relative h-[400px] w-full overflow-hidden rounded-2xl">
			{#if bannerType === 'curve'}
				<BannerCurve direction="header" />
			{:else}
				<BannerPolygon />
			{/if}
		</div>
	</ToolsCard>

	<ToolsCard widthClass="w-full">
		<h2 class="text-viz-black text-2xl font-bold capitalize">Footer Banner</h2>
		<p class="text-viz-grey pb-3 text-sm">Static • No Fade</p>
		<div class="relative h-[400px] w-full overflow-hidden rounded-2xl">
			{#if bannerType === 'curve'}
				<BannerCurve staticBanner direction="footer" />
			{:else}
				<BannerPolygon staticBanner />
			{/if}
		</div>
	</ToolsCard>

	<ToolsCard widthClass="w-full">
		<h2 class="text-viz-black text-2xl font-bold capitalize">Header Banner</h2>
		<p class="text-viz-grey pb-3 text-sm">Interactive • With Content Overlay</p>
		<div class="relative h-[500px] w-full overflow-hidden rounded-2xl bg-white shadow-lg">
			<div class="absolute inset-0">
				{#if bannerType === 'curve'}
					<BannerCurve />
				{:else}
					<BannerPolygon />
				{/if}
			</div>
			<div
				class="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center p-8"
			>
				<div class="rounded-2xl bg-white/90 p-8 backdrop-blur-sm">
					<h3 class="mb-4 text-3xl font-bold">
						{bannerType === 'curve' ? 'Flowing Ridge Lines' : 'Dynamic Polygons'}
					</h3>
					<p class="text-lg text-gray-700">Interactive banner that responds to mouse movement</p>
				</div>
			</div>
		</div>
	</ToolsCard>
</section>
