<script>
	export let label = null;
	export let formValue = null;
</script>

<div class="select-input mt-8 mb-4">
	<label for="data">{label}</label>
	<div class="select">
		<select
			class="h-[30px] w-full max-w-[300px] border-b-2 border-[#dddddd] !outline-0"
			bind:value={formValue}
			placeholder="Select your strength"
		>
			<option value="Collecting data">Collecting data</option>
			<option value="Analyzing data">Analyzing data </option>
			<option value="Coding visualizations">Coding visualizations </option>
			<option value="Designing visualizations">Designing visualizations </option>
			<option value="Narrating insights">Narrating insights </option>
		</select>
	</div>
</div>
