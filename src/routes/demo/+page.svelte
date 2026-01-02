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
			<option value="curves">Curves</option>
		</select>
	</div>

	<div class="space-y-12">
		<!-- Header Version (Interactive) -->
		<section>
			<h2 class="mb-4 text-2xl font-bold">Header (Interactive)</h2>
			<div class="relative h-[400px] w-full overflow-hidden rounded-2xl">
				{#if bannerType === 'curve'}
					<BannerCurve direction="header" />
				{:else}
					<BannerPolygon />
				{/if}
			</div>
		</section>

		<!-- Footer Version (Interactive) -->
		<section>
			<h2 class="mb-4 text-2xl font-bold">Footer (Interactive)</h2>
			<div class="relative h-[400px] w-full overflow-hidden rounded-2xl">
				{#if bannerType === 'curve'}
					<BannerCurve direction="footer" />
				{:else}
					<BannerPolygon />
				{/if}
			</div>
		</section>

		<!-- Static Header -->
		<section>
			<h2 class="mb-4 text-2xl font-bold">Static Header</h2>
			<div class="relative h-[400px] w-full overflow-hidden rounded-2xl">
				{#if bannerType === 'curve'}
					<BannerCurve staticBanner direction="header" />
				{:else}
					<BannerPolygon staticBanner />
				{/if}
			</div>
		</section>

		<!-- Static Footer -->
		<section>
			<h2 class="mb-4 text-2xl font-bold">Static Footer</h2>
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
				<div class="relative z-10 flex h-full flex-col items-center justify-center p-8">
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
