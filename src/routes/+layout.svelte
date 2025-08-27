<script>
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';

	import { page } from '$app/stores';
	import NavMenu from '$lib/components/Navbar/NavMenu.svelte';

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<div class="app">
	<NavMenu></NavMenu>
	<main class:full-width={$page.url.pathname.includes('polygon-playground')}>
		{@render children()}
	</main>

	<Footer />
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
		padding: 2.5rem;
		width: 100%;
		max-width: 85vw;
		margin: 0 auto;
		box-sizing: border-box;
	}

	main.full-width {
		max-width: 90vw;
	}

	@media (max-width: 768px) {
		main {
			max-width: 100%;
			padding: 1rem;
		}
	}
</style>
