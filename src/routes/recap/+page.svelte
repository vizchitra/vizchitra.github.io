<script lang="ts">
	import { onMount } from 'svelte';
	// Import reusable components
	import ButtonBar from '$lib/components/ButtonBar.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import VideoModal from '$lib/components/VideoModal.svelte';

	// Import CSV video data
	import videosData from '$lib/data/youtube-videos.csv';
	import Dropdown from '$lib/components/Dropdown.svelte';

	let isMobile = false;
	let showModal = false;
	let currentVideoId: string | null = null;

	// Create a unique list of 'code' values from video data
	const uniqueCodes = [...new Set(videosData.map((video: any) => video.code))];

	// Initialize objects to map video codes to corresponding CSS classes
	const badgeClasses: Record<string, string> = {};
	const hoverBorderClasses: Record<string, string> = {};

	// Populate the class mappings dynamically
	uniqueCodes.forEach((code: any) => {
		badgeClasses[code] = `badge-${code.toLowerCase()}`;
		hoverBorderClasses[code] = `card-hover-${code.toLowerCase()}`;
	});

	// Provide default fallback classes in case of missing code
	badgeClasses['Default'] = 'badge-panel';
	hoverBorderClasses['Default'] = 'card-hover-panel';

	// Currently selected video type (filter)
	let selectedType = 'All';

	// Extract unique video types for filter buttons
	const types = ['All', ...new Set(videosData.map((video: any) => video.type))];

	// Prepare button bar data (used by <ButtonBar> component)
	let buttonBarData = types.map((type: any, index: number) => ({
		label: type, // Text shown on the button
		code: type, // Internal code (used in event handling)
		id: type + index // Unique key
	}));

	// Auto-update filtered videos whenever `selectedType` changes
	$: filteredVideos =
		selectedType === 'All'
			? videosData
			: videosData.filter((video: any) => video.type === selectedType);

	/**
	 * Opens a YouTube video in a new tab using its ID.
	 * @param videoId - YouTube video ID
	 */
	function openVideo(videoId: string) {
		window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
	}

	function openVideoInModal(videoId: string) {
		currentVideoId = videoId;
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		currentVideoId = null;
	}

	/**
	 * Handles video type selection from the <ButtonBar> component.
	 * Updates the selectedType reactive variable.
	 * @param e - Event emitted by ButtonBar with `code` of the selected button
	 */
	function handleButtonBarChange(e: any) {
		let activeValue = e.code;
		selectedType = activeValue;
	}

	/**
	 * Handles video type selection from the <Dropdown> component.
	 * Updates the selectedType reactive variable.
	 * @param e - Event emitted by Dropdown with `code` of the selected button
	 */
	function handleDropdownChange(e: any) {
		let activeValue = e.value;
		selectedType = activeValue;
	}

	onMount(() => {
		const checkMobile = () => {
			isMobile = window.innerWidth < 768;
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	});
</script>

<div class="min-h-screen w-full">
	<!-- Page Header -->
	<PageHeader title="VizChitra 2025 Recape!" />

	<!-- Main content container -->
	<div class="mx-auto max-w-7xl px-4 py-8">
		<div class="mb-6">
			{#if !isMobile}
				<!-- Filter Button Bar -->
				<ButtonBar
					data={buttonBarData}
					activeValue={selectedType}
					keyField="code"
					labelField="label"
					onSelect={handleButtonBarChange}
				/>
			{/if}
			{#if isMobile}
				<Dropdown
					data={buttonBarData}
					activeValue={selectedType}
					keyField="code"
					labelField="label"
					onSelect={handleDropdownChange}
				/>
			{/if}
		</div>

		<!-- Video Card Grid -->
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
			{#each filteredVideos as video (video.id)}
				<button
					type="button"
					on:click={() => openVideoInModal(video.id)}
					class={`transform cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white text-left transition hover:scale-[1.02] hover:shadow-md ${hoverBorderClasses[video.code] || hoverBorderClasses.Default}`}
				>
					<!-- Thumbnail Image -->
					<img src={video.thumbnail} alt={video.title} class="h-auto w-full" />

					<!-- Video Info -->
					<div class="p-4">
						<!-- Title -->
						<div class="truncate font-medium text-gray-900">{video.title}</div>

						<!-- Subtitle -->
						<div class="mt-1 truncate text-sm text-gray-500">{video.subtitle}</div>

						<!-- Type Badge -->
						<div
							class={`mt-2 inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${
								badgeClasses[video?.code] || badgeClasses.Default
							}`}
						>
							{video.type}
						</div>
					</div>
				</button>
			{/each}
		</div>
		<VideoModal videoId={currentVideoId} show={showModal} onClose={closeModal} />
	</div>
	
</div>

<style>
	/* Badge Styles */
	.badge-keynote {
		background-color: var(--color-viz-pink);
		color: #fff;
		border: 1px solid var(--color-viz-pink);
	}

	.badge-standardtalk {
		background-color: var(--color-viz-orange);
		color: #fff;
		border: 1px solid var(--color-viz-orange);
	}

	.badge-sponsoredtalk {
		background-color: var(--color-viz-yellow);
		color: #000;
		border: 1px solid var(--color-viz-yellow);
	}

	.badge-lightningtalk {
		background-color: var(--color-viz-pink);
		color: #fff;
		border: 1px solid var(--color-viz-pink);
	}

	.badge-paneldisussion {
		background-color: var(--color-viz-teal);
		color: #000;
		border: 1px solid var(--color-viz-teal);
	}

	/* Hover Effects */
	.card-hover-keynote:hover {
		border-color: var(--color-viz-pink);
	}

	.card-hover-standardtalk:hover {
		border-color: var(--color-viz-orange);
	}

	.card-hover-sponsoredtalk:hover {
		border-color: var(--color-viz-yellow);
	}

	.card-hover-lightningtalk:hover {
		border-color: var(--color-viz-pink);
	}

	.card-hover-paneldisussion:hover {
		border-color: var(--color-viz-teal);
	}
</style>
