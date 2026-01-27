<!--
	MapWrapper - Lazy loads the Map component only when rendered
	This prevents MapLibre and its dependencies from being loaded on pages that don't need maps
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	interface MarkerData {
		id: string;
		name: string;
		lnglat: { lng: number; lat: number };
		address: string;
		popupOpen?: boolean;
	}

	interface Props {
		/** Array of markers to display */
		markers?: MarkerData[];
		/** Map zoom level */
		zoom?: number;
		/** Map height class */
		height?: string;
		/** Additional CSS classes */
		class?: string;
	}

	let { markers = [], zoom = 13, height = 'h-[480px]', class: className = '' }: Props = $props();

	let state = $state<{
		MapComponent: any;
		loading: boolean;
		error: string | null;
	}>({
		MapComponent: null,
		loading: true,
		error: null
	});

	onMount(async () => {
		if (!browser) return;

		try {
			// Dynamically import the Map component when the wrapper is mounted
			const module = await import('./Map.svelte');
			state.MapComponent = module.default;
			state.loading = false;
		} catch (err) {
			state.error = `Failed to load map: ${err instanceof Error ? err.message : String(err)}`;
			state.loading = false;
		}
	});
</script>

{#if state.loading}
	<div class="{height} w-full {className} flex items-center justify-center rounded bg-gray-100">
		<div class="text-gray-500">Loading map...</div>
	</div>
{:else if state.error}
	<div
		class="{height} w-full {className} flex items-center justify-center rounded border border-red-200 bg-red-50"
	>
		<div class="text-sm text-red-600">{state.error}</div>
	</div>
{:else if state.MapComponent}
	<state.MapComponent {markers} {zoom} {height} class={className} />
{/if}
