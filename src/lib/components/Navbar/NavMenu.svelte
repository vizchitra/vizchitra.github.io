<script>
	import exp from 'constants';
	import VizChitraLogoType from '../VizChitraLogoType.svelte';

	let navSections = [
		{
			name: "VizChitra '25",
			href: '/',
			accentColor: 'var(--color-viz-orange)',
			subsections: [
				{ name: 'The conference', href: '/' },
				{ name: 'Speaker line-up', href: '/' },
				{ name: 'Sponsorship', href: '/' }
			],
			expanded: false
		},
		{
			name: 'Community',
			href: 'https://chat.whatsapp.com/G9p4HbALukeAa5NSVn0OoA',
			accentColor: 'var(--color-viz-teal)',
			target: '_blank'
		},
		{
			name: 'About',
			href: '/about',
			accentColor: 'var(--color-viz-pink)',
			subsections: [
				{ name: 'Mission', href: '/' },
				{ name: 'Team', href: '/' },
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
</script>

<nav class="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<div class="flex">
				<a href="/" class="flex items-center text-3xl">
					<VizChitraLogoType />
				</a>
			</div>
			<div class="font-display ml-6 flex items-center">
				{#each navSections as section}
					{#if section?.subsections}
						<div
							class="dropdown-button-container relative"
							style:--accent-color={section.accentColor}
						>
							<button
								class="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2"
								on:click={() => toggleDropdown(section.name)}
								aria-haspopup="true"
								aria-expanded={section.expanded}
							>
								<span class="font-base text-base whitespace-nowrap text-black">{section.name}</span>
								<span
									style="transform-origin: 75% 25%;"
									class:rotate-315={section.expanded}
									class:scale-120={section.expanded}
									class:expanded={section.expanded}
									class="chevron h-2 w-2 translate-y-[25%] rotate-135 rounded-none border-4 border-t-black border-r-black border-b-white border-l-white transition-all"
								></span>
							</button>

							<div
								class="dropdown display-none absolute top-[100%] right-0 z-10 min-w-[150px] flex-col rounded-md bg-white px-3 py-3 shadow-lg transition-all duration-200 ease-in-out {section.expanded
									? 'flex'
									: 'hidden'}"
							>
								{#each section.subsections as subsection}
									<a href={subsection.href} class="w-full cursor-pointer px-1 py-2">
										<span class="font-base text-base whitespace-nowrap text-black"
											>{subsection.name}</span
										>
									</a>
								{/each}
							</div>
						</div>
					{:else}
						<a
							href={section.href}
							class="cursor-pointer rounded-md px-3 py-2"
							target={section?.target || '_self'}
						>
							<span class="font-base text-base whitespace-nowrap text-black">{section.name}</span>
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
		/* transform: scale(1.2) rotate(180deg); */
		border-top-color: var(--accent-color);
		border-right-color: var(--accent-color);
	}
</style>
