<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import maplibregl from 'maplibre-gl';

	const { type } = $props<{ type: 'workshop' | 'conference' }>();

	const workshopMarkers = [
		{
			id: 'samagata',
			name: 'Samagata Foundation',
			lnglat: [77.6027528238416, 12.97563511752492] as [number, number],
			address:
				'46/1, Cobalt, 4th, Church St, Haridevpur, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001'
		},
		{
			id: 'underline',
			name: 'Underline Center',
			lnglat: [77.63669336178374, 12.967223289573266] as [number, number],
			address:
				'3rd Floor, above Blue Tokai, #24 3rd A Cross, 1st Main Rd, Bengaluru, Karnataka 560071'
		}
	];

	const conferenceMarkers = [
		{
			id: 'conference',
			name: 'Bangalore International Centre',
			lnglat: [77.63523618257383, 12.966827628489266] as [number, number],
			address: '7, 4th Main Rd, Stage 2, Domlur, Bengaluru, Karnataka 560071'
		}
	];

	const markers = type === 'workshop' ? workshopMarkers : conferenceMarkers;
	const center: [number, number] =
		markers.length > 1
			? [
					(markers[0].lnglat[0] + markers[1].lnglat[0]) / 2,
					(markers[0].lnglat[1] + markers[1].lnglat[1]) / 2
				]
			: markers[0].lnglat;

	let mapContainer: HTMLDivElement;
	let map: maplibregl.Map;

	onMount(() => {
		map = new maplibregl.Map({
			container: mapContainer,
			style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=YNqfpfEi1e5BsLyLojCf',
			zoom: 13,
			maxPitch: 80,
			center
		});

		for (const m of markers) {
			const popup = new maplibregl.Popup({ offset: 24, closeButton: false }).setHTML(
				`<div style="padding:8px"><div style="margin-bottom:4px;font-size:1.125rem;font-weight:600">${m.name}</div><div style="font-size:0.875rem">${m.address}</div></div>`
			);
			const el = document.createElement('div');
			el.style.cssText = 'font-size:1.875rem;line-height:1;text-align:center';
			el.textContent = '📍';
			new maplibregl.Marker({ element: el }).setLngLat(m.lnglat).setPopup(popup).addTo(map);
			map.on('load', () => popup.addTo(map).setLngLat(m.lnglat));
		}
	});

	onDestroy(() => map?.remove());
</script>

<svelte:head>
	<link rel="stylesheet" href="/maplibre-gl.css" />
</svelte:head>

<div bind:this={mapContainer} class="h-120 w-full"></div>

<style>
	:global(.maplibregl-popup-close-button) {
		margin: 4px 12px 0 0;
		font-size: 1.2rem;
		color: var(--color-viz-pink);
		display: none;
	}
</style>
