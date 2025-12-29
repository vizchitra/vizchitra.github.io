<script>
	import CustomSlantedText from '$lib/components/typography/CustomSlantedText.svelte';
	export let textContent = '';
	export let color = 'pink';
</script>

<h2 class="content-subheading text-viz-{color}-dark mt-12 text-center">
	<CustomSlantedText {textContent} />
</h2>
