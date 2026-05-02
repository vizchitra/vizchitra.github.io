<script lang="ts">
	type Tone = 'blue' | 'teal' | 'orange' | 'pink' | 'yellow';

	interface Props {
		tone?: Tone;
		variation?: number;
		width?: number;
		height?: number;
		class?: string;
		ariaLabel?: string;
		showHatch?: boolean;
	}

	let {
		tone = 'pink',
		variation = 0.5,
		width = 1080,
		height = 1350,
		class: className = '',
		ariaLabel,
		showHatch = true
	}: Props = $props();

	type Layer = {
		d: string;
		color: string;
		thickness: number;
		opacity?: number;
		hatched?: boolean;
	};

	type CircleData = { innerRadius: number; layers: Layer[] };

	const tonePalette: Record<Tone, { light: string; normal: string; dark: string }> = {
		blue: {
			light: 'var(--color-viz-blue-light)',
			normal: 'var(--color-viz-blue)',
			dark: 'var(--color-viz-blue-dark)'
		},
		teal: {
			light: 'var(--color-viz-teal-light)',
			normal: 'var(--color-viz-teal)',
			dark: 'var(--color-viz-teal-dark)'
		},
		orange: {
			light: 'var(--color-viz-orange-light)',
			normal: 'var(--color-viz-orange)',
			dark: 'var(--color-viz-orange-dark)'
		},
		pink: {
			light: 'var(--color-viz-pink-light)',
			normal: 'var(--color-viz-pink)',
			dark: 'var(--color-viz-pink-dark)'
		},
		yellow: {
			light: 'var(--color-viz-yellow-light)',
			normal: 'var(--color-viz-yellow)',
			dark: 'var(--color-viz-yellow-dark)'
		}
	};

	let palette = $derived(tonePalette[tone]);

	const HATCH_SPACING = 30;
	const HATCH_STROKE = 1;
	const CENTER_OFFSET_Y = -0.15; // -1 = top, 0 = center, +1 = bottom
	let viewBox = $derived(`0 0 ${width} ${height}`);
	let ariaHidden = $derived(!ariaLabel);

	function createPrng(initial: number) {
		let state = Math.max(1, Math.floor(initial * 1000) % 2147483647);
		return () => {
			state = (state * 48271) % 2147483647;
			return state / 2147483647;
		};
	}

	function sample(count: number, initialSeed: number) {
		const rand = createPrng(initialSeed);
		return Array.from({ length: count }, () => rand());
	}

	function hashStringToUnit(s: string) {
		let h = 0;
		for (let i = 0; i < s.length; i++) {
			h = (h * 31 + s.charCodeAt(i)) % 1000000007;
		}
		return (h % 1000000) / 1000000;
	}

	function organicLoopPath(
		centerX: number,
		centerY: number,
		radius: number,
		wobble: number,
		phase: number
	): string {
		const points = 32;
		const ringPoints: { x: number; y: number }[] = [];

		for (let i = 0; i < points; i++) {
			const angle = (i / points) * Math.PI * 2;
			const wobbleAmt =
				Math.sin(angle * 3 + phase) * wobble * 0.15 +
				Math.cos(angle * 2 + phase * 0.7) * wobble * 0.1 +
				Math.sin(angle * 5 + phase * 1.3) * wobble * 0.05;
			const r = radius + wobbleAmt;
			ringPoints.push({
				x: centerX + Math.cos(angle) * r,
				y: centerY + Math.sin(angle) * r
			});
		}

		let d = `M ${ringPoints[0].x} ${ringPoints[0].y}`;
		for (let i = 1; i < points; i++) {
			const p0 = ringPoints[i - 1];
			const p1 = ringPoints[i];
			const xc = (p0.x + p1.x) / 2;
			const yc = (p0.y + p1.y) / 2;
			d += ` Q ${p0.x} ${p0.y} ${xc} ${yc}`;
		}
		const last = ringPoints[points - 1];
		const first = ringPoints[0];
		const second = ringPoints[1];
		const xcClose = (last.x + first.x) / 2;
		const ycClose = (last.y + first.y) / 2;
		d += ` Q ${last.x} ${last.y} ${xcClose} ${ycClose}`;
		const xcWrap = (first.x + second.x) / 2;
		const ycWrap = (first.y + second.y) / 2;
		d += ` Q ${first.x} ${first.y} ${xcWrap} ${ycWrap}`;
		d += ' Z';
		return d;
	}

	function createCircleLayers(): CircleData {
		const v = Math.max(0, Math.min(1, Number(variation)));
		const seed = hashStringToUnit(`circle-${variation}`);
		const [r1, r2, r3, r4] = sample(4, seed + 0.03);
		const minSide = Math.min(width, height);
		const centerX = width / 2;
		const centerY = height / 2 + (CENTER_OFFSET_Y * height) / 2;

		// Bigger circles with more whitespace in center
		const outerRadius = minSide * (0.42 + v * 0.06);
		const baseThickness = minSide * 0.045;
		const wobbleAmount = minSide * (0.03 + v * 0.02);
		// Calculate inner circle radius for mask
		const innerCircleRadius = outerRadius - baseThickness * 1.8 - baseThickness * 0.6;

		return {
			innerRadius: innerCircleRadius,
			layers: [
				// Light outer ring (largest) - thickest
				{
					d: organicLoopPath(
						centerX,
						centerY,
						outerRadius - baseThickness * 0.8,
						wobbleAmount * 0.85,
						r1 * Math.PI * 2
					),
					color: palette.light,
					thickness: baseThickness * 1.6,
					hatched: false,
					opacity: 1
				},
				// Normal middle ring - medium thickness
				{
					d: organicLoopPath(
						centerX,
						centerY,
						outerRadius - baseThickness * 1.55,
						wobbleAmount * 0.9,
						r3 * Math.PI * 2
					),
					color: palette.normal,
					thickness: baseThickness * 1.1,
					opacity: 1
				},
				// Dark inner ring (smallest) - thinnest
				{
					d: organicLoopPath(
						centerX,
						centerY,
						outerRadius - baseThickness * 2.1,
						wobbleAmount,
						r4 * Math.PI * 2
					),
					color: palette.dark,
					thickness: baseThickness * 0.6,
					opacity: 1
				}
			]
		};
	}

	const circleData = $derived(createCircleLayers());
	const layers = $derived(circleData.layers);
	const maskRadius = $derived(circleData.innerRadius);
	const hatchId = 'pattern-hatch-circle';
	const maskId = 'mask-outside-circle';
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

		<mask id={maskId} maskUnits="userSpaceOnUse">
			<rect x="0" y="0" {width} {height} fill="white" />
			<circle
				cx={width / 2}
				cy={height / 2 + (CENTER_OFFSET_Y * height) / 2}
				r={maskRadius}
				fill="black"
			/>
		</mask>
	</defs>

	<!-- Background with hatched pattern -->
	<rect {width} {height} fill="var(--color-viz-white)" />
	{#if showHatch}
		<rect {width} {height} fill={`url(#${hatchId})`} mask={`url(#${maskId})`} opacity="0.85" />
	{/if}

	{#each layers as layer, index}
		<path
			class="circle-path"
			style:--stroke-base="{layer.thickness}px"
			style:--stroke-hover="{layer.thickness * (1 + (layers.length - index - 1) * 0.4)}px"
			style:--hover-scale={1 + (layers.length - index - 1) * 0.05}
			style:transition-duration={`${300 + (layers.length - index - 1) * 200}ms`}
			d={layer.d}
			fill="none"
			stroke={layer.color}
			stroke-opacity={layer.opacity ?? 1}
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		/>
		{#if layer.hatched}
			<path
				class="circle-path"
				style:--stroke-base="{layer.thickness}px"
				style:--stroke-hover="{layer.thickness * (1 + (layers.length - index - 1) * 0.4)}px"
				style:--hover-scale={1 + (layers.length - index - 1) * 0.1}
				style:transition-duration={`${300 + (layers.length - index - 1) * 200}ms`}
				d={layer.d}
				fill="none"
				stroke={`url(#${hatchId})`}
				stroke-linecap="round"
				stroke-linejoin="round"
				opacity="0.95"
				aria-hidden="true"
			/>
		{/if}
	{/each}
</svg>

<style>
	.circle-path {
		stroke-width: var(--stroke-base);
		transform-box: fill-box;
		transform-origin: center;
		transition-property: stroke-width, transform;
		transition-timing-function: ease-out;
	}

	:global(.group:hover) .circle-path {
		stroke-width: var(--stroke-hover);
		transform: scale(var(--hover-scale, 1));
	}
</style>
