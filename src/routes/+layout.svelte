<script>
	import { NavMenu, Footer, SEO } from '$lib/components';
	import '../app.css';

	import { page } from '$app/stores';
	import { panelStore } from '$lib/studio/editor/PanelStore';

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();

	// Layout props: new pageLayout key, falling back to old document convention during migration
	let banner = $derived($page.data?.pageLayout?.banner ?? $page.data?.document?.banner ?? 'curve');
	let color = $derived($page.data?.pageLayout?.color ?? $page.data?.document?.color);

	// Push --studio-panel-width onto :root so nav, main, and footer all shift together
	$effect(() => {
		const w = $panelStore === 'open' ? '18rem' : $panelStore === 'collapsed' ? '2.75rem' : '0px';
		document.documentElement.style.setProperty('--studio-panel-width', w);
	});
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
		padding-top: 4rem;
		/* padding: 2.5rem; */
		width: 100%;
		min-width: 0;
		padding-right: var(--studio-panel-width, 0);
		transition: padding-right 150ms ease;
	}

	:global(footer) {
		padding-right: var(--studio-panel-width, 0);
		transition: padding-right 150ms ease;
	}

	@media (max-width: 768px) {
		main {
			max-width: 100%;
		}
	}
</style>
