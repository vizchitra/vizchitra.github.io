<script lang="ts">
	import BannerPolygon from './BannerPolygon.svelte';
	import BannerCurve from './BannerCurve.svelte';
	import BannerSquare from './BannerSquare.svelte';
	import BannerBlob from './BannerBlob.svelte';
	import LogoTagline from '$lib/components/typography/LogoTagline.svelte';
	import FullBleed from '$lib/components/layout/FullBleed.svelte';
	import Slanted from '$lib/components/typography/Slanted.svelte';

	interface Props {
		banner?: 'polygon' | 'curve' | 'square' | 'blob';
		tagline?: string;
		color?: 'yellow' | 'teal' | 'blue' | 'orange' | 'pink' | 'grey';
	}

	let {
		banner = 'polygon',
		tagline = 'A SPACE TO CONNECT AND CREATE WITH DATA',
		color
	}: Props = $props();

	// Curve has unique layout; others share centered layout
	const usesCenteredLayout = $derived(banner !== 'curve');
	// Curve has no tranparncy layer ; others share centered layout
	const addTransparencyLayer = $derived(banner !== 'curve');
</script>

<FullBleed class="pb-24">
	<div class="relative h-[80svh] overflow-visible">
		<!-- Banner layer -->
		<div class="absolute inset-0 z-0">
			{#if banner === 'curve'}
				<BannerCurve interactive={true} direction="header" />
			{:else if banner === 'square'}
				<BannerSquare interactive={true} {color} />
			{:else if banner === 'blob'}
				<BannerBlob interactive={true} {color} />
			{:else}
				<BannerPolygon interactive={true} />
			{/if}
		</div>

		<!-- Transparency layer -->
		{#if addTransparencyLayer}
			<div
				class="to-viz-white pointer-events-none absolute inset-0 z-1 bg-linear-to-b from-transparent via-transparent via-90%"
			></div>
		{/if}

		<!-- Content layer -->
		{#if usesCenteredLayout}
			<!-- Logo centered (polygon/square/blob) with tagline -->
			<div class="pointer-events-none absolute inset-0 z-2 flex items-center justify-center">
				<div class="bg-viz-white">
					<LogoTagline tag="h3" textContent={tagline} />
				</div>
			</div>
		{:else}
			<!-- Logo curve layout: logo bottom left, tagline top right -->
			<div class="pointer-events-none absolute -bottom-20 left-0 z-2 md:-bottom-10 md:left-15">
				<LogoTagline />
			</div>
			<div class="pointer-events-none absolute top-10 right-15 z-2 w-80 md:right-20">
				<h2 class="max-w-1xl text-right leading-tight font-normal">
					<Slanted color="grey" textContent={tagline} />
				</h2>
			</div>
		{/if}
	</div>
</FullBleed>
