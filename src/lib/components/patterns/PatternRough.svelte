<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import rough from 'roughjs';

	interface Props {
		color: string;
		fillStyle?: 'hachure' | 'cross-hatch' | 'dots' | 'dashed' | 'zigzag' | 'zigzag-line';
		roughness?: number;
		hachureAngle?: number;
		hachureGap?: number;
		fillWeight?: number;
		opacity?: number;
	}

	let {
		color,
		fillStyle = 'hachure',
		roughness = 1.5,
		hachureAngle = 60,
		hachureGap = 4,
		fillWeight = 2,
		opacity = 1
	}: Props = $props();

	let canvas: HTMLCanvasElement;

	function getResolvedColor(): string {
		if (!browser) return '#000000';

		// If color is a CSS variable, resolve it
		if (color.startsWith('var(')) {
			const tempDiv = document.createElement('div');
			tempDiv.style.color = color;
			document.body.appendChild(tempDiv);
			const computed = getComputedStyle(tempDiv).color;
			document.body.removeChild(tempDiv);
			return computed;
		}

		return color;
	}

	function drawPattern() {
		if (!canvas || !browser) return;

		const rc = rough.canvas(canvas);
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const rect = canvas.getBoundingClientRect();
		canvas.width = rect.width;
		canvas.height = rect.height;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const resolvedColor = getResolvedColor();

		// Set opacity
		ctx.globalAlpha = opacity;

		// Draw a filled rectangle with rough.js
		rc.rectangle(0, 0, canvas.width, canvas.height, {
			fill: resolvedColor,
			fillStyle,
			fillWeight,
			roughness,
			hachureAngle,
			hachureGap,
			stroke: 'none'
		});

		// Reset opacity
		ctx.globalAlpha = 1;
	}

	onMount(() => {
		if (!browser) return;

		// Initial draw
		drawPattern();

		// Redraw on resize
		const handleResize = () => {
			drawPattern();
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

<canvas bind:this={canvas} class="pattern-rough" aria-hidden="true"></canvas>

<style>
	.pattern-rough {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
