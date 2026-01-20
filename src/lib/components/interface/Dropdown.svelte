<script lang="ts">
	import { Cluster } from '$lib/components';

	interface Props {
		data?: Record<string, any>[];
		activeValue?: string;
		keyField?: string;
		labelField?: string;
		onSelect: (value: any) => void;
	}

	let { data = [], activeValue = '', keyField = '', labelField = '', onSelect }: Props = $props();

	let uniqueOptions: any = $state([]);

	$effect(() => {
		const map = new Map(data.map((item) => [item[keyField], item]));
		uniqueOptions = Array.from(map.values());
	});

	let element: HTMLElement = $state();
</script>

<!-- Styled dropdown with icon -->
<div class="relative inline-block">
	<select
		bind:this={element}
		onchange={() => onSelect(element)}
		class="border-grey-light px-sm py-xs pr-lg text-grey appearance-none rounded-md border bg-white text-sm font-medium shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
	>
		{#each uniqueOptions as item}
			<option value={item[keyField]} selected={item[keyField] === activeValue}>
				{item[labelField]}
			</option>
		{/each}
	</select>

	<!-- Down arrow icon -->
	<Cluster
		space="xs"
		align="center"
		justify="center"
		class="right-sm pointer-events-none absolute inset-y-0"
	>
		<svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
		</svg>
	</Cluster>
</div>
