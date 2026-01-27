<script lang="ts">
	import { ImageUpload, PolygonGenerator, SelectInput, SliderInput } from '$lib/components';

	type Form = {
		name: string | null;
		desc?: string | null;
		image?: string | null;
		collection?: number;
		analysis?: number;
		coding?: number;
		designing?: number;
		narrating?: number;
		strength: string;
	};

	let form = $state({
		name: null,
		strength: 'Analyzing data'
	} as Form);

	async function downloadPNG(): Promise<void> {
		const filename = `vizchitra-logo-${form.name ? form.name.toLowerCase().replaceAll(' ', '-') : '2025'}.png`;

		const node = document.querySelector('#custom-card');
		try {
			// Lazy load modern-screenshot only when needed
			const { domToPng } = await import('modern-screenshot');
			const dataUrl = await domToPng(node, { backgroundColor: '#ffffff', scale: 1.5 });
			const link = document.createElement('a');
			link.download = filename;
			link.href = dataUrl;
			link.click();
		} catch (err) {
			console.error('Failed to generate PNG', err);
		}
	}
</script>

<div class="playground-container content-container py-xl mx-auto px-0">
	<p class="content-text mb-xl">
		Play around with the following section to create your own custom VizChitra logo.
	</p>

	<div class="gap-2xl flex flex-col md:flex-row">
		<div class="form-section form gap-md flex w-full flex-col">
			<div class="details-section">
				<div class="section-header mb-sm gap-sm flex items-center">
					<span class="step-indicator flex items-center justify-center text-white"> 1 </span>
					<h2 class="content-text font-base text-viz-grey">About yourself</h2>
				</div>

				<div class="details-controls pl-xl">
					<div class="text-input mb-md relative">
						<input
							class="form-input block w-full border-b-2 outline-0 placeholder:opacity-0"
							type="text"
							id="name"
							name="name"
							placeholder="Name"
							bind:value={form.name}
						/>
						<label class="form-label" for="name">Name</label>
					</div>

					<div class="text-input mb-sm relative">
						<textarea
							class="form-textarea block h-fit w-full border-b-2 outline-0 placeholder:opacity-0"
							id="desc"
							name="desc"
							placeholder="About yourself"
							bind:value={form.desc}
						></textarea>
						<label class="form-label" for="desc">What do you do with data?</label>
					</div>

					<ImageUpload bind:src={form.image}></ImageUpload>
				</div>
			</div>

			<div class="interests-section">
				<div class="section-header mb-sm gap-sm flex items-center">
					<span class="step-indicator flex items-center justify-center text-white"> 2 </span>
					<h2 class="content-text font-base text-viz-grey">Your data interests</h2>
				</div>

				<div class="interests-controls pl-xl">
					<p class="interests-question content-text mb-sm">
						How interested are you in the following activities?
					</p>

					<SliderInput label="Data Collection" bind:value={form.collection} showLegend={true}
					></SliderInput>
					<SliderInput label="Data Analysis" bind:value={form.analysis}></SliderInput>
					<SliderInput label="Coding Visualizations" bind:value={form.coding}></SliderInput>
					<SliderInput label="Designing visualizations" bind:value={form.designing}></SliderInput>
					<SliderInput label="Narrating insights" bind:value={form.narrating}></SliderInput>

					<SelectInput
						label="Which of the previous are you strongest at?"
						bind:value={form.strength}
					></SelectInput>
				</div>
			</div>

			<button
				class="bg-viz-orange py-sm cursor-pointer rounded font-semibold text-white hover:opacity-90 md:ml-10"
				onclick={downloadPNG}
				>Download logo
			</button>
		</div>

		<div class="logo-container height-100% flex w-full flex-col items-center">
			<PolygonGenerator formData={form} />
		</div>
	</div>
</div>

<style>
	.playground-container {
		max-width: min(90vw, 1400px);
	}

	.form-section {
		width: 40%;
		max-width: 500px;
	}

	@media (max-width: 768px) {
		.form-section {
			width: 100%;
			max-width: none;
		}
	}

	.logo-container {
		width: 60%;
	}

	@media (max-width: 768px) {
		.logo-container {
			width: 100%;
		}
	}

	.step-indicator {
		height: 30px;
		width: 30px;
		border-radius: 50%;
		background-color: #747474;
	}

	.text-input {
		padding-top: 10px;
	}

	.form-input {
		height: 30px;
		max-width: 300px;
		border-color: #dddddd;
	}

	.form-label {
		height: 30px;
	}

	.form-textarea {
		min-height: 30px;
		max-width: 300px;
		border-color: #dddddd;
	}

	.interests-question {
		font-size: 20px;
		line-height: 1.25;
	}

	.text-input label {
		position: absolute;
		top: 20px;
		left: 5px;
		transform: translateY(-50%);

		transition: all 0.2s ease;
	}

	.text-input input:focus + label,
	.text-input input:not(:placeholder-shown) + label,
	.text-input textarea:focus + label,
	.text-input textarea:not(:placeholder-shown) + label {
		transform-origin: left center;
		left: 10px;
		transform: translate(-10px, calc(-30px)) scale(0.8);
		color: var(--color-accent);
	}
</style>
