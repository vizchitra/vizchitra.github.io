<script lang="ts">
	import CtaPattern1 from '$lib/assets/images/header-call-to-action/cta-pattern-1.svg?raw';
	import CtaPattern2 from '$lib/assets/images/header-call-to-action/cta-pattern-2.svg?raw';
	import CtaPattern3 from '$lib/assets/images/header-call-to-action/cta-pattern-3.svg?raw';

	let marqueeSectionWidth: number = 0;

	const patterns = [CtaPattern2, CtaPattern3, CtaPattern1, CtaPattern2, CtaPattern3, CtaPattern1];
</script>

<div id="#header-call-to-action" class="overflow-hidden">
	<a
		href="https://hasgeek.com/VizChitra/2025/#tickets"
		class="relative block border-b-[3px] border-[#4c4c4c] bg-white"
		target="_blank"
	>
		<div
			style:--marquee-section-width={marqueeSectionWidth + 'px'}
			class="marquee-track text-viz flex w-full flex-row flex-nowrap items-center justify-start"
		>
			{#each patterns as CtaPattern}
				<div
					bind:clientWidth={marqueeSectionWidth}
					class="marquee-section text-viz flex w-fit shrink-0 flex-row items-center justify-between gap-4 px-2"
				>
					<p class="font w-fit px-3 text-base whitespace-nowrap text-[#222] sm:text-lg md:text-xl">
						Register for <strong>VizChitra 2025</strong> -
						<span class="underline">Tickets are now live</span>!
					</p>
					<div class="svg-container">
						{@html CtaPattern}
					</div>
				</div>
			{/each}
		</div>
	</a>
</div>

<style>
	.marquee-track {
		width: 100%;
		height: fit-content;
		animation: marquee-animation 50s linear infinite;
	}

	@keyframes marquee-animation {
		0% {
			transform: translateX(0);
		}

		100% {
			transform: translateX(calc(-3 * var(--marquee-section-width)));
		}
	}

	.svg-container {
		width: 18vw;
		min-width: 250px;
		height: 100%;
		display: inline-block;
	}

	:global(#header-call-to-action svg) {
		width: 100%;
		height: 100%;
	}
</style>
