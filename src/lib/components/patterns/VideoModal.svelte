<script lang="ts">
	interface Props {
		videoId: string;
		show: boolean;
		onClose: () => void;
	}

	let { videoId, show, onClose }: Props = $props();

	function handleOverlayClick(event: MouseEvent) {
		// only close when the overlay itself is clicked, not its children
		if (event.target === event.currentTarget) {
			onClose();
		}
	}

	function handleKey(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			event.preventDefault();
			onClose();
		}
		if (event.key === 'Enter' || event.key === ' ') {
			// allow Enter/Space to activate the overlay close when focused
			event.preventDefault();
			onClose();
		}
	}
</script>

{#if show && videoId}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/20 backdrop-blur-sm"
		onclick={handleOverlayClick}
		onkeydown={handleKey}
		role="dialog"
		aria-modal="true"
		aria-label="Video modal"
		tabindex="0"
	>
		<div
			class="relative w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg"
			role="document"
		>
			<!-- Close Button -->
			<button
				class="absolute top-4 right-4 z-10 cursor-pointer text-3xl font-bold text-gray-600 transition-transform duration-150 hover:scale-110 hover:text-black"
				onclick={onClose}
				aria-label="Close video modal"
			>
				&times;
			</button>

			<!-- YouTube Player -->
			<div class="aspect-w-16 aspect-h-9 w-full">
				<iframe
					class="h-full w-full"
					src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
					frameborder="0"
					allow="autoplay; encrypted-media"
					allowfullscreen
					title="YouTube video player"
				></iframe>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Fallback if Tailwind aspect ratio is not available */
	.aspect-w-16.aspect-h-9 {
		position: relative;
		padding-bottom: 56.25%;
		height: 0;
	}
	.aspect-w-16.aspect-h-9 iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
