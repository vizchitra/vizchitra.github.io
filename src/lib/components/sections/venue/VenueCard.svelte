<script lang="ts">
	interface Transportation {
		method: string;
		details: string;
	}

	interface Venue {
		name: string;
		address: string;
		googleMapsURL: string;
		transportation: Transportation[];
	}

	const { venue, index }: { venue: Venue; index?: number } = $props();
</script>

<div
	class="venue-card group relative flex h-full overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-lg"
>
	<div class="relative z-10 flex h-full w-full flex-col">
		<div class="mb-4 flex items-start justify-between">
			<h3 class="text-xl font-bold text-gray-800">{venue.name}</h3>
			{#if index !== undefined}
				<span
					class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-800"
				>
					{index + 1}
				</span>
			{/if}
		</div>
		<p class="mb-2 leading-relaxed text-gray-600">{venue.address}</p>
		<div class="flex-grow space-y-3">
			{#each venue.transportation as transport}
				<div class="grid grid-cols-[80px,1fr] gap-2 text-sm">
					<span class="font-semibold">{transport.method}</span>
					<span class="text-gray-600">{transport.details}</span>
				</div>
			{/each}
		</div>
		<button
			onclick={() => window.open(venue.googleMapsURL, '_blank')}
			class="bg-viz-pink hover:bg-viz-pink/90 mt-3 inline-flex w-full items-center justify-center gap-3 rounded-lg px-6 py-3 font-semibold text-gray-800 transition-all duration-200 hover:text-white"
		>
			<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
				<path
					d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
				/>
			</svg>
			Open in Google Maps
		</button>
	</div>
</div>
