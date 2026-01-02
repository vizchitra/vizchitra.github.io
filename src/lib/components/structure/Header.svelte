<script lang="ts">
	import BannerPolygon from './BannerPolygon.svelte';
	interface Props {
		title: string;
	}

	let { title }: Props = $props();
</script>

<div class="relative h-48 bg-gradient-to-b from-transparent from-[0%] to-white to-[100%]">
	<div class="absolute inset-0 -z-10">
		<BannerPolygon staticBanner />
	</div>
	<div class="absolute inset-0 flex items-center justify-center">
		<h1 class="font-display rounded-2xl bg-white px-4 text-2xl font-bold">{title}</h1>
	</div>
</div>
