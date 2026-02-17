<script lang="ts">
	import Youtube from 'svelte-youtube-embed';
	// Embedded assets — component is prop-free and self-contained
	const recapImage = '/images/events/recap-2025-thumbnail.webp';
	const decorBannerTop = '/images/patterns/decor-banner-2.webp';
	const decorBannerBottom = '/images/patterns/decor-banner-1.webp';
	const playButton = '/images/icons/play-button.webp';
	const videoId = 'LfJLCueKkb0';
</script>

<section class="relative h-[70svh] w-full md:h-[90svh]">
	<!-- Top Decorative Banner -->
	<div class="absolute top-0 z-10 w-full transition-opacity duration-300">
		<img src={decorBannerTop} alt="Decorative banner top" class="h-auto w-full object-cover" />
	</div>

	<!-- YouTube Video Container -->
	<div class="relative flex h-full w-full items-center justify-center bg-black">
		<div class="relative w-full max-w-5xl md:my-36">
			<Youtube --title-color="transparent" id={videoId} animations={false}>
				{#snippet thumbnail()}
					<img
						slot="thumbnail"
						alt="Recap thumbnail"
						src={recapImage}
						style="width: 100%; height: 100%; object-fit: contain; object-position: center;"
					/>
				{/snippet}
				{#snippet play_button()}
					<img slot="play_button" alt="Play" src={playButton} />
				{/snippet}
			</Youtube>
		</div>
	</div>

	<div class="absolute bottom-0 z-4 w-full transition-opacity duration-300">
		<img src={decorBannerBottom} alt="Decorative banner bottom" class="h-36 w-full object-top" />
	</div>
</section>
