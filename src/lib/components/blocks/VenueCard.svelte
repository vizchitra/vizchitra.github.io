<!--
  VenueCard - Card component for displaying venue information.
  Shows address, transportation options, and Google Maps link.
-->
<script lang="ts">
	import { Box, Stack } from '$lib/components';

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

	interface Props {
		/** Venue data object */
		venue: Venue;
		/** Optional index number to display */
		index?: number;
	}

	const { venue, index }: Props = $props();
</script>

<Box class="group h-full">
	<Stack space="sm" align="start">
		<div class="flex w-full items-start justify-between">
			<h3 class="text-xl font-bold text-black">{venue.name}</h3>
			{#if index !== undefined}
				<span
					class="bg-grey-light inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-black"
				>
					{index + 1}
				</span>
			{/if}
		</div>

		<p class="text-grey leading-relaxed">{venue.address}</p>

		<div class="space-y-sm w-full">
			{#each venue.transportation as transport}
				<div class="transport-grid gap-xs grid text-sm">
					<span class="font-semibold">{transport.method}</span>
					<span class="text-grey">{transport.details}</span>
				</div>
			{/each}
		</div>

		<button
			onclick={() => window.open(venue.googleMapsURL, '_blank')}
			class="bg-pink px-md py-sm hover:bg-pink/90 mt-sm gap-sm inline-flex w-full items-center justify-center rounded-lg font-semibold text-black transition-all duration-200 hover:text-white"
		>
			<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
				<path
					d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
				/>
			</svg>
			Open in Google Maps
		</button>
	</Stack>
</Box>

<style>
	.transport-grid {
		grid-template-columns: 80px 1fr;
	}
</style>
