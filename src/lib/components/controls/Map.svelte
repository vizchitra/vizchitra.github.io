<!--
	Map - MapLibre-based map component for displaying venue locations.
	Supports multiple markers with popups.
-->
<script lang="ts">
	import { LineLayer, MapLibre, VectorTileSource, Marker, Popup } from 'svelte-maplibre-gl';
	import maplibregl from 'maplibre-gl';

	interface MarkerData {
		id: string;
		name: string;
		lnglat: { lng: number; lat: number };
		address: string;
		popupOpen?: boolean;
	}

	interface Props {
		/** Array of markers to display */
		markers: MarkerData[];
		/** Map zoom level */
		zoom?: number;
		/** Map height class */
		height?: string;
		/** Additional CSS classes */
		class?: string;
	}

	let { markers = [], zoom = 13, height = 'h-[480px]', class: className = '' }: Props = $props();

	// Make markers reactive with popupOpen state - use $state with $effect for updates
	let markersState = $state<Array<MarkerData & { popupOpen: boolean }>>([]);

	$effect(() => {
		markersState = markers.map((m) => ({ ...m, popupOpen: m.popupOpen ?? true }));
	});

	const offsets: maplibregl.Offset = {
		top: [0, 24],
		bottom: [0, -24],
		left: [24 + 12, 0],
		right: [-24 - 12, 0],
		center: [0, 0],
		'top-left': [24, 24],
		'top-right': [-24, 24],
		'bottom-left': [24, -24],
		'bottom-right': [-24, -24]
	};

	// Calculate center point between all markers
	const mapCenter = $derived({
		lng:
			markersState.length > 0
				? markersState.reduce((sum, m) => sum + m.lnglat.lng, 0) / markersState.length
				: 0,
		lat:
			markersState.length > 0
				? markersState.reduce((sum, m) => sum + m.lnglat.lat, 0) / markersState.length
				: 0
	});
</script>

<MapLibre
	class="{height} w-full {className}"
	style="https://api.maptiler.com/maps/streets-v2/style.json?key=YNqfpfEi1e5BsLyLojCf"
	{zoom}
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

	{#each markersState as marker, i}
		<Marker bind:lnglat={marker.lnglat}>
			{#snippet content()}
				<div class="text-center leading-none">
					<div class="text-3xl">📍</div>
				</div>
			{/snippet}
			<Popup class="text-black" bind:open={marker.popupOpen} offset={offsets}>
				<div class="p-xs">
					<div class="mb-xs text-lg font-semibold">{marker.name}</div>
					<div class="text-sm">{marker.address}</div>
				</div>
			</Popup>
		</Marker>
	{/each}
</MapLibre>

<style>
	:global(.maplibregl-popup-close-button) {
		margin: 4px 12px 0 0;
		font-size: 1.2rem;
		color: var(--color-pink);
		display: none;
	}
</style>
