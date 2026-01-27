<script lang="ts">
	// Formspree endpoint
	const formAction = 'https://formspree.io/f/xzzgpgkb';

	// Checkbox options
	const reasons = [
		'To reach out to key decision–makers/influencer',
		'To showcase our brand/offerings',
		'To launch our brand/product',
		'To showcase our employer brand',
		'To get feedback on our products and services',
		'To promote our courses/programs'
	];
</script>

<form
	action={formAction}
	method="POST"
	id="sponsorship-contact-form"
	class="mb-xl gap-md p-sm md:p-lg mx-auto flex w-full max-w-3xl flex-col rounded-lg bg-white shadow"
	autocomplete="on"
>
	<h2 class="mb-xs text-left text-2xl font-bold">We're all ears…</h2>
	<hr class="mb-xs" />

	<fieldset class="mb-xs gap-sm flex flex-col">
		{#each reasons as reason, i}
			<label class="gap-sm flex items-center text-lg font-normal">
				<input
					type="checkbox"
					name="reason"
					value={reason}
					class="checkbox-custom accent-viz-pink-dark rounded border-gray-300"
					aria-label={reason}
				/>
				{reason}
			</label>
		{/each}
	</fieldset>

	<!-- Responsive grid for main fields -->
	<div class="gap-sm grid grid-cols-1 md:grid-cols-2">
		<div class="gap-xs flex flex-col">
			<label for="full-name" class="text-base font-medium">Full name</label>
			<input
				id="full-name"
				name="full-name"
				type="text"
				placeholder="Ankit Sharma"
				required
				class="focus:outline-viz-pink-dark px-sm py-sm rounded border border-gray-300 text-lg"
				autocomplete="name"
			/>
		</div>

		<div class="gap-xs flex flex-col">
			<label for="email" class="text-base font-medium">Email</label>
			<input
				id="email"
				name="email"
				type="email"
				placeholder="ankit.sharma@abc.com"
				required
				class="focus:outline-viz-pink-dark px-sm py-sm rounded border border-gray-300 text-lg"
				autocomplete="email"
			/>
		</div>

		<div class="gap-xs flex flex-col">
			<label for="phone" class="text-base font-medium">Phone</label>
			<div class="gap-xs flex items-center">
				<input
					id="phone"
					name="phone"
					type="tel"
					placeholder="+91 9876543210"
					class="focus:outline-viz-pink-dark px-sm py-sm flex-1 rounded border border-gray-300 text-lg"
					autocomplete="tel"
				/>
			</div>
		</div>

		<div class="gap-xs flex flex-col">
			<label for="company" class="text-base font-medium">Company</label>
			<input
				id="company"
				name="company"
				type="text"
				placeholder="ABC Inc."
				class="focus:outline-viz-pink-dark px-sm py-sm rounded border border-gray-300 text-lg"
				autocomplete="organization"
			/>
		</div>
	</div>

	<div class="gap-xs flex flex-col">
		<label for="objective" class="text-base font-medium">Brand objective, ideas, budget, etc.</label
		>
		<textarea
			id="objective"
			name="objective"
			rows="3"
			placeholder="Brand objective, ideas, budget, etc."
			class="focus:outline-viz-pink-dark resize-vertical px-sm py-sm rounded border border-gray-300 text-lg"
		></textarea>
	</div>

	<div class="mt-sm">
		<button
			type="submit"
			class="bg-viz-pink-dark hover:bg-viz-pink-dark/90 py-sm w-full rounded text-xl font-semibold text-white"
		>
			Contact Us →
		</button>
	</div>
</form>

<style>
	form {
		font-family: 'Inter', 'Cairo', sans-serif;
	}
	input,
	textarea {
		font-family: inherit;
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
		border: 2px solid #d1d5db;
		border-radius: 4px;
		background-color: white;
		position: relative;
		transition: all 0.2s ease;
	}

	.checkbox-custom:checked {
		background-color: #e91e63;
		border-color: #e91e63;
	}

	.checkbox-custom:checked::after {
		content: '';
		position: absolute;
		left: 6px;
		top: 2px;
		width: 6px;
		height: 10px;
		border: solid white;
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}

	.checkbox-custom:hover {
		border-color: #e91e63;
	}

	.checkbox-custom:focus {
		outline: 2px solid #e91e63;
		outline-offset: 2px;
	}
</style>
