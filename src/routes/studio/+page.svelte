<script lang="ts">
	import type { PageProps } from './$types';
	import type { FlatGroup, TreeGroup } from './+page.server';

	let { data }: PageProps = $props();
	const user = $derived(data.user);
	const config = $derived(data.config);
	const contentGroups = $derived(data.contentGroups);

	// Staged changes state
	let stagedFiles = $state<string[]>([]);
	let publishMessage = $state('');
	let publishing = $state(false);
	let publishResult = $state<{ ok: boolean; prUrl?: string; error?: string } | null>(null);

	async function loadStaged() {
		const res = await fetch('/api/studio/staged');
		if (res.ok) {
			const json = await res.json();
			stagedFiles = json.files ?? [];
		}
	}

	async function publish() {
		if (!publishMessage.trim() || publishing) return;
		publishing = true;
		publishResult = null;
		try {
			const res = await fetch('/api/studio/publish', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: publishMessage })
			});
			const json = await res.json();
			publishResult = json;
			if (json.ok) {
				stagedFiles = [];
				publishMessage = '';
			}
		} finally {
			publishing = false;
		}
	}

	$effect(() => {
		loadStaged();
	});
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

		<!-- Staged changes + publish -->
		{#if stagedFiles.length > 0 || publishResult}
			<div
				class="rounded-xl border border-[var(--color-grey-700)] bg-[var(--color-grey-900)] p-6"
			>
				<h2 class="mb-4 text-base font-semibold text-[var(--color-grey-100)]">
					Ready to publish
				</h2>

				{#if stagedFiles.length > 0}
					<ul class="mb-4 space-y-1">
						{#each stagedFiles as file}
							<li class="flex items-center gap-2 text-sm text-[var(--color-grey-400)]">
								<span class="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400"></span>
								<span class="font-mono">{file}</span>
							</li>
						{/each}
					</ul>

					<div class="flex gap-3">
						<input
							type="text"
							bind:value={publishMessage}
							placeholder="Briefly describe your changes…"
							class="min-w-0 flex-1 rounded border border-[var(--color-grey-700)] bg-[var(--color-grey-800)] px-3 py-2 text-sm text-[var(--color-grey-200)] placeholder:text-[var(--color-grey-600)] focus:border-[var(--color-grey-500)] focus:outline-none"
						/>
						<button
							onclick={publish}
							disabled={!publishMessage.trim() || publishing}
							class="shrink-0 rounded bg-amber-500 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
						>
							{publishing ? 'Publishing…' : 'Publish'}
						</button>
					</div>
				{/if}

				{#if publishResult}
					{#if publishResult.ok}
						<p class="mt-3 text-sm text-emerald-400">
							✓ Changes sent for review.
							<a
								href={publishResult.prUrl}
								target="_blank"
								rel="noopener"
								class="underline hover:text-emerald-300">View PR →</a
							>
						</p>
					{:else}
						<p class="mt-3 text-sm text-red-400">⚠ {publishResult.error}</p>
					{/if}
				{/if}
			</div>
		{/if}

		<!-- Content groups -->
		<div class="grid gap-4 sm:grid-cols-2">
			{#each contentGroups as group}
				<div
					class="overflow-hidden rounded-xl border border-[var(--color-grey-800)] bg-[var(--color-grey-900)]"
				>
					<!-- Card header -->
					<div class="border-b border-[var(--color-grey-800)] px-5 py-3.5">
						<span class="text-sm font-semibold text-[var(--color-grey-200)]">{group.name}</span>
					</div>

					{#if group.kind === 'flat'}
						{@const flat = group as FlatGroup}
						{#if flat.files.length > 0}
							<ul class="divide-y divide-[var(--color-grey-800)]">
								{#each flat.files as file}
									<li>
										{#if file.url}
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
												<span class="text-sm text-[var(--color-grey-400)]">{file.title}</span>
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
					{:else}
						{@const tree = group as TreeGroup}
						{#if tree.groups.length > 0}
							<div class="divide-y divide-[var(--color-grey-800)]">
								{#each tree.groups as sub}
									<details class="group/details">
										<summary
											class="flex cursor-pointer list-none items-center justify-between px-5 py-2.5 transition-colors hover:bg-[var(--color-grey-800)]"
										>
											<span class="text-sm font-medium text-[var(--color-grey-300)]"
												>{sub.name}</span
											>
											<span class="flex items-center gap-2">
												<span
													class="rounded-full bg-[var(--color-grey-800)] px-2 py-0.5 font-mono text-xs text-[var(--color-grey-500)]"
													>{sub.files.length}</span
												>
												<!-- chevron rotates open -->
												<svg
													class="h-3.5 w-3.5 text-[var(--color-grey-600)] transition-transform group-open/details:rotate-180"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													aria-hidden="true"
												>
													<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"
													></path>
												</svg>
											</span>
										</summary>
										<ul
											class="divide-y divide-[var(--color-grey-800)] border-t border-[var(--color-grey-800)] bg-[var(--color-grey-950,#0a0a0a)]"
										>
											{#each sub.files as file}
												<li>
													{#if file.url}
														<a
															href={file.url}
															class="group/link flex items-center justify-between py-2 pr-5 pl-8 transition-colors hover:bg-[var(--color-grey-800)]"
														>
															<span
																class="text-sm text-[var(--color-grey-400)] group-hover/link:text-[var(--color-grey-100)]"
																>{file.title}</span
															>
															<span class="font-mono text-xs text-[var(--color-grey-700)]"
																>{file.filePath.split('/').pop()}</span
															>
														</a>
													{:else}
														<div class="flex items-center justify-between py-2 pr-5 pl-8">
															<span class="text-sm text-[var(--color-grey-500)]">{file.title}</span>
														</div>
													{/if}
												</li>
											{/each}
										</ul>
									</details>
								{/each}
							</div>
						{:else}
							<p class="px-5 py-4 text-sm text-[var(--color-grey-600)] italic">No content yet.</p>
						{/if}
					{/if}
				</div>
			{/each}
		</div>
	</main>
</div>
