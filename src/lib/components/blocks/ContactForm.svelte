<script lang="ts">
	/**
	 * Generic contact form component with Formspree integration.
	 * Supports configurable fields and checkbox groups.
	 */
	import { Stack, Grid, Cluster } from '$lib/components';
	import { type Color, getColorTokens } from '$lib/utils/colorTokens';

	interface FormField {
		/** Field name (used as form field name) */
		name: string;
		/** Display label */
		label: string;
		/** Input type */
		type: 'text' | 'email' | 'tel' | 'textarea';
		/** Placeholder text */
		placeholder?: string;
		/** Whether field is required */
		required?: boolean;
		/** Autocomplete attribute */
		autocomplete?: any;
		/** Number of rows for textarea */
		rows?: number;
	}

	interface Props {
		/** Formspree form ID or full URL */
		formId: string;
		/** Form heading */
		heading?: string;
		/** Checkbox options for multi-select */
		checkboxOptions?: string[];
		/** Checkbox group name */
		checkboxName?: string;
		/** Form fields configuration */
		fields?: FormField[];
		/** Submit button text */
		submitLabel?: string;
		/** Accent color */
		color?: Color;
		/** Additional CSS classes */
		class?: string;
	}

	const defaultFields: FormField[] = [
		{
			name: 'full-name',
			label: 'Full name',
			type: 'text',
			placeholder: 'Your name',
			required: true,
			autocomplete: 'name'
		},
		{
			name: 'email',
			label: 'Email',
			type: 'email',
			placeholder: 'you@example.com',
			required: true,
			autocomplete: 'email'
		},
		{
			name: 'phone',
			label: 'Phone',
			type: 'tel',
			placeholder: '+91 9876543210',
			autocomplete: 'tel'
		},
		{
			name: 'company',
			label: 'Company',
			type: 'text',
			placeholder: 'Company name',
			autocomplete: 'organization'
		},
		{ name: 'message', label: 'Message', type: 'textarea', placeholder: 'Your message...', rows: 3 }
	];

	let {
		formId,
		heading = 'Get in touch',
		checkboxOptions = [],
		checkboxName = 'reason',
		fields = defaultFields,
		submitLabel = 'Submit',
		color = 'pink',
		class: className = ''
	}: Props = $props();

	const tokens = $derived(getColorTokens(color, 'pink'));
	const formAction = $derived(
		formId.startsWith('http') ? formId : `https://formspree.io/f/${formId}`
	);

	// Split fields into grid (first 4) and full-width (rest)
	const gridFields = $derived(fields.filter((f) => f.type !== 'textarea').slice(0, 4));
	const fullWidthFields = $derived(
		fields.filter(
			(f) => f.type === 'textarea' || fields.filter((ff) => ff.type !== 'textarea').indexOf(f) >= 4
		)
	);
</script>

<form action={formAction} method="POST" autocomplete="on">
	<Stack
		space="md"
		class="contact-form mb-lg p-sm md:p-lg mx-auto w-full max-w-3xl rounded-lg bg-white shadow-md {className}"
	>
		{#if heading}
			<div class="space-y-xs">
				<h2 class="text-left text-2xl font-bold">{heading}</h2>
				<hr />
			</div>
		{/if}

		{#if checkboxOptions.length > 0}
			<Stack space="sm">
				{#each checkboxOptions as option, i}
					<label class="cluster text-lg font-normal" data-space="sm" data-align="center">
						<input
							type="checkbox"
							name={checkboxName}
							value={option}
							class="checkbox-custom"
							aria-label={option}
						/>
						{option}
					</label>
				{/each}
			</Stack>
		{/if}

		<!-- Grid fields -->
		{#if gridFields.length > 0}
			<Grid minWidth="150px" space="md">
				{#each gridFields as field}
					<Stack space="xs">
						<label for={field.name} class="text-base font-medium">{field.label}</label>
						<input
							id={field.name}
							name={field.name}
							type={field.type}
							placeholder={field.placeholder}
							required={field.required}
							autocomplete={field.autocomplete}
							class="form-input border-grey-light px-sm py-sm focus:outline-pink-dark rounded border text-lg"
						/>
					</Stack>
				{/each}
			</Grid>
		{/if}

		<!-- Full-width fields (textareas) -->
		{#each fullWidthFields as field}
			<Stack space="xs">
				<label for={field.name} class="text-base font-medium">{field.label}</label>
				{#if field.type === 'textarea'}
					<textarea
						id={field.name}
						name={field.name}
						rows={field.rows ?? 3}
						placeholder={field.placeholder}
						required={field.required}
						class="form-input border-grey-light px-sm py-sm focus:outline-pink-dark resize-y rounded border text-lg"
					></textarea>
				{:else}
					<input
						id={field.name}
						name={field.name}
						type={field.type}
						placeholder={field.placeholder}
						required={field.required}
						autocomplete={field.autocomplete}
						class="form-input border-grey-light px-sm py-sm focus:outline-pink-dark rounded border text-lg"
					/>
				{/if}
			</Stack>
		{/each}

		<button
			type="submit"
			class="w-full rounded {tokens.bg} py-sm text-xl font-semibold text-white hover:opacity-90"
		>
			{submitLabel} →
		</button>
	</Stack>
</form>

<style>
	.form-input {
		font-family: var(--font-body);
	}

	.checkbox-custom {
		width: 20px;
		height: 20px;
		min-width: 20px;
		min-height: 20px;
		flex-shrink: 0;
		cursor: pointer;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		border: 2px solid var(--color-grey-light);
		border-radius: 4px;
		background-color: var(--color-white);
		position: relative;
		transition: all 0.2s ease;
	}

	.checkbox-custom:checked {
		background-color: var(--color-pink-dark);
		border-color: var(--color-pink-dark);
	}

	.checkbox-custom:checked::after {
		content: '';
		position: absolute;
		left: 6px;
		top: 2px;
		width: 6px;
		height: 10px;
		border: solid var(--color-white);
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}

	.checkbox-custom:hover {
		border-color: var(--color-pink-dark);
	}

	.checkbox-custom:focus {
		outline: 2px solid var(--color-pink-dark);
		outline-offset: 2px;
	}
</style>
