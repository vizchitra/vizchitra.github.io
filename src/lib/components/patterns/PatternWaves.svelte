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
		color = 'blue',
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

	function hashStringToUnit(s: string) {
		let h = 0;
		for (let i = 0; i < s.length; i++) {
			h = (h * 31 + s.charCodeAt(i)) % 1000000007;
		}
		return (h % 1000000) / 1000000;
	}

	function wavePath(baseY: number, amplitude: number, frequency: number, minYClamp = 0): string {
		const segments = 32;
		const step = width / segments;
		const leftStartY = Math.max(height * 0.25, baseY);
		let d = `M 0 ${height} L 0 ${leftStartY}`;

		for (let i = 0; i <= segments; i++) {
			const x = i * step;
			const progress = i / segments;
			const effectiveBaseY = leftStartY + (baseY - leftStartY) * progress;
			// Wave cycles: frequency controls number of cycles across width
			const yOffset = Math.sin(progress * Math.PI * frequency) * amplitude;
			let y = effectiveBaseY + yOffset;
			if (minYClamp) y = Math.max(y, minYClamp);
			d += ` L ${x} ${y}`;
		}

		d += ` L ${width} ${height} Z`;
		return d;
	}

	function createWaveLayers(): Layer[] {
		// Normalize variation to 0-1
		const v = Math.max(0, Math.min(1, Number(variation)));

		// Base amplitude scales with variation
		const baseAmp = height * (0.06 + v * 0.08);

		// Deterministic offsets for visual variety
		const seed = hashStringToUnit(`waves-${variation}`);

		// Three waves with increasing amplitude and slight vertical offsets
		const y1 = height * 0.1;
		const y2 = height * 0.45;
		const y3 = height * 0.65;

		const a1 = baseAmp * (1.5 + seed * 0.4);
		const a2 = baseAmp * (2.5 + seed * 0.3);
		const a3 = baseAmp * (1.2 + seed * 0.2);

		return [
			{ d: wavePath(y1, a1, 1.8), fill: palette.light, hatched: true, opacity: 1 },
			{ d: wavePath(y2, a2, 1.6), fill: palette.normal, opacity: 1 },
			{ d: wavePath(y3, a3, 1.5, height * 0.12), fill: palette.dark, opacity: 1 }
		];
	}

	const layers = $derived(createWaveLayers());
	const hatchId = $derived(
		`pattern-hatch-waves-${Math.round(hashStringToUnit(`waves-${variation}`) * 1000)}`
	);
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
