<script lang="ts">
	import { Header, BannerPolygon, BannerCurve } from '$lib/components/structure';

	export let data: any;
	$: ({ frontmatter = {} } = data);

	// Banner options from frontmatter
	// banner: 'polygon' | 'curve' (default: 'polygon')
	// interactive: boolean (default: false, only applies to header)
	// size: 'default' | 'large' (default: 'default')
	// showLogo: boolean (default: false)
	// tagline: string (default: 'A SPACE TO CONNECT AND CREATE WITH DATA')
	$: banner = frontmatter.banner ?? 'polygon';
	$: interactive = frontmatter.interactive ?? false;
	$: size = frontmatter.size ?? 'default';
	$: showLogo = frontmatter.showLogo ?? false;
	$: tagline = frontmatter.tagline ?? 'A SPACE TO CONNECT AND CREATE WITH DATA';

	// Load mdsvex-compiled Svelte components from the content folder at build time.
	// Eager so components are available during SSR/prerender.
	const pages = import.meta.glob('../../../content/**/*.md', { eager: true });

	// Make Component reactive so it updates when data.slug changes
	$: Component = (() => {
		// Try exact match first, then try with /index suffix for directory index pages
		let pageKey = Object.keys(pages).find((p) => p.endsWith(`/${data.slug}.md`));
		if (!pageKey) {
			pageKey = Object.keys(pages).find((p) => p.endsWith(`/${data.slug}/index.md`));
		}
		return pageKey ? (pages as any)[pageKey].default : null;
	})();
</script>

<svelte:head>
	{#if frontmatter.title}
		<title>{frontmatter.title} | VizChitra</title>
	{/if}
	{#if frontmatter.description}
		<meta name="description" content={frontmatter.description} />
		<meta property="og:description" content={frontmatter.description} />
	{/if}
	{#if frontmatter.title}
		<meta property="og:title" content={frontmatter.title} />
	{/if}
</svelte:head>

{#key data.slug}
	<div class="min-h-screen">
		{#if frontmatter.title}
			<Header title={frontmatter.title} {banner} {interactive} {size} {showLogo} {tagline} />
		{/if}

		<section class="content-container prose prose-lg prose-viz max-w-3xl py-12">
			{#if Component}
				<svelte:component this={Component} />
			{:else}
				<p>Content not found.</p>
			{/if}
		</section>
	</div>
{/key}
