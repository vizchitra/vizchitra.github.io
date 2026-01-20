<script lang="ts">
	import { FullBleed } from '$lib/components';
</script>

<FullBleed>
	<div class="button-container bg-viz-blue-light/10 relative flex items-center justify-center">
		<button
			on:click={() => {
				document.getElementById('sponsorship-contact-form')?.scrollIntoView({
					behavior: 'smooth',
					block: 'center'
				});
			}}
			class="bg-viz-pink-dark hover:bg-viz-pink-dark/90 center relative mt-sm mb-lg flex cursor-pointer rounded-sm px-md py-sm text-xl text-white italic"
		>
			Become a sponsor →
		</button>
		<img
			src="/images/patterns/header-2.png"
			alt="header polygon"
			class="absolute top-0 left-0 w-1/3 md:block md:w-1/6"
		/>
		<img
			src="/images/patterns/header-1.png"
			alt="header polygon"
			class="absolute top-0 right-0 w-1/3 md:w-1/8"
		/>
	</div>
</FullBleed>

<style>
	.button-container {
		height: 20svh;
	}
</style>
