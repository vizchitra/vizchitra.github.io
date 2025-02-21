<script lang="ts">
	import BannerPolygon from './BannerPolygon.svelte';
	import SocialLink from './SocialLink.svelte';
</script>

<div class="footer-content relative pb-24">
	<footer class="relative">
		<div class="z-10 flex flex-col items-center gap-8 py-16">
			<div class="links flex gap-8">
				<a href="/code-of-conduct" class=" text-viz-pink-dark font-bold underline"
					>Code of Conduct</a
				>
				|
				<a href="/polygon-playground" class=" text-viz-pink-dark font-bold underline"
					>Create your Data Selfie</a
				>
			</div>

			<SocialLink />

			<p class="bg-white text-sm opacity-75">
				Copyright © {new Date().getFullYear()} Vizchitra. All rights reserved.
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

	.links a {
		font-weight: 500;
		transition: color 0.2s ease;
	}
</style>
