<script>
	import { formatSlantedText } from '$lib/utils/utils.js';
	import NavMenu from '$lib/components/NavMenu.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import SliderInput from '$lib/components/PolygonPlayground/SliderInput.svelte';
	import PolygonGenerator from '$lib/components/PolygonPlayground/PolygonGenerator.svelte';
	import SelectInput from '$lib/components/PolygonPlayground/SelectInput.svelte';
	import { domToPng } from 'modern-screenshot';

	$: form = {
		name: null,
		strength: 'none'
	};

	function downloadPNG() {
		let filename = `vizchitra-logo-${form.name.toLowerCase().replaceAll(' ', '-')}.png`;

		domToPng(document.querySelector('#custom-card'), {
			backgroundColor: '#ffffff',
			scale: 1.5
		}).then((dataUrl) => {
			const link = document.createElement('a');
			link.download = filename;
			link.href = dataUrl;
			link.click();
		});
	}
</script>

<NavMenu />

<div class="min-h-screen">
	<PageHeader title="Polygon Playground" />

	<div class="content-container w-full !max-w-[90%] !px-0 py-12">
		<p class="content-text mb-6">
			Play around with the following section to create your own custom VizChitra logo.
		</p>

		<div class="flex flex-row gap-10">
			<div class="form flex w-[40%] max-w-[400px] flex-col gap-5">
				<div class="details-section">
					<h2 class="content-text">About yourself</h2>

					<div class="text-input relative mb-5 pt-[10px]">
						<input
							class=" block h-[30px] w-full max-w-[300px] border-b-2 !outline-0 placeholder:opacity-0"
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
							class=" block h-fit min-h-[30px] w-full max-w-[300px] border-b-2 !outline-0 placeholder:opacity-0"
							type="text"
							id="desc"
							name="desc"
							placeholder="About yourself"
							bind:value={form.desc}
						></textarea>
						<label class="h-[30px]" for="desc">What do you do with data?</label>
					</div>
				</div>

				<div class="interests-section">
					<h2 class="content-text">Your data interests</h2>
					<p class="content-text !text-[20px]">
						How interested are you in the following activities?
					</p>

					<SliderInput label="Data Collection" bind:formValue={form.collection}></SliderInput>
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

				<button
					class="bg-viz-orange rounded py-3 font-semibold text-white hover:opacity-90"
					on:click={downloadPNG}>Download logo</button
				>
			</div>

			<div class="logo-container flex w-[60%] items-center justify-center">
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
