<script lang="ts">
	import BannerPolygon from './BannerPolygon.svelte';
	import BannerCurve from './BannerCurve.svelte';
	import { VizChitraLogoTagline } from '$lib/components/typography';
	import FullBleed from '$lib/components/layout/FullBleed.svelte';
	import Slanted from '../typography/Slanted.svelte';

	interface Props {
		title: string;
		banner?: 'polygon' | 'curve';
		interactive?: boolean;
		size?: 'default' | 'large';
		showLogo?: boolean;
		tagline?: string;
	}

	let {
		title,
		banner = 'polygon',
		interactive = false,
		size = 'default',
		showLogo = false,
		tagline = 'A SPACE TO CONNECT AND CREATE WITH DATA'
	}: Props = $props();

	const heightClass = $derived(size === 'large' ? 'h-[80svh]' : 'h-60');
</script>

<FullBleed className="pb-12">
	<div
		class="relative {heightClass} bg-gradient-to-b from-transparent from-[0%] to-white to-[100%]"
	>
		<div class="absolute inset-0 {banner === 'curve' ? '' : 'overflow-hidden'}">
			{#if banner === 'curve'}
				<BannerCurve staticBanner={!interactive} direction="header" />
			{:else}
				<BannerPolygon staticBanner={!interactive} fadeDirection="bottom" />
			{/if}
		</div>

		{#if !interactive}
			<!-- Static header: centered title -->
			<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
				<h1
					class="font-display mx-3 w-fit max-w-[40ch] rounded-2xl bg-white px-4 text-2xl font-bold text-balance md:mx-0 md:text-center"
				>
					{title}
				</h1>
			</div>
		{:else if banner === 'polygon'}
			<!-- Interactive polygon: centered logo with tagline -->
			<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
				<VizChitraLogoTagline tag="h3" textContent={tagline} />
			</div>
		{:else}
			<!-- Interactive curve: logo bottom left, tagline top right -->
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
