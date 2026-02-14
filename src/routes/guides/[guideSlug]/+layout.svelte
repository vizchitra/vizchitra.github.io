<script>
	import { page } from '$app/state';
	import { Container, Header, Prose } from '$lib/components';
	let { data, children } = $props();

	// Color mappings for Tailwind classes
	const colorClasses = {
		pink: {
			underline: 'decoration-pink-500',
			number: 'bg-pink-100 text-pink-700',
			activeNumber: 'bg-pink-500 text-white'
		},
		blue: {
			underline: 'decoration-blue-500',
			number: 'bg-blue-100 text-blue-700',
			activeNumber: 'bg-blue-500 text-white'
		},
		teal: {
			underline: 'decoration-teal-500',
			number: 'bg-teal-100 text-teal-700',
			activeNumber: 'bg-teal-500 text-white'
		},
		yellow: {
			underline: 'decoration-yellow-500',
			number: 'bg-yellow-100 text-yellow-700',
			activeNumber: 'bg-yellow-600 text-white'
		},
		orange: {
			underline: 'decoration-orange-500',
			number: 'bg-orange-100 text-orange-700',
			activeNumber: 'bg-orange-500 text-white'
		}
	};

	const colors = $derived(colorClasses[data.guideColor] || colorClasses.blue);

	// Guide name (e.g. "talks", "workshops") — prefer route param, fallback to data
	const guideName = $derived(page.params.guideSlug || data.guideSlug);

	function capitalize(s) {
		if (!s) return '';
		return s.charAt(0).toUpperCase() + s.slice(1);
	}

	// Display title for Header: e.g. "Talks @ VizChitra"
	const displayTitle = $derived(guideName ? `${capitalize(guideName)} @ VizChitra` : data.guideId);
</script>

<Header banner="blob" color={data.guideColor}></Header>

<Container width="wide" class="w-full">
	<div class="guide-layout">
		<div class="guide-content">
			{@render children()}
		</div>

		<aside class="guide-sidebar">
			<!-- <div class="sidebar-header">
				<a href="/guides#list" class="back-link">← All Guides</a>
				<h1 class="guide-title">{data.guideTitle}</h1>
			</div> -->

			<nav class="sidebar-nav">
				{#each data.sections as section, index}
					{@const sectionSlug = section.sectionSlug}
					{@const active = page.params.sectionSlug === sectionSlug}
					{@const isDraft = section.draft === true}

					{#if isDraft}
						<div class="nav-item draft">
							<span class="nav-number {colors.number} opacity-50">
								{index + 1}
							</span>
							<span class="nav-title opacity-50">
								{section.section.charAt(0).toUpperCase() + section.section.slice(1)}
							</span>
						</div>
					{:else}
						<a href="/guides/{data.guideSlug}/{sectionSlug}" class="nav-item" class:active>
							<span class="nav-number {active ? colors.activeNumber : colors.number}">
								{index + 1}
							</span>
							<span class="nav-title {active ? colors.underline : ''}">
								{section.section.charAt(0).toUpperCase() + section.section.slice(1)}
							</span>
						</a>
					{/if}
				{/each}
			</nav>
		</aside>
	</div>
</Container>

<style>
	.guide-layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	/* Mobile: sidebar at top */
	.guide-sidebar {
		width: 100%;
		/* background: white; */
		/* border-bottom: 1px solid var(--color-grey-200, #e5e7eb); */
		order: -1; /* Put sidebar first on mobile */
	}

	.sidebar-header {
		padding: 1rem 1.5rem;
		/* border-bottom: 1px solid var(--color-grey-200, #e5e7eb); */
	}

	.back-link {
		font-size: 0.875rem;
		color: var(--color-grey-500, #6b7280);
		text-decoration: none;
	}

	.back-link:hover {
		color: var(--color-grey-700, #374151);
	}

	.guide-title {
		margin-top: 0.25rem;
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--color-grey-900, #111827);
	}

	/* Mobile: horizontal scrollable nav */
	.sidebar-nav {
		display: flex;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		border-radius: 0.5rem;
		text-decoration: none;
		white-space: nowrap;
		transition: all 0.15s;
	}

	.nav-item:hover:not(.draft) {
		background-color: var(--color-grey-50, #f9fafb);
	}

	.nav-item.draft {
		cursor: default;
	}

	.opacity-50 {
		opacity: 0.5;
	}

	.nav-number {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 0.375rem;
		font-size: 0.75rem;
		font-weight: 600;
		flex-shrink: 0;
	}

	.nav-title {
		font-size: var(--text-flow--2);
		font-weight: 500;
		color: var(--color-grey-600, #4b5563);
	}

	.nav-item.active .nav-title {
		color: var(--color-grey-900, #111827);
		text-decoration: underline;
		text-decoration-thickness: 2px;
		text-underline-offset: 7px;
	}

	.guide-content {
		flex: 1;
		min-width: 0;
		/* background: var(--color-gray-50, #f9fafb); */
	}

	/* Desktop: sidebar on right */
	@media (min-width: 768px) {
		.guide-layout {
			flex-direction: row;
		}

		.guide-sidebar {
			width: 18rem;
			order: 1; /* Sidebar on right */
			border-bottom: none;
			/* border-left: 1px solid var(--color-gray-200, #e5e7eb); */
			height: calc(100vh - 4rem); /* Account for navbar height (64px = 4rem) */
			position: sticky;
			top: 4rem; /* Start below the navbar (64px = 4rem) */
			padding-top: 2rem;
			overflow-y: auto;
		}

		.sidebar-header {
			padding: 1.5rem;
		}

		.guide-title {
			font-size: 1.25rem;
		}

		/* Desktop: vertical nav */
		.sidebar-nav {
			flex-direction: column;
			padding: 1rem;
			overflow-x: visible;
			overflow-y: auto;
		}

		.nav-number {
			width: 2rem;
			height: 2rem;
			font-size: 0.875rem;
		}

		.guide-content {
			order: 0; /* Content on left */
		}
	}
</style>
