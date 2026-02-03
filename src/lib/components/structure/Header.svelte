<script lang="ts">
	import BannerPolygon from './BannerPolygon.svelte';
	import BannerCurve from './BannerCurve.svelte';
	import BannerSquare from './BannerSquare.svelte';
	import BannerBlob from './BannerBlob.svelte';
	import { VizChitraLogoTagline } from '$lib/components/typography';
	import FullBleed from '$lib/components/layout/FullBleed.svelte';
	import Slanted from '../typography/Slanted.svelte';
	import DividerCurves from './DividerCurves.svelte';

	interface Props {
		title?: string;
		banner?: 'polygon' | 'curve' | 'square' | 'blob';
		show?: 'title' | 'logo';
		interactive?: boolean;
		size?: 'default' | 'large';
		tagline?: string;
		color?: 'all' | 'yellow' | 'teal' | 'blue' | 'orange' | 'pink';
	}

	let {
		title = '',
		banner = 'polygon',
		show = 'title',
		interactive = false,
		size = 'default',
		tagline = 'A SPACE TO CONNECT AND CREATE WITH DATA',
		color = 'all'
	}: Props = $props();

	const heightClass = $derived(size === 'large' ? 'h-[80svh]' : 'h-60');

	// Curve has unique layout; others share centered layout
	const usesCenteredLayout = $derived(banner !== 'curve');
	// Curve has no tranparncy layer ; others share centered layout
	const addTransparencyLayer = $derived(banner !== 'curve');
</script>

<FullBleed className="pb-24">
	<div class="relative overflow-visible {heightClass}">
		<!-- Banner layer -->
		<div class="absolute inset-0 z-0">
			{#if banner === 'curve'}
				<BannerCurve {interactive} direction="header" />
			{:else if banner === 'square'}
				<BannerSquare {interactive} {color} />
			{:else if banner === 'blob'}
				<BannerBlob {interactive} {color} />
			{:else}
				<BannerPolygon {interactive} />
			{/if}
		</div>

		<!-- Transparency layer -->
		{#if addTransparencyLayer}
			<div
				class="to-viz-white pointer-events-none absolute inset-0 z-1 bg-linear-to-b from-transparent via-transparent via-90%"
			></div>
		{/if}

		<!-- Content layer -->

		{#if show === 'title'}
			<!-- Centered title -->
			<div class="pointer-events-none absolute inset-0 z-2 flex items-center justify-center">
				<h1
					class="font-display bg-viz-white mx-3 w-fit max-w-[40ch] rounded-2xl px-4 text-4xl font-bold text-balance md:mx-0 md:text-center"
				>
					{title}
				</h1>
			</div>
		{:else if usesCenteredLayout}
			<!-- Logo centered (polygon/square/blob) with tagline -->
			<div class="pointer-events-none absolute inset-0 z-2 flex items-center justify-center">
				<div class="bg-viz-white">
					<VizChitraLogoTagline tag="h3" textContent={tagline} />
				</div>
			</div>
		{:else}
			<!-- Logo curve layout: logo bottom left, tagline top right -->
			<div class="pointer-events-none absolute -bottom-20 -left-5 z-2 md:-bottom-10 md:left-15">
				<VizChitraLogoTagline />
			</div>
			<div class="pointer-events-none absolute -top-5 -right-5 z-2 md:top-0 md:right-5">
				<div class="max-w-[40ch]">
					<Slanted tag="p" color="grey" textContent={tagline} />
				</div>
			</div>
		{/if}
	</div>
</FullBleed>
