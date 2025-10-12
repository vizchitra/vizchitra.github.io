<script lang="ts">
	import BannerPolygon from './BannerPolygon.svelte';
	import SocialLink from './SocialLink.svelte';
</script>

<div class="footer-content relative pb-24">
	<footer class="relative">
		<div class="z-10 flex flex-col items-center gap-8 py-16">
			<SocialLink />

			<p class="bg-white text-sm opacity-75">
				Copyright © {new Date().getFullYear()} VizChitra. All rights reserved.
			</p>
		</div>
	</footer>
	<div class="absolute inset-0 -z-1 h-full w-full">
		<BannerPolygon staticBanner />
	</div>
</div>

<style>
	footer {
		min-height: 300px;
		overflow: hidden;
	}

	.footer-content {
		position: relative;
		background: linear-gradient(to top, transparent, rgba(255, 255, 255, 1) 65%);
	}
</style>
