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
		color = 'orange',
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

	function ribbonPath(
		midY: number,
		baseThickness: number,
		amplitude: number,
		freq: number,
		phase: number,
		thicknessMod: number
	): string {
		const segments = 20;
		const step = width / segments;
		const top: { x: number; y: number }[] = [];
		const bottom: { x: number; y: number }[] = [];

		for (let i = 0; i <= segments; i++) {
			const x = i * step;
			const progress = i / segments;

			// Varying thickness across the width
			const thicknessVariation = Math.sin(progress * Math.PI * 2.5 + phase) * thicknessMod + 1;
			const currentThickness = baseThickness * thicknessVariation;

			// Flowing vertical wave motion
			const offset =
				Math.sin(progress * Math.PI * freq + phase) * amplitude +
				Math.cos(progress * Math.PI * (freq * 0.6) + phase * 0.7) * amplitude * 0.3;

			const centerY = midY + offset;
			top.push({ x, y: centerY - currentThickness / 2 });
			bottom.push({ x, y: centerY + currentThickness / 2 });
		}

		let d = `M ${top[0].x} ${top[0].y}`;
		for (let i = 1; i < top.length; i++) d += ` L ${top[i].x} ${top[i].y}`;
		for (let i = bottom.length - 1; i >= 0; i--) d += ` L ${bottom[i].x} ${bottom[i].y}`;
		d += ' Z';
		return d;
	}

	function createStreamLayers(): Layer[] {
		// Normalize variation to 0-1
		const v = Math.max(0, Math.min(1, Number(variation)));

		// Base dimensions scale with variation
		const baseThickness = height * (0.16 + v * 0.08);
		const baseAmp = height * (0.08 + v * 0.06);

		// Thickness modulation intensity controlled by variation
		const thicknessMod = 0.15 + v * 0.25; // 0.15 to 0.4 range

		// Phase shifts controlled by variation
		const basePhase = v * Math.PI * 2;

		const seed = hashStringToUnit(`stream-${variation}`);

		// Position at 40% from bottom (60% from top) - closer together for streamgraph effect
		const baseY = height * 0.5;

		return [
			{
				d: ribbonPath(
					baseY - baseThickness * 0.3,
					baseThickness * 1.05,
					baseAmp * 0.9,
					1.5,
					basePhase + Math.PI * 0.4,
					thicknessMod
				),
				fill: palette.dark,
				opacity: 1
			},
			{
				d: ribbonPath(
					baseY,
					baseThickness * 1.1,
					baseAmp * 1.0,
					2.4,
					basePhase + Math.PI * 0.6,
					thicknessMod * 0.9
				),
				fill: palette.normal,
				opacity: 1
			},
			{
				d: ribbonPath(
					baseY + baseThickness * 0.3,
					baseThickness * 1.0,
					baseAmp * 1.1,
					1.8,
					basePhase + Math.PI,
					thicknessMod * 0.8
				),
				fill: palette.light,
				hatched: true,
				opacity: 1
			}
		];
	}

	const layers = $derived(createStreamLayers());
	const hatchId = 'pattern-hatch-stream';
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
