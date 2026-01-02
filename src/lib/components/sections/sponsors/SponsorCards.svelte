<!-- SponsorCard.svelte -->
<script lang="ts">
	interface Props {
		heading?: string;
		logo?: string; // Can be text, image URL, or HTML
		logoType?: 'text' | 'image' | 'html';
		variant?: 'pink' | 'white' | 'yellow' | 'orange' | 'blue' | 'black' | 'green';
		size?: 'small' | 'medium' | 'large';
		seed?: number; // Seed for shape variations
	}

	let {
		heading = 'Platinum Sponsor',
		logo = '',
		logoType = 'text',
		variant = 'pink',
		size = 'medium',
		seed = 12345
	}: Props = $props();

	// Color variants with proper typing
	const variants = {
		pink: {
			light: '#f8d7da',
			dark: '#e91e63'
		},
		yellow: {
			light: '#fff8dc',
			dark: '#ffa500'
		},
		orange: {
			light: '#F89F72',
			dark: '#661e00'
		},
		blue: {
			light: '#e3f2fd',
			dark: '#2196f3'
		},
		green: {
			light: '#e8f5e8',
			dark: '#4caf50'
		},
		white: {
			light: '#F6F6F6',
			dark: '#4C4C4C'
		},
		black: {
			light: '#4C4C4C',
			dark: '#3B3B3B'
		}
	} as const;

	// Size variants with proper typing
	const sizes = {
		small: {
			width: '250px',
			height: '180px',
			fontSize: '14px',
			logoSize: '18px'
		},
		medium: {
			width: '350px',
			height: '250px',
			fontSize: '16px',
			logoSize: '24px'
		},
		large: {
			width: '450px',
			height: '320px',
			fontSize: '20px',
			logoSize: '32px'
		}
	} as const;

	// Simple pseudo-random number generator based on seed
	function seededRandom(seed: number): number {
		let x = Math.sin(seed) * 10000;
		return x - Math.floor(x);
	}

	// Generate variations based on seed
	function getShapeVariations(seed: number) {
		const baseRotationX = 15;
		const baseRotationY = -30;
		const baseRotationZ = 5;

		const hoverRotationX = 20;
		const hoverRotationY = -5;
		const hoverRotationZ = 8;

		// Generate pseudo-random variations
		const rand1 = seededRandom(seed);
		const rand2 = seededRandom(seed * 2);
		const rand3 = seededRandom(seed * 3);
		const rand4 = seededRandom(seed * 4);
		const rand5 = seededRandom(seed * 5);
		const rand6 = seededRandom(seed * 6);
		const rand7 = seededRandom(seed * 7);
		const rand8 = seededRandom(seed * 8);

		// Apply variations within reasonable bounds
		const variationRange = 8; // degrees
		const shadowVariationRange = 3; // pixels

		return {
			rotateX: baseRotationX + (rand1 - 0.5) * variationRange,
			rotateY: baseRotationY + (rand2 - 0.5) * variationRange,
			rotateZ: baseRotationZ + (rand3 - 0.5) * variationRange,
			hoverRotateX: hoverRotationX + (rand4 - 0.5) * variationRange,
			hoverRotateY: hoverRotationY + (rand5 - 0.5) * variationRange,
			hoverRotateZ: hoverRotationZ + (rand6 - 0.5) * variationRange,
			shadowX: 4 + (rand7 - 0.5) * shadowVariationRange,
			shadowY: 4 + (rand8 - 0.5) * shadowVariationRange
		};
	}

	let currentVariant = $derived(variants[variant]);
	let currentSize = $derived(sizes[size]);
	let shapeVariations = $derived(getShapeVariations(seed));
</script>

<div
	class="sponsor-card"
	style="
      --light-color: {currentVariant.light};
      --dark-color: {currentVariant.dark};
      --card-width: {currentSize.width};
      --card-height: {currentSize.height};
      --font-size: {currentSize.fontSize};
      --logo-size: {currentSize.logoSize};
      --rotate-x: {shapeVariations.rotateX}deg;
      --rotate-y: {shapeVariations.rotateY}deg;
      --rotate-z: {shapeVariations.rotateZ}deg;
      --hover-rotate-x: {shapeVariations.hoverRotateX}deg;
      --hover-rotate-y: {shapeVariations.hoverRotateY}deg;
      --hover-rotate-z: {shapeVariations.hoverRotateZ}deg;
      --shadow-x: {shapeVariations.shadowX}px;
      --shadow-y: {shapeVariations.shadowY}px;
    "
>
	<div class="pentagon-3d">
		<div class="pentagon-background"></div>
		<div class="pentagon-shadow"></div>
	</div>
	<div class="content-flat">
		<div class="heading">{heading}</div>
		<hr class="my-4" />
		<div class="logo-container">
			{#if logoType === 'image'}
				<img src={logo} alt="Logo" class="logo-image" />
			{:else if logoType === 'html'}
				{@html logo}
			{:else}
				<div class="logo-text">{logo}</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.sponsor-card {
		perspective: 1000px;
		display: inline-block;
		margin: 10px 0;
		position: relative;
		width: var(--card-width);
		height: var(--card-height);
		transition: transform 0.3s ease;
	}

	.sponsor-card:hover {
		transform: scale(1.02);
	}

	hr {
		width: 2ch;
		border: 1px solid #000;
	}

	.pentagon-3d {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transform-style: preserve-3d;
		transform: rotateX(var(--rotate-x)) rotateY(var(--rotate-y)) rotateZ(var(--rotate-z));
		transition: transform 0.3s ease;
	}

	.pentagon-background {
		width: 100%;
		height: 100%;
		background: var(--light-color);
		position: absolute;
		clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
	}

	.pentagon-shadow {
		width: 100%;
		height: 100%;
		background: var(--dark-color);
		position: absolute;
		clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
		transform: translateZ(-10px) translateX(var(--shadow-x)) translateY(var(--shadow-y));
		opacity: 0.6;
	}

	.content-flat {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 50px 40px;
		box-sizing: border-box;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		z-index: 10;
		pointer-events: none;
		/* Pentagon mask to keep content within pentagon bounds */
		-webkit-mask: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
		mask: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
	}

	.heading {
		font-size: 0.8rem;
		font-weight: 600;
		color: #444;
		text-align: center;
		letter-spacing: 0.5px;
		pointer-events: auto;
		margin-top: 20px;
		text-transform: uppercase;
	}

	.logo-container {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		pointer-events: auto;
	}

	.logo-text {
		font-size: 1rem;
		font-weight: 800;
		color: #333;
		text-align: center;
		letter-spacing: 1px;
		text-transform: uppercase;
	}

	.logo-image {
		max-width: 160px;
		max-height: 100px;
		object-fit: contain;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.sponsor-card {
			margin: 8px auto;
			width: min(46vw, 200px);
			height: auto;
			aspect-ratio: 1.4;
			--rotate-x: calc(var(--rotate-x) * 0.7);
			--rotate-y: calc(var(--rotate-y) * 0.5);
			--rotate-z: calc(var(--rotate-z) * 0.6);
		}

		.content-flat {
			padding: 25px 20px;
		}

		.heading {
			font-size: 0.7rem;
			margin-top: 15px;
		}

		.logo-image {
			max-width: 100px;
			max-height: 65px;
		}
	}

	@media (max-width: 480px) {
		.sponsor-card {
			width: min(44vw, 180px);
			margin: 6px auto;
		}

		.content-flat {
			padding: 22px 18px;
		}

		.heading {
			font-size: 0.65rem;
		}

		.logo-text {
			font-size: 0.85rem;
		}

		.logo-image {
			max-width: 85px;
			max-height: 55px;
		}
	}
</style>
