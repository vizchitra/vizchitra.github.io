<script lang="ts">
	type Color = 'blue' | 'teal' | 'orange' | 'pink' | 'yellow';

	interface Props {
		color?: Color;
		variation?: number;
		width?: number;
		height?: number;
		class?: string;
		ariaLabel?: string;
	}

	let {
		color = 'teal',
		variation = 0.5,
		width = 1080,
		height = 1350,
		class: className = '',
		ariaLabel
	}: Props = $props();

	type Layer = { d: string; fill: string; opacity?: number; hatched?: boolean };

	import { colorMap } from '$lib/utils/color.js';

	let palette = $derived(colorMap[color]);

	const HATCH_SPACING = 30;
	const HATCH_STROKE = 1;
	let viewBox = $derived(`0 0 ${width} ${height}`);
	let ariaHidden = $derived(!ariaLabel);

	function createPrng(initial: number) {
		let state = Math.max(1, Math.floor(initial * 1000) % 2147483647);
		return () => {
			state = (state * 48271) % 2147483647;
			return state / 2147483647;
		};
	}

	// function sample(count: number, initialSeed: number) {
	// 	const rand = createPrng(initialSeed);
	// 	return Array.from({ length: count }, () => rand());
	// }

	function hashStringToUnit(s: string) {
		let h = 0;
		for (let i = 0; i < s.length; i++) {
			h = (h * 31 + s.charCodeAt(i)) % 1000000007;
		}
		return (h % 1000000) / 1000000;
	}

	function catmullRomSpline(points: { x: number; y: number }[], tension = 0.5): string {
		if (points.length < 2) return '';
		if (points.length === 2) return `L ${points[1].x} ${points[1].y}`;

		let path = '';
		const t = tension;

		for (let i = 0; i < points.length - 1; i++) {
			const p0 = points[Math.max(0, i - 1)];
			const p1 = points[i];
			const p2 = points[i + 1];
			const p3 = points[Math.min(points.length - 1, i + 2)];

			const cp1x = p1.x + ((p2.x - p0.x) / 6) * t;
			const cp1y = p1.y + ((p2.y - p0.y) / 6) * t;
			const cp2x = p2.x - ((p3.x - p1.x) / 6) * t;
			const cp2y = p2.y - ((p3.y - p1.y) / 6) * t;

			path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
		}

		return path;
	}

	// EXPERIMENTATION PARAMETERS - adjust these to modify the shape
	const SHAPE_CONFIG = {
		// Position
		axisX: 0.8, // Horizontal position (0-1, where 1 is right edge)
		pinchY: 0.33, // Vertical position of pinch (0-1, where 0 is top)

		// Canvas extension (beyond visible area)
		extendTop: 0.3, // Extension above canvas (0-1 of height)
		extendBottom: 0.15, // Extension below canvas (0-1 of height)

		// Upper teardrop
		upperPeakY: 0.05, // Peak position (0-1)
		upperMaxWidth: 0.3, // Maximum width multiplier

		// Lower teardrop
		lowerPeakY: 0.8, // Peak position (0-1)
		lowerMaxWidth: 0.4, // Maximum width multiplier

		// Pinch
		pinchWidth: 0.002, // Width at pinch point

		// Taper sharpness (higher = sharper)
		taperToPinch: 1.5, // Sharpness approaching pinch
		taperFromPinch: 2.0, // Gentleness leaving pinch

		// Layer distribution (for 3 layers: innermost, middle, outermost)
		layer0Start: 0.0, // Innermost layer start (0-1)
		layer0End: 0.3, // Innermost layer end (0-1)
		layer1Start: 0.25, // Middle layer start (0-1)
		layer1End: 0.75, // Middle layer end (0-1)
		layer2Start: 0.7, // Outermost layer start (0-1)
		layer2End: 1.0, // Outermost layer end (0-1)

		// Other
		segments: 100,
		wiggleAmplitude: 0.01,
		layerOverlap: 0.12
	};

	function calculateTaperFactor(yNorm: number, config: typeof SHAPE_CONFIG): number {
		const {
			upperPeakY,
			pinchY,
			lowerPeakY,
			upperMaxWidth,
			lowerMaxWidth,
			pinchWidth,
			taperToPinch,
			taperFromPinch,
			extendTop,
			extendBottom
		} = config;

		const normalizedStart = -extendTop;
		const normalizedEnd = 1 + extendBottom;

		if (yNorm < upperPeakY) {
			// Before top peak - gentle entry from extended top
			const t = Math.max(0, (yNorm - normalizedStart) / (upperPeakY - normalizedStart));
			// At t=1 (peak), this equals upperMaxWidth
			return upperMaxWidth * Math.pow(Math.sin(t * Math.PI * 0.5), taperFromPinch);
		} else if (yNorm < pinchY) {
			// From peak1 to pinch - sharp taper
			const t = (yNorm - upperPeakY) / (pinchY - upperPeakY);
			// At t=0 (peak), cos(0) = 1, so this equals upperMaxWidth + pinchWidth
			// We need it to equal upperMaxWidth, so subtract the excess
			return (
				(upperMaxWidth - pinchWidth) * Math.pow(Math.cos(t * Math.PI * 0.5), taperToPinch) +
				pinchWidth
			);
		} else if (yNorm < lowerPeakY) {
			// From pinch to peak2 - gentle expansion
			const t = (yNorm - pinchY) / (lowerPeakY - pinchY);
			// At t=1 (peak), sin(π/2) = 1, so this equals pinchWidth + lowerMaxWidth
			// We need it to equal lowerMaxWidth, so adjust
			return (
				pinchWidth +
				(lowerMaxWidth - pinchWidth) * Math.pow(Math.sin(t * Math.PI * 0.5), taperFromPinch)
			);
		} else {
			// After peak2 - sharp taper to extended bottom
			const t = Math.min(1, (yNorm - lowerPeakY) / (normalizedEnd - lowerPeakY));
			// At t=0 (peak), cos(0) = 1, so this equals lowerMaxWidth
			return lowerMaxWidth * Math.pow(Math.cos(t * Math.PI * 0.5), taperToPinch);
		}
	}

	function stackedMirrorPath(
		layerIndex: number,
		totalLayers: number,
		scale: number,
		wiggle: number
	): string {
		const axisX = width * SHAPE_CONFIG.axisX;
		const segments = SHAPE_CONFIG.segments;
		// Canvas extension for natural edge clipping
		const yStart = -height * SHAPE_CONFIG.extendTop;
		const yEnd = height * (1 + SHAPE_CONFIG.extendBottom);
		const yRange = yEnd - yStart;
		const step = yRange / segments;
		const left: { x: number; y: number }[] = [];
		const right: { x: number; y: number }[] = [];
		const innerLeft: { x: number; y: number }[] = [];
		const innerRight: { x: number; y: number }[] = [];

		// Calculate all points in one loop
		for (let i = 0; i <= segments; i++) {
			const y = yStart + i * step;
			const yNorm = y / height;

			const taperFactor = calculateTaperFactor(yNorm, SHAPE_CONFIG);

			const curveWiggle =
				Math.sin(yNorm * Math.PI * 2.5 + wiggle) * SHAPE_CONFIG.wiggleAmplitude +
				Math.cos(yNorm * Math.PI * 1.5 + wiggle * 0.7) * SHAPE_CONFIG.wiggleAmplitude * 0.625;

			const totalWidth = width * Math.max(0.001, (taperFactor + curveWiggle) * scale);

			// Calculate layer boundaries using config values
			let innerOffset: number;
			let outerOffset: number;

			if (layerIndex === 0) {
				// Innermost layer (light with hatch)
				innerOffset = SHAPE_CONFIG.layer0Start * totalWidth;
				outerOffset = (SHAPE_CONFIG.layer0End + SHAPE_CONFIG.layerOverlap) * totalWidth;
			} else if (layerIndex === 1) {
				// Middle layer (normal)
				innerOffset =
					Math.max(0, SHAPE_CONFIG.layer1Start - SHAPE_CONFIG.layerOverlap) * totalWidth;
				outerOffset = (SHAPE_CONFIG.layer1End + SHAPE_CONFIG.layerOverlap) * totalWidth;
			} else {
				// Outermost layer (dark)
				innerOffset =
					Math.max(0, SHAPE_CONFIG.layer2Start - SHAPE_CONFIG.layerOverlap) * totalWidth;
				outerOffset = (SHAPE_CONFIG.layer2End + SHAPE_CONFIG.layerOverlap) * totalWidth;
			}

			left.push({ x: axisX - outerOffset, y });
			right.push({ x: axisX + outerOffset, y });
			innerLeft.push({ x: axisX - innerOffset, y });
			innerRight.push({ x: axisX + innerOffset, y });
		}

		// Build path using Catmull-Rom splines for smooth curves
		let d = `M ${left[0].x} ${left[0].y}`;
		d += catmullRomSpline(left, 0.5);
		d += ` L ${right[right.length - 1].x} ${right[right.length - 1].y}`;
		const rightReversed = [...right].reverse();
		d += catmullRomSpline(rightReversed, 0.5);
		// Connect to inner right
		d += ` L ${innerRight[0].x} ${innerRight[0].y}`;
		d += catmullRomSpline(innerRight, 0.5);
		d += ` L ${innerLeft[innerLeft.length - 1].x} ${innerLeft[innerLeft.length - 1].y}`;
		const innerLeftReversed = [...innerLeft].reverse();
		d += catmullRomSpline(innerLeftReversed, 0.5);
		d += ` Z`;
		return d;
	}

	function createRiverLayers(): Layer[] {
		const v = Math.max(0, Math.min(1, Number(variation)));
		const seed = hashStringToUnit(`river-${variation}`);

		const baseScale = 0.9 + v * 0.2;
		const totalLayers = 3;

		return [
			// Layer 2: Outermost (furthest from axis) - Dark (render first, back layer)
			{
				d: stackedMirrorPath(2, totalLayers, baseScale, Math.PI * (seed + 0.6)),
				fill: palette.dark,
				opacity: 1
			},
			// Layer 1: Middle - Normal
			{
				d: stackedMirrorPath(1, totalLayers, baseScale, Math.PI * (seed + 0.3)),
				fill: palette.normal,
				opacity: 1
			},
			// Layer 0: Innermost (closest to axis) - Light with hatching (render last, front layer)
			{
				d: stackedMirrorPath(0, totalLayers, baseScale, Math.PI * seed),
				fill: palette.light,
				hatched: true,
				opacity: 1
			}
		];
	}

	const layers = $derived(createRiverLayers());
	const hatchId = 'pattern-hatch-river';
</script>

<svg
	class={className}
	{width}
	{height}
	{viewBox}
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	role="img"
	aria-label={ariaLabel}
	aria-hidden={ariaHidden}
>
	<defs>
		<pattern
			id={hatchId}
			patternUnits="userSpaceOnUse"
			width={HATCH_SPACING}
			height={HATCH_SPACING}
		>
			<path
				d={`M 0 0 L 0 ${HATCH_SPACING}`}
				stroke="rgba(0,0,0,0.5)"
				stroke-width={HATCH_STROKE}
				stroke-linecap="square"
			/>
			<path
				d={`M 0 0 L ${HATCH_SPACING} 0`}
				stroke="rgba(0,0,0,0.5)"
				stroke-width={HATCH_STROKE}
				stroke-linecap="square"
			/>
		</pattern>
	</defs>

	{#each layers as layer}
		<path d={layer.d} fill={layer.fill} fill-opacity={layer.opacity ?? 1} aria-hidden="true" />
		{#if layer.hatched}
			<path d={layer.d} fill={`url(#${hatchId})`} opacity="0.95" aria-hidden="true" />
		{/if}
	{/each}
</svg>
