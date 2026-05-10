<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';

	interface Group {
		name: string;
		count: number;
		rows: T[];
	}

	interface Props {
		title: string;
		groups: Group[];
		headerRow: Snippet;
		row: Snippet<[T]>;
		emptyMessage?: string;
		/** Optional tab bar rendered inside the card header */
		tabs?: Snippet;
	}

	let { title, groups, headerRow, row, emptyMessage = 'No items yet.', tabs }: Props = $props();

	const totalCount = $derived(groups.reduce((sum, g) => sum + g.count, 0));
</script>

<div class="border-grey-800 bg-grey-900 overflow-hidden rounded-xl border">
	<!-- Card header -->
	<div class="border-grey-800 flex items-center justify-between border-b px-5 py-3.5">
		<span class="text-grey-200 text-sm font-semibold">
			{title}
			<span class="text-grey-600 ml-1.5 font-mono text-xs font-normal">({totalCount})</span>
		</span>
		{#if tabs}
			{@render tabs()}
		{/if}
	</div>

	{#if groups.length === 0 || totalCount === 0}
		<p class="text-grey-600 px-5 py-4 text-sm italic">{emptyMessage}</p>
	{:else}
		<div class="divide-grey-800 divide-y">
			{#each groups as group}
				{#if group.count > 0}
					<details class="group/details" open>
						<summary
							class="hover:bg-grey-800 flex cursor-pointer list-none items-center justify-between px-5 py-2.5 transition-colors"
						>
							<span class="text-grey-300 text-sm font-medium">{group.name}</span>
							<span class="flex items-center gap-2">
								<span class="bg-grey-800 text-grey-500 rounded-full px-2 py-0.5 font-mono text-xs">
									{group.count}
								</span>
								<svg
									class="text-grey-600 h-3.5 w-3.5 transition-transform group-open/details:rotate-180"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									aria-hidden="true"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
								</svg>
							</span>
						</summary>
						<div class="border-grey-800 border-t">
							<div class="overflow-x-auto">
								<table class="w-full text-sm">
									<thead>
										<tr class="border-grey-800 border-b">
											{@render headerRow()}
										</tr>
									</thead>
									<tbody class="divide-grey-800 divide-y">
										{#each group.rows as item}
											{@render row(item)}
										{/each}
									</tbody>
								</table>
							</div>
						</div>
					</details>
				{/if}
			{/each}
		</div>
	{/if}
</div>
