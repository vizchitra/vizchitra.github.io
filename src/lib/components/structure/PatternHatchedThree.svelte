<script lang="ts">
	type Variant = 'waves' | 'river' | 'circle' | 'stream';
	type Tone = 'blue' | 'teal' | 'orange' | 'pink' | 'yellow';
	// align props removed — component uses centered rendering by default
	/* AlignX/Y removed */

	interface Props {
		variant?: Variant;
		tone?: Tone;
		amp?: number;
		freq?: number;
		phase?: number;
		width?: number;
		height?: number;
		class?: string;
		ariaLabel?: string;
	}

	let {
		variant = 'waves',
		tone,
		amp,
		freq,
		phase,
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

	const defaultTone: Record<Variant, Tone> = {
		waves: 'blue',
		river: 'teal',
		circle: 'pink',
		stream: 'orange'
	};

	let activeTone = $derived(tone ?? defaultTone[variant]);
	let palette = $derived(tonePalette[activeTone]);
	// Fixed hatch constants
	const HATCH_SPACING = 30;
	const HATCH_STROKE = 1;
	// hatchId is inlined in the markup to avoid capturing props at module scope
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

	function wavePath(
		baseY: number,
		amplitude: number,
		freq: number,
		phase: number,
		minYClamp = 0
	): string {
		const segments = 32;
		const step = width / segments;
		// Left edge constrained to start at 25% from top to keep left area clear
		const leftStartY = Math.max(height * 0.25, baseY);
		let d = `M 0 ${height} L 0 ${leftStartY}`;

		for (let i = 0; i <= segments; i++) {
			const x = i * step;
			const progress = i / segments;
			// Smoothly interpolate from leftStartY to actual baseY across the width
			const effectiveBaseY = leftStartY + (baseY - leftStartY) * progress;
			// Valley at center: negate so positive sin goes UP visually
			// Boost amplitude toward the center to create a more prominent valley
			const centerFactor = 1 + (1 - Math.abs(progress - 0.5) * 4) * 0.3; // stronger center emphasis
			const yOffset = -Math.sin(progress * Math.PI * 2 * freq + phase) * amplitude * centerFactor;
			let y = effectiveBaseY + yOffset;
			if (minYClamp) y = Math.max(y, minYClamp);
			d += ` L ${x} ${y}`;
		}

		d += ` L ${width} ${height} Z`;
		return d;
	}

	function riverPath(scale: number, taper: number, wiggle: number): string {
		const midX = width / 2;
		const segments = 24;
		const step = height / segments;
		const left: { x: number; y: number }[] = [];
		const right: { x: number; y: number }[] = [];

		for (let i = 0; i <= segments; i++) {
			const y = i * step;
			const yNorm = y / height;
			// Taper: narrow at top (yNorm=0), wide at bottom (yNorm=1)
			const taperFactor = 0.15 + yNorm * 0.45; // 0.15 at top, 0.6 at bottom
			const curveWiggle =
				Math.sin(yNorm * Math.PI * 2.5 + wiggle) * 0.08 +
				Math.cos(yNorm * Math.PI * 1.5 + wiggle * 0.7) * 0.04;
			const halfWidth = width * Math.max(0.08, (taperFactor + curveWiggle) * scale) * taper;
			left.push({ x: midX - halfWidth, y });
			right.push({ x: midX + halfWidth, y });
		}

		// Use smooth curves instead of straight lines
		let d = `M ${left[0].x} ${left[0].y}`;
		for (let i = 1; i < left.length; i++) {
			const xc = (left[i - 1].x + left[i].x) / 2;
			const yc = (left[i - 1].y + left[i].y) / 2;
			d += ` Q ${left[i - 1].x} ${left[i - 1].y} ${xc} ${yc}`;
		}
		d += ` L ${left[left.length - 1].x} ${left[left.length - 1].y}`;
		for (let i = right.length - 1; i > 0; i--) {
			const xc = (right[i].x + right[i - 1].x) / 2;
			const yc = (right[i].y + right[i - 1].y) / 2;
			d += ` Q ${right[i].x} ${right[i].y} ${xc} ${yc}`;
		}
		d += ` L ${right[0].x} ${right[0].y} Z`;
		return d;
	}

	function ribbonPath(
		midY: number,
		thickness: number,
		amplitude: number,
		freq: number,
		phase: number
	): string {
		const segments = 18;
		const step = width / segments;
		const top: { x: number; y: number }[] = [];
		const bottom: { x: number; y: number }[] = [];

		for (let i = 0; i <= segments; i++) {
			const x = i * step;
			const progress = i / segments;
			const offset =
				Math.sin(progress * Math.PI * freq + phase) * amplitude +
				Math.cos(progress * Math.PI * (freq * 0.5) + phase * 0.6) * amplitude * 0.35;
			const centerY = midY + offset;
			top.push({ x, y: centerY - thickness / 2 });
			bottom.push({ x, y: centerY + thickness / 2 });
		}

		let d = `M ${top[0].x} ${top[0].y}`;
		for (let i = 1; i < top.length; i++) d += ` L ${top[i].x} ${top[i].y}`;
		for (let i = bottom.length - 1; i >= 0; i--) d += ` L ${bottom[i].x} ${bottom[i].y}`;
		d += ' Z';
		return d;
	}

	function createWaveLayers(): Layer[] {
		// Normalize incoming props to [0,1]
		const ampN = Math.max(0, Math.min(1, Number(amp ?? 0.5)));
		const freqN = Math.max(0, Math.min(1, Number(freq ?? 0.5)));
		const phaseN = Math.max(0, Math.min(1, Number(phase ?? 0)));

		// Map normalized values to internal ranges
		// amp: map [0,1] -> [0.5, 2.2] multiplier
		const ampScale = 0.5 + ampN * 1.7;
		const baseAmp = height * 0.08 * ampScale; // base amplitude in px
		// freq: map [0,1] -> [0.8, 3.2]
		const baseFreq = 0.8 + freqN * 2.4;
		// phase: map [0,1] -> [0, 2PI]
		const basePhase = (phaseN % 1) * Math.PI * 2;

		// Deterministic modifiers derived from props so output is stable
		const v1 = hashStringToUnit(`${variant}-waves-1-${amp ?? ''}-${freq ?? ''}-${phase ?? ''}`);
		const v2 = hashStringToUnit(`${variant}-waves-2-${amp ?? ''}-${freq ?? ''}-${phase ?? ''}`);
		const v3 = hashStringToUnit(`${variant}-waves-3-${amp ?? ''}-${freq ?? ''}-${phase ?? ''}`);

		// Amplitude, frequency and phase per wave (back, middle, front)
		const a1 = baseAmp * (0.6 + v1 * 0.6); // subtler back wave
		const a2 = baseAmp * (1.2 + v2 * 1.0); // mid wave
		const a3 = baseAmp * (1.8 + v3 * 1.2); // front stronger wave

		const f1 = baseFreq * (0.8 + v1 * 0.6);
		const f2 = baseFreq * (1.0 + v2 * 0.8);
		const f3 = baseFreq * (1.5 + v3 * 1.6);

		const p1 = basePhase + v1 * Math.PI * 0.8;
		const p2 = basePhase + v2 * Math.PI * 0.6;
		const p3 = basePhase + v3 * Math.PI * 0.5;

		// Vertical placement (visible area) — back higher, front lower
		const y1 = Math.max(0, height * 0.08 + v1 * height * 0.02);
		const y2 = height * (0.34 + v2 * 0.03);
		const y3 = height * (0.56 + v3 * 0.04);

		const layers: Layer[] = [
			{
				d: wavePath(y1, a1, f1, p1),
				fill: palette.light,
				hatched: true,
				opacity: 1
			},
			{
				d: wavePath(y2, a2, f2, p2),
				fill: palette.normal,
				opacity: 1
			},
			{
				d: wavePath(y3, a3, f3, p3, height * 0.12),
				fill: palette.dark,
				opacity: 1
			}
		];

		return layers;
	}

	function createRiverLayers(): Layer[] {
		const seedHash = hashStringToUnit(`${variant}-river`);
		const [r1, r2, r3] = sample(3, seedHash + 0.01);
		return [
			{ d: riverPath(1.0, 1, Math.PI * r1), fill: palette.dark, opacity: 1 },
			{ d: riverPath(0.78, 0.92, Math.PI * r2), fill: palette.normal, opacity: 1 },
			{ d: riverPath(0.56, 0.85, Math.PI * r3), fill: palette.light, hatched: true, opacity: 1 }
		];
	}

	function createStreamLayers(): Layer[] {
		const seedHash = hashStringToUnit(`${variant}-stream`);
		const r = sample(6, seedHash + 0.02);
		const thickness = height * 0.16;
		const amp = height * 0.1;
		// Position streams to overlap nicely
		return [
			{
				d: ribbonPath(
					height * (0.38 + r[0] * 0.02),
					thickness * 1.05,
					amp * 0.9,
					1.3 + r[1] * 0.4,
					Math.PI * 2 * r[2]
				),
				fill: palette.dark,
				opacity: 1
			},
			{
				d: ribbonPath(
					height * (0.5 + r[3] * 0.02),
					thickness * 1.1,
					amp * 1.0,
					1.6 + r[4] * 0.5,
					Math.PI * 2 * r[5]
				),
				fill: palette.normal,
				opacity: 1
			},
			{
				d: ribbonPath(
					height * (0.62 + r[0] * 0.02),
					thickness * 1.0,
					amp * 1.1,
					1.9 + r[2] * 0.4,
					Math.PI * 2 * r[1]
				),
				fill: palette.light,
				hatched: true,
				opacity: 1
			}
		];
	}

	// Create organic loop path (not a perfect circle)
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
			// Add wobble to create organic shape
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

		// Build smooth path using bezier curves
		let d = `M ${outerPoints[0].x} ${outerPoints[0].y}`;
		for (let i = 1; i <= points; i++) {
			const p0 = outerPoints[(i - 1) % points];
			const p1 = outerPoints[i % points];
			const xc = (p0.x + p1.x) / 2;
			const yc = (p0.y + p1.y) / 2;
			d += ` Q ${p0.x} ${p0.y} ${xc} ${yc}`;
		}
		// Move to inner loop
		d += ` L ${innerPoints[0].x} ${innerPoints[0].y}`;
		for (let i = points - 1; i >= 0; i--) {
			const p0 = innerPoints[(i + 1) % points];
			const p1 = innerPoints[i];
			const xc = (p0.x + p1.x) / 2;
			const yc = (p0.y + p1.y) / 2;
			d += ` Q ${p0.x} ${p0.y} ${xc} ${yc}`;
		}
		d += ' Z';
		return d;
	}

	function createCircleLayers(): Layer[] {
		const seedHash = hashStringToUnit(`${variant}-circle`);
		const [r1, r2, r3, r4] = sample(4, seedHash + 0.03);
		const minSide = Math.min(width, height);
		const centerX = width / 2;
		const centerY = height / 2;

		// Three concentric organic loops - larger and more visible
		const outerRadius = minSide * 0.38;
		const thickness = minSide * 0.065;
		const wobbleAmount = minSide * 0.04; // Subtle wobble

		return [
			{
				// Outer ring (dark)
				d: organicLoopPath(
					centerX,
					centerY,
					outerRadius,
					thickness * 1.1,
					wobbleAmount,
					r1 * Math.PI * 2
				),
				fill: palette.dark,
				opacity: 1
			},
			{
				// Middle ring (normal)
				d: organicLoopPath(
					centerX,
					centerY,
					outerRadius - thickness * 1.3,
					thickness * 1.05,
					wobbleAmount * 0.9,
					r3 * Math.PI * 2
				),
				fill: palette.normal,
				opacity: 1
			},
			{
				// Inner ring (light, hatched)
				d: organicLoopPath(
					centerX,
					centerY,
					outerRadius - thickness * 2.5,
					thickness,
					wobbleAmount * 0.85,
					r4 * Math.PI * 2
				),
				fill: palette.light,
				hatched: false,
				opacity: 1
			}
		];
	}

	function createLayers(): Layer[] {
		switch (variant) {
			case 'river':
				return createRiverLayers();
			case 'circle':
				return createCircleLayers();
			case 'stream':
				return createStreamLayers();
			case 'waves':
			default:
				return createWaveLayers();
		}
	}

	const layers = $derived(createLayers());
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
			id={`pattern-hatch-${variant ?? 'waves'}-${Math.round(
				hashStringToUnit(`${variant}-${amp ?? ''}-${freq ?? ''}-${phase ?? ''}`) * 1000
			)}`}
			patternUnits="userSpaceOnUse"
			width={HATCH_SPACING}
			height={HATCH_SPACING}
		>
			<!-- Primary grid lines only (50% gray) -->
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

		<!-- Mask used to hide the hatch inside the outer circle ring for circle variant -->
		<mask
			id={`mask-outside-${variant ?? 'waves'}-${Math.round(
				hashStringToUnit(`${variant}-${amp ?? ''}-${freq ?? ''}-${phase ?? ''}`) * 1000
			)}`}
			maskUnits="userSpaceOnUse"
		>
			<!-- White = show, black = hide -->
			<rect x="0" y="0" {width} {height} fill="white" />
			{#if variant === 'circle'}
				<circle cx={width / 2} cy={height / 2} r={Math.min(width, height) * 0.38} fill="black" />
			{/if}
		</mask>
	</defs>

	{#if variant === 'circle'}
		<!-- Background with hatched pattern for circle variant -->
		<rect {width} {height} fill="var(--color-viz-white)" />
		<rect
			{width}
			{height}
			fill={`url(#pattern-hatch-${variant ?? 'waves'}-${Math.round(
				hashStringToUnit(`${variant}-${amp ?? ''}-${freq ?? ''}-${phase ?? ''}`) * 1000
			)})`}
			mask={`url(#mask-outside-${variant ?? 'waves'}-${Math.round(
				hashStringToUnit(`${variant}-${amp ?? ''}-${freq ?? ''}-${phase ?? ''}`) * 1000
			)})`}
			opacity="0.85"
		/>
	{/if}

	{#each layers as layer}
		<path d={layer.d} fill={layer.fill} fill-opacity={layer.opacity ?? 1} aria-hidden="true" />
		{#if layer.hatched}
			<path
				d={layer.d}
				fill={`url(#pattern-hatch-${variant ?? 'waves'}-${Math.round(
					hashStringToUnit(`${variant}-${amp ?? ''}-${freq ?? ''}-${phase ?? ''}`) * 1000
				)})`}
				opacity="0.95"
				aria-hidden="true"
			/>
		{/if}
	{/each}
</svg>
