<script lang="ts">
	import type { PageProps } from './$types';
	import { Prose } from '$lib/components/typography';
	import { Container } from '$lib/components/layout';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.document.title} - Studio</title>
	{#if data.document.description}
		<meta name="description" content={data.document.description} />
	{/if}
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12">
	<Container paddingY="xl">
		<!-- Breadcrumb -->
		<nav class="mb-6 text-sm text-gray-600">
			<a href="/studio" class="underline hover:text-pink-600">Studio</a>
			<span class="mx-2">/</span>
			<span class="text-gray-900">{data.document.title}</span>
		</nav>

		<!-- Badges -->
		<div class="mb-4 flex gap-2">
			{#if data.document.generated}
				<span class="rounded bg-purple-100 px-3 py-1 text-sm text-purple-800">
					Auto-generated
				</span>
			{/if}
			{#if data.document.draft}
				<span class="rounded bg-yellow-100 px-3 py-1 text-sm text-yellow-800"> Draft </span>
			{/if}
		</div>

		<Prose>
			{@html data.document.html}
		</Prose>
	</Container>
</div>
