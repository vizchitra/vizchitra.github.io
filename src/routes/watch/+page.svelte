<script lang="ts">
	import { formatSlantedText } from '$lib/utils/utils.js';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import 'lite-youtube-embed/src/lite-yt-embed.css';

	let activeTab = 'main-auditorium';

	function setActiveTab(tab: string) {
		activeTab = tab;
	}

	onMount(async () => {
		if (browser) {
			// Dynamically import the lite-youtube-embed module
			try {
				await import('lite-youtube-embed');
			} catch (error) {
				console.warn('Failed to load lite-youtube-embed:', error);
			}
		}
	});
</script>

<div class="min-h-screen">
	<PageHeader title="WATCH LIVE" />

	<div class="content-container !max-w-none py-12">
		<h2 class="mb-8 text-center">
			{#each formatSlantedText('VizChitra 2025 Live Streams') as letter}
				<span
					class="slanted-text text-[18px] uppercase md:text-[24px]"
					style="--letter-slant: {letter.slant}"
				>
					{letter.letter}
				</span>
			{/each}
		</h2>

		<p class="content-text mx-auto mb-12 max-w-2xl text-center">
			Watch the conference live from multiple venues. Switch between the Main Auditorium and Hall 1
			to catch all the sessions, talks, and workshops.
		</p>

		<!-- Tab Navigation -->
		<div class="mb-8 flex justify-center">
			<div class="inline-flex rounded-lg border border-gray-300 bg-gray-100 p-1">
				<button
					class="rounded-md px-6 py-3 text-sm font-medium transition-all duration-200 {activeTab ===
					'main-auditorium'
						? 'bg-white text-gray-900 shadow-sm'
						: 'text-gray-600 hover:text-gray-900'}"
					on:click={() => setActiveTab('main-auditorium')}
				>
					Main Auditorium
				</button>
				<button
					class="rounded-md px-6 py-3 text-sm font-medium transition-all duration-200 {activeTab ===
					'hall-1'
						? 'bg-white text-gray-900 shadow-sm'
						: 'text-gray-600 hover:text-gray-900'}"
					on:click={() => setActiveTab('hall-1')}
				>
					Hall 1
				</button>
			</div>
		</div>

		<!-- Video Content -->
		<div class="mx-auto flex w-xl flex-col items-center justify-center">
			{#if activeTab === 'main-auditorium'}
				<div class="aspect-video w-full rounded-lg shadow-lg">
					<lite-youtube
						videoid="4HN9rPrLshc"
						playlabel="Play: VizChitra 2025 - Main Auditorium Live Stream"
						class="h-full w-full"
					></lite-youtube>
				</div>
				<div class="mt-4 text-center">
					<h3 class="mb-2 text-xl font-semibold text-gray-900">Main Auditorium</h3>
					<p class="text-gray-600">Keynotes, featured talks, and main conference sessions</p>
				</div>
			{:else if activeTab === 'hall-1'}
				<div class="aspect-video w-full rounded-lg shadow-lg">
					<lite-youtube
						videoid="-g2wH27Qu58"
						playlabel="Play: VizChitra 2025 - Hall 1 Live Stream"
						class="h-full w-full"
					></lite-youtube>
				</div>
				<div class="mt-4 text-center">
					<h3 class="mb-2 text-xl font-semibold text-gray-900">Hall 1</h3>
					<p class="text-gray-600">Workshops, breakout sessions, and interactive discussions</p>
				</div>
			{/if}
		</div>

		<!-- Additional Information -->
		<div class="mx-auto mt-16 max-w-4xl">
			<div class="rounded-lg bg-gray-50 p-8">
				<h3 class="mb-4 text-center text-lg font-semibold text-gray-900">Can't watch live?</h3>
				<p class="mb-6 text-center text-gray-600">
					All sessions will be recorded and available on our YouTube channel after the conference.
				</p>
				<div class="flex justify-center">
					<a
						href="https://youtube.com/@VizChitra"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-red-700"
					>
						<svg class="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M23.498 6.186a2.997 2.997 0 0 0-2.11-2.127C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.388.513A2.997 2.997 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.997 2.997 0 0 0 2.11 2.127C4.495 20.454 12 20.454 12 20.454s7.505 0 9.388-.513a2.997 2.997 0 0 0 2.11-2.127C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
							/>
						</svg>
						Subscribe to VizChitra
					</a>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	:global(lite-youtube) {
		width: 100% !important;
		height: 100% !important;
	}
</style>
