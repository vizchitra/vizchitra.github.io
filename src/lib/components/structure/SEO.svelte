<script lang="ts">
	import { page } from '$app/stores';
	import { SITE } from '$lib/config/site';

	let meta = $derived(($page.data?.pageMeta as Record<string, unknown>) ?? {});

	let fullTitle = $derived(
		!meta.title
			? `${SITE.name} | ${SITE.tagline}`
			: meta.noSuffix
				? (meta.title as string)
				: `${meta.title} | ${SITE.name}`
	);
	let description = $derived((meta.description as string) ?? SITE.description);
	let ogImage = $derived((meta.ogImage as string) ?? SITE.defaultOgImage);
	let ogType = $derived((meta.ogType as string) ?? 'website');
	let canonical = $derived(`${SITE.url}${$page.url.pathname}`);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:url" content={canonical} />
	<meta property="og:type" content={ogType} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>
