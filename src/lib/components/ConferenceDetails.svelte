<script>
	import Button from '$lib/components/Button.svelte';
</script>

<div class="content-notice mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
	<div class="space-y-2">
		<h3 class="content-heading text-primary">CONFERENCE DAY</h3>
		<div class="space-y-1">
			<p class="content-text font-semibold">27th June, 2025</p>
			<p class="text-[20px]">Bangalore International Center</p>
		</div>
	</div>

	<div class="space-y-2">
		<h3 class="content-heading text-primary">WORKSHOP DAY</h3>
		<div class="space-y-1">
			<p class="content-text font-semibold">28th June, 2025</p>
			<p class="text-[20px]">Across Bangalore</p>
		</div>
	</div>
</div>

<Button class_name="w-full" variant="primary" href="https://hasgeek.com/VizChitra/2025/" external>
	Add us to your calendar!
</Button>
