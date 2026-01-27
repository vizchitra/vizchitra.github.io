<!--
	SelectInput - Dropdown select input component.
	Supports configurable options array.
-->
<script lang="ts">
	interface SelectOption {
		value: string;
		label: string;
	}

	interface Props {
		/** Input label */
		label: string;
		/** Bound selected value */
		value?: string;
		/** Array of options */
		options?: SelectOption[] | string[];
		/** Placeholder text */
		placeholder?: string;
		/** Additional CSS classes */
		class?: string;
	}

	// Default strength options
	const defaultOptions: SelectOption[] = [
		{ value: 'Collecting data', label: 'Collecting data' },
		{ value: 'Analyzing data', label: 'Analyzing data' },
		{ value: 'Coding visualizations', label: 'Coding visualizations' },
		{ value: 'Designing visualizations', label: 'Designing visualizations' },
		{ value: 'Narrating insights', label: 'Narrating insights' }
	];

	let {
		label,
		value = $bindable(''),
		options = defaultOptions,
		placeholder = 'Select an option',
		class: className = ''
	}: Props = $props();

	// Normalize options to SelectOption format
	const normalizedOptions = $derived(
		options.map((opt) => (typeof opt === 'string' ? { value: opt, label: opt } : opt))
	);
</script>

<div class="select-input mt-lg mb-sm {className}">
	<label for="select-{label.replaceAll(' ', '-')}">{label}</label>
	<div class="select">
		<select
			id="select-{label.replaceAll(' ', '-')}"
			class="h-lg border-grey-light w-full max-w-xs border-b-2 outline-0!"
			bind:value
		>
			{#if placeholder}
				<option value="" disabled>{placeholder}</option>
			{/if}
			{#each normalizedOptions as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	</div>
</div>
