<script lang="ts">
	import { browser } from '$app/environment';
	import { scaleLinear, scaleBand } from 'd3';
	import { onMount } from 'svelte';

	interface Annotation {
		text: string;
		x?: number;
		y?: number;
		position?:
			| 'top-right'
			| 'top-left'
			| 'bottom-right'
			| 'bottom-left'
			| 'center'
			| 'middle-right'
			| 'middle-left';
		html?: boolean;
		style?: string;
	}

	interface DataItem {
		category: string;
		percentage: number;
		count: number;
		[key: string]: any;
	}

	interface Props {
		data?: DataItem[];
		title?: string;
		subtitle?: string;
		maxValue?: number;
		barColor?: string;
		sampleSize?: number;
		xkey?: string;
		ykey?: string;
		annotations?: Annotation[];
		countKey?: string;
	}

	let {
		data = [],
		title = 'Chart Title',
		subtitle = '',
		maxValue = 30,
		barColor = '#a5b4fc',
		sampleSize = 0,
		xkey = 'category',
		ykey = 'percentage',
		annotations = [],
		countKey = 'count'
	}: Props = $props();

	let containerWidth = $state(400);
	let isMobile = $state(false);
	let maxLabelWidth = $state(0);
	let annotationContainer: HTMLDivElement;

	// Helper function to split labels into multiple lines
	function splitLabel(label: string | undefined | null, maxLength = 15): string[] {
		if (!label || typeof label !== 'string') return [''];
		if (label.length <= maxLength) return [label];

		const words = label.split(/[\s&/]+/);
		const lines: string[] = [];
		let currentLine = '';

		for (const word of words) {
			if (currentLine.length + word.length + 1 <= maxLength) {
				currentLine += (currentLine ? ' ' : '') + word;
			} else {
				if (currentLine) lines.push(currentLine);
				currentLine = word;
			}
		}
		if (currentLine) lines.push(currentLine);

		return lines.length > 0 ? lines : [label];
	}

	// Calculate max width of labels
	function calculateMaxLabelWidth() {
		if (browser && data.length > 0) {
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');
			if (context) {
				context.font = `500 ${isMobile ? '12px' : '14px'} system-ui, -apple-system, sans-serif`;
				// Calculate max width considering multi-line labels
				maxLabelWidth = Math.max(
					0, // Ensure minimum is 0 if data is empty
					...data.map((item) => {
						const category = item?.[xkey] || '';
						const lines = splitLabel(category);
						return Math.max(...lines.map((line) => context.measureText(line || '').width));
					})
				);
			}
		}
	}

	// Recalculate max label width when data or isMobile changes
	$effect(() => {
		calculateMaxLabelWidth();
	});

	// Sort data by ykey
	let sortedData = $derived(data.toSorted((a, b) => b[ykey] - a[ykey]));

	let margin = $derived({
		top: 0,
		right: isMobile ? 15 : 35,
		bottom: isMobile ? 40 : 60,
		left: maxLabelWidth + 5
	});

	let baseHeight = $derived(isMobile ? 180 : 220);
	let dynamicHeight = $derived(
		Math.max(baseHeight, sortedData.length * (isMobile ? 40 : 48) + margin.top + margin.bottom)
	);

	let chartWidth = $derived(Math.max(200, containerWidth - margin.left - margin.right));
	let chartHeight = $derived(dynamicHeight - margin.top - margin.bottom);

	let fontSize = $derived({
		title: isMobile ? '18px' : '22px',
		subtitle: isMobile ? '14px' : '16px',
		label: isMobile ? '11px' : '12px',
		axis: isMobile ? '11px' : '13px',
		footer: isMobile ? '10px' : '12px'
	});

	let xScale = $derived(scaleLinear().domain([0, maxValue]).range([0, chartWidth]));
	let yScale = $derived(
		scaleBand()
			.domain(sortedData.map((d) => d?.[xkey] || ''))
			.range([0, chartHeight])
			.padding(isMobile ? 0.25 : 0.2)
	);

	let annotationPadding = $derived(isMobile ? 10 : 50);

	let gridLines = $derived(xScale.ticks(isMobile ? 3 : 5));
	let xAxisTicks = $derived(xScale.ticks(isMobile ? 3 : 5));

	let colors = $derived({
		text: {
			primary: '#1f2937',
			secondary: '#6b7280',
			muted: '#9ca3af'
		},
		grid: '#f3f4f6',
		axis: '#e5e7eb',
		background: '#ffffff'
	});

	// Calculate annotation positions
	function getAnnotationPosition(annotation: (typeof annotations)[0]) {
		if (annotation.x !== undefined && annotation.y !== undefined) {
			return { x: annotation.x, y: annotation.y };
		}

		const position = annotation.position || 'top-right';
		const padding = annotationPadding;

		switch (position) {
			case 'top-left':
				return { x: padding, y: padding };
			case 'top-right':
				return { x: containerWidth - padding, y: padding };
			case 'bottom-left':
				return { x: padding, y: dynamicHeight - padding };
			case 'bottom-right':
				return { x: containerWidth, y: dynamicHeight - padding - 30 };
			case 'center':
				return { x: containerWidth / 2, y: dynamicHeight / 2 };
			case 'middle-right':
				return { x: containerWidth - padding, y: dynamicHeight / 2 };
			case 'middle-left':
				return { x: padding, y: dynamicHeight / 2 };
			default:
				return { x: containerWidth - padding, y: padding };
		}
	}

	onMount(() => {
		const checkMobile = () => {
			isMobile = window.innerWidth < 768;
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	});
</script>

<div class="chart-container">
	<div class="chart-header">
		<h3 class="chart-title" style="font-size: {fontSize.title};">
			{title}
		</h3>
		{#if subtitle}
			<p class="chart-subtitle" style="font-size: {fontSize.subtitle};">{subtitle}</p>
		{/if}
	</div>

	<div class="chart-wrapper" bind:clientWidth={containerWidth}>
		<div class="chart-svg-container">
			<svg width={containerWidth} height={dynamicHeight} class="chart-svg">
				<g transform="translate({margin.left},{margin.top})">
					{#each gridLines as tick}
						<line
							x1={xScale(tick)}
							x2={xScale(tick)}
							y1={-5}
							y2={chartHeight}
							stroke={colors.grid}
							stroke-width="1"
							opacity="0.6"
						/>
					{/each}

					{#each sortedData as item}
						{@const category = item?.[xkey] || ''}
						{@const value = item?.[ykey] || 0}
						<rect
							x={2}
							y={yScale(category) + 2}
							width={xScale(value)}
							height={yScale.bandwidth()}
							fill="rgba(0, 0, 0, 0.04)"
							rx={isMobile ? 3 : 4}
						/>
						<rect
							x={0}
							y={yScale(category)}
							width={xScale(value)}
							height={yScale.bandwidth()}
							fill={barColor}
							rx={isMobile ? 3 : 4}
							class="chart-bar"
							style="transition: all 0.3s ease;"
						/>
						<text
							x={isMobile ? xScale(value) - 8 : xScale(value) + 8}
							y={yScale(category) + yScale.bandwidth() / 2}
							dy="0.35em"
							font-size={fontSize.label}
							fill={isMobile ? '#ffffff' : colors.text.primary}
							font-weight="600"
							font-family="system-ui, -apple-system, sans-serif"
							text-anchor={isMobile ? 'end' : 'start'}
						>
							{value}%
						</text>
					{/each}

					{#each data as item}
						{@const category = item?.[xkey] || ''}
						{@const lines = splitLabel(category)}
						{@const lineHeight = parseInt(fontSize.label) * 1.2}
						{@const totalHeight = lines.length * lineHeight}
						{@const startY = yScale(category) + yScale.bandwidth() / 2 - totalHeight / 2}

						{#each lines as line, lineIndex}
							<text
								x={-12}
								y={startY + lineIndex * lineHeight}
								dy="0.75em"
								text-anchor="end"
								font-size={fontSize.label}
								fill={colors.text.primary}
								font-weight="500"
								font-family="system-ui, -apple-system, sans-serif"
							>
								{line}
							</text>
						{/each}
					{/each}

					<line
						x1={0}
						x2={chartWidth}
						y1={chartHeight}
						y2={chartHeight}
						stroke={colors.axis}
						stroke-width="1.5"
					/>

					{#each xAxisTicks as tick}
						<line
							x1={xScale(tick)}
							x2={xScale(tick)}
							y1={chartHeight}
							y2={chartHeight + 4}
							stroke={colors.axis}
							stroke-width="1"
						/>
						<text
							x={xScale(tick)}
							y={chartHeight + (isMobile ? 18 : 22)}
							text-anchor="middle"
							font-size={fontSize.axis}
							fill={colors.text.secondary}
							font-family="system-ui, -apple-system, sans-serif"
						>
							{tick}%
						</text>
					{/each}

					<text
						x={chartWidth / 2}
						y={chartHeight + (isMobile ? 32 : 50)}
						text-anchor="middle"
						font-size={fontSize.axis}
						fill={colors.text.secondary}
						font-weight="500"
						font-family="system-ui, -apple-system, sans-serif"
					>
						% of confirmed attendees
					</text>
				</g>
			</svg>

			<!-- Annotations -->
			<div class="annotations-container" bind:this={annotationContainer}>
				{#each annotations as annotation}
					{@const pos = getAnnotationPosition(annotation)}
					<div
						class="annotation"
						class:annotation-html={annotation.html}
						style="
							left: {pos.x}px; 
							top: {pos.y}px;
							transform: translate(
								{annotation.position?.includes('right')
							? '-100%'
							: annotation.position === 'center'
								? '-50%'
								: '0'}, 
								{annotation.position?.includes('bottom')
							? '-100%'
							: annotation.position?.includes('middle') || annotation.position === 'center'
								? '-50%'
								: '0'}
							);
							{annotation.style || ''}
						"
					>
						{#if annotation.html}
							{@html annotation.text}
						{:else}
							{annotation.text}
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="chart-footer">
		<p class="sample-size" style="font-size: {fontSize.footer};">
			{#if sampleSize > 0}
				sample size: n = {sampleSize}
			{:else}
				N = {data.reduce((sum, item) => sum + (item.count || 0), 0)}
			{/if}
		</p>
	</div>
</div>

<style>
	.chart-container {
		background: #ffffff;
		border-radius: 12px;
		padding: 1.5rem;
		width: 100%;
		min-width: 0;

		transition: box-shadow 0.2s ease;
	}

	.chart-header {
		margin-bottom: 1.5rem;
	}

	.chart-title {
		color: #1f2937;
		font-weight: 700;
		font-family:
			system-ui,
			-apple-system,
			sans-serif;
		line-height: 1.2;
		margin: 0 0 0.5rem 0;
		letter-spacing: -0.025em;
	}

	.chart-subtitle {
		color: #6b7280;
		font-weight: 400;
		font-family:
			system-ui,
			-apple-system,
			sans-serif;
		line-height: 1.4;
		margin: 0;
		font-style: italic;
	}

	.chart-wrapper {
		width: 100%;
		overflow: visible;
		min-width: 0;
	}

	.chart-svg-container {
		position: relative;
		width: 100%;
	}

	.chart-svg {
		width: 100%;
		height: auto;
		font-family:
			system-ui,
			-apple-system,
			sans-serif;
	}

	.chart-bar {
		cursor: pointer;
	}

	.chart-bar:hover {
		opacity: 0.8;
	}

	.chart-footer {
		margin-top: 1rem;
		text-align: right;
	}

	.sample-size {
		color: #9ca3af;
		font-weight: 500;
		font-family:
			system-ui,
			-apple-system,
			sans-serif;
		margin: 0;
		font-style: italic;
	}

	.annotations-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 10;
	}

	.annotation {
		position: absolute;
		font-family:
			system-ui,
			-apple-system,
			sans-serif;
		font-size: 12px;
		font-weight: 500;
		font-style: italic;
		line-height: 1.4;
		max-width: 480px;
		white-space: pre-line;
		text-align: right;

		pointer-events: auto;
	}

	.annotation-html {
		background: rgba(255, 255, 255, 0.98);
		white-space: normal;
		text-align: right;
	}

	/* Mobile-specific adjustments */
	@media (max-width: 767px) {
		.chart-container {
			padding: 1rem;
			border-radius: 8px;
		}

		.chart-header {
			margin-bottom: 1rem;
		}

		.annotation {
			font-size: 12px;
			padding: 6px 10px;
			max-width: 150px;
		}
	}

	/* Print styles */
	@media print {
		.chart-container {
			box-shadow: none;
			border: 1px solid #e5e7eb;
		}
	}
</style>
