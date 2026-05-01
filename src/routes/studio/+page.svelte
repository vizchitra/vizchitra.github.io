<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const user = $derived(data.user);
	const config = $derived(data.config);
	const collections = $derived(data.collections);
</script>

<svelte:head>
	<title>Studio | VizChitra</title>
	<meta name="description" content="VizChitra content editor" />
</svelte:head>

<div class="min-h-screen bg-[var(--color-grey-950,#0a0a0a)]">
	<main class="mx-auto max-w-5xl space-y-6 px-6 py-10">
		<!-- Header + editorial guide card -->
		<div class="rounded-xl border border-[var(--color-grey-800)] bg-[var(--color-grey-900)] p-6">
			<div class="mb-4 flex items-start justify-between gap-4">
				<div>
					<h1 class="text-xl font-bold text-[var(--color-grey-100)]">VizChitra Studio</h1>
					<p class="mt-0.5 text-sm text-[var(--color-grey-500)]">{config.description}</p>
				</div>
				<div class="flex shrink-0 items-center gap-3">
					<span class="text-sm text-[var(--color-grey-500)]">@{user.handle}</span>
					<form method="POST" action="/studio/logout">
						<button
							type="submit"
							class="rounded border border-[var(--color-grey-700)] px-3 py-1.5 text-sm text-[var(--color-grey-400)] transition-colors hover:border-[var(--color-grey-600)] hover:text-[var(--color-grey-200)]"
						>
							Sign out
						</button>
					</form>
				</div>
			</div>
			<div
				class="rounded border border-amber-800/40 bg-amber-950/30 px-4 py-3 text-sm text-amber-300"
			>
				{config.instructions}
			</div>
		</div>

		<!-- Collection cards -->
		<div class="grid gap-4 sm:grid-cols-2">
			{#each collections as col}
				<div
					class="overflow-hidden rounded-xl border border-[var(--color-grey-800)] bg-[var(--color-grey-900)]"
				>
					<!-- Card header -->
					<div
						class="flex items-center justify-between border-b border-[var(--color-grey-800)] px-5 py-3.5"
					>
						<span class="text-sm font-semibold text-[var(--color-grey-200)]">{col.name}</span>
						<span
							class="rounded-full px-2 py-0.5 text-xs font-medium {col.type === 'markdown'
								? 'bg-[var(--color-grey-800)] text-[var(--color-grey-400)]'
								: 'bg-[var(--color-grey-800)] text-[var(--color-grey-400)]'}"
						>
							{col.type === 'markdown' ? 'Markdown' : 'JSON'}
						</span>
					</div>
					<p
						class="border-b border-[var(--color-grey-800)] px-5 py-2 text-xs text-[var(--color-grey-600)]"
					>
						{col.description}
					</p>
					<!-- File list -->
					{#if col.files.length > 0}
						<ul class="divide-y divide-[var(--color-grey-800)]">
							{#each col.files as file}
								<li>
									{#if col.type === 'markdown'}
										<a
											href={file.url}
											class="group flex items-center justify-between px-5 py-2.5 transition-colors hover:bg-[var(--color-grey-800)]"
										>
											<span
												class="text-sm text-[var(--color-grey-300)] group-hover:text-[var(--color-grey-100)]"
												>{file.title}</span
											>
											<span class="font-mono text-xs text-[var(--color-grey-700)]"
												>{file.filePath.split('/').pop()}</span
											>
										</a>
									{:else}
										<div class="flex items-center justify-between px-5 py-2.5">
											<span class="text-sm text-[var(--color-grey-300)]">{file.title}</span>
											<span class="font-mono text-xs text-[var(--color-grey-700)]"
												>{file.filePath.split('/').pop()}</span
											>
										</div>
									{/if}
								</li>
							{/each}
						</ul>
					{:else}
						<p class="px-5 py-4 text-sm text-[var(--color-grey-600)] italic">No files yet.</p>
					{/if}
				</div>
			{/each}
		</div>
	</main>
</div>
