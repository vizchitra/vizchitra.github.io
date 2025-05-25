<script lang="ts">
	import horn from '$lib/assets/images/horn.svg?raw';
</script>

<div class="bg-viz-yellow-light text-viz flex items-center justify-center gap-4 p-2">
	<div class="svg-horn">{@html horn}</div>
	<div>
		<p class="w-fit text-lg">
			Register for <a
				href="https://hasgeek.com/VizChitra/2025/#tickets"
				class="text-viz-pink-dark inline underline"
				target="_blank">Vizchitra 2025: Tickets are now available! &#8599;</a
			>
		</p>
	</div>
</div>

<style>
	@keyframes horn-move {
		0%,
		100% {
			transform: rotate(-5deg);
		}
		50% {
			transform: rotate(5deg);
		}
	}

	.svg-horn {
		animation: horn-move 0.8s ease-in-out infinite alternate;
		transform-origin: center;
	}
</style>
