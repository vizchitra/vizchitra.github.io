<script>
	import VizChitraLogoType from '../VizChitraLogoType.svelte';
	import MobileNavDrawer from './MobileNavDrawer.svelte';
	import { clickOutside } from '$lib/utils/actions';

	let navSections = [
		{
			name: 'VizChitra 2026',
			href: '/2026',
			accentColor: 'var(--color-viz-blue)',
			subsections: [
				{ name: 'About 2026', href: '/2026' },
				{ name: 'Call for Proposal', href: '/2026/cfp', isBadge: true, badgeText: 'Open' }
			],
			expanded: false
		},
		{
			name: 'VizChitra 2025',
			href: '/2025/conference',
			accentColor: 'var(--color-viz-orange)',
			subsections: [
				{ name: 'The conference', href: '/2025/conference#intro' },
				{ name: 'Speaker line-up', href: '/2025/conference#speakers' },
				{ name: 'Workshops', href: '/2025/conference#workshops' },
				{ name: 'Schedule', href: 'https://hasgeek.com/VizChitra/2025/schedule' },
				{
					name: 'Sponsorship',
					href: '/sponsorship'
				}
			],
			expanded: false
		},
		{
			name: 'Community',
			accentColor: 'var(--color-viz-teal)',
			subsections: [
				{
					name: 'WhatsApp',
					href: 'https://chat.whatsapp.com/G9p4HbALukeAa5NSVn0OoA',
					target: '_blank'
				},
				{
					name: 'Create your Data Selfie',
					href: '/polygon-playground'
				}
			]
		},
		{
			name: 'About',
			href: '/about',
			accentColor: 'var(--color-viz-pink)',
			subsections: [
				{ name: 'Our Ethos', href: '/ethos' },
				{ name: 'Meet the Team', href: '/team' },
				{ name: 'Code of Conduct', href: '/conduct' }
			],
			expanded: false
		}
	];

	function toggleDropdown(section) {
		Object.keys(navSections).forEach((key) => {
			if (navSections[key].name === section) {
				navSections[key].expanded = !navSections[key].expanded;
			} else {
				navSections[key].expanded = false;
			}
		});
	}

	// close all dropdowns when clicking outside
	function handleClickOutside(event) {
		Object.keys(navSections).forEach((key) => {
			navSections[key].expanded = false;
		});
	}
</script>

<nav class="sticky top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<div class="flex">
				<a href="/" class="flex items-center text-3xl">
					<VizChitraLogoType includeYear={false} />
				</a>
			</div>

			<div class="mobile-drawer-container relative flex h-full items-center justify-center">
				<!-- <a
					href="https://hasgeek.com/VizChitra/2025/schedule"
					target="_blank"
					class="bg-viz-pink hover:bg-viz-pink/90 mr-3 inline-flex w-full items-center justify-center gap-3 rounded-lg border-[1px] border-[#666] px-3 py-1 text-base font-medium text-nowrap whitespace-nowrap text-white transition-all duration-200 hover:text-white sm:text-lg"
					>View Schedule</a
				> -->
				<MobileNavDrawer {navSections}></MobileNavDrawer>
			</div>

			<div class="desktop-drawer-container font-display ml-6 flex items-center gap-2">
				{#each navSections as section}
					{#if section?.subsections}
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="dropdown-button-container relative"
							style:--accent-color={section.accentColor}
						>
							<button
								class="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2"
								on:click|stopPropagation={() => toggleDropdown(section.name)}
								aria-haspopup="true"
								aria-expanded={section.expanded}
							>
								<span class="font-base text-xl whitespace-nowrap text-[#4C4C4C]"
									>{section.name}</span
								>
								<span
									style="transform-origin: 75% 25%;"
									class:rotate-315={section.expanded}
									class:scale-120={section.expanded}
									class:expanded={section.expanded}
									class="chevron h-2 w-2 translate-y-[25%] rotate-135 rounded-none border-4 border-t-[#4C4C4C] border-r-[#4C4C4C] border-b-white border-l-white transition-transform"
								></span>
							</button>
							{#if section.expanded}
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<div
									class="dropdown display-none absolute top-[100%] right-0 z-10 min-w-[150px] flex-col rounded-md bg-white px-3 py-3 shadow-lg transition-all duration-200 ease-in-out {section.expanded
										? 'flex'
										: 'hidden'}"
									use:clickOutside
									on:outsideclick={handleClickOutside}
									on:click|stopPropagation
								>
									{#each section.subsections as subsection}
										<a
											href={subsection.href}
											class="w-full cursor-pointer px-1 py-2"
											target={subsection?.target || '_self'}
										>
											<span
												class="flex items-center gap-2 text-xl font-medium whitespace-nowrap text-[#4C4C4C]"
											>
												{subsection.name}
												{#if subsection.isBadge}
													<span
														class="ml-1 rounded-full border border-blue-500 bg-gradient-to-r from-blue-400 to-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-105"
													>
														{subsection.badgeText}
													</span>
												{/if}
											</span>
										</a>
									{/each}
								</div>
							{/if}
						</div>
					{:else}
						<a
							href={section.href}
							class="cursor-pointer rounded-md px-3 py-2"
							target={section?.target || '_self'}
						>
							<span class="font-base text-xl whitespace-nowrap text-[#4C4C4C]">{section.name}</span>
						</a>
					{/if}
				{/each}

				<!-- <a
					href="https://hasgeek.com/VizChitra/2025/schedule"
					target="_blank"
					class="bg-viz-pink hover:bg-viz-pink/90 ml-3 inline-flex w-full items-center justify-center gap-3 rounded-lg border-[1px] border-[#666] px-5 py-2 text-lg font-semibold text-nowrap whitespace-nowrap text-white transition-all duration-200 hover:text-white"
					>View Schedule</a
				> -->
			</div>
		</div>
	</div>
</nav>

<style>
	.dropdown a:hover {
		border-bottom: 4px solid var(--accent-color);
		color: white;
	}

	.chevron.expanded {
		border-top-color: var(--accent-color);
		border-right-color: var(--accent-color);
	}

	.mobile-drawer-container {
		display: none;
	}

	.desktop-drawer-container {
		display: flex;
	}

	@media (max-width: 750px) {
		.mobile-drawer-container {
			display: flex;
		}

		.desktop-drawer-container {
			display: none;
		}
	}
</style>
