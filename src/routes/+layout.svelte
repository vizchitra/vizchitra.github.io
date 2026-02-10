<script>
	import { Footer, NavMenu } from '$lib/components/structure';
	import SEO from '$lib/components/structure/SEO.svelte';
	import '../app.css';

	import { page } from '$app/stores';

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();

	// Layout props: new pageLayout key, falling back to old document convention during migration
	let banner = $derived($page.data?.pageLayout?.banner ?? $page.data?.document?.banner ?? 'curve');
	let color = $derived($page.data?.pageLayout?.color ?? $page.data?.document?.color);
</script>

<SEO />

<div class="app">
	<NavMenu></NavMenu>
	<main>
		{@render children()}
	</main>
	<Footer {banner} {color} />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		/* padding: 2.5rem; */
		width: 100%;
		min-width: 0;
	}

	@media (max-width: 768px) {
		main {
			max-width: 100%;
		}
	}
</style>
