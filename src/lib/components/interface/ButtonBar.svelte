<script lang="ts">

	// Define the shape of an individual data item using a generic record.
	type Item = Record<string, any>;

	// Props passed into the component
	export let data: Item[] = []; // Array of data items (e.g., [{ code: 'A', name: 'Alpha' }, ...])
	export let activeValue: string = ''; // Currently selected item's key value
	export let keyField: string = ''; // Field name used as the unique key (e.g., 'code')
	export let labelField: string = ''; // Field name used as the display label (e.g., 'name')

  export let onSelect: (value: any) => void; 

	/**
	 * Reactive statement to compute unique buttons based on the keyField.
	 * Ensures no duplicate entries appear in the button bar.
	 */
	$: uniqueButtons = Array.from(new Map(data.map((item) => [item[keyField], item])).values());

	/**
	 * Handles selection of a button item.
	 * Updates activeValue and dispatches 'onChange' event with selected item.
	 *
	 * @param item - The selected item object
	 */

</script>

<!-- Render the button bar UI -->
<div class="button-bar">
	{#each uniqueButtons as item}
		<button
			class="button {item[keyField] === activeValue ? 'selected' : ''}"
			on:click={() => onSelect(item)}
		>
			{item[labelField]}
		</button>
	{/each}
</div>

<style>
	.button-bar {
		display: inline-flex;
		background-color: #f0f0f0;
		border-radius: 8px;
		padding: 4px;
		gap: 4px;
	}

	.button {
		background-color: transparent;
		border: none;
		padding: 6px 12px;
		border-radius: 6px;
		font-size: 14px;
		cursor: pointer;
		transition:
			background-color 0.2s,
			font-weight 0.2s;
		color: #333;
	}

	.button:hover {
		background-color: #e0e0e0;
	}

	.button.selected {
		background-color: white;
		font-weight: 600;
	}
</style>
