<script lang="ts">
	import { BannerCurve, BannerPolygon, BannerSquare, BannerBlob, Header, ToolsCard, ToolsHeader } from '$lib/components';

	let bannerType: 'polygon' | 'curve' | 'square' | 'blob' = 'curve';
</script>

<Header banner="square" color="grey"></Header>

<section class="mx-auto max-w-7xl space-y-10 px-2 py-12">
	<ToolsHeader
		trail={[
			{ href: '/tools', label: 'Tools' },
			{ href: '/tools/banner', label: 'Banners' }
		]}
		title="Banner Variations"
		subtitle="Interactive and Static banner components - using Vornoi Polygons, Ridge Curves, Quilt Squares & Physics Blobs - are used as fill styles across the site."
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
				<option value="square">Quilt Squares</option>
				<option value="blob">Physics Blobs</option>
			</select>
		</div>
	</ToolsCard>

	<ToolsCard widthClass="w-full">
		<h2 class="text-viz-black text-2xl font-bold capitalize">Header Banner</h2>
		<p class="text-viz-grey pb-8 text-sm">Interactive with CSS fade</p>
		<div
			class="to-viz-white via-viz-white/30 relative h-[400px] w-full rounded-2xl bg-linear-to-b from-transparent via-70%"
			class:overflow-hidden={bannerType !== 'curve'}
		>
			<div class="absolute inset-0">
				{#if bannerType === 'curve'}
					<BannerCurve interactive direction="header" />
				{:else if bannerType === 'polygon'}
					<BannerPolygon interactive />
				{:else if bannerType === 'square'}
					<BannerSquare interactive />
				{:else}
					<BannerBlob interactive />
				{/if}
			</div>
			<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
				<h3 class="rounded-2xl bg-white px-4 py-2 text-2xl font-bold shadow">Page Title</h3>
			</div>
		</div>
	</ToolsCard>

	<ToolsCard widthClass="w-full">
		<h2 class="text-viz-black text-2xl font-bold capitalize">Footer Banner</h2>
		<p class="text-viz-grey pb-8 text-sm">Static with CSS fade</p>
		<div
			class="to-viz-white via-viz-white/30 relative h-[400px] w-full rounded-2xl bg-linear-to-t from-transparent via-70%"
			class:overflow-hidden={bannerType !== 'curve'}
		>
			<div class="absolute inset-0">
				{#if bannerType === 'curve'}
					<BannerCurve direction="footer" />
				{:else if bannerType === 'polygon'}
					<BannerPolygon />
				{:else if bannerType === 'square'}
					<BannerSquare color="teal" />
				{:else}
					<BannerBlob color="teal" />
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
		<p class="text-viz-grey pb-8 text-sm">Interactive • With Content Overlay</p>
		<div class="relative h-[500px] w-full overflow-hidden rounded-2xl bg-white shadow-lg">
			<div class="absolute inset-0">
				{#if bannerType === 'curve'}
					<BannerCurve interactive />
				{:else if bannerType === 'polygon'}
					<BannerPolygon interactive />
				{:else if bannerType === 'square'}
					<BannerSquare interactive />
				{:else}
					<BannerBlob interactive />
				{/if}
			</div>
			<div
				class="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center p-8"
			>
				<div class="rounded-2xl bg-white/90 p-8 backdrop-blur-sm">
					<h3 class="mb-4 text-3xl font-bold">
						{#if bannerType === 'curve'}
							Flowing Ridge Lines
						{:else if bannerType === 'polygon'}
							Dynamic Polygons
						{:else if bannerType === 'square'}
							Dynamic Squares
						{:else}
							Physics Blobs
						{/if}
					</h3>
					<p class="text-lg text-gray-700">Interactive banner that responds to mouse movement</p>
				</div>
			</div>
		</div>
	</ToolsCard>
</section>
