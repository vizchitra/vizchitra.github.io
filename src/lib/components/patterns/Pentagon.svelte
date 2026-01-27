<script lang="ts">
	/**
	 * Generic pentagon visualization component.
	 * Displays 5-axis data as a pentagon shape with optional image.
	 * Used for speakers, team members, and selfie tool.
	 */
	import { type Color } from '$lib/utils/colorTokens';

	interface PentagonData {
		/** Collection score (1-5) */
		collection: number;
		/** Analysis score (1-5) */
		analysis: number;
		/** Coding score (1-5) */
		coding: number;
		/** Designing score (1-5) */
		designing: number;
		/** Narrating score (1-5) */
		narrating: number;
		/** Image transform X offset */
		xOffset?: number;
		/** Image transform Y offset */
		yOffset?: number;
		/** Image transform scale */
		scale?: number;
	}

	interface Props {
		/** 5-axis score data */
		data: PentagonData;
		/** Image URL */
		image?: string;
		/** Alt text for image */
		alt?: string;
		/** Size variant */
		size?: 'sm' | 'md' | 'lg';
		/** Strength/color category */
		strength?: string;
		/** Custom color mapping override */
		colorMapping?: Record<string, string>;
		/** Show grayscale effect with color overlay */
		grayscale?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Optional name to display */
		name?: string;
		/** Optional role/subtitle to display */
		role?: string;
	}

	const DEFAULT_COLOR_MAPPING: Record<string, string> = {
		'Collecting data': 'var(--color-yellow)',
		'Analyzing data': 'var(--color-teal)',
		'Coding visualizations': 'var(--color-blue)',
		'Narrating insights': 'var(--color-orange)',
		'Designing visualizations': 'var(--color-pink)'
	};

	let {
		data,
		image,
		alt = 'Pentagon visualization',
		size = 'md',
		strength,
		colorMapping = DEFAULT_COLOR_MAPPING,
		grayscale = true,
		class: className = '',
		name,
		role
	}: Props = $props();

	// Size configurations
	const sizeClasses = {
		sm: 'h-[150px] w-[150px]',
		md: 'h-[150px] w-[150px] md:h-[200px] md:w-[200px]',
		lg: 'h-[150px] w-[150px] md:h-[200px] md:w-[200px] xl:h-[250px] xl:w-[250px]'
	};

	const textSizeClasses = {
		sm: 'w-[150px] max-w-[150px]',
		md: 'w-[150px] max-w-[200px] md:w-[200px]',
		lg: 'w-[150px] max-w-[200px] md:w-[200px] xl:w-[250px] xl:max-w-[250px]'
	};

	// Base pentagon points (percentage-based)
	const regularPentagonPoints = [
		{ x: 50, y: 0 },
		{ x: 100, y: 38 },
		{ x: 82, y: 100 },
		{ x: 18, y: 100 },
		{ x: 0, y: 38 }
	];

	// Compute adjusted pentagon points based on data
	function computePoints(basePoints: typeof regularPentagonPoints) {
		const MIN_VALUE = 55;
		const adjustedPoints = basePoints.map((p) => ({ ...p }));

		const scores = [
			data.collection ?? 3,
			data.analysis ?? 3,
			data.coding ?? 3,
			data.designing ?? 3,
			data.narrating ?? 3
		];

		for (let i = 0; i < 5; i++) {
			const angle = (2 * Math.PI) / 5;
			const x1 =
				50 +
				((Math.cos(-i * angle - Math.PI / 2) *
					(MIN_VALUE + ((100 - MIN_VALUE - 5) * scores[i]) / 5)) /
					100) *
					50;
			const y1 =
				50 +
				((Math.sin(-i * angle - Math.PI / 2) *
					(MIN_VALUE + ((100 - MIN_VALUE - 5) * scores[i]) / 5)) /
					100) *
					50;
			adjustedPoints[i].x = x1;
			adjustedPoints[i].y = y1;
		}

		return adjustedPoints;
	}

	const points = $derived(computePoints(regularPentagonPoints));
	const clipPath = $derived(points.map((p) => `${p.x}% ${p.y}%`).join(', '));
	const strokeColor = $derived(
		strength ? (colorMapping[strength] ?? 'var(--color-pink)') : 'var(--color-pink)'
	);

	function computeTransform() {
		const xOffset = data.xOffset ?? 0;
		const yOffset = data.yOffset ?? 0;
		const scale = data.scale ?? 1;
		return `translate(${xOffset}px, ${yOffset}px) scale(${scale})`;
	}

	const containerSizeClass = $derived(sizeClasses[size] ?? sizeClasses.md);
	const textContainerClass = $derived(textSizeClasses[size] ?? textSizeClasses.md);
</script>

<div class={className}>
	<div class="pentagon-container relative {containerSizeClass}">
		<!-- SVG overlay for pentagon lines -->
		<svg class="absolute z-10" width="100%" height="100%">
			{#each points as point, i}
				<line
					stroke={strokeColor}
					x1="{point.x}%"
					y1="{point.y}%"
					x2="{i === points.length - 1 ? points[0].x : points[i + 1].x}%"
					y2="{i === points.length - 1 ? points[0].y : points[i + 1].y}%"
					stroke-width="6"
				/>
			{/each}
			{#each points as point}
				<circle cx="{point.x}%" cy="{point.y}%" r="9" fill="white" />
				<circle cx="{point.x}%" cy="{point.y}%" r="5" fill="#4c4c4c" />
			{/each}
		</svg>

		<!-- Image container with pentagon clip -->
		{#if image}
			<div
				class="image-container"
				class:grayscale-effect={grayscale}
				style="clip-path: polygon({clipPath}); --strength-color: {strokeColor}"
			>
				<img src={image} {alt} style="transform: {computeTransform()}" />
			</div>
		{/if}
	</div>

	<!-- Optional name and role display -->
	{#if name || role}
		<div class="member-details {textContainerClass} text-center">
			{#if name}
				<div class="mb-xs h-2xl flex flex-col items-center justify-end">
					<h3 class="font-display align-bottom text-lg leading-none font-bold md:text-xl">
						{name}
					</h3>
				</div>
			{/if}
			{#if role}
				<p class="text-base leading-snug md:text-lg">{role}</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	.image-container {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.image-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.grayscale-effect img {
		filter: grayscale(100%);
	}

	.grayscale-effect::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--strength-color);
		opacity: 0.4;
		mix-blend-mode: hard-light;
	}
</style>
