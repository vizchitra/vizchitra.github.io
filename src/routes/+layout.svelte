<script lang="ts">
	import { Footer, NavMenu, Container, Stack } from '$lib/components';

	import { page } from '$app/state';
	import '../app.css';

	interface LayoutProps {
		children: import('svelte').Snippet;
		frontmatter?: Record<string, any>;
	}

	const mainTitle = 'VizChitra | An Indian Data Visualization Community';
	const mainDescription =
		'VizChitra is an Indian data visualization community built on openness and collaboration, connecting people to learn and create with data';
	const mainImage = '/images/preview/vizchitra-preview.jpg';

	let { children, frontmatter = {} }: LayoutProps = $props();

	// SEO metadata from frontmatter (reactive derived values)
	let title = $derived(frontmatter.title || mainTitle);
	let description = $derived(frontmatter.description || mainDescription);
	let image = $derived(frontmatter.image || mainImage);

	// Dynamic URL from page store (reactive derived values)
	let url = $derived(page.url.href);
	let width = $derived(frontmatter.width || 'content');
	let banner = $derived(frontmatter.banner || 'polygon');
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Open Graph -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>

<NavMenu></NavMenu>
<main>
	<Container paddingY="md" {width}>
		<Stack class="prose">
			{@render children()}
		</Stack>
	</Container>
</main>
<Footer {banner} />

<style>
	main {
		display: block;
		min-height: 100vh;
	}
</style>
