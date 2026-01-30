<script lang="ts">
	import BannerPolygon from './BannerPolygon.svelte';
	import BannerCurve from './BannerCurve.svelte';
	import BannerSquare from './BannerSquare.svelte';
	import BannerBlob from './BannerBlob.svelte';
	import { VizChitraLogoTagline } from '$lib/components/typography';
	import FullBleed from '$lib/components/layout/FullBleed.svelte';
	import Slanted from '../typography/Slanted.svelte';

	interface Props {
		title: string;
		banner?: 'polygon' | 'curve' | 'square' | 'blob';
		show?: 'title' | 'logo';
		interactive?: boolean;
		size?: 'default' | 'large';
		tagline?: string;
		singleColor?: 'none' | 'yellow' | 'teal' | 'blue' | 'orange' | 'pink';
	}

	let {
		title,
		banner = 'polygon',
		show = 'title',
		interactive = false,
		size = 'default',
		tagline = 'A SPACE TO CONNECT AND CREATE WITH DATA',
		singleColor = 'none'
	}: Props = $props();

	const heightClass = $derived(size === 'large' ? 'h-[80svh]' : 'h-60');

	// Curve has unique layout; others share centered layout
	const usesCenteredLayout = $derived(banner !== 'curve');
	// All except curve need overflow hidden
	const needsOverflowHidden = $derived(banner !== 'curve');
</script>

<FullBleed className="pb-12">
	<div class="relative {heightClass} bg-linear-to-b from-transparent from-0% to-white to-100%">
		<div class="absolute inset-0 {needsOverflowHidden ? 'overflow-hidden' : ''}">
			{#if banner === 'curve'}
				<BannerCurve staticBanner={!interactive} direction="header" />
			{:else if banner === 'square'}
				<BannerSquare staticBanner={!interactive} fadeDirection="bottom" {singleColor} />
			{:else if banner === 'blob'}
				<BannerBlob staticBanner={!interactive} fadeDirection="bottom" {singleColor} />
			{:else}
				<BannerPolygon staticBanner={!interactive} fadeDirection="bottom" />
			{/if}
		</div>

		{#if show === 'title'}
			<!-- Centered title -->
			<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
				<h1
					class="font-display mx-3 w-fit max-w-[40ch] rounded-2xl bg-white px-4 text-2xl font-bold text-balance md:mx-0 md:text-center"
				>
					{title}
				</h1>
			</div>
		{:else if usesCenteredLayout}
			<!-- Logo centered (polygon/square/blob) with tagline -->
			<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
				<VizChitraLogoTagline tag="h3" textContent={tagline} />
			</div>
		{:else}
			<!-- Logo curve layout: logo bottom left, tagline top right -->
			<div class="pointer-events-none absolute bottom-0 left-5 md:left-25">
				<VizChitraLogoTagline />
			</div>
			<div class="pointer-events-none absolute top-0 right-5">
				<div class="max-w-[40ch]">
					<Slanted tag="p" color="grey" textContent={tagline} />
				</div>
			</div>
		{/if}
	</div>
</FullBleed>
