<script lang="ts">
	import { Stack, VideoEmbed } from '$lib/components';
	// Embedded assets — component is prop-free and self-contained
	const recapImage = '/images/events/recap-2025-thumbnail.webp';
	const decorBannerTop = '/images/patterns/decor-banner-2.webp';
	const decorBannerBottom = '/images/patterns/decor-banner-1.webp';
	const playButton = '/images/icons/play-button.webp';
	const videoId = 'LfJLCueKkb0';
</script>

<section class="recap-section relative w-full">
	<!-- Top Decorative Banner -->
	<div class="absolute top-0 z-10 w-full transition-opacity duration-300">
		<img src={decorBannerTop} alt="Decorative banner top" class="h-auto w-full object-cover" />
	</div>

	<!-- YouTube Video Container -->
	<div
		class="relative h-full w-full bg-black"
		style="display: flex; align-items: center; justify-content: center;"
	>
		<div class="relative w-full max-w-5xl md:my-36">
			<VideoEmbed {videoId} thumbnail={recapImage} {playButton} title="VizChitra 2025 Recap" />
		</div>
	</div>

	<div class="absolute bottom-0 z-4 w-full transition-opacity duration-300">
		<img src={decorBannerBottom} alt="Decorative banner bottom" class="h-36 w-full object-top" />
	</div>
</section>

<style>
	.recap-section {
		height: 70svh;
	}

	@media (min-width: 768px) {
		.recap-section {
			height: 90svh;
		}
	}
</style>
