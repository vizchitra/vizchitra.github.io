<script>
	import Header from './Header.svelte';
	import '../app.css';
	import HeaderCallToAction from '$lib/components/HeaderCallToAction.svelte';
	import { base } from '$app/path';

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<svelte:head>
	<link
		rel="preload"
		href="{base}/fonts/Cairo-Variable-Latin.woff2"
		as="font"
		type="font/woff2"
		crossorigin
	/>
	<link
		rel="preload"
		href="{base}/fonts/IBMPlexSans-Regular-Latin1.woff2"
		as="font"
		type="font/woff2"
		crossorigin
	/>
</svelte:head>

<div class="app">
	<!-- <Header /> -->
	<HeaderCallToAction />
	<main>
		{@render children()}
	</main>

	<footer>
		<p>
			Copyright {new Date().getFullYear()} Vizchitra
		</p>
	</footer>
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

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}

	@media (max-width: 768px) {
		main {
			max-width: 100%;
		}
	}
</style>
