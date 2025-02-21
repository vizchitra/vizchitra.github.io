<script>
	export let label = null;
	export let formValue = null;
</script>

<div class="slider-input mb-4">
	<label for="data">{label}</label>
	<input
		type="range"
		min="1"
		max="5"
		class="slider block w-full"
		id="collection"
		bind:value={formValue}
	/>
</div>
