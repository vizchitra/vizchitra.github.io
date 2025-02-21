<script>
	export let label = null;
	export let formValue = null;
</script>

<div class="select-input mb-4">
	<label for="data">{label}</label>
	<div class="select">
		<select bind:value={formValue} placeholder="Select your strength">
			<option value="Collecting data">Collecting data</option>
			<option value="Analyzing data">Analyzing data </option>
			<option value="Coding visualizations">Coding visualizations </option>
			<option value="Designing visualizations">Designing visualizations </option>
			<option value="Narrating insights">Narrating insights </option>
		</select>
	</div>
</div>
