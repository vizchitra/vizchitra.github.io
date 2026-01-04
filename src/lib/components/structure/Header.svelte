<script lang="ts">
	import BannerPolygon from './BannerPolygon.svelte';
	import BannerCurve from './BannerCurve.svelte';
	import { VizChitraLogoTagline } from '$lib/components/typography';
	import FullBleed from '$lib/components/layout/FullBleed.svelte';

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
		<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
			{#if showLogo}
				<VizChitraLogoTagline tag="h3" textContent={tagline} />
			{:else}
				<h1 class="font-display rounded-2xl bg-white px-4 text-2xl font-bold">{title}</h1>
			{/if}
		</div>
	</div>
</FullBleed>
