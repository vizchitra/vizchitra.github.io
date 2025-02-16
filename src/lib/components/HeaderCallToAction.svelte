<script lang="ts">
	import horn from '$lib/assets/images/horn.svg?raw';
</script>

<div class="flex items-center justify-center gap-4 bg-[#FFE5B7] p-2">
	<div class="svg-horn">{@html horn}</div>
	<div>
		<p class="text-xl">
			Register for <a
				href="https://hasgeek.com/VizChitra/launch-party/"
				class="inline-block"
				target="_blank">VizChitra Launch Party &#8599;</a
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
