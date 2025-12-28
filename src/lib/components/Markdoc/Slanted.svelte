<script>
	import CustomSlantedText from '../Common/CustomSlantedText.svelte';
	export let textContent = '';
	export let color = 'pink';
</script>

<h2 class="content-subheading text-viz-{color}-dark mt-12 text-center">
	<CustomSlantedText {textContent} />
</h2>

<!-- Safelist classes for Tailwind JIT since they are dynamic -->
<!-- 
	text-viz-pink-dark
	text-viz-blue-dark
	text-viz-teal-dark
	text-viz-yellow-dark
	text-viz-orange-dark
-->
