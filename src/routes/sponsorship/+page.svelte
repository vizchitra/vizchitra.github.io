<script>
	import VizchitraLogo from '$lib/assets/images/viz-logo-animate.svg?raw';
	import HomepageSection from '$lib/components/Homepage/HomepageSection.svelte';
	import VizChitraLogoType from '$lib/components/VizChitraLogoType.svelte';
	import CustomSlantedText from '$lib/components/Common/CustomSlantedText.svelte';
	import SponsorshipPentagon from '$lib/components/SponsorshipPentagon.svelte';
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
	import yellowPolygon from './assets/yellow-pentagon.png';
	import pinkPolygon from './assets/pink-pentagon.png';
	const sponsorshipPolygons = [
		{
			title: 'Explore & Play',
			description: 'On practices of data exploration, interface & dashboard design for dataviz.',
			color: 'var(--color-viz-yellow)'
		},
		{
			title: 'Explain & Learn',
			description: 'Centered on fundamentals of process, design & communication for dataviz.',
			color: 'var(--color-viz-teal)'
		},
		{
			title: 'Imagine & Innovate',
			description: 'Use of new mediums, approaches, AI & tech to shape how we do dataviz in future',
			color: 'var(--color-viz-pink)'
		}
	];

	const companies = [
		'Times of India',
		'Economist',
		'BCC',
		'Deccan',
		'Herald',
		'Deccan',
		'Herald',
		'Clinton Health',
		'Cegis',
		'Flipkart',
		'Walmart',
		'Capital One',
		'S&P',
		'PhonePe',
		'Broadcom',
		'Ford',
		'Enphase',
		'Novo Nordisk',
		'Google',
		'Microsoft',
		'Wysa',
		'Fractal',
		'Infocept',
		'Tata Consultancy',
		'Tata Elxsi',
		'Madras',
		'ISB'
	];

	// Split companies into rows for marquee
	/** @type {Array<{items: string[], direction: 'right' | 'left'}>} */
	const marqueeRows = [
		{ items: companies.slice(0, 9), direction: 'right' },
		{ items: companies.slice(9, 18), direction: 'left' },
		{ items: companies.slice(18, 27), direction: 'right' }
	];

	// Attendee profile statistics
	const attendeeStats = [
		{
			percentage: '70',
			color: 'text-viz-pink-dark',
			description: 'of the attendees have more than 5+ years of work experience'
		},
		{
			percentage: '48',
			color: 'text-viz-blue-dark',
			description:
				'Diverse participation with designers, followed by data & AI/BI professionals (27%) & also journalists, educators and developers',
			hasEmphasis: true,
			emphasisText: 'Diverse'
		},
		{
			percentage: '60',
			color: 'text-viz-teal',
			description:
				'of the attendees are from enterprises and micro & solo orgs – covering both ends of the spectrum'
		}
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
	<img src={headerpolygon2} alt="header polygon" class="absolute top-0 left-0 hidden md:block" />
	<img src={headerpolygon1} alt="header polygon" class="absolute right-0 bottom-0" />
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
				class=" font-display-sans -mt-8 text-center text-4xl uppercase md:mt-0 md:text-left md:text-5xl"
			>
				<span class="font-bold italic">SPONSOR</span> OUR
				<span class="text-viz-blue-dark font-bold">CONFERENCE</span>
			</h1>
		</div>
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

	<!-- Pentagon section -->
	<section class="pentagon-section my-12">
		<div class="grid grid-cols-1 items-center justify-center gap-12 lg:grid-cols-3 lg:gap-8">
			{#each sponsorshipPolygons as polygon}
				<SponsorshipPentagon
					backgroundColor={polygon.color}
					title={polygon.title}
					description={polygon.description}
					seed={Math.floor(Math.random() * 1000)}
				/>
			{/each}
		</div>
	</section>

	<!-- Companies Marquee Section -->
	<section class="full-bleed my-20 overflow-hidden py-12">
		<div class="mb-8 text-center">
			<h3 class="font-display-sans text-3xl text-gray-700 md:text-4xl">
				<span class="font-bold italic">Attendee</span> company
			</h3>
		</div>

		{#each marqueeRows as row}
			<MarqueeRow items={row.items} direction={row.direction} />
		{/each}
	</section>

	<!-- Why sponsor section -->
	<section class="mx-auto my-20 max-w-4xl">
		<!-- Attendee Profile Section -->
		<div class="mb-20">
			<h3 class="font-display-sans mb-12 text-4xl text-gray-700 md:text-4xl">
				<span class="font-bold italic">Attendee</span> Profile
			</h3>

			<div class="grid grid-cols-1 gap-12 md:grid-cols-3">
				{#each attendeeStats as stat}
					<div class="text-left">
						<div class="mb-4">
							<span class="font-display-sans {stat.color} text-6xl font-bold md:text-7xl">
								{stat.percentage}
							</span>
							<span class="font-display-sans {stat.color} text-4xl font-bold md:text-5xl">%</span>
						</div>
						<p class="font-display-sans text-lg text-gray-700">
							{#if stat.hasEmphasis}
								<span class="font-bold italic">{stat.emphasisText}</span>
								{stat.description.replace(stat.emphasisText, '')}
							{:else}
								{stat.description}
							{/if}
						</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Strategic Partnership & Sponsors Section -->
		<section class=" my-20 py-16">
			<div class="mx-auto max-w-6xl">
				<!-- Strategic Partnership Header -->
				<div class="mb-16">
					<h3 class="font-display-sans mb-4 text-4xl text-gray-700 md:text-4xl">
						<span class="font-bold italic">Strategic Partnership</span> with
						<img src={hasgeekLogo} alt="HasGeek" class="mx-2 inline-block h-12 w-auto" />
					</h3>
					<p class="font-display-sans mt-4 text-xl text-gray-600">
						Organize the conference, Support the growth of the community.
					</p>
				</div>

				<!-- Platinum Sponsors -->
				<div class="mt-24 grid grid-cols-1 md:-ml-20 lg:max-w-5xl lg:grid-cols-2">
					<!-- Nutanix Sponsor -->
					<div class="relative my-20 -mr-22 flex items-center justify-center">
						<img
							src={pinkPolygon}
							alt="Pink polygon background"
							class="absolute size-150 object-contain"
						/>
						<div class="relative inset-0 flex flex-col items-center justify-center text-center">
							<p class="font-display-sans mb-4 text-lg font-medium text-gray-700">
								Platinum Sponsor
							</p>
							<img src={nutanixLogo} alt="Nutanix" class="h-16 w-auto max-w-40 object-contain" />
						</div>
					</div>

					<!-- Revisual Labs Sponsor -->
					<div class="relative my-20 -ml-22 flex items-center justify-center">
						<img
							src={yellowPolygon}
							alt="Yellow polygon background"
							class="absolute size-150 object-contain"
						/>
						<div class="relative inset-0 flex flex-col items-center justify-center text-center">
							<p class="font-display-sans mb-4 text-lg font-medium text-gray-700">
								Platinum Sponsor
							</p>
							<img
								src={revisualLogo}
								alt="Revisual Labs"
								class="h-16 w-auto max-w-40 object-contain"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
		<div class="mb-16">
			<h3 class="font-display-sans mb-4 text-4xl text-gray-700 md:text-4xl">
				<span class="font-bold italic">Why</span> sponsor?
			</h3>
			<p class="text-2xl text-gray-600">
				Benefits of sponsoring
				<span class="font-display-sans text-[#20887F]">
					<VizChitraLogoType yearClasses="text-[#20887F]"></VizChitraLogoType> Conference
				</span>
			</p>
		</div>
		<div class="benefits-grid grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
			{#each benefits as benefit}
				<div class="benefit-item flex items-center gap-6">
					<div class="icon-container flex-shrink-0">
						<img src={benefit.icon} alt={benefit.alt} class="h-20 w-20" />
					</div>
					<div class="content font-display-sans text-xl">
						{#if benefit.textFirst}
							<span class="text-gray-700">{benefit.text}</span>
							<span class="text-viz-pink-dark font-bold italic">{benefit.boldText}</span>
						{:else}
							<span class="text-viz-pink-dark font-bold italic">{benefit.boldText}</span>
							<span class="text-gray-700">{benefit.text}</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</section>
</main>

<style>
	.full-bleed {
		width: 100vw;
		margin-left: calc(50% - 50vw);
		margin-right: calc(50% - 50vw);
	}
</style>
