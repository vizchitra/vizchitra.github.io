<script lang="ts">
	export let data: Record<string, any>[] = [];
	export let activeValue: string = '';
	export let keyField: string = '';
	export let labelField: string = '';

    export let onSelect: (value: any) => void; 

	let uniqueOptions : any = [];

	$: {
		const map = new Map(data.map(item => [item[keyField], item]));
		uniqueOptions = Array.from(map.values());
	}

	let element: HTMLElement;

</script>

<!-- Styled dropdown with icon -->
<div class="relative inline-block">
	<select bind:this={element}
		on:change={() => onSelect(element)}
		class="appearance-none rounded-md border border-gray-300 bg-white px-3 py-1.5 pr-8 text-sm font-medium text-gray-700 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
	>
		{#each uniqueOptions as item}
			<option value={item[keyField]} selected={item[keyField] === activeValue}>
				{item[labelField]}
			</option>
		{/each}
	</select>

	<!-- Down arrow icon -->
	<div class="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400">
		<svg
			class="h-4 w-4"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
		</svg>
	</div>
</div>
