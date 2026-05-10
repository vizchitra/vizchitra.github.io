<script lang="ts">
	import { onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { panelStore } from './PanelStore';

	let collapsed = $state(true);

	$effect(() => {
		panelStore.set(collapsed ? 'collapsed' : 'open');
	});
	onDestroy(() => panelStore.set('hidden'));

	const pathname = $derived($page.url.pathname);
	const ogImage = $derived($page.data?.pageMeta?.ogImage as string | undefined);
</script>

{#if collapsed}
	<button
		type="button"
		onclick={() => (collapsed = false)}
		aria-label="Expand Studio panel"
		class="border-grey-800 bg-grey-900 text-viz-grey-muted hover:text-viz-grey-light fixed top-0 right-0 z-50 flex h-full w-11 cursor-pointer flex-col items-center border-l transition-colors"
	>
		<span class="flex flex-col items-center gap-3 pt-4">
			<img src="/favicon.svg" alt="" class="h-6 w-6 opacity-70" />
			<span
				class="text-[9px] font-semibold uppercase"
				style="writing-mode: vertical-rl; letter-spacing: 0.4em; line-height: 1;"
			>
				STUDIO
			</span>
		</span>
		<svg
			class="mt-auto mb-4 h-4 w-4"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			aria-hidden="true"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
		</svg>
	</button>
{:else}
	<aside
		class="border-grey-800 bg-grey-900 text-viz-grey-light fixed top-0 right-0 z-50 flex h-full w-72 flex-col border-l"
	>
		<!-- Header -->
		<div class="border-grey-800 flex items-center justify-between border-b px-4 py-3">
			<a
				href="/studio"
				class="text-viz-grey-muted hover:text-viz-grey-light flex items-center gap-2 transition-colors"
				title="Go to Studio"
			>
				<img src="/favicon.svg" alt="" class="h-5 w-5 opacity-70" />
				<span class="text-xs font-semibold tracking-widest uppercase">Studio</span>
			</a>
			<button
				type="button"
				onclick={() => (collapsed = true)}
				class="text-viz-grey-muted hover:text-viz-grey-light flex h-6 w-6 items-center justify-center rounded transition-colors"
				aria-label="Collapse Studio panel"
				title="Collapse panel"
			>
				<svg
					class="h-4 w-4"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>

		<!-- Page path -->
		<div class="border-grey-800 border-b px-4 py-3">
			<p class="text-viz-grey-muted mb-0.5 text-[10px] tracking-widest uppercase">Current page</p>
			<p class="text-viz-grey-light font-mono text-sm font-medium break-all">{pathname}</p>
		</div>

		<!-- View indicator -->
		<div class="border-grey-800 border-b px-4 py-3">
			<span class="text-viz-grey-muted text-xs">Viewing — this page is not editable here</span>
		</div>

		<!-- Social preview -->
		{#if ogImage}
			<div class="border-grey-800 border-b">
				<details class="group" open>
					<summary
						class="text-viz-grey-muted hover:text-viz-grey-light flex cursor-pointer list-none items-center justify-between px-4 py-2.5 text-[10px] font-semibold tracking-widest uppercase transition-colors"
					>
						Social Preview
						<svg
							class="h-3 w-3 transition-transform group-open:rotate-180"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
						</svg>
					</summary>
					<div class="px-4 pb-3">
						<img
							src={ogImage}
							alt="Social preview"
							class="border-grey-700 w-full rounded border object-cover"
						/>
					</div>
				</details>
			</div>
		{/if}

		<!-- Go to Studio CTA -->
		<div class="border-grey-800 mt-auto border-t px-4 py-3">
			<a
				href="/studio"
				class="bg-viz-yellow text-grey-900 block w-full rounded px-3 py-2 text-center text-xs font-semibold transition-opacity hover:opacity-90"
			>
				Go to Studio →
			</a>
		</div>
	</aside>
{/if}
