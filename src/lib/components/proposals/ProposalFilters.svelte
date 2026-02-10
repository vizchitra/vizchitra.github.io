<script lang="ts">
	interface Props {
		types: string[];
		themes: string[];
		selectedType: string;
		selectedTheme: string;
		searchQuery: string;
		sortBy: 'time' | 'title' | 'name';
		resultsCount: number;
	}

	let {
		types,
		themes,
		selectedType = $bindable(),
		selectedTheme = $bindable(),
		searchQuery = $bindable(),
		sortBy = $bindable(),
		resultsCount
	}: Props = $props();

	function resetFilters() {
		selectedType = 'all';
		selectedTheme = 'all';
		searchQuery = '';
	}

	const sortOptions: Array<{ value: 'time' | 'title' | 'name'; label: string }> = [
		{ value: 'time', label: 'Date' },
		{ value: 'title', label: 'Title' },
		{ value: 'name', label: 'Name' }
	];
</script>

<div class="mb-8">
	<!-- Search Bar -->
	<div class="mb-5">
		<div class="relative max-w-xl">
			<svg
				class="text-viz-grey/40 pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 transition-colors duration-200"
				width="18"
				height="18"
				viewBox="0 0 18 18"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<circle cx="7.5" cy="7.5" r="6" stroke="currentColor" stroke-width="1.5" />
				<path
					d="M12 12L16.5 16.5"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
				/>
			</svg>
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search proposals by title, name, or description..."
				aria-label="Search proposals"
				class="font-text-sans border-viz-grey/20 text-viz-grey placeholder:text-viz-grey/50 hover:border-viz-grey/30 focus:border-viz-blue-dark focus:ring-viz-blue-dark/20 w-full rounded-md border bg-white py-2.5 pr-11 pl-12 text-sm transition-all focus:ring-1 focus:outline-none"
			/>
			{#if searchQuery}
				<button
					onclick={() => (searchQuery = '')}
					class="text-viz-grey/50 hover:bg-viz-grey/5 hover:text-viz-grey absolute top-1/2 right-3 -translate-y-1/2 rounded p-1.5 transition-colors focus:outline-none"
					aria-label="Clear search"
				>
					<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
						<path
							d="M1 1L13 13M13 1L1 13"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
						/>
					</svg>
				</button>
			{/if}
		</div>
	</div>

	<!-- Filters and Sort -->
	<div class="flex flex-col items-center gap-4 md:flex-row">
		<div
			class="flex w-full flex-row flex-wrap gap-3 md:w-auto md:flex-row md:items-center md:gap-3"
		>
			<select
				id="type-filter"
				bind:value={selectedType}
				aria-label="Filter by proposal type"
				class="border-viz-grey/20 text-viz-grey hover:border-viz-grey/40 focus:border-viz-blue-dark focus:ring-viz-blue-dark/20 w-1/3 rounded-md border bg-white px-4 py-2 text-sm transition-all focus:ring-1 focus:outline-none md:w-auto"
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
				class="border-viz-grey/20 text-viz-grey hover:border-viz-grey/40 focus:border-viz-blue-dark focus:ring-viz-blue-dark/20 w-1/3 rounded-md border bg-white px-4 py-2 text-sm transition-all focus:ring-1 focus:outline-none md:w-auto"
			>
				<option value="all">All Themes</option>
				{#each themes as theme}
					<option value={theme}>{theme}</option>
				{/each}
			</select>

			<select
				id="sort-by"
				bind:value={sortBy}
				aria-label="Sort proposals"
				class="border-viz-grey/20 text-viz-grey hover:border-viz-grey/40 focus:border-viz-blue-dark focus:ring-viz-blue-dark/20 w-1/4 rounded-md border bg-white px-4 py-2 text-sm transition-all focus:ring-1 focus:outline-none md:w-auto"
			>
				{#each sortOptions as option}
					<option value={option.value}>{option.label}</option>
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
