<script lang="ts">
	import { BannerCurve, BannerPolygon } from '$lib/components/structure';

	interface Props {
		data: {
			title: string;
		};
	}

	let { data }: Props = $props();

	let bannerType: 'polygon' | 'curve' = $state('curve');
</script>

<div class="container mx-auto p-8">
	<h1 class="mb-8 text-center text-4xl font-bold">{data.title}</h1>

	<!-- Banner Type Selector -->
	<div class="mb-8 flex items-center justify-center gap-4">
		<label for="banner-select" class="text-lg font-medium">Banner Type:</label>
		<select
			id="banner-select"
			bind:value={bannerType}
			class="border-viz-grey focus:border-viz-blue rounded-lg border-2 bg-white px-4 py-2 text-lg font-medium focus:outline-none"
		>
			<option value="polygon">Polygon</option>
			<option value="curve">Curve</option>
		</select>
	</div>

	<div class="space-y-12">
		<!-- Header Style (Interactive) - simulates header layout -->
		<section>
			<h2 class="mb-4 text-2xl font-bold">Header Style (Interactive) - Fade Bottom</h2>
			<div
				class="relative h-[400px] w-full rounded-2xl bg-gradient-to-b from-transparent to-white {bannerType ===
				'curve'
					? ''
					: 'overflow-hidden'}"
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
		</section>

		<!-- Footer Style (Static) - simulates footer layout -->
		<section>
			<h2 class="mb-4 text-2xl font-bold">Footer Style (Static) - Fade Top</h2>
			<div
				class="relative h-[400px] w-full rounded-2xl bg-gradient-to-t from-transparent to-white {bannerType ===
				'curve'
					? ''
					: 'overflow-hidden'}"
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
		</section>

		<!-- Interactive without fade -->
		<section>
			<h2 class="mb-4 text-2xl font-bold">Interactive (No Fade)</h2>
			<div class="relative h-[400px] w-full overflow-hidden rounded-2xl">
				{#if bannerType === 'curve'}
					<BannerCurve direction="header" />
				{:else}
					<BannerPolygon />
				{/if}
			</div>
		</section>

		<!-- Static without fade -->
		<section>
			<h2 class="mb-4 text-2xl font-bold">Static (No Fade)</h2>
			<div class="relative h-[400px] w-full overflow-hidden rounded-2xl">
				{#if bannerType === 'curve'}
					<BannerCurve staticBanner direction="footer" />
				{:else}
					<BannerPolygon staticBanner />
				{/if}
			</div>
		</section>

		<!-- With Content Overlay -->
		<section>
			<h2 class="mb-4 text-2xl font-bold">With Content Overlay</h2>
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
		</section>
	</div>
</div>
