<script lang="ts">
	// Formspree endpoint
	const formAction = 'https://formspree.io/f/mrgolwal';

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
	class="mx-auto mb-12 flex w-full max-w-3xl flex-col gap-6 rounded-lg bg-white p-4 shadow md:p-8"
	autocomplete="on"
>
	<h2 class="mb-2 text-left text-2xl font-bold">We're all ears…</h2>
	<hr class="mb-2" />

	<fieldset class="mb-2 flex flex-col gap-4">
		{#each reasons as reason, i}
			<label class="flex items-center gap-3 text-lg font-normal">
				<input
					type="checkbox"
					name="reason"
					value={reason}
					class="accent-viz-pink-dark size-5 rounded border-gray-300"
					aria-label={reason}
				/>
				{reason}
			</label>
		{/each}
	</fieldset>

	<!-- Responsive grid for main fields -->
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="flex flex-col gap-2">
			<label for="full-name" class="text-base font-medium">Full name</label>
			<input
				id="full-name"
				name="full-name"
				type="text"
				placeholder="Ankit Sharma"
				required
				class="focus:outline-viz-pink-dark rounded border border-gray-300 px-4 py-3 text-lg"
				autocomplete="name"
			/>
		</div>

		<div class="flex flex-col gap-2">
			<label for="email" class="text-base font-medium">Email</label>
			<input
				id="email"
				name="email"
				type="email"
				placeholder="ankit.sharma@abc.com"
				required
				class="focus:outline-viz-pink-dark rounded border border-gray-300 px-4 py-3 text-lg"
				autocomplete="email"
			/>
		</div>

		<div class="flex flex-col gap-2">
			<label for="phone" class="text-base font-medium">Phone</label>
			<div class="flex items-center gap-2">
				<input
					id="phone"
					name="phone"
					type="tel"
					placeholder="+91 9876543210"
					class="focus:outline-viz-pink-dark flex-1 rounded border border-gray-300 px-4 py-3 text-lg"
					autocomplete="tel"
				/>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<label for="company" class="text-base font-medium">Company</label>
			<input
				id="company"
				name="company"
				type="text"
				placeholder="ABC Inc."
				class="focus:outline-viz-pink-dark rounded border border-gray-300 px-4 py-3 text-lg"
				autocomplete="organization"
			/>
		</div>
	</div>

	<div class="flex flex-col gap-2">
		<label for="objective" class="text-base font-medium">Brand objective, ideas, budget, etc.</label
		>
		<textarea
			id="objective"
			name="objective"
			rows="3"
			placeholder="Brand objective, ideas, budget, etc."
			class="focus:outline-viz-pink-dark resize-vertical rounded border border-gray-300 px-4 py-3 text-lg"
		></textarea>
	</div>

	<div class="mt-4">
		<button
			type="submit"
			class="bg-viz-pink-dark hover:bg-viz-pink-dark/90 w-full rounded py-4 text-xl font-semibold text-white"
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
</style>
