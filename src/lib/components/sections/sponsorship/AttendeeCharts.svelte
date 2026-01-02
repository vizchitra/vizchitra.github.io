<script lang="ts">
	import Grid from '$lib/components/layout/Grid.svelte';
	import ColumnChart from '$lib/components/interface/ColumnChart.svelte';
	import yearsOfExperience from '$lib/data/years.csv';
	import functionalRoles from '$lib/data/roles.csv';
	import organizationSize from '$lib/data/size.csv';
</script>

<Grid minWidth="300px" gap={6} class="w-full">
	<!-- Years of Experience Chart -->
	<div class="relative">
		<ColumnChart
			xkey="years"
			countKey="count"
			ykey="perc"
			data={yearsOfExperience}
			title="Years of Work Experience"
			maxValue={30}
			barColor="#a5b4fc"
			annotations={[
				{
					text: '~70% of the attendees have more than 5+ years of work experience',
					position: 'bottom-right',
					style: 'color: #8b5cf6; max-width: 160px; width: 100%; font-size: 12px;'
				}
			]}
		/>
	</div>
	<!-- Functional Role Chart -->
	<div class="relative">
		<ColumnChart
			xkey="role"
			countKey="count"
			ykey="perc"
			data={functionalRoles}
			title="Functional Role at Work"
			maxValue={30}
			barColor="#f9a8d4"
			annotations={[
				{
					text: 'Diverse participation with designers (~48%), followed by data & AI/BI professionals (~27%) & also journalists, educators and developers',
					position: 'bottom-right',
					style: 'color: #ec4899; max-width: 160px; width: 100%; font-size: 12px;'
				}
			]}
		/>
	</div>
	<!-- Organization Size Chart -->
	<div class="relative">
		<ColumnChart
			xkey="size"
			countKey="count"
			ykey="perc"
			data={organizationSize}
			title="Size of Work Organization"
			maxValue={30}
			barColor="#6ee7b7"
			annotations={[
				{
					text: '~60% of the attendees are from enterprises and micro & solo orgs – covering both ends of the spectrum',
					position: 'bottom-right',
					style: 'color: #10b981; max-width: 160px; width: 100%; font-size: 12px;'
				}
			]}
		/>
	</div>
</Grid>
