<script lang="ts">
	import * as d3 from 'd3';
	import { onMount } from 'svelte';

	export let data: Array<{ category: string; percentage: number; count: number }> = [];
	export let title = 'Chart Title';
	export let subtitle = '';
	export let maxValue = 30;
	export let barColor = '#a5b4fc';
	export let sampleSize = 121;

	let containerWidth = 400;
	let isMobile = false;
	let maxLabelWidth = 0;

	$: {
		if (data.length > 0) {
			// Create a temporary canvas to measure text width
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');
			if (context) {
				context.font = `500 ${isMobile ? '12px' : '14px'} system-ui, -apple-system, sans-serif`;
				maxLabelWidth = Math.max(...data.map((item) => context.measureText(item.category).width));
			}
		}
	}

	$: margin = {
		top: 20,
		right: isMobile ? 15 : 30,
		bottom: isMobile ? 40 : 50,
		left: Math.max(isMobile ? 60 : 80, maxLabelWidth + 10)
	};

	$: baseHeight = isMobile ? 180 : 220;
	$: dynamicHeight = Math.max(
		baseHeight,
		data.length * (isMobile ? 32 : 40) + margin.top + margin.bottom
	);

	$: chartWidth = Math.max(200, containerWidth - margin.left - margin.right);
	$: chartHeight = dynamicHeight - margin.top - margin.bottom;

	$: fontSize = {
		title: isMobile ? '18px' : '22px',
		subtitle: isMobile ? '14px' : '16px',
		label: isMobile ? '12px' : '14px',
		axis: isMobile ? '11px' : '13px',
		footer: isMobile ? '10px' : '12px'
	};

	$: xScale = d3.scaleLinear().domain([0, maxValue]).range([0, chartWidth]);
	$: yScale = d3
		.scaleBand()
		.domain(data.map((d) => d.category))
		.range([0, chartHeight])
		.padding(isMobile ? 0.2 : 0.15);

	$: gridLines = xScale.ticks(isMobile ? 3 : 5);
	$: xAxisTicks = xScale.ticks(isMobile ? 3 : 5);

	$: colors = {
		text: {
			primary: '#1f2937',
			secondary: '#6b7280',
			muted: '#9ca3af'
		},
		grid: '#f3f4f6',
		axis: '#e5e7eb',
		background: '#ffffff'
	};

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

				{#each data as item, index}
					<rect
						x={2}
						y={yScale(item.category) + 2}
						width={xScale(item.percentage)}
						height={yScale.bandwidth()}
						fill="rgba(0, 0, 0, 0.04)"
						rx={isMobile ? 3 : 4}
					/>
					<rect
						x={0}
						y={yScale(item.category)}
						width={xScale(item.percentage)}
						height={yScale.bandwidth()}
						fill={barColor}
						rx={isMobile ? 3 : 4}
						class="chart-bar"
						style="transition: all 0.3s ease;"
					/>
					<text
						x={xScale(item.percentage) + (isMobile ? 6 : 8)}
						y={yScale(item.category) + yScale.bandwidth() / 2}
						dy="0.35em"
						font-size={fontSize.label}
						fill={colors.text.primary}
						font-weight="600"
						font-family="system-ui, -apple-system, sans-serif"
					>
						{item.percentage}%
					</text>
				{/each}

				{#each data as item}
					<text
						x={-12}
						y={yScale(item.category) + yScale.bandwidth() / 2}
						dy="0.35em"
						text-anchor="end"
						font-size={fontSize.label}
						fill={colors.text.primary}
						font-weight="500"
						font-family="system-ui, -apple-system, sans-serif"
					>
						{item.category}
					</text>
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
	</div>

	<div class="chart-footer">
		<p class="sample-size" style="font-size: {fontSize.footer};">N = {sampleSize}</p>
	</div>
</div>

<style>
	.chart-container {
		background: #ffffff;
		border: 1px solid #f3f4f6;
		border-radius: 12px;
		padding: 1.5rem;
		width: 100%;
		min-width: 0;
		box-shadow:
			0 1px 3px 0 rgba(0, 0, 0, 0.1),
			0 1px 2px 0 rgba(0, 0, 0, 0.06);
		transition: box-shadow 0.2s ease;
	}

	.chart-container:hover {
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
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

	/* Mobile-specific adjustments */
	@media (max-width: 767px) {
		.chart-container {
			padding: 1rem;
			border-radius: 8px;
		}

		.chart-header {
			margin-bottom: 1rem;
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
