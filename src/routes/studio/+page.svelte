<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const user = $derived(data.user);
	const config = $derived(data.config);
	const allowedUsers = $derived(data.allowedUsers);
</script>

<svelte:head>
	<title>Studio | VizChitra</title>
	<meta name="description" content="VizChitra content editor" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Top bar -->
	<header class="border-b border-gray-200 bg-white px-6 py-4">
		<div class="mx-auto flex max-w-5xl items-center justify-between">
			<span class="text-lg font-semibold text-gray-900">VizChitra Studio</span>
			<div class="flex items-center gap-4">
				<span class="text-sm text-gray-500">@{user.handle}</span>
				<form method="POST" action="/studio/logout">
					<button type="submit" class="rounded px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100">
						Sign out
					</button>
				</form>
			</div>
		</div>
	</header>

	<main class="mx-auto max-w-5xl px-6 py-10">
		<!-- Editorial block -->
		<section class="mb-10 rounded-xl border border-gray-200 bg-white p-6">
			<h1 class="mb-1 text-xl font-bold text-gray-900">Editorial guide</h1>
			<p class="mb-4 text-sm text-gray-500">{config.description}</p>
			<div class="rounded bg-amber-50 px-4 py-3 text-sm text-amber-800">
				{config.instructions}
			</div>
		</section>

		<!-- Collections index -->
		<section class="mb-10">
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Content collections</h2>
			<div class="grid gap-3 sm:grid-cols-2">
				{#each config.collections as col}
					<div class="rounded-xl border border-gray-200 bg-white p-5">
						<div class="mb-2 flex items-start justify-between gap-2">
							<span class="font-medium text-gray-900">{col.name}</span>
							<span
								class="rounded-full px-2 py-0.5 text-xs font-medium {col.type === 'markdown'
									? 'bg-blue-100 text-blue-700'
									: 'bg-purple-100 text-purple-700'}"
							>
								{col.type === 'markdown' ? 'Markdown' : 'JSON'}
							</span>
						</div>
						<p class="text-sm text-gray-500">{col.description}</p>
						<p class="mt-2 font-mono text-xs text-gray-400">{col.path}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Access panel -->
		<section class="rounded-xl border border-gray-200 bg-white p-6">
			<h2 class="mb-3 text-lg font-semibold text-gray-900">Access</h2>
			{#if allowedUsers.length > 0}
				<ul class="flex flex-wrap gap-2">
					{#each allowedUsers as handle}
						<li>
							<a
								href="https://github.com/{handle}"
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
							>
								<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path
										d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
									/>
								</svg>
								@{handle}
							</a>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="text-sm text-gray-400">
					No access list configured (STUDIO_ALLOWED_USERS not set).
				</p>
			{/if}
		</section>
	</main>
</div>
