<script lang="ts">
	import type { PageProps } from './$types';
	import Header from '$lib/components/structure/Header.svelte';
	import { buildSha, buildBranch } from '$lib/build';
	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Studio Login | VizChitra</title>
	<meta name="description" content="Sign in to VizChitra Studio" />
	<meta property="og:image" content="/images/preview/preview-studio.jpg" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="/images/preview/preview-studio.jpg" />
</svelte:head>

<Header banner="square" color="grey" />

<div class="flex justify-center px-4 py-12">
	<div class="w-full max-w-sm">
		<h2 class="mb-1 text-xl font-bold text-gray-900">Sign in to Studio</h2>
		<p class="mb-6 text-sm text-gray-500">Use your GitHub account to access the content editor.</p>

		{#if data.error === 'unauthorized'}
			<div class="mb-4 rounded bg-red-50 px-4 py-3 text-sm text-red-700">
				Access not granted. Your GitHub account is not authorised for Studio. Contact the site team
				to request access.
			</div>
		{:else if data.error}
			<div class="mb-4 rounded bg-red-50 px-4 py-3 text-sm text-red-700">
				Sign-in failed ({data.error}). Please try again.
			</div>
		{/if}

		<a
			href="/studio/auth/github"
			data-sveltekit-reload
			class="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
		>
			<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path
					d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
				/>
			</svg>
			Sign in with GitHub
		</a>
		<p class="mt-4 text-center font-mono text-xs text-gray-400">#{buildSha} · {buildBranch}</p>
	</div>
</div>
