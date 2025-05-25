<script>
	import { slideInDrawer } from '$lib/utils/actions';

	export let navSections = null;

	const colors = ['#ffd485', '#97e4dd', '#a8bdf0', '#f89f72', '#ee88b3'];
	let width = null;
	let height = 16;

	let expanded = false;
</script>

<button
	class="trigger h-full w-full cursor-pointer"
	class:expanded
	on:click={(expanded = !expanded)}
	aria-label="Toggle navigation"
>
	<span class=""></span>
	<span class=""></span>
	<span class=""></span>
</button>

{#if expanded}
	<div
		class="drawer font-display absolute right-[-16px] flex max-h-[90dvh] flex-col gap-2 overflow-auto rounded-lg border-[1px] border-[#ddd] bg-white p-4 shadow-lg sm:right-[-24px] lg:right-[-32px]"
		use:slideInDrawer
	>
		{#each navSections as section}
			{@const pointX = (0.3 + Math.random() * 0.7) * 100}
			{@const lineColor1 = colors[Math.floor(Math.random() * colors.length)]}
			{@const lineColor2 = colors[Math.floor(Math.random() * colors.length)]}

			<div class="nav-section">
				<div class="links mb-1">
					{#if section?.subsections}
						<span class="w-full text-left">
							<span class="font-base text-2xl whitespace-nowrap text-[#4C4C4C]">{section.name}</span
							>
						</span>
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="sub-section-list relative flex flex-col rounded-md bg-white px-3 py-3"
							style:--accent-color={section.accentColor}
						>
							{#each section.subsections as subsection}
								<a href={subsection.href} class="subsection w-full cursor-pointer py-2">
									<span class="font-base text-xl whitespace-nowrap text-[#4C4C4C]"
										>{subsection.name}</span
									>
								</a>
							{/each}
						</div>
					{:else}
						<a
							href={section.href}
							class="cursor-pointer rounded-md"
							target={section?.target || '_self'}
						>
							<span class="font-base text-2xl whitespace-nowrap text-[#4C4C4C]">{section.name}</span
							>
						</a>
					{/if}
				</div>

				<div class="polygon-divider mb-2 w-full" bind:clientWidth={width}>
					<svg {width} {height} viewBox="0 0 {width} {height}" preserveAspectRatio="xMidYMid meet">
						<line
							x1={0}
							y1={height / 2}
							x2="{pointX}%"
							y2={height / 2}
							stroke={lineColor1}
							stroke-width={8}
						></line>
						<line
							x1="{pointX}%"
							y1={height / 2}
							x2={width}
							y2={height / 2}
							stroke={lineColor2}
							stroke-width={8}
						></line>

						<circle cx="{pointX}%" cy="50%" r={5 + 4} fill={'white'}></circle>
						<circle cx="{pointX}%" cy="50%" r={5} fill={'#4c4c4c'}></circle>
					</svg>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.drawer {
		top: calc(100% + 2px);
		transform: translateX(100%);
		transition: transform 0.3s ease-in-out;
	}

	:global(.drawer.slide-in) {
		transform: translateX(0);
	}

	button.trigger {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;

		height: 14px;
	}

	button.trigger span {
		--translate-amount: 6px;

		display: block;
		width: 18px;
		height: 2px;
		background-color: #4c4c4c;
		transition: transform 0.3s ease-in-out;
	}

	button.trigger.expanded span:nth-of-type(1) {
		transform: translateY(var(--translate-amount)) rotateZ(45deg);
	}
	button.trigger.expanded span:nth-of-type(2) {
		transform: rotateY(90deg);
	}
	button.trigger.expanded span:nth-of-type(3) {
		transform: translateY(calc(-1 * var(--translate-amount))) rotate(-45deg);
	}
</style>
