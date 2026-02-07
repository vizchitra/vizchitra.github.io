<script lang="ts">
	import type { PageProps } from './$types';
	import { Prose } from '$lib/components/typography';
	import { Container } from '$lib/components/layout';

	let { data }: PageProps = $props();
</script>

<!-- <nav class="breadcrumb">
	<a href="/guides" class="breadcrumb-link">GUIDES</a>
	<span class="breadcrumb-separator">/</span>
	<a href="/guides/{data.guideSlug}" class="breadcrumb-link">
		{data.guideSlug.toUpperCase()}
	</a>
	<span class="breadcrumb-separator">/</span>
	<span class="breadcrumb-current">{data.section.section.toUpperCase()}</span>
</nav> -->

<section class="prose">
	<!-- <h1>{data.section.sectionSlug.charAt(0).toUpperCase() + data.section.sectionSlug.slice(1)}</h1> -->
	{#if data.isDraft}
		<div class="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
			<p class="text-lg text-gray-500">🚧 This section is currently being written.</p>
			<p class="text-sm text-gray-400">Check back soon for updates!</p>
		</div>
	{:else}
		<Container>
			<Prose color={data.guideColor}>
				{@html data.section.html}
			</Prose>
		</Container>
	{/if}
</section>

<nav class="section-nav">
	{#if data.prevSection}
		<a href="/guides/{data.guideSlug}/{data.prevSection.sectionSlug}" class="nav-prev">
			<span class="nav-label">Previous</span>
			<span class="nav-text"
				>← {data.prevSection.sectionSlug.charAt(0).toUpperCase() +
					data.prevSection.sectionSlug.slice(1)}</span
			>
		</a>
	{:else}
		<div></div>
	{/if}

	{#if data.nextSection}
		<a href="/guides/{data.guideSlug}/{data.nextSection.sectionSlug}" class="nav-next">
			<span class="nav-label">Next</span>
			<span class="nav-text"
				>{data.nextSection.sectionSlug.charAt(0).toUpperCase() +
					data.nextSection.sectionSlug.slice(1)} →</span
			>
		</a>
	{/if}
</nav>

<style>
	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 2rem;
		background-color: var(--color-white);
		/* border-bottom: 1px solid var(--color-gray-200, #e5e7eb); */
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.05em;
		max-width: 48rem; /* Match article max-width */
		margin: 0 auto; /* Center align */
	}

	.breadcrumb-link {
		color: var(--color-gray-600, #4b5563);
		text-decoration: none;
		transition: color 0.15s;
	}

	.breadcrumb-link:hover {
		color: var(--color-gray-900, #111827);
	}

	.breadcrumb-separator {
		color: var(--color-gray-400, #9ca3af);
	}

	.breadcrumb-current {
		color: var(--color-gray-900, #111827);
	}

	.section-nav {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		max-width: 48rem;
		margin: 0 auto;
		padding: 2rem;
		border-top: 1px solid var(--color-gray-200, #e5e7eb);
	}

	.nav-prev,
	.nav-next {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 1rem;
		border-radius: 0.5rem;
		text-decoration: none;
		transition: background-color 0.15s;
		max-width: 45%;
	}

	.nav-prev:hover,
	.nav-next:hover {
		background-color: var(--color-gray-50, #f9fafb);
	}

	.nav-next {
		text-align: right;
		margin-left: auto;
	}

	.nav-label {
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-gray-500, #6b7280);
	}

	.nav-text {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-gray-900, #111827);
	}
</style>
