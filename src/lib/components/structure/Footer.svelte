<script lang="ts">
	import BannerPolygon from './BannerPolygon.svelte';
	import BannerCurve from './BannerCurve.svelte';
	import BannerSquare from './BannerSquare.svelte';
	import BannerBlob from './BannerBlob.svelte';
	import SocialLink from './SocialLink.svelte';

	interface Props {
		banner?: 'polygon' | 'curve' | 'square' | 'blob';
		color?: 'all' | 'yellow' | 'teal' | 'blue' | 'orange' | 'pink';
	}

	let { banner = 'polygon', color = 'all' }: Props = $props();
	// Curve has no tranparnecy layer ; others share centered layout
	const addTransparencyLayer = $derived(banner !== 'curve');
</script>

<footer class="relative pt-24">
	<!-- Content layer -->
	<div class=" relative z-2 flex flex-col items-center gap-8 py-8">
		<SocialLink />

		<!-- <p class="text-sm opacity-75">
			Copyright © {new Date().getFullYear()} VizChitra. All rights reserved.
		</p> -->
	</div>
	<div class="relative h-40 overflow-visible">
		<!-- Banner layer -->
		<div class="absolute inset-0 z-0 h-full w-full">
			{#if banner === 'curve'}
				<BannerCurve direction="footer" />
			{:else if banner === 'square'}
				<BannerSquare {color} />
			{:else if banner === 'blob'}
				<BannerBlob {color} />
			{:else}
				<BannerPolygon />
			{/if}
		</div>

		<!-- Transparency layer -->
		{#if addTransparencyLayer}
			<div
				class="to-viz-white pointer-events-none absolute inset-0 z-1 bg-linear-to-t from-transparent via-transparent via-90%"
			></div>
		{/if}

		<!-- Copyright layer -->
		<div class=" relative z-2 flex flex-col items-center gap-8 py-16">
			<p class="bg-viz-white text-sm opacity-75">
				Copyright © {new Date().getFullYear()} VizChitra. All rights reserved.
			</p>
		</div>
	</div>
</footer>
