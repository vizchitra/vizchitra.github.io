<script>
	import { Footer, NavMenu } from '$lib/components/structure';
	import '../app.css';

	import { page } from '$app/stores';

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();

	// Get banner type from page data (frontmatter), default to 'polygon'
	let banner = $derived($page.data?.frontmatter?.banner ?? 'polygon');
	let color = $derived($page.data?.frontmatter?.color ?? 'all');
</script>

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
	}

	@media (max-width: 768px) {
		main {
			max-width: 100%;
		}
	}
</style>
