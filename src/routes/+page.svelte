<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	// Import reusable components
	import ButtonBar from '$lib/assets/images/ButtonBar.svelte';
	import { Mission } from '$lib/components/sections';
	import { Dropdown } from '$lib/components/interface';
	import { DividerPolygon, BannerPolygon, Pentagons } from '$lib/components/structure';
	import { Slanted, VizChitraLogoType } from '$lib/components/typography';
	import VizchitraLogo from '$lib/assets/images/logos/viz-logo-animate.svg?raw';
	import Youtube from 'svelte-youtube-embed';
	import decorBanner1 from '$lib/assets/images/patterns/decor-banner-1.png';
	import decorBanner2 from '$lib/assets/images/patterns/decor-banner-2.png';
	import playButton from '$lib/assets/images/icons/play-button.png';
	import cardDecor from '$lib/assets/images/patterns/card-decor.png';

	const recapImage = resolve('/images/events/recap-2025-thumbnail.webp');

	const whyAttend = [
		{
			title: 'Explore & Play',
			description: 'On practices of data exploration, interface & dashboard design for dataviz.',
			backgroundColor: 'var(--color-viz-teal-light)'
		},
		{
			title: 'Explain & Learn',
			description: 'Centered on fundamentals of process, design & communication for dataviz.',
			backgroundColor: 'var(--color-viz-yellow-light)'
		},
		{
			title: 'Imagine & Innovate',
			description:
				'Use of new mediums, approaches, AI & tech to shape how we do dataviz in future.',
			backgroundColor: 'var(--color-viz-blue-light)'
		}
	];
	// Import CSV video data
	import videosData from '$lib/data/youtube-videos.csv';

	let isMobile = $state(false);

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
	let selectedType = $state('All');

	// Extract unique video types for filter buttons
	const types = ['All', ...new Set(videosData.map((video: any) => video.type))];

	// Prepare button bar data (used by <ButtonBar> component)
	let buttonBarData = types.map((type: any, index: number) => ({
		label: type, // Text shown on the button
		code: type, // Internal code (used in event handling)
		id: type + index // Unique key
	}));

	// Auto-update filtered videos whenever `selectedType` changes
	let filteredVideos = $derived(
		selectedType === 'All'
			? videosData
			: videosData.filter((video: any) => video.type === selectedType)
	);

	/**
	 * Opens a YouTube video in a new tab using its ID.
	 * @param videoId - YouTube video ID
	 */
	function openVideo(videoId: string) {
		window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
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

<div class="w-full">
	<div class="banner-container full-bleed relative h-[80svh]">
		<BannerPolygon />
		<div
			class="logo-container pointer-events-none absolute top-1/3 left-1/2 mb-2 flex -translate-x-1/2 -translate-y-1/3 flex-col items-center rounded-md bg-white px-2 pt-2 pb-4 shadow-lg md:max-w-none md:flex-row md:gap-0 md:px-8"
		>
			<div class="logo">
				{@html VizchitraLogo}
			</div>

			<p
				class="tagline leading-1.1 -mt-8 mb-2 max-w-[20ch] border-black text-center uppercase md:mt-0 md:border-l-2 md:pl-5 md:text-left"
			>
				<Slanted plain color="black" textContent="A SPACE TO CONNECT AND CREATE WITH DATA" />
			</p>
		</div>
	</div>
	<div class="mx-auto max-w-3xl px-5 py-12">
		<h2 class="content-heading mb-3 text-center">
			<VizChitraLogoType></VizChitraLogoType>
		</h2>
		<p class="content-text mx-auto mb-1 text-center">
			India's first community-driven conference dedicated to <span
				class="text-viz-pink-dark font-bold">data visualization</span
			>
			brought together practitioners from
			<span class="text-viz-orange-dark font-bold">diverse industries and disciplines</span>
			across the country to foster
			<span class="text-viz-orange-dark font-bold">learning, collaboration,</span>
			and a shared passion for the art of
			<span class="text-viz-pink-dark font-bold">visual data storytelling.</span>
			See the highlights and talk sessions below.
		</p>
	</div>
	<section class="relative h-[70svh] w-full md:h-[90svh]">
		<!-- Top Decorative Banner -->
		<div class="absolute top-0 z-10 w-full transition-opacity duration-300">
			<img src={decorBanner2} alt="Decorative banner top" class="h-auto w-full object-cover" />
		</div>

		<!-- YouTube Video Container -->
		<div class="relative flex h-full w-full items-center justify-center bg-black">
			<div class="relative w-full max-w-5xl md:my-36">
				<Youtube --title-color="transparent" id="LfJLCueKkb0" animations={false}>
					{#snippet thumbnail()}
						<img
							slot="thumbnail"
							alt="A video on svelte"
							src={recapImage}
							style="width: 100%; height: 100%; object-fit: contain; object-position: center;"
						/>
					{/snippet}
					{#snippet play_button()}
						<img slot="play_button" alt="A video on svelte" src={playButton} />
					{/snippet}
				</Youtube>
			</div>
		</div>

		<div class="absolute bottom-0 z-4 w-full transition-opacity duration-300">
			<img src={decorBanner1} alt="Decorative banner bottom" class=" h-36 w-full object-top" />
		</div>
	</section>
</div>

<!-- Recap Video Section with Decorative Banners -->

<!-- Main content container -->
<div class="mx-auto max-w-7xl px-4 py-8">
	<div class="mx-auto mb-6 flex justify-center">
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
	<div class="grid max-w-[90dvw] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
		{#each filteredVideos as video (video.id)}
			<div
				class="max-width relative flex h-[500px] flex-col rounded-md border border-black/20 bg-white transition-all duration-300 ease-in-out hover:border-gray-300 hover:shadow-xl"
			>
				<div
					class="pointer-events-none absolute inset-0 z-1 rounded-md opacity-50"
					style="background-image: url({cardDecor}); background-repeat: no-repeat; background-position: bottom left; background-size: 320px;"
				></div>
				<button
					type="button"
					onclick={() => openVideo(video.id)}
					class="relative z-10 flex h-full w-full cursor-pointer flex-col rounded-xl border-none bg-transparent text-left transition outline-none"
				>
					<!-- Card Header with Title -->
					<div class="h-[100px] flex-shrink-0 p-4 pb-3">
						<h3 class="text-viz-orange-dark line-clamp-4 text-xl leading-tight font-bold">
							{video.title} <span class="text-md font-normal">{video.subtitle}</span>
						</h3>
					</div>

					<!-- Thumbnail Image -->
					<div class="mx-4 mb-4 h-[200px] flex-shrink-0 overflow-hidden rounded-sm bg-black">
						<img src={video.thumbnail} alt={video.title} class="h-full w-full object-cover" />
					</div>

					<!-- Speaker Info and Badge -->
					<div class="flex h-[160px] flex-shrink-0 flex-col justify-between px-6 pb-6">
						<!-- Speaker Name and Subtitle - Right Aligned -->
						<div class="text-right">
							<div class="text-xl leading-tight font-bold text-balance text-gray-800">
								{video.speaker}
							</div>
							<p
								class="mt-2 line-clamp-3 text-base leading-tight text-balance text-gray-600 italic"
							>
								{video.hook}
							</p>
						</div>
					</div>
				</button>
			</div>
		{/each}
	</div>

	<div class="max-w-[90dvw] px-5 py-12 md:max-w-7xl">
		<DividerPolygon></DividerPolygon>

		<h2 class="content-heading mt-12 pt-12 text-center">
			<a href="/ethos"
				>Our Ethos @
				<VizChitraLogoType includeYear={false}></VizChitraLogoType>
			</a>
		</h2>
		<h3 class="content-subheading text-viz-pink-dark mt-6 text-center">
			<Slanted textContent="A SPACE TO CONNECT AND CREATE WITH DATA" />
		</h3>
		<p class="content-text mx-auto mt-3 text-center">
			Our goal is to build a community of diverse, interdisciplinary individuals working across the
			visualization spectrum, and facilitate learning and connections between people from different
			industries and disciplines who share a common interest in the power of data and storytelling.
		</p>
		<div class="mt-6 flex flex-wrap gap-4">
			{#each whyAttend as item, i}
				<Pentagons
					title={item.title}
					description={item.description}
					backgroundColor={item.backgroundColor}
					seed={Math.floor(Math.random() * 10)}
				/>
			{/each}
		</div>
		<h2 class="content-heading mt-18 pt-12 text-center">
			Our Mission @
			<VizChitraLogoType includeYear={false}></VizChitraLogoType>
		</h2>
		<h3 class="content-subheading text-viz-blue-dark mt-6 text-center">
			<Slanted textContent="BUILD AN INDIAN DATA VISUALIZATION COMMUNITY" />
		</h3>
		<p class="content-text mx-auto mt-3 text-center">
			To foster a vibrant <span class="font-bold">community of data storytellers in India</span>,
			bridging technical analysis and design expertise to shape perspectives and drive change
		</p>
		<Mission></Mission>
		<DividerPolygon></DividerPolygon>
	</div>
</div>

<!-- Mission Section -->
