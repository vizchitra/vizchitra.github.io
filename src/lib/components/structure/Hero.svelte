<script lang="ts">
	import BannerPolygon from '$lib/components/patterns/BannerPolygon.svelte';
	import BannerCurve from '$lib/components/patterns/BannerCurve.svelte';
	import BannerSquare from '$lib/components/patterns/BannerSquare.svelte';
	import BannerBlob from '$lib/components/patterns/BannerBlob.svelte';
	import PatternArc from '$lib/components/patterns/PatternArc.svelte';
	import LogoTagline from '$lib/components/typography/LogoTagline.svelte';
	import FullBleed from '$lib/components/layout/FullBleed.svelte';
	import Slanted from '$lib/components/typography/Slanted.svelte';

	interface Props {
		banner?: 'polygon' | 'curve' | 'square' | 'blob' | 'spinner';
		tagline?: string;
		color?: 'yellow' | 'teal' | 'blue' | 'orange' | 'pink' | 'grey';
		targetDate?: Date;
	}

	let {
		banner = 'polygon',
		tagline = 'A SPACE TO CONNECT AND CREATE WITH DATA',
		color,
		targetDate
	}: Props = $props();

	// Curve + spinner share the curve layout; others use centered
	const usesCurveLayout = $derived(banner === 'curve' || banner === 'spinner');
	// Only centered banners get the bottom fade
	const addTransparencyLayer = $derived(!usesCurveLayout);

	function handleSpinnerInteract(e: TouchEvent | MouseEvent) {
		// Haptic feedback on mobile
		if ('vibrate' in navigator) navigator.vibrate(10);

		// Ripple
		const btn = e.currentTarget as HTMLElement;
		const ripple = document.createElement('span');
		const rect = btn.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height);
		const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
		const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
		ripple.style.cssText = `width:${size}px;height:${size}px;left:${clientX - rect.left - size / 2}px;top:${clientY - rect.top - size / 2}px`;
		ripple.className = 'spinner-ripple';
		btn.appendChild(ripple);
		ripple.addEventListener('animationend', () => ripple.remove());
	}
</script>

<FullBleed class="pb-24">
	<div class="relative h-[80svh] overflow-visible">
		<!-- Banner layer -->
		<div class="absolute inset-0 z-0">
			{#if banner === 'curve' || banner === 'spinner'}
				<BannerCurve interactive={true} direction="header" />
			{:else if banner === 'square'}
				<BannerSquare interactive={true} {color} />
			{:else if banner === 'blob'}
				<BannerBlob interactive={true} {color} />
			{:else}
				<BannerPolygon interactive={true} />
			{/if}
		</div>

		<!-- Transparency layer -->
		{#if addTransparencyLayer}
			<div
				class="to-viz-white pointer-events-none absolute inset-0 z-1 bg-linear-to-b from-transparent via-transparent via-90%"
			></div>
		{/if}

		<!-- Content layer -->
		{#if usesCurveLayout}
			<!-- Curve layout: bottom-left content + top-right tagline -->
			<div class="pointer-events-none absolute -bottom-20 left-0 z-2 md:-bottom-10 md:left-15">
				{#if banner === 'spinner'}
					<a
						href="https://tickets.vizchitra.com"
						target="_blank"
						rel="noopener"
						aria-label="Buy tickets for VizChitra 2026"
						class="spinner-btn pointer-events-auto block"
						ontouchstart={handleSpinnerInteract}
						onmousedown={handleSpinnerInteract}
					>
						<PatternArc {targetDate} width={240} height={300} />
					</a>
				{:else}
					<LogoTagline />
				{/if}
			</div>
			<div class="pointer-events-none absolute top-5 right-10 z-2 w-80 md:top-15 md:right-20">
				<h2 class="max-w-1xl text-right leading-tight font-normal">
					<Slanted color="grey" textContent={tagline} />
				</h2>
			</div>
		{:else}
			<!-- Centered layout: polygon/square/blob -->
			<div class="pointer-events-none absolute inset-0 z-2 flex items-center justify-center">
				<div class="bg-viz-white">
					<LogoTagline textContent={tagline} />
				</div>
			</div>
		{/if}
	</div>
</FullBleed>

<style>
	.spinner-btn {
		position: relative;
		overflow: hidden;
		cursor: pointer;
		animation: spinnerBreathe 4s ease-in-out infinite;
		transition: transform 0.25s ease;
	}

	/* Desktop hover: scale up + deepen shadow, pause breathing */
	@media (hover: hover) {
		.spinner-btn:hover {
			transform: scale(1.08);
			animation-play-state: paused;
			filter: drop-shadow(0 8px 28px oklch(0.2 0 0 / 0.35));
			cursor:
				url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='none' stroke='%23333' stroke-width='2'/%3E%3Cline x1='16' y1='4' x2='16' y2='28' stroke='%23333' stroke-width='2'/%3E%3Cline x1='4' y1='16' x2='28' y2='16' stroke='%23333' stroke-width='2'/%3E%3C/svg%3E")
					16 16,
				zoom-in;
		}
	}

	/* Mobile: subtle shadow breathing to signal interactivity */
	@keyframes spinnerBreathe {
		0%,
		100% {
			filter: drop-shadow(0 2px 8px oklch(0.2 0 0 / 0.15));
		}
		50% {
			filter: drop-shadow(0 6px 20px oklch(0.2 0 0 / 0.32));
		}
	}

	/* Tap / click ripple */
	:global(.spinner-ripple) {
		position: absolute;
		border-radius: 50%;
		background: oklch(1 0 0 / 0.3);
		transform: scale(0);
		animation: spinnerRipple 0.55s linear forwards;
		pointer-events: none;
	}

	@keyframes spinnerRipple {
		to {
			transform: scale(4);
			opacity: 0;
		}
	}
</style>
