<script>
	import Header from './Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';
	import HeaderCallToAction from '$lib/components/HeaderCallToAction.svelte';

	import { page } from '$app/stores';
	import NavMenu from '$lib/components/NavMenu.svelte';

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();
</script>

{#if $page.url.pathname !== '/'}
	<NavMenu />
{/if}

<div class="app">
	<!-- <Header /> -->
	<HeaderCallToAction />
	<main>
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
		max-width: 60vw;
		margin: 0 auto;
		box-sizing: border-box;
	}

	@media (max-width: 768px) {
		main {
			max-width: 100%;
		}
	}
</style>
