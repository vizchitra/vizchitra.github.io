<script lang="ts">
	import { LineLayer, MapLibre, VectorTileSource, Marker, Popup } from 'svelte-maplibre-gl';

	import maplibregl from 'maplibre-gl';

	const { type } = $props<{ type: 'workshop' | 'conference' }>();

	// Define marker data
	let workshopMarkers = $state([
		{
			id: 'samagata',
			name: 'Samagata Foundation',
			lnglat: { lng: 77.6027528238416, lat: 12.97563511752492 },
			address:
				'46/1, Cobalt, 4th, Church St, Haridevpur, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001',
			popupOpen: true
		},
		{
			id: 'underline',
			name: 'Underline Center',
			lnglat: { lng: 77.63669336178374, lat: 12.967223289573266 },
			address:
				'3rd Floor, above Blue Tokai, #24 3rd A Cross, 1st Main Rd, Bengaluru, Karnataka 560071',
			popupOpen: true
		}
	]);

	const conferenceMarkers = $state([
		{
			id: 'conference',
			name: 'Bangalore International Centre',
			lnglat: { lng: 77.63523618257383, lat: 12.966827628489266 },
			address: '7, 4th Main Rd, Stage 2, Domlur, Bengaluru, Karnataka 560071',
			popupOpen: true
		}
	]);

	let selectedMarkers = $derived(type === 'workshop' ? workshopMarkers : conferenceMarkers);
	let offsets: maplibregl.Offset = $derived({
		top: [0, 24],
		bottom: [0, -24],
		left: [24 + 12, 0],
		right: [-24 - 12, 0],
		center: [0, 0],
		'top-left': [24, 24],
		'top-right': [-24, 24],
		'bottom-left': [24, -24],
		'bottom-right': [-24, -24]
	});

	// Calculate center point between both markers
	let mapCenter = $derived({
		lng:
			selectedMarkers.length > 1
				? (selectedMarkers[0].lnglat.lng + selectedMarkers[1].lnglat.lng) / 2
				: selectedMarkers[0].lnglat.lng,
		lat:
			selectedMarkers.length > 1
				? (selectedMarkers[0].lnglat.lat + selectedMarkers[1].lnglat.lat) / 2
				: selectedMarkers[0].lnglat.lat
	});
</script>

<MapLibre
	class="h-[480px] w-full"
	style="https://api.maptiler.com/maps/streets-v2/style.json?key=YNqfpfEi1e5BsLyLojCf"
	zoom={13}
	maxPitch={80}
	center={mapCenter}
>
	<VectorTileSource
		tiles={['https://tile.openstreetmap.org/{z}/{x}/{y}.png']}
		minzoom={0}
		maxzoom={19}
		attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
	>
		<LineLayer
			sourceLayer="city"
			layout={{ 'line-join': 'round', 'line-cap': 'round' }}
			paint={{ 'line-color': '#ff00ff', 'line-width': 1 }}
		/>
	</VectorTileSource>

	{#each selectedMarkers as marker}
		<Marker bind:lnglat={marker.lnglat}>
			{#snippet content()}
				<div class="text-center leading-none">
					<div class="text-3xl">📍</div>
				</div>
			{/snippet}
			<Popup class="text-black" bind:open={marker.popupOpen} offset={offsets}>
				<div class="-mt-1 p-2">
					<div class="mb-1 text-lg font-semibold">{marker.name}</div>
					<div class="text-sm">
						{marker.address}
					</div>
				</div>
			</Popup>
		</Marker>
	{/each}
</MapLibre>

<style>
	:global(.maplibregl-popup-close-button) {
		margin: 4px 12px 0 0;
		font-size: 1.2rem;
		color: var(--color-viz-pink);
		display: none;
	}
</style>
