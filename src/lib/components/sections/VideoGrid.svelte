<script lang="ts">
	import { onMount } from 'svelte';
	import ButtonBar from '$lib/assets/images/ButtonBar.svelte';
	import { Dropdown } from '$lib/components/interface';

	// Embedded data: import CSV and card decoration locally so the component is prop-free
	import videosData from '$lib/data/youtube-videos.csv';
	const cardDecor = '/images/patterns/card-decor.webp';

	let isMobile = false;
	let selectedType: string = 'All';

	$: types = ['All', ...Array.from(new Set(videosData.map((v) => v.type)))];
	$: buttonBarData = types.map((type, index) => ({ label: type, code: type, id: type + index }));
	$: filteredVideos =
		selectedType === 'All' ? videosData : videosData.filter((v) => v.type === selectedType);

	function openVideo(videoId: string) {
		window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
	}

	function handleButtonBarChange(e: any) {
		selectedType = e.code;
	}

	function handleDropdownChange(e: any) {
		selectedType = e.value;
	}

	onMount(() => {
		const checkMobile = () => {
			isMobile = window.innerWidth < 768;
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	});
</script>

<div class="mx-auto max-w-7xl px-4 py-8">
	<div class="mx-auto mb-6 flex justify-center">
		{#if !isMobile}
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
					on:click={() => openVideo(video.id)}
					class="relative z-10 flex h-full w-full cursor-pointer flex-col rounded-xl border-none bg-transparent text-left transition outline-none"
				>
					<div class="h-[100px] flex-shrink-0 p-4 pb-3">
						<h3 class="text-viz-orange-dark line-clamp-4 text-xl leading-tight font-bold">
							{video.title} <span class="text-md font-normal">{video.subtitle}</span>
						</h3>
					</div>

					<div class="mx-4 mb-4 h-[200px] flex-shrink-0 overflow-hidden rounded-sm bg-black">
						<img src={video.thumbnail} alt={video.title} class="h-full w-full object-cover" />
					</div>

					<div class="flex h-[160px] flex-shrink-0 flex-col justify-between px-6 pb-6">
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
</div>
