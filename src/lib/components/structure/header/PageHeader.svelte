<script lang="ts">
	import BannerPolygon from '$lib/components/structure/banner/BannerPolygon.svelte';
	export let title: string;
</script>

<div class="relative mt-20 h-48">
	<BannerPolygon staticBanner={true} />
	<div class="absolute inset-0 flex items-center justify-center">
		<h1 class="font-display rounded-2xl bg-white px-4 text-[2rem] font-bold">{title}</h1>
	</div>
</div>
