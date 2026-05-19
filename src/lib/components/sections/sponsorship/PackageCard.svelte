<!-- PackageCard.svelte — one sponsorship tier column, matching the PDF layout -->
<script lang="ts">
	import type { Color } from '$lib/tokens';

	export interface PackageBenefit {
		label: string;
		details?: string[];
	}

	export interface Package {
		tier: string;
		price: string;
		slots: string;
		color: Color;
		purpose: string;
		what: string;
		bestFor: string;
		value: string;
		benefits: PackageBenefit[];
	}

	let { pkg }: { pkg: Package } = $props();

	// Text on dark header — yellow is light enough to need dark text, others are fine with white
	const headerTextClass: Record<Color, string> = {
		yellow: 'text-[#4c4c4c]',
		teal: 'text-white',
		blue: 'text-[#4c4c4c]',
		orange: 'text-white',
		pink: 'text-[#4c4c4c]',
		grey: 'text-white'
	};
</script>

<div
	class="pkg-card flex flex-col overflow-hidden rounded-lg border border-black/10 shadow-md"
	style="
    --pkg-base: var(--color-viz-{pkg.color});
    --pkg-light: var(--color-viz-{pkg.color}-light);
    --pkg-dark: var(--color-viz-{pkg.color}-dark);
    --pkg-muted: var(--color-viz-{pkg.color}-muted);
  "
>
	<!-- Header -->
	<div class="pkg-header flex items-center justify-between px-4 py-3">
		<span
			class="font-display text-base font-black tracking-widest uppercase {headerTextClass[
				pkg.color
			]}"
		>
			{pkg.tier}
		</span>
		<span
			class="font-body text-xs font-semibold tracking-wide uppercase opacity-80 {headerTextClass[
				pkg.color
			]}"
		>
			{pkg.slots}
		</span>
	</div>

	<!-- Purpose / What / Best For / Value -->
	<div class="pkg-meta flex-none border-b border-black/10 px-4 py-4 text-[13px] leading-snug">
		<p class="mb-2">
			<span class="font-display font-bold text-[#4c4c4c]">Purpose /</span>
			<span class="text-[#555]"> {pkg.purpose}</span>
		</p>
		<p class="mb-2">
			<span class="font-display font-bold text-[#4c4c4c]">What /</span>
			<span class="text-[#555]"> {pkg.what}</span>
		</p>
		<p class="mb-2">
			<span class="font-display font-bold text-[#4c4c4c]">Best For /</span>
			<span class="text-[#555]"> {pkg.bestFor}</span>
		</p>
		<p>
			<span class="font-display font-bold text-[#4c4c4c]">Value /</span>
			<span class="text-[#555]"> {pkg.value}</span>
		</p>
	</div>

	<!-- Benefits -->
	<div class="pkg-benefits flex-1 px-4 py-4">
		<ul class="space-y-3">
			{#each pkg.benefits as benefit}
				<li>
					<p class="font-display text-[13px] leading-tight font-bold text-[#333]">
						{benefit.label}
					</p>
					{#if benefit.details}
						{#each benefit.details as detail}
							<p class="font-body text-[12px] leading-snug text-[#666]">{detail}</p>
						{/each}
					{/if}
				</li>
			{/each}
		</ul>
	</div>

	<!-- Price footer -->
	<div class="pkg-footer px-4 py-3 text-center">
		<span class="font-display text-base font-black tracking-tight text-[#4c4c4c]">{pkg.price}</span>
	</div>
</div>

<style>
	.pkg-card {
		height: 100%;
	}

	.pkg-header {
		background: var(--pkg-base);
	}

	.pkg-meta {
		background: var(--pkg-light);
	}

	.pkg-benefits {
		background: color-mix(in srgb, var(--pkg-light) 60%, white);
	}

	.pkg-footer {
		background: var(--pkg-light);
		border-top: 1px solid var(--pkg-muted);
	}
</style>
