<script>
	import VizChitraLogoType from '../VizChitraLogoType.svelte';
	import MobileNavDrawer from './MobileNavDrawer.svelte';
	import { clickOutside } from '$lib/utils/actions';

	let navSections = [
		{
			name: 'VizChitra 2025',
			href: '/',
			accentColor: 'var(--color-viz-orange)',
			subsections: [
				{ name: 'The conference', href: '/#intro' },
				{ name: 'Speaker line-up', href: '/#speakers' },
				{ name: 'Workshops', href: '/#workshops' },
				{
					name: 'Sponsorship',
					href: 'https://speakerdeck.com/vizchitra/sponsor-the-conference-vizchitra-2025',
					target: '_blank'
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
				{ name: 'Team', href: '/meet-the-team' },
				{ name: 'Code of Conduct', href: '/code-of-conduct' }
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
											<span class="font-base text-xl whitespace-nowrap text-[#4C4C4C]"
												>{subsection.name}</span
											>
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

	@media (max-width: 600px) {
		.mobile-drawer-container {
			display: flex;
		}

		.desktop-drawer-container {
			display: none;
		}
	}
</style>
