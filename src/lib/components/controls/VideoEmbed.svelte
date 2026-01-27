<script lang="ts">
	/**
	 * Generic YouTube video embed wrapper.
	 * Renders a static lazy-loaded thumbnail that links to YouTube.
	 */
	interface Props {
		/** YouTube video ID */
		videoId: string;
		/** Custom thumbnail image URL */
		thumbnail?: string;
		/** Custom play button image URL */
		playButton?: string;
		/** Video title for accessibility */
		title?: string;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		videoId,
		thumbnail,
		playButton = '/images/icons/play-button.webp',
		title = 'Video',
		class: className = ''
	}: Props = $props();
</script>

<div class={'youtube-embed relative w-full ' + className}>
	<a
		href={'https://www.youtube.com/watch?v=' + videoId}
		target="_blank"
		rel="noopener noreferrer"
		class="relative block"
		aria-label={'Open video: ' + title}
	>
		<img
			alt={title}
			src={thumbnail ?? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
			loading="lazy"
			decoding="async"
			style="width: 100%; height: 100%; object-fit: contain; object-position: center; display: block;"
		/>

		<span class="pointer-events-none absolute inset-0 flex items-center justify-center">
			<img alt={'Play ' + title} src={playButton} class="h-16 w-16 sm:h-20 sm:w-20" />
		</span>
	</a>
</div>
