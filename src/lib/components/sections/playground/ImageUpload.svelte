<script>
	export let src = null;

	const onFileSelected = (e) => {
		src = null;

		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			src = e.target.result;
		};
	};
</script>

<div class="upload-row mt-4">
	<label
		for="image-upload"
		class="bg-viz-orange block w-fit max-w-[300px] cursor-pointer rounded px-4 py-3 font-semibold text-white hover:opacity-90"
	>
		Upload an image <span class="font-normal">(optional)</span></label
	>

	<input
		id="image-upload"
		class="hidden"
		type="file"
		accept=".jpg, .jpeg, .png"
		on:change={(e) => onFileSelected(e)}
	/>
</div>
