<script lang="ts">
	import BannerPolygon from './BannerPolygon.svelte';
	import BannerCurve from './BannerCurve.svelte';

	interface Props {
		title: string;
		banner?: 'polygon' | 'curve';
		interactive?: boolean;
		size?: 'default' | 'large';
	}

	let { title, banner = 'polygon', interactive = false, size = 'default' }: Props = $props();

	const heightClass = $derived(size === 'large' ? 'h-[80svh]' : 'h-48');
</script>

<div class="relative {heightClass} bg-gradient-to-b from-transparent from-[0%] to-white to-[100%]">
	<div class="absolute inset-0">
		{#if banner === 'curve'}
			<BannerCurve staticBanner={!interactive} direction="header" />
		{:else}
			<BannerPolygon staticBanner={!interactive} />
		{/if}
	</div>
	<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
		<h1 class="font-display rounded-2xl bg-white px-4 text-2xl font-bold">{title}</h1>
	</div>
</div>
