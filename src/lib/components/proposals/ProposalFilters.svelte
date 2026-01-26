<script lang="ts">
	interface Props {
		types: string[];
		themes: string[];
		selectedType: string;
		selectedTheme: string;
		resultsCount: number;
	}

	let {
		types,
		themes,
		selectedType = $bindable(),
		selectedTheme = $bindable(),
		resultsCount
	}: Props = $props();

	function resetFilters() {
		selectedType = 'all';
		selectedTheme = 'all';
	}
</script>

<div class="mb-8">
	<div class="flex flex-col items-center gap-4 md:flex-row">
		<div class="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center md:gap-3">
			<select
				id="type-filter"
				bind:value={selectedType}
				aria-label="Filter by proposal type"
				class="border-viz-grey/20 text-viz-grey hover:border-viz-grey/40 focus:border-viz-blue-dark focus:ring-viz-blue-dark/20 w-full rounded-md border bg-white px-4 py-2 text-sm transition-all focus:ring-1 focus:outline-none md:w-auto"
			>
				<option value="all">All Types</option>
				{#each types as type}
					<option value={type}>{type}</option>
				{/each}
			</select>

			<select
				id="theme-filter"
				bind:value={selectedTheme}
				aria-label="Filter by theme"
				class="border-viz-grey/20 text-viz-grey hover:border-viz-grey/40 focus:border-viz-blue-dark focus:ring-viz-blue-dark/20 w-full rounded-md border bg-white px-4 py-2 text-sm transition-all focus:ring-1 focus:outline-none md:w-auto"
			>
				<option value="all">All Themes</option>
				{#each themes as theme}
					<option value={theme}>{theme}</option>
				{/each}
			</select>

			<button
				onclick={resetFilters}
				class="border-viz-pink-dark/30 text-viz-pink-dark hover:bg-viz-pink-light/20 focus:ring-viz-pink-dark/20 w-full rounded-md border bg-white px-4 py-1.5 text-sm font-medium transition-all focus:ring-2 focus:ring-offset-1 focus:outline-none md:w-auto"
			>
				Reset
			</button>
		</div>

		<div class="text-viz-grey/70 text-center text-sm md:ml-auto">
			<span class="text-viz-grey font-semibold">{resultsCount}</span> proposal{resultsCount !== 1
				? 's'
				: ''}
		</div>
	</div>
</div>
