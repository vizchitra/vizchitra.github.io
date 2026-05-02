<script lang="ts">
	type Tone = 'blue' | 'teal' | 'orange' | 'pink' | 'yellow';

	interface Props {
		tone?: Tone;
		width?: number;
		height?: number;
		class?: string;
	}

	let { tone = 'blue', width = 1080, height = 1350, class: className = '' }: Props = $props();

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
	let viewBox = $derived(`0 0 ${width} ${height}`);

	const cx = $derived(width / 2);
	const cy = $derived(height * 0.93);
	const minSide = $derived(Math.min(width, height) * 1.75);

	const rings = $derived([
		{ radius: minSide * 0.48, thickness: minSide * 0.1, fill: palette.light },
		{ radius: minSide * 0.36, thickness: minSide * 0.1, fill: palette.normal },
		{ radius: minSide * 0.25, thickness: minSide * 0.09, fill: palette.dark, opacity: 0.75 }
	]);
</script>

<svg
	class={className}
	{width}
	{height}
	{viewBox}
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	aria-hidden="true"
>
	{#each rings as ring}
		<circle
			{cx}
			{cy}
			r={ring.radius}
			fill="none"
			stroke={ring.fill}
			stroke-width={ring.thickness}
			opacity={ring?.opacity ?? 1}
		/>
	{/each}
</svg>
