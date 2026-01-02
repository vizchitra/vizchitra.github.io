<script lang="ts">
	import { Header } from '$lib/components/structure';

	import {
		SliderInput,
		PolygonGenerator,
		SelectInput,
		ImageUpload
	} from '$lib/components/sections';

	// modern-screenshot doesn't ship types — import then assert a typed signature
	import { domToPng as _domToPng } from 'modern-screenshot';
	const domToPng = _domToPng as unknown as (
		node: Element | null,
		opts?: { backgroundColor?: string; scale?: number }
	) => Promise<string>;

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

	$: form = {
		name: null,
		strength: 'Analyzing data'
	} as Form;

	async function downloadPNG(): Promise<void> {
		const filename = `vizchitra-logo-${form.name ? form.name.toLowerCase().replaceAll(' ', '-') : '2025'}.png`;

		const node = document.querySelector('#custom-card');
		try {
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

<div class="min-h-screen w-full">
	<Header title="Create your own VizChitra selfie!" />

	<div class="content-container mx-auto !max-w-[min(90vw,1400px)] !px-0 py-12">
		<p class="content-text mb-10">
			Play around with the following section to create your own custom VizChitra logo.
		</p>

		<div class="flex flex-col gap-14 md:flex-row">
			<div class="form flex w-full flex-col gap-5 md:w-[40%] md:max-w-[500px]">
				<div class="details-section">
					<div class="section-header mb-4 flex items-center gap-3">
						<span
							class="fonts flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-[#747474] text-white"
						>
							1
						</span>
						<h2 class="content-text font-base text-viz-grey">About yourself</h2>
					</div>

					<div class="details-controls pl-10">
						<div class="text-input relative mb-5 pt-[10px]">
							<input
								class="block h-[30px] w-full max-w-[300px] border-b-2 border-[#dddddd] !outline-0 placeholder:opacity-0"
								type="text"
								id="name"
								name="name"
								placeholder="Name"
								bind:value={form.name}
							/>
							<label class="h-[30px]" for="name">Name</label>
						</div>

						<div class="text-input relative mb-3 pt-[10px]">
							<textarea
								class="block h-fit min-h-[30px] w-full max-w-[300px] border-b-2 border-[#dddddd] !outline-0 placeholder:opacity-0"
								id="desc"
								name="desc"
								placeholder="About yourself"
								bind:value={form.desc}
							></textarea>
							<label class="h-[30px]" for="desc">What do you do with data?</label>
						</div>

						<ImageUpload bind:src={form.image}></ImageUpload>
					</div>
				</div>

				<div class="interests-section">
					<div class="section-header mb-4 flex items-center gap-3">
						<span
							class="flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-[#747474] text-white"
						>
							2
						</span>
						<h2 class="content-text font-base text-viz-grey">Your data interests</h2>
					</div>

					<div class="interests-controls pl-10">
						<p class="content-text mb-4 !text-[20px] !leading-[1.25]">
							How interested are you in the following activities?
						</p>

						<SliderInput label="Data Collection" bind:formValue={form.collection} showLegend={true}
						></SliderInput>
						<SliderInput label="Data Analysis" bind:formValue={form.analysis}></SliderInput>
						<SliderInput label="Coding Visualizations" bind:formValue={form.coding}></SliderInput>
						<SliderInput label="Designing visualizations" bind:formValue={form.designing}
						></SliderInput>
						<SliderInput label="Narrating insights" bind:formValue={form.narrating}></SliderInput>

						<SelectInput
							label="Which of the previous are you strongest at?"
							bind:formValue={form.strength}
						></SelectInput>
					</div>
				</div>

				<button
					class="bg-viz-orange cursor-pointer rounded py-3 font-semibold text-white hover:opacity-90 md:ml-10"
					on:click={downloadPNG}
					>Download logo
				</button>
			</div>

			<div class="logo-container height-100% flex w-full flex-col items-center md:w-[60%]">
				<PolygonGenerator formData={form} />
			</div>
		</div>
	</div>
</div>

<style>
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
