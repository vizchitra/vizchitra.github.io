<script lang="ts">
	import BannerPolygon from './BannerPolygon.svelte';
	import BannerCurve from './BannerCurve.svelte';
	import SocialLink from './SocialLink.svelte';

	interface Props {
		banner?: 'polygon' | 'curve';
	}

	let { banner = 'polygon' }: Props = $props();
</script>

<div class="relative bg-gradient-to-t from-transparent from-[0%] to-white to-[65%] pb-24">
	<footer class="relative min-h-[300px] {banner === 'curve' ? '' : 'overflow-hidden'}">
		<div class="z-10 flex flex-col items-center gap-8 py-16">
			<SocialLink />

			<p class="bg-white text-sm opacity-75">
				Copyright © {new Date().getFullYear()} VizChitra. All rights reserved.
			</p>
		</div>
	</footer>
	<div class="absolute inset-0 -z-10 h-full w-full">
		{#if banner === 'curve'}
			<BannerCurve staticBanner direction="footer" />
		{:else}
			<BannerPolygon staticBanner fadeDirection="top" />
		{/if}
	</div>
</div>
