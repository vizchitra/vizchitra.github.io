<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';

	let videosData = [
		{
			id: '0nHw0TTDiEY',
			title: 'The Data Is Here:',
			subtitle: 'But Whom Is It Serving?',
			thumbnail: 'https://i.ytimg.com/vi/0nHw0TTDiEY/maxresdefault.jpg',
			type: 'Keynote',
			code: 'Keynote'
		},
		{
			id: 'htc3LwVbPgI',
			title: 'Data Design By Dialogue:',
			subtitle: 'Visualising Data with LLMs',
			thumbnail: 'https://i.ytimg.com/vi/htc3LwVbPgI/maxresdefault.jpg',
			type: 'Keynote',
			code: 'Keynote'
		},
		{
			id: 'ngjkqqjW5kY',
			title: 'The Eyes Have It:',
			subtitle: 'Understanding Perception-Driven Data Visualisation',
			thumbnail: 'https://i.ytimg.com/vi/ngjkqqjW5kY/maxresdefault.jpg',
			type: 'Standard Talks',
			code: 'StandardTalks'
		},
		{
			id: 'lNMBq8_zl_M',
			title: 'Data Journalism and Visualisation:',
			subtitle: "at a time of Print's decline",
			thumbnail: 'https://i.ytimg.com/vi/lNMBq8_zl_M/maxresdefault.jpg',
			type: 'Standard Talks',
			code: 'StandardTalks'
		},
		{
			id: '3dZA7iJF51g',
			title: 'Bringing Order to Chaos:',
			subtitle: 'Designing Visualizations for Enterprise',
			thumbnail: 'https://i.ytimg.com/vi/3dZA7iJF51g/maxresdefault.jpg',
			type: 'Sponsored Talk',
			code: 'SponsoredTalk'
		},
		{
			id: 'AUrJVCLiAG0',
			title: 'Data Visualization at Lilly:',
			subtitle: 'Designing Visuals that Solve, Simplify, and See Ahead',
			thumbnail: 'https://i.ytimg.com/vi/AUrJVCLiAG0/maxresdefault.jpg',
			type: 'Sponsored Talk',
			code: 'SponsoredTalk'
		},
		{
			id: 'MmSdz7hPZGM',
			title: 'The invisible graph:',
			subtitle: 'Leveraging AI to design accessible data visualisations',
			thumbnail: 'https://i.ytimg.com/vi/MmSdz7hPZGM/maxresdefault.jpg',
			type: 'Lightning Talks',
			code: 'LightningTalks'
		},
		{
			id: 'rHigCIwrTfE',
			title: 'Panel on Past,Present and Future Of Viz in Biz',
			subtitle: '',
			thumbnail: 'https://i.ytimg.com/vi/rHigCIwrTfE/maxresdefault.jpg',
			type: 'Panel Disussion',
			code: 'PanelDisussion'
		}
	];

	// CSS class mappings
	const badgeClasses: any = {
		Keynote: 'badge-keynote',
		StandardTalks: 'badge-standard',
		SponsoredTalk: 'badge-sponsored',
		LightningTalks: 'badge-lightning',
		PanelDisussion: 'badge-panel',
		Default: 'badge-panel'
	};

	const hoverBorderClasses: any = {
		Keynote: 'card-hover-keynote',
		StandardTalks: 'card-hover-standard',
		SponsoredTalk: 'card-hover-sponsored',
		LightningTalks: 'card-hover-lightning',
		PanelDisussion: 'card-hover-panel',
		Default: 'card-hover-panel'
	};

	let selectedType = 'All';
	const types = ['All', ...new Set(videosData.map((video) => video.type))];

	$: filteredVideos =
		selectedType === 'All' ? videosData : videosData.filter((video) => video.type === selectedType);

	function openVideo(videoId: string) {
		window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
	}
</script>

<div class="min-h-screen w-full">
	<PageHeader title="VizChitra 2025 Recape!" />

	<div class="mx-auto max-w-7xl px-4 py-8">
		<!-- Dropdown -->
		<div class="mb-6">
			<div class="relative inline-block">
				<select
					bind:value={selectedType}
					class="appearance-none rounded-md border border-gray-300 bg-white px-3 py-1.5 pr-8 text-sm font-medium text-gray-700 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				>
					{#each types as type}
						<option value={type}>{type}</option>
					{/each}
				</select>

				<div class="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400">
					<svg
						class="h-4 w-4"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
					</svg>
				</div>
			</div>
		</div>

		<!-- Video Grid -->
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
			{#each filteredVideos as video (video.id)}
				<button
					type="button"
					on:click={() => openVideo(video.id)}
					class={`transform cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white text-left transition hover:scale-[1.02] hover:shadow-md ${hoverBorderClasses[video.code] || hoverBorderClasses.Default}`}
				>
					<img src={video.thumbnail} alt={video.title} class="h-auto w-full" />
					<div class="p-4">
						<div class="truncate font-medium text-gray-900">{video.title}</div>
						<div class="mt-1 truncate text-sm text-gray-500">{video.subtitle}</div>

						<!-- Badge -->
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
	</div>
</div>


<style>

.badge-keynote {
  background-color: var(--color-viz-pink);
  color: #fff;
  border: 1px solid var(--color-viz-pink);
}

.badge-standard {
  background-color: var(--color-viz-orange);
  color: #fff;
  border: 1px solid var(--color-viz-orange);
}

.badge-sponsored {
  background-color: var(--color-viz-yellow);
  color: #000;
  border: 1px solid var(--color-viz-yellow);
}

.badge-lightning {
  background-color: var(--color-viz-pink);
  color: #fff;
  border: 1px solid var(--color-viz-pink);
}

.badge-panel {
  background-color: var(--color-viz-teal);
  color: #000;
  border: 1px solid var(--color-viz-teal);
}

.card-hover-keynote:hover {
  border-color: var(--color-viz-pink);
}

.card-hover-standard:hover {
  border-color: var(--color-viz-orange);
}

.card-hover-sponsored:hover {
  border-color: var(--color-viz-yellow);
}

.card-hover-lightning:hover {
  border-color: var(--color-viz-pink);
}

.card-hover-panel:hover {
  border-color: var(--color-viz-teal);
}
</style>
