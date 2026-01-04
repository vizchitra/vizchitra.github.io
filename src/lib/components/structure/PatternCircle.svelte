<script lang="ts">
	type Tone = 'blue' | 'teal' | 'orange' | 'pink' | 'yellow';

	interface Props {
		tone?: Tone;
		variation?: number;
		width?: number;
		height?: number;
		class?: string;
		ariaLabel?: string;
	}

	let {
		tone = 'pink',
		variation = 0.5,
		width = 1080,
		height = 1350,
		class: className = '',
		ariaLabel
	}: Props = $props();

	type Layer = { d: string; fill: string; opacity?: number; hatched?: boolean };

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
		thickness: number,
		wobble: number,
		phase: number
	): string {
		const points = 32;
		const outerPoints: { x: number; y: number }[] = [];
		const innerPoints: { x: number; y: number }[] = [];

		for (let i = 0; i < points; i++) {
			const angle = (i / points) * Math.PI * 2;
			const wobbleOuter =
				Math.sin(angle * 3 + phase) * wobble * 0.15 +
				Math.cos(angle * 2 + phase * 0.7) * wobble * 0.1 +
				Math.sin(angle * 5 + phase * 1.3) * wobble * 0.05;
			const wobbleInner =
				Math.sin(angle * 3 + phase + 0.5) * wobble * 0.12 +
				Math.cos(angle * 2 + phase * 0.8) * wobble * 0.08;

			const outerR = radius + wobbleOuter;
			const innerR = radius - thickness + wobbleInner;

			outerPoints.push({
				x: centerX + Math.cos(angle) * outerR,
				y: centerY + Math.sin(angle) * outerR
			});
			innerPoints.push({
				x: centerX + Math.cos(angle) * innerR,
				y: centerY + Math.sin(angle) * innerR
			});
		}

		let d = `M ${outerPoints[0].x} ${outerPoints[0].y}`;
		for (let i = 1; i < points; i++) {
			const p0 = outerPoints[i - 1];
			const p1 = outerPoints[i];
			const xc = (p0.x + p1.x) / 2;
			const yc = (p0.y + p1.y) / 2;
			d += ` Q ${p0.x} ${p0.y} ${xc} ${yc}`;
		}
		// Close the outer loop back to start with overlap to avoid gap
		const p0 = outerPoints[points - 1];
		const p1 = outerPoints[0];
		const p2 = outerPoints[1];
		const xc = (p0.x + p1.x) / 2;
		const yc = (p0.y + p1.y) / 2;
		d += ` Q ${p0.x} ${p0.y} ${xc} ${yc}`;
		// Overlap slightly past the start
		const xc2 = (p1.x + p2.x) / 2;
		const yc2 = (p1.y + p2.y) / 2;
		d += ` Q ${p1.x} ${p1.y} ${xc2} ${yc2}`;

		// Move to inner ring at overlap point and go backwards
		d += ` L ${innerPoints[1].x} ${innerPoints[1].y}`;
		for (let i = points - 1; i > 1; i--) {
			const p0i = innerPoints[i];
			const p1i = innerPoints[i - 1];
			const xci = (p0i.x + p1i.x) / 2;
			const yci = (p0i.y + p1i.y) / 2;
			d += ` Q ${p0i.x} ${p0i.y} ${xci} ${yci}`;
		}
		// Close back through overlap points to ensure no gap
		const p0i = innerPoints[1];
		const p1i = innerPoints[0];
		const xci = (p0i.x + p1i.x) / 2;
		const yci = (p0i.y + p1i.y) / 2;
		d += ` Q ${p0i.x} ${p0i.y} ${xci} ${yci}`;
		d += ' Z';
		return d;
	}

	function createCircleLayers(): Layer[] {
		const v = Math.max(0, Math.min(1, Number(variation)));
		const seed = hashStringToUnit(`circle-${variation}`);
		const [r1, r2, r3, r4] = sample(4, seed + 0.03);
		const minSide = Math.min(width, height);
		const centerX = width / 2;
		const centerY = height / 2;

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
						outerRadius,
						baseThickness * 1.6,
						wobbleAmount * 0.85,
						r1 * Math.PI * 2
					),
					fill: palette.light,
					hatched: false,
					opacity: 1
				},
				// Normal middle ring - medium thickness
				{
					d: organicLoopPath(
						centerX,
						centerY,
						outerRadius - baseThickness * 1.0,
						baseThickness * 1.1,
						wobbleAmount * 0.9,
						r3 * Math.PI * 2
					),
					fill: palette.normal,
					opacity: 1
				},
				// Dark inner ring (smallest) - thinnest
				{
					d: organicLoopPath(
						centerX,
						centerY,
						outerRadius - baseThickness * 1.8,
						baseThickness * 0.6,
						wobbleAmount,
						r4 * Math.PI * 2
					),
					fill: palette.dark,
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
			<circle cx={width / 2} cy={height / 2} r={maskRadius} fill="black" />
		</mask>
	</defs>

	<!-- Background with hatched pattern -->
	<rect {width} {height} fill="var(--color-viz-white)" />
	<rect {width} {height} fill={`url(#${hatchId})`} mask={`url(#${maskId})`} opacity="0.85" />

	{#each layers as layer}
		<path d={layer.d} fill={layer.fill} fill-opacity={layer.opacity ?? 1} aria-hidden="true" />
		{#if layer.hatched}
			<path d={layer.d} fill={`url(#${hatchId})`} opacity="0.95" aria-hidden="true" />
		{/if}
	{/each}
</svg>
