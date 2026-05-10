<script lang="ts">
	import type { PageProps } from './$types';
	import type { FlatGroup, TreeGroup, SubmissionRow, SessionRow } from './+page.server';

	let { data }: PageProps = $props();
	const user = $derived(data.user);
	const config = $derived(data.config);
	const contentGroups = $derived(data.contentGroups);
	const cfpSubmissions = $derived(data.cfpSubmissions as SubmissionRow[]);
	const cfeSubmissions = $derived(data.cfeSubmissions as SubmissionRow[]);
	const sessionRows = $derived(data.sessionRows as SessionRow[]);

	// ── Submissions tabs ─────────────────────────────────────────────────────
	let activeSubmissionTab = $state<'cfp' | 'cfe'>('cfp');
	const activeSubmissions = $derived(
		activeSubmissionTab === 'cfp' ? cfpSubmissions : cfeSubmissions
	);

	const STATUS_STYLE: Record<string, string> = {
		'Under Review': 'bg-amber-950/40 text-amber-300 border-amber-800/50',
		Selected: 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50',
		'Not Proceeding': 'bg-grey-800 text-grey-500 border-grey-700'
	};

	// Staged changes state
	let stagedFiles = $state<string[]>([]);
	let publishMessage = $state('');
	let publishing = $state(false);
	let publishResult = $state<{ ok: boolean; prUrl?: string; error?: string } | null>(null);

	async function loadStaged() {
		const res = await fetch('/api/studio/staged');
		if (res.ok) {
			const json = (await res.json()) as { files?: string[] };
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
			const json = (await res.json()) as { ok: boolean; prUrl?: string; error?: string };
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

<div class="bg-grey-950 min-h-screen">
	<main class="mx-auto max-w-5xl space-y-6 px-6 py-10">
		<!-- Header + editorial guide card -->
		<div class="border-grey-800 bg-grey-900 rounded-xl border p-6">
			<div class="mb-4 flex items-start justify-between gap-4">
				<div>
					<h1 class="text-grey-100 text-xl font-bold">VizChitra Studio</h1>
					<p class="text-grey-500 mt-0.5 text-sm">{config.description}</p>
				</div>
				<div class="flex shrink-0 items-center gap-3">
					<span class="text-grey-500 text-sm">@{user.handle}</span>
					<form method="POST" action="/studio/logout">
						<button
							type="submit"
							class="border-grey-700 text-grey-400 hover:border-grey-600 hover:text-grey-200 rounded border px-3 py-1.5 text-sm transition-colors"
						>
							Sign out
						</button>
					</form>
				</div>
			</div>
			<div
				class="rounded border border-amber-800/40 bg-amber-950/30 px-4 py-3 text-sm text-amber-300"
			>
				<p class="mb-2">{config.instructions.lead}</p>
				<ul class="space-y-1">
					{#each config.instructions.bullets as bullet}
						<li class="flex gap-2">
							<span class="shrink-0">·</span>
							<span><strong class="font-semibold">{bullet.label}:</strong> {bullet.text}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Staged changes + publish -->
		{#if stagedFiles.length > 0 || publishResult}
			<div class="border-grey-700 bg-grey-900 rounded-xl border p-6">
				<h2 class="text-grey-100 mb-4 text-base font-semibold">Ready to publish</h2>

				{#if stagedFiles.length > 0}
					<ul class="mb-4 space-y-1">
						{#each stagedFiles as file}
							<li class="text-grey-400 flex items-center gap-2 text-sm">
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
							class="border-grey-700 bg-grey-800 text-grey-200 placeholder:text-grey-600 focus:border-grey-500 min-w-0 flex-1 rounded border px-3 py-2 text-sm focus:outline-none"
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
				<div class="border-grey-800 bg-grey-900 overflow-hidden rounded-xl border">
					<!-- Card header -->
					<div class="border-grey-800 border-b px-5 py-3.5">
						<span class="text-grey-200 text-sm font-semibold">{group.name}</span>
					</div>

					{#if group.kind === 'flat'}
						{@const flat = group as FlatGroup}
						{#if flat.files.length > 0}
							<ul class="divide-grey-800 divide-y">
								{#each flat.files as file}
									<li>
										{#if file.url}
											<a
												href={file.url}
												class="group hover:bg-grey-800 flex items-center justify-between px-5 py-2.5 transition-colors"
											>
												<span class="text-grey-300 group-hover:text-grey-100 text-sm"
													>{file.title}</span
												>
												<span class="text-grey-700 font-mono text-xs"
													>{file.filePath.split('/').pop()}</span
												>
											</a>
										{:else}
											<div class="flex items-center justify-between px-5 py-2.5">
												<span class="text-grey-400 text-sm">{file.title}</span>
												<span class="text-grey-700 font-mono text-xs"
													>{file.filePath.split('/').pop()}</span
												>
											</div>
										{/if}
									</li>
								{/each}
							</ul>
						{:else}
							<p class="text-grey-600 px-5 py-4 text-sm italic">No files yet.</p>
						{/if}
					{:else}
						{@const tree = group as TreeGroup}
						{#if tree.groups.length > 0}
							<div class="divide-grey-800 divide-y">
								{#each tree.groups as sub}
									<details class="group/details">
										<summary
											class="hover:bg-grey-800 flex cursor-pointer list-none items-center justify-between px-5 py-2.5 transition-colors"
										>
											<span class="text-grey-300 text-sm font-medium">{sub.name}</span>
											<span class="flex items-center gap-2">
												<span
													class="bg-grey-800 text-grey-500 rounded-full px-2 py-0.5 font-mono text-xs"
													>{sub.files.length}</span
												>
												<!-- chevron rotates open -->
												<svg
													class="text-grey-600 h-3.5 w-3.5 transition-transform group-open/details:rotate-180"
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
										<ul class="divide-grey-800 border-grey-800 bg-grey-950 divide-y border-t">
											{#each sub.files as file}
												<li>
													{#if file.url}
														<a
															href={file.url}
															class="group/link hover:bg-grey-800 flex items-center justify-between py-2 pr-5 pl-8 transition-colors"
														>
															<span class="text-grey-400 group-hover/link:text-grey-100 text-sm"
																>{file.title}</span
															>
															<span class="text-grey-700 font-mono text-xs"
																>{file.filePath.split('/').pop()}</span
															>
														</a>
													{:else}
														<div class="flex items-center justify-between py-2 pr-5 pl-8">
															<span class="text-grey-500 text-sm">{file.title}</span>
														</div>
													{/if}
												</li>
											{/each}
										</ul>
									</details>
								{/each}
							</div>
						{:else}
							<p class="text-grey-600 px-5 py-4 text-sm italic">No content yet.</p>
						{/if}
					{/if}
				</div>
			{/each}
		</div>

		<!-- Sessions 2026 -->
		<div class="border-grey-800 bg-grey-900 overflow-hidden rounded-xl border">
			<div class="border-grey-800 border-b px-5 py-3.5">
				<span class="text-grey-200 text-sm font-semibold">Sessions 2026</span>
			</div>
			{#if sessionRows.length > 0}
				<div class="overflow-x-auto">
					<table class="w-full text-sm">
						<thead>
							<tr class="border-grey-800 border-b">
								<th class="text-grey-600 px-5 py-2 text-left font-medium">Title</th>
								<th class="text-grey-600 px-3 py-2 text-left font-medium">Speaker</th>
								<th class="text-grey-600 px-3 py-2 text-left font-medium">Type</th>
								<th class="text-grey-600 px-3 py-2 text-left font-medium">Time</th>
								<th class="text-grey-600 px-3 py-2 text-left font-medium">Status</th>
							</tr>
						</thead>
						<tbody class="divide-grey-800 divide-y">
							{#each sessionRows as row}
								<tr class="hover:bg-grey-800 transition-colors">
									<td class="max-w-[16rem] px-5 py-2.5">
										{#if row.url}
											<a
												href={row.url}
												class="text-grey-300 hover:text-grey-100 block truncate hover:underline"
											>
												{row.title}
											</a>
										{:else}
											<span class="text-grey-500 block truncate italic">{row.title}</span>
										{/if}
									</td>
									<td class="max-w-[10rem] px-3 py-2.5">
										<span class="text-grey-500 block truncate">{row.speakerName}</span>
									</td>
									<td class="text-grey-600 px-3 py-2.5 whitespace-nowrap">{row.sessionType}</td>
									<td class="text-grey-700 px-3 py-2.5 font-mono text-xs whitespace-nowrap"
										>{row.time || '—'}</td
									>
									<td class="px-3 py-2.5">
										{#if row.display}
											<span
												class="rounded-full border border-emerald-800/50 bg-emerald-950/40 px-2 py-0.5 text-xs font-semibold text-emerald-300"
												>Confirmed</span
											>
										{:else}
											<span
												class="border-grey-700 bg-grey-800 text-grey-500 rounded-full border px-2 py-0.5 text-xs font-semibold"
												>TBD</span
											>
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{:else}
				<p class="text-grey-600 px-5 py-4 text-sm italic">No sessions yet.</p>
			{/if}
		</div>

		<!-- Submissions 2026 -->
		<div class="border-grey-800 bg-grey-900 overflow-hidden rounded-xl border">
			<!-- Header + tabs -->
			<div class="border-grey-800 flex items-center justify-between border-b px-5 py-3.5">
				<span class="text-grey-200 text-sm font-semibold">Submissions 2026</span>
				<div class="bg-grey-800 flex gap-1 rounded-lg p-0.5">
					{#each ['cfp', 'cfe'] as const as tab}
						<button
							type="button"
							onclick={() => (activeSubmissionTab = tab)}
							class="rounded px-3 py-1 text-xs font-semibold tracking-wider uppercase transition-colors {activeSubmissionTab ===
							tab
								? 'bg-grey-700 text-grey-100'
								: 'text-grey-500 hover:text-grey-300'}"
						>
							{tab.toUpperCase()}
							<span class="text-grey-600 ml-1 font-mono font-normal"
								>({(tab === 'cfp' ? cfpSubmissions : cfeSubmissions).length})</span
							>
						</button>
					{/each}
				</div>
			</div>

			<!-- Table -->
			{#if activeSubmissions.length > 0}
				<div class="overflow-x-auto">
					<table class="w-full text-sm">
						<thead>
							<tr class="border-grey-800 border-b">
								<th class="text-grey-600 px-5 py-2 text-left font-medium">Title</th>
								<th class="text-grey-600 px-3 py-2 text-left font-medium">By</th>
								<th class="text-grey-600 px-3 py-2 text-left font-medium">Format</th>
								<th class="text-grey-600 px-3 py-2 text-left font-medium">Status</th>
								<th class="text-grey-600 px-3 py-2 text-left font-medium">Notes</th>
							</tr>
						</thead>
						<tbody class="divide-grey-800 divide-y">
							{#each activeSubmissions as row}
								<tr class="group hover:bg-grey-800 transition-colors">
									<td class="max-w-[16rem] px-5 py-2.5">
										<a
											href={row.url}
											class="text-grey-300 hover:text-grey-100 block truncate hover:underline"
										>
											{row.title}
										</a>
									</td>
									<td class="text-grey-500 px-3 py-2.5 whitespace-nowrap">{row.submitter}</td>
									<td class="text-grey-600 px-3 py-2.5 whitespace-nowrap">{row.format}</td>
									<td class="px-3 py-2.5 whitespace-nowrap">
										<span
											class="rounded-full border px-2 py-0.5 text-xs font-semibold {STATUS_STYLE[
												row.status
											] ?? STATUS_STYLE['Under Review']}"
										>
											{row.status}
										</span>
									</td>
									<td class="max-w-[14rem] overflow-hidden px-3 py-2.5">
										{#if row.notes}
											<p class="text-grey-600 line-clamp-1 text-xs">{row.notes}</p>
										{:else}
											<span class="text-grey-700 text-xs italic">—</span>
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{:else}
				<p class="text-grey-600 px-5 py-4 text-sm italic">No submissions yet.</p>
			{/if}
		</div>
	</main>
</div>
