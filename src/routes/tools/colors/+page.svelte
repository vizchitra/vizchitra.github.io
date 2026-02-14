<script lang="ts">
	import Header from '$lib/components/structure/Header.svelte';
	import ToolsCard from '$lib/components/interface/ToolsCard.svelte';
	import ToolsHeader from '$lib/components/interface/ToolsHeader.svelte';
	import ColorSwatch from '$lib/components/interface/ColorSwatch.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Cluster from '$lib/components/layout/Cluster.svelte';

	const baseColors = [
		{ name: 'viz-white', var: 'var(--color-viz-white)' },
		{ name: 'viz-black', var: 'var(--color-viz-black)' },
		{ name: 'viz-yellow', var: 'var(--color-viz-yellow)' },
		{ name: 'viz-teal', var: 'var(--color-viz-teal)' },
		{ name: 'viz-blue', var: 'var(--color-viz-blue)' },
		{ name: 'viz-orange', var: 'var(--color-viz-orange)' },
		{ name: 'viz-pink', var: 'var(--color-viz-pink)' },
		{ name: 'viz-grey', var: 'var(--color-viz-grey)' }
	];

	const colorRamps = [
		{ name: 'Yellow', prefix: 'yellow' },
		{ name: 'Teal', prefix: 'teal' },
		{ name: 'Blue', prefix: 'blue' },
		{ name: 'Orange', prefix: 'orange' },
		{ name: 'Pink', prefix: 'pink' },
		{ name: 'Grey', prefix: 'grey' }
	];

	const rampLevels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

	const namedVariants = [
		{
			name: 'Subtle (100)',
			description: 'Large Airy Backgrounds',
			note: 'Barely-there tints for large background areas that need color without overwhelming content.',
			colors: [
				{ label: 'viz-yellow-subtle', var: 'var(--color-viz-yellow-subtle)' },
				{ label: 'viz-teal-subtle', var: 'var(--color-viz-teal-subtle)' },
				{ label: 'viz-blue-subtle', var: 'var(--color-viz-blue-subtle)' },
				{ label: 'viz-orange-subtle', var: 'var(--color-viz-orange-subtle)' },
				{ label: 'viz-pink-subtle', var: 'var(--color-viz-pink-subtle)' },
				{ label: 'viz-grey-subtle', var: 'var(--color-viz-grey-subtle)' }
			]
		},
		{
			name: 'Light (200)',
			description: 'Background Colors',
			note: 'Soft tints suitable for component backgrounds, cards, and containers.',
			colors: [
				{ label: 'viz-yellow-light', var: 'var(--color-viz-yellow-light)' },
				{ label: 'viz-teal-light', var: 'var(--color-viz-teal-light)' },
				{ label: 'viz-blue-light', var: 'var(--color-viz-blue-light)' },
				{ label: 'viz-orange-light', var: 'var(--color-viz-orange-light)' },
				{ label: 'viz-pink-light', var: 'var(--color-viz-pink-light)' },
				{ label: 'viz-grey-light', var: 'var(--color-viz-grey-light)' }
			]
		},
		{
			name: 'Muted (300)',
			description: 'Borders & Dividers',
			note: 'Mid-tone colors perfect for borders, dividers, and subtle UI elements.',
			colors: [
				{ label: 'viz-yellow-muted', var: 'var(--color-viz-yellow-muted)' },
				{ label: 'viz-teal-muted', var: 'var(--color-viz-teal-muted)' },
				{ label: 'viz-blue-muted', var: 'var(--color-viz-blue-muted)' },
				{ label: 'viz-orange-muted', var: 'var(--color-viz-orange-muted)' },
				{ label: 'viz-pink-muted', var: 'var(--color-viz-pink-muted)' },
				{ label: 'viz-grey-muted', var: 'var(--color-viz-grey-muted)' }
			]
		},
		{
			name: 'Base (400)',
			description: 'Primary Brand Colors',
			note: 'The base colors, used for primary UI elements and brand expression.',
			colors: [
				{ label: 'viz-yellow', var: 'var(--color-viz-yellow)' },
				{ label: 'viz-teal', var: 'var(--color-viz-teal)' },
				{ label: 'viz-blue', var: 'var(--color-viz-blue)' },
				{ label: 'viz-orange', var: 'var(--color-viz-orange)' },
				{ label: 'viz-pink', var: 'var(--color-viz-pink)' },
				{ label: 'viz-grey', var: 'var(--color-viz-grey)' }
			]
		},
		{
			name: 'Dark (800)',
			description: 'Text & Strong Emphasis',
			note: 'Deep tones suitable for text, icons, and elements requiring strong contrast.',
			colors: [
				{ label: 'viz-yellow-dark', var: 'var(--color-viz-yellow-dark)' },
				{ label: 'viz-teal-dark', var: 'var(--color-viz-teal-dark)' },
				{ label: 'viz-blue-dark', var: 'var(--color-viz-blue-dark)' },
				{ label: 'viz-orange-dark', var: 'var(--color-viz-orange-dark)' },
				{ label: 'viz-pink-dark', var: 'var(--color-viz-pink-dark)' },
				{ label: 'viz-grey-dark', var: 'var(--color-viz-grey-dark)' }
			]
		}
	];
</script>

<Header banner="square" color="grey" />

<section class="mx-auto max-w-6xl space-y-10 px-2 py-12">
	<ToolsHeader
		trail={[
			{ href: '/tools', label: 'Tools' },
			{ href: '/tools/colors', label: 'Colors' }
		]}
		title="Color System"
		subtitle="Complete color palette and usage guidelines for VizChitra, including base colors, ramps, and named variants."
	/>

	<!-- Base Colors -->
	<ToolsCard widthClass="w-full">
		<h2 class="text-viz-black mb-4 text-2xl font-bold">Base Colors</h2>
		<p class="text-viz-grey-dark mb-8 text-base">
			The core VizChitra palette consists of 6 base colors, plus white and black foundation colors.
		</p>
		<Cluster space="lg" justify="start" align="start">
			{#each baseColors as color}
				<ColorSwatch color={color.var} label={color.name} size="large" />
			{/each}
		</Cluster>
	</ToolsCard>

	<!-- Color Ramps -->
	<ToolsCard widthClass="w-full">
		<h2 class="text-viz-black mb-4 text-2xl font-bold">Color Ramps</h2>
		<p class="text-viz-grey-dark mb-8 text-base">
			Each brand color has an 11-tone scale ranging from 50 (lightest) to 950 (darkest). The 400
			level represents the original brand color.
		</p>

		<Stack space="xl" align="start">
			{#each colorRamps as ramp}
				<div>
					<h3 class="text-viz-grey-dark mb-4 text-lg font-semibold">{ramp.name}</h3>
					<Cluster space="sm" justify="start" align="center">
						{#each rampLevels as level}
							<ColorSwatch
								color={`var(--color-${ramp.prefix}-${level})`}
								label={`${level}`}
								size="small"
							/>
						{/each}
					</Cluster>
				</div>
			{/each}
		</Stack>
	</ToolsCard>

	<!-- Named Variants -->
	<ToolsCard widthClass="w-full">
		<h2 class="text-viz-black mb-4 text-2xl font-bold">Named Variants</h2>
		<p class="text-viz-grey-dark mb-8 text-base">
			Named variants provide semantic color tokens for specific use cases. Each variant is mapped to
			a specific ramp level.
		</p>

		<Stack space="xl" align="start">
			{#each namedVariants as variant}
				<div class="w-full">
					<h3 class="text-viz-grey-dark mb-2 text-lg font-semibold">
						{variant.name} - {variant.description}
					</h3>
					<p class="text-viz-grey-dark mb-4 text-sm">{variant.note}</p>
					<Cluster space="lg" justify="start" align="start">
						{#each variant.colors as color}
							<ColorSwatch color={color.var} label={color.label} size="medium" />
						{/each}
					</Cluster>
				</div>
			{/each}
		</Stack>
	</ToolsCard>

	<!-- Accessibility Testing -->
	<ToolsCard widthClass="w-full">
		<h2 class="text-viz-black mb-4 text-2xl font-bold">Accessibility Testing</h2>
		<p class="text-viz-grey-dark mb-8 text-base">
			All dark variants tested against white background for WCAG AA compliance (4.5:1 minimum for
			normal text, 3:1 for large text).
		</p>

		<Stack space="lg" align="start">
			<div>
				<h3 class="text-viz-grey-dark mb-4 text-lg font-semibold">Heading Examples</h3>
				<Stack space="sm" align="start">
					<h3 style="color: var(--color-viz-yellow-dark)">Yellow Heading Example</h3>
					<h3 style="color: var(--color-viz-teal-dark)">Teal Heading Example</h3>
					<h3 style="color: var(--color-viz-blue-dark)">Blue Heading Example</h3>
					<h3 style="color: var(--color-viz-orange-dark)">Orange Heading Example</h3>
					<h3 style="color: var(--color-viz-pink-dark)">Pink Heading Example</h3>
					<h3 style="color: var(--color-viz-grey-dark)">Grey Heading Example</h3>
				</Stack>
			</div>

			<div>
				<h3 class="text-viz-grey-dark mb-4 text-lg font-semibold">Normal Text Examples</h3>
				<Stack space="sm" align="start">
					<p style="color: var(--color-viz-yellow-dark)">
						This is normal text in yellow dark variant for readability testing on white background.
					</p>
					<p style="color: var(--color-viz-teal-dark)">
						This is normal text in teal dark variant for readability testing on white background.
					</p>
					<p style="color: var(--color-viz-blue-dark)">
						This is normal text in blue dark variant for readability testing on white background.
					</p>
					<p style="color: var(--color-viz-orange-dark)">
						This is normal text in orange dark variant for readability testing on white background.
					</p>
					<p style="color: var(--color-viz-pink-dark)">
						This is normal text in pink dark variant for readability testing on white background.
					</p>
					<p style="color: var(--color-viz-grey-dark)">
						This is normal text in grey dark variant for readability testing on white background.
					</p>
				</Stack>
			</div>
		</Stack>
	</ToolsCard>

	<!-- Usage Guidelines -->
	<ToolsCard widthClass="w-full">
		<h2 class="text-viz-black mb-4 text-2xl font-bold">Usage Guidelines</h2>

		<Stack space="lg" align="start">
			<div>
				<h3 class="text-viz-grey-dark mb-3 text-lg font-semibold">Color Selection</h3>
				<ul class="text-viz-grey-dark space-y-2 text-base">
					<li><strong>Backgrounds:</strong> Use subtle (100) or light (200) variants</li>
					<li><strong>Borders:</strong> Use muted (300) variant</li>
					<li><strong>Primary UI:</strong> Use base (400) variant</li>
					<li><strong>Text:</strong> Use dark (700-900) variants</li>
					<li><strong>Hover/Active States:</strong> Move up or down the ramp by 100-200</li>
				</ul>
			</div>

			<div>
				<h3 class="text-viz-grey-dark mb-3 text-lg font-semibold">Contrast Requirements</h3>
				<ul class="text-viz-grey-dark space-y-2 text-base">
					<li><strong>Body text:</strong> Minimum 4.5:1 contrast ratio (WCAG AA)</li>
					<li><strong>Large text:</strong> Minimum 3:1 contrast ratio</li>
					<li><strong>UI components:</strong> Minimum 3:1 contrast ratio</li>
				</ul>
			</div>

			<div>
				<h3 class="text-viz-grey-dark mb-3 text-lg font-semibold">Semantic Colors</h3>
				<p class="text-viz-grey-dark mb-2 text-base">
					Additional semantic tokens are mapped to brand colors:
				</p>
				<ul class="text-viz-grey-dark space-y-2 text-base">
					<li><code>--color-bg</code>: Modern paper white</li>
					<li><code>--color-fg</code>: Deep charcoal black</li>
					<li><code>--color-muted</code>: Grey</li>
					<li><code>--color-accent</code>: Pink</li>
					<li><code>--color-link</code>: Blue dark variant</li>
				</ul>
			</div>
		</Stack>
	</ToolsCard>
</section>

<style>
	ul {
		list-style: none;
		padding-left: 0;
	}

	ul li {
		position: relative;
		padding-left: 1.5rem;
	}

	ul li::before {
		content: '–';
		position: absolute;
		left: 0;
		color: var(--color-viz-grey-dark);
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.875em;
		color: var(--color-viz-grey-dark);
		background-color: var(--color-viz-grey-light);
		padding: 0.1em 0.3em;
		border-radius: 0.25rem;
	}
</style>
