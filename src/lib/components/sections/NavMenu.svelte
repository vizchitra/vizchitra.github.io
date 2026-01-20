<script>
  import { LogoType, MobileNavDrawer } from "$lib/components";
  import { clickOutside } from "$lib/utils/actions";

  let navSections = $state([
    {
      name: "2026",
      href: "/2026/",
      accentColor: "var(--color-blue-dark)",
      subsections: [
        { name: "Event", href: "/2026/" },
        { name: "Proposals", href: "/2026/proposals" },
        { name: "Exhibition", href: "/2026/exhibition" },
      ],
      expanded: false,
    },
    {
      name: "2025",
      href: "/2025/conference",
      accentColor: "var(--color-orange-dark)",
      subsections: [
        { name: "Event", href: "/2025/" },
        { name: "Videos", href: "/2025/videos" },
        { name: "Schedule", href: "/2025/schedule" },
        { name: "Sponsorship", href: "/2025/sponsorship" },
      ],
      expanded: false,
    },
    {
      name: "About",
      href: "/about",
      accentColor: "var(--color-pink-dark)",
      subsections: [
        { name: "Our Ethos", href: "/ethos" },
        { name: "The Community", href: "/community" },
        { name: "Code of Conduct", href: "/conduct" },
        { name: "Meet the Team", href: "/team" },
        { name: "Tools & Patterns", href: "/tools" },
        { name: "Design System", href: "/design" },
      ],
      expanded: false,
    },
  ]);

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

<nav class="sticky top-0 right-0 left-0 z-50 bg-white">
  <div class="px-md lg:px-lg mx-auto max-w-7xl">
    <div class="py-sm flex items-center justify-between">
      <div class="flex">
        <a href="/" class="flex items-center text-3xl">
          <LogoType year={null} />
        </a>
      </div>

      <div
        class="mobile-drawer-container relative flex items-center justify-center"
      >
        <!-- <a
					href="https://hasgeek.com/VizChitra/2025/schedule"
					target="_blank"
					class="bg-viz-pink hover:bg-viz-pink/90 mr-3 inline-flex w-full items-center justify-center gap-sm rounded-lg border-[1px] border-[#666] px-sm py-xs text-base font-medium text-nowrap whitespace-nowrap text-white transition-all duration-200 hover:text-white sm:text-lg"
					>View Schedule</a
				> -->
        <MobileNavDrawer {navSections}></MobileNavDrawer>
      </div>

      <div
        class="desktop-drawer-container font-display ml-sm gap-xs flex items-center"
      >
        {#each navSections as section}
          {#if section?.subsections}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="dropdown-button-container relative"
              style:--accent-color={section.accentColor}
            >
              <button
                class="px-sm py-xs gap-xs flex cursor-pointer items-center rounded-md"
                onclick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(section.name);
                }}
                aria-haspopup="true"
                aria-expanded={section.expanded}
              >
                <span class="font-base text-grey-dark text-xl whitespace-nowrap"
                  >{section.name}</span
                >
                <span
                  style="transform-origin: 75% 25%;"
                  class:rotate-315={section.expanded}
                  class:scale-120={section.expanded}
                  class:expanded={section.expanded}
                  class="chevron border-t-grey-dark border-r-grey-dark h-3 w-3 translate-y-1/4 scale-110 rotate-135 rounded-none border-4 border-b-white border-l-white transition-transform"
                ></span>
              </button>
              {#if section.expanded}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <div
                  class="dropdown display-none px-md py-md absolute top-full right-0 z-10 flex-col rounded-md bg-white shadow-lg transition-all duration-200 ease-in-out {section.expanded
                    ? 'flex'
                    : 'hidden'}"
                  use:clickOutside
                  onoutsideclick={handleClickOutside}
                  onclick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {#each section.subsections as subsection}
                    <a
                      href={subsection.href}
                      class="px-xs py-xs w-full cursor-pointer"
                      target={subsection?.target || "_self"}
                    >
                      <span
                        class="text-grey-dark flex items-center gap-xs text-xl font-medium whitespace-nowrap"
                      >
                        {subsection.name}
                        {#if subsection.isBadge}
                          <span
                            class="ml-xs rounded-full border border-blue-500 bg-gradient-to-r from-blue-400 to-blue-600 px-xs.5 py-0.5 text-xs font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-105"
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
              class="px-sm py-xs cursor-pointer rounded-md"
              target={section?.target || "_self"}
            >
              <span
                class="font-base text-viz-grey-dark text-xl whitespace-nowrap"
                >{section.name}</span
              >
            </a>
          {/if}
        {/each}

        <!-- <a
					href="https://hasgeek.com/VizChitra/2025/schedule"
					target="_blank"
					class="bg-viz-pink hover:bg-viz-pink/90 ml-3 inline-flex w-full items-center justify-center gap-sm rounded-lg border-[1px] border-[#666] px-5 py-xs text-lg font-semibold text-nowrap whitespace-nowrap text-white transition-all duration-200 hover:text-white"
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
