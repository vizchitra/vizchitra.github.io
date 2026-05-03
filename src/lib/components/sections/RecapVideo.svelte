<script lang="ts">
	const recapImage = '/images/events/recap-2025-thumbnail.webp';
	const decorBannerTop = '/images/patterns/decor-banner-2.webp';
	const decorBannerBottom = '/images/patterns/decor-banner-1.webp';
	const playButton = '/images/icons/play-button.webp';
	const videoId = 'LfJLCueKkb0';

	let playing = $state(false);
</script>

<section class="relative h-[70svh] w-full md:h-[90svh]">
	<div class="absolute top-0 z-10 w-full transition-opacity duration-300">
		<img src={decorBannerTop} alt="Decorative banner top" class="h-auto w-full object-cover" />
	</div>

	<div class="relative flex h-full w-full items-center justify-center bg-black">
		<div class="relative w-full max-w-5xl md:my-36">
			{#if playing}
				<div class="aspect-video w-full">
					<iframe
						src="https://www.youtube.com/embed/{videoId}?autoplay=1"
						title="VizChitra 2025 Recap"
						class="h-full w-full"
						allow="autoplay; encrypted-media; picture-in-picture"
						allowfullscreen
					></iframe>
				</div>
			{:else}
				<button
					class="relative block w-full cursor-pointer border-0 bg-transparent p-0"
					onclick={() => (playing = true)}
					aria-label="Play VizChitra 2025 recap video"
				>
					<img
						alt="Recap thumbnail"
						src={recapImage}
						style="width: 100%; height: 100%; object-fit: contain; object-position: center;"
					/>
					<div class="absolute inset-0 flex items-center justify-center">
						<img alt="Play" src={playButton} />
					</div>
				</button>
			{/if}
		</div>
	</div>

	<div class="absolute bottom-0 z-4 w-full transition-opacity duration-300">
		<img src={decorBannerBottom} alt="Decorative banner bottom" class="h-36 w-full object-top" />
	</div>
</section>
