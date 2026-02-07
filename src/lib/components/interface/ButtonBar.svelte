<script lang="ts">
	import { getColorHex, colors } from '$lib/tokens';

	// Define the shape of an individual data item using a generic record.
	type Item = Record<string, any>;

	interface Props {
		// Props passed into the component
		data?: Item[]; // Array of data items (e.g., [{ code: 'A', name: 'Alpha' }, ...])
		activeValue?: string; // Currently selected item's key value
		keyField?: string; // Field name used as the unique key (e.g., 'code')
		labelField?: string; // Field name used as the display label (e.g., 'name')
		onSelect: (value: any) => void;
	}

	let { data = [], activeValue = '', keyField = '', labelField = '', onSelect }: Props = $props();

	/**
	 * Reactive statement to compute unique buttons based on the keyField.
	 * Ensures no duplicate entries appear in the button bar.
	 */
	let uniqueButtons = $derived(
		Array.from(new Map(data.map((item) => [item[keyField], item])).values())
	);

	/**
	 * Handles selection of a button item.
	 * Updates activeValue and dispatches 'onChange' event with selected item.
	 *
	 * @param item - The selected item object
	 */
</script>

<!-- Render the button bar UI -->
<div class="bg-grey-200 inline-flex gap-1 rounded-lg p-1">
	{#each uniqueButtons as item}
		<button
			class="text-grey-700 hover:bg-grey-300 cursor-pointer rounded-md border-none bg-transparent px-3 py-1.5 text-sm transition-all duration-200 {item[
				keyField
			] === activeValue
				? 'bg-white font-semibold'
				: ''}"
			onclick={() => onSelect(item)}
		>
			{item[labelField]}
		</button>
	{/each}
</div>
