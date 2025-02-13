<script lang="ts">
	import BannerPolygon from '$lib/components/BannerPolygon.svelte';
	export let data;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="banner-container full-bleed">
	<BannerPolygon />
</div>

<style>
	.banner-container {
		height: 100vh;
		width: 100vw;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
