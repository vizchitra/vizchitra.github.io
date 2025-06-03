<script lang="ts">
	import VizchitraLogo from '$lib/assets/images/viz-logo-animate.svg?raw';
	import HomepageSection from '$lib/components/Homepage/HomepageSection.svelte';
	import VizChitraLogoType from '$lib/components/VizChitraLogoType.svelte';
	import CustomSlantedText from '$lib/components/Common/CustomSlantedText.svelte';
	import MarqueeRow from '$lib/components/Common/MarqueeRow.svelte';
	import headerpolygon1 from './assets/header-1.png';
	import headerpolygon2 from './assets/header-2.png';
	import evangelise from './assets/evangelise.png';
	import support from './assets/support.png';
	import showcase from './assets/showcase.png';
	import leadGeneration from './assets/lead-generation.png';
	import connect from './assets/connect.png';
	import industryLeader from './assets/industry-leader.png';
	import hasgeekLogo from './assets/hasgeek-logo.png';
	import nutanixLogo from './assets/nutanix-logo.png';
	import revisualLogo from './assets/revisual-logo.png';
	import orgs from '$lib/data/orgs.csv';
	import yearsOfExperience from '$lib/data/years.csv';
	import organizationSize from '$lib/data/size.csv';
	import functionalRoles from '$lib/data/roles.csv';
	import HorizontalBarChart from '$lib/components/Charts/HorizontalBarChart.svelte';
	import SponsorshipContactForm from '$lib/components/Common/SponsorshipContactForm.svelte';
	import SponsorCard from '$lib/components/SponsorCards.svelte';
	// Define a mapping from categories to colors
	const categoryColors = {
		'Academia, Education & Research': 'var(--color-viz-yellow)',
		'Data & AI, Consulting & Services': 'var(--color-viz-teal)',
		'Design, Media & Communication': 'var(--color-viz-blue)',
		'Domain Specific Visualisation': 'var(--color-viz-orange)',
		'Tool Builders & Creators': 'var(--color-viz-pink)'
	};

	// Map the orgs data to an array of company objects including category and color
	const companies = orgs.map((org: { name: string; category: string }) => ({
		name: org.name,
		category: org.category,
		color: categoryColors[org.category as keyof typeof categoryColors]
	}));

	// Calculate category counts
	const categoryCounts = companies.reduce(
		(acc, company) => {
			acc[company.category] = (acc[company.category] || 0) + 1;
			return acc;
		},
		{} as Record<string, number>
	);

	// Prepare legend data
	const legendItems = Object.keys(categoryColors).map((category) => ({
		category,
		count: categoryCounts[category] || 0,
		color: categoryColors[category as keyof typeof categoryColors]
	}));

	console.log(companies);
	// Split companies into rows for marquee
	/** @type {Array<{items: {name: string, category: string, color: string}[], direction: 'right' | 'left'}>} */
	const marqueeRows = [
		{ items: companies.slice(0, 20), direction: 'right', duration: '80s' },
		{ items: companies.slice(20, 40), direction: 'left', duration: '80s' },
		{ items: companies.slice(40, 60), direction: 'right', duration: '80s' }
	];

	const benefits = [
		{
			icon: evangelise,
			alt: 'Evangelise tools',
			boldText: 'Evangelise your tools',
			text: 'and solution to an engaged community'
		},
		{
			icon: showcase,
			alt: 'Showcase innovation',
			boldText: "Showcase your company's innovative work",
			text: 'with Data Visualization'
		},
		{
			icon: leadGeneration,
			alt: 'Lead generation',
			boldText: 'Lead generation',
			text: 'and & customer discovery in an underserved market'
		},
		{
			icon: support,
			alt: 'Support and grow',
			boldText: 'Support and grow',
			text: 'and the community'
		},
		{
			icon: industryLeader,
			alt: 'Industry leader',
			boldText: 'Industry leader',
			text: 'Be identified as an ',
			textFirst: true
		},
		{
			icon: connect,
			alt: 'Connect',
			boldText: 'Connect',
			text: 'and with future employees and collaborators'
		}
	];
</script>

<div class="banner-container full-bleed relative h-[80svh]">
	<img
		src={headerpolygon2}
		alt="header polygon"
		class="absolute top-0 left-0 w-1/3 md:block md:w-1/6"
	/>
	<img src={headerpolygon1} alt="header polygon" class="absolute right-0 bottom-0 w-1/3 md:w-1/8" />
	<div
		class="logo-container pointer-events-none absolute top-1/3 left-1/2 mb-2 flex max-w-2xl -translate-x-1/2 -translate-y-1/3 flex-col items-center bg-white px-4 pt-4 pb-6 md:flex-row md:gap-0"
	>
		<div class="logo">
			{@html VizchitraLogo}
		</div>

		<div
			class="content-container flex w-fit flex-col items-center md:items-start md:border-l-2 md:border-black"
		>
			<h1
				class="font-display-sans -mt-8 text-center text-4xl uppercase md:mt-0 md:text-left md:text-5xl"
			>
				<span class="font-bold italic">SPONSOR</span> OUR
				<span class="text-viz-blue-dark font-bold">CONFERENCE</span>
			</h1>
		</div>
	</div>
	<div
		class="logo-container absolute bottom-0 left-1/2 mb-2 flex max-w-2xl -translate-x-1/2 -translate-y-1/3 flex-col items-center bg-white px-4 pt-4 pb-6 md:bottom-[20%] md:flex-row md:gap-0"
	>
		<button
			on:click={() => {
				document.getElementById('sponsorship-contact-form')?.scrollIntoView({
					behavior: 'smooth',
					block: 'center'
				});
			}}
			class="bg-viz-pink-dark hover:bg-viz-pink-dark/90 w-full cursor-pointer rounded-sm px-6 py-4 text-xl text-white italic"
		>
			Become a sponsor →
		</button>
	</div>
</div>

<main id="sponsorship-details" class="mx-auto max-w-4xl px-4 py-20">
	<HomepageSection>
		<div slot="content">
			<h1 id="intro">
				<VizChitraLogoType></VizChitraLogoType>
			</h1>

			<p class="mb-8 font-[Cairo] text-2xl">
				India's first conference dedicated to <span class="text-viz-pink-dark font-bold"
					>data visualization</span
				>
				brings together practitioners from
				<span class="text-viz-orange font-bold">diverse industries and disciplines</span>
				across the country to foster
				<span class="text-viz-orange font-bold">learning, collaboration,</span>
				and a shared passion for the art of
				<span class="text-viz-pink-dark font-bold">visual data storytelling.</span>
			</p>

			<p class="mx-auto mb-6">
				<CustomSlantedText
					textContent="A SPACE TO CONNECT AND CREATE WITH DATA"
					classes="text-[18px] md:text-[24px]"
				></CustomSlantedText>
			</p>

			<p class="content-text mb-1">
				Our goal is to build a community of diverse, interdisciplinary individuals working across
				the visualization spectrum, and facilitate learning and connections between people from
				different industries and disciplines who share a common interest in the power of data and
				storytelling.
			</p>
		</div>
	</HomepageSection>

	<div class="benefits-grid mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
		{#each benefits as benefit}
			<div class="benefit-item flex items-center gap-6">
				<div class="icon-container flex-shrink-0">
					<img src={benefit.icon} alt={benefit.alt} class="h-20 w-20" />
				</div>
				<div class="content content-text">
					{#if benefit.textFirst}
						<span>{benefit.text}</span>
						<span class="text-viz-pink-dark font-bold italic">{benefit.boldText}</span>
					{:else}
						<span class="text-viz-pink-dark font-bold italic">{benefit.boldText}</span>
						<span>{benefit.text}</span>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<!-- Companies Marquee Section -->
	<section class="full-bleed my-12 overflow-hidden py-12">
		<div class="mx-auto mb-8 max-w-4xl text-center">
			<h2 class="content-heading !text-[2rem]">
				<span class="font-bold italic">Attendee</span> company
			</h2>
		</div>

		{#each marqueeRows as row}
			<MarqueeRow items={row.items} direction={row.direction} duration={row.duration} />
		{/each}
		<div class="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2">
			{#each legendItems.sort((a, b) => b.count - a.count) as item}
				<div class="flex items-center gap-2 text-xs">
					<div
						class="flex size-6 items-center justify-center rounded-full"
						style="background-color: {item.color};"
					>
						<span class="text-xs font-bold">{item.count}</span>
					</div>
					<span>{item.category} </span>
				</div>
			{/each}
		</div>
	</section>

	<!-- Legend Section -->

	<div class="full-bleed mx-auto mb-20 md:px-12">
		<h2 class="content-heading mx-auto mb-12 max-w-2xl text-center !text-[2rem]">
			<span class="font-bold italic">Attendee</span> Profile
		</h2>

		<div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
			<!-- Years of Experience Chart -->
			<div class="relative">
				<HorizontalBarChart
					xkey="years"
					countKey="count"
					ykey="perc"
					data={yearsOfExperience}
					title="Years of Work Experience"
					maxValue={30}
					barColor="#a5b4fc"
					annotations={[
						{
							text: '~70% of the attendees have more than 5+ years of work experience',
							position: 'bottom-right',
							style: 'color: #8b5cf6; max-width: 160px; width: 100%; font-size: 12px;'
						}
					]}
				/>
			</div>

			<!-- Functional Role Chart -->
			<div class="relative">
				<HorizontalBarChart
					xkey="role"
					countKey="count"
					ykey="perc"
					data={functionalRoles}
					title="Functional Role at Work"
					maxValue={30}
					barColor="#f9a8d4"
					annotations={[
						{
							text: 'Diverse participation with designers (~48%), followed by data & AI/BI professionals (~27%) & also journalists, educators and developers',
							position: 'bottom-right',
							style: 'color: #ec4899; max-width: 160px; width: 100%; font-size: 12px;'
						}
					]}
				/>
			</div>

			<!-- Organization Size Chart -->
			<div class="relative">
				<HorizontalBarChart
					xkey="size"
					countKey="count"
					ykey="perc"
					data={organizationSize}
					title="Size of Work Organization"
					maxValue={30}
					barColor="#6ee7b7"
					annotations={[
						{
							text: '~60% of the attendees are from enterprises and micro & solo orgs – covering both ends of the spectrum',
							position: 'bottom-right',
							style: 'color: #10b981; max-width: 160px; width: 100%; font-size: 12px;'
						}
					]}
				/>
			</div>
		</div>
	</div>

	<section class="mx-auto max-w-4xl">
		<section class="my-8 md:my-4">
			<div class="mx-auto max-w-6xl overflow-hidden">
				<div class="mb-16 text-center">
					<h2 class="content-heading mb-4 text-center !text-[2rem]">
						<span class="font-bold italic">Strategic Partnership</span> with
						<img src={hasgeekLogo} alt="HasGeek" class="mx-2 inline-block h-12 w-auto" />
					</h2>
					<p class="content-text mx-auto max-w-2xl">
						Organize the conference, Support the growth of the community.
					</p>
				</div>
				<div class="mx-auto grid grid-cols-1 pb-4 md:pb-0 lg:max-w-2xl lg:grid-cols-2">
					<SponsorCard
						heading="Platinum Sponsor"
						logo={nutanixLogo}
						logoType="image"
						variant="pink"
						seed={343442}
					/>

					<SponsorCard
						heading="Silver Sponsor"
						logo={revisualLogo}
						logoType="image"
						variant="yellow"
						seed={343554354}
					/>

					<!-- HasGeek -->
					<SponsorCard
						heading="Event Partner"
						logo={hasgeekLogo}
						logoType="image"
						variant="blue"
						seed={342}
					/>

					<SponsorCard
						heading="Affiliate Partner"
						logo="https://images.squarespace-cdn.com/content/v1/5c6055b5fb18206d45d6b27e/1562601203642-ZHLHUGGYNWOIZHZK46U9/Data+Visualization+Society+logo+2019-05-transparent.png"
						logoType="image"
						variant="green"
						seed={34435432}
					/>
				</div>
			</div>
		</section>
	</section>
</main>

<SponsorshipContactForm />

<iframe
	class="speakerdeck-iframe"
	frameborder="0"
	src="https://speakerdeck.com/player/4812baba218e4c14b34229497312bb67"
	title="Sponsor the Conference | VizChitra 2025"
	allowfullscreen
	style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 315;"
	data-ratio="1.7777777777777777"
></iframe>

<style>
	.full-bleed {
		width: 100vw;
		margin-left: calc(50% - 50vw);
		margin-right: calc(50% - 50vw);
	}

	:global(html) {
		scroll-behavior: smooth;
	}
</style>
