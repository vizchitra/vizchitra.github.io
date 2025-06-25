<script lang="ts">
	import BannerPolygon from '$lib/components/BannerPolygon.svelte';
	import VizchitraLogo from '$lib/assets/images/viz-logo-animate.svg?raw';
	import CallToAction from '$lib/components/CallToAction.svelte';
	import VizChitraLogoType from '$lib/components/VizChitraLogoType.svelte';
	import HomepageSection from '$lib/components/Homepage/HomepageSection.svelte';
	import CustomSlantedText from '$lib/components/Common/CustomSlantedText.svelte';
	import KeyNote from '$lib/components/LineUp/KeyNote.svelte';
	import Speakers2025 from '$lib/components/LineUp/Speakers2025.svelte';
	import Workshop2025 from '$lib/components/LineUp/Workshop2025.svelte';
	import SponsorCard from '$lib/components/SponsorCards.svelte';
	import nutanixLogo from './sponsorship/assets/nutanix-logo.png';
	import revisualLogo from './sponsorship/assets/revisual-logo.png';	
	import lightningChartLogo from './sponsorship/assets/lightning-chart-logo.png';
	import hasgeekLogo from './sponsorship/assets/hasgeek-logo.png';
	import Pentagons from '$lib/components/Pentagons.svelte';
	import Map from '$lib/components/Map.svelte';
	import VenueCard from '$lib/components/VenueCard.svelte';
	import FAQ from '$lib/components/FAQ.svelte';
	import lillyLogo from './sponsorship/assets/lilly-logo.png';
	import ltsLogo from './sponsorship/assets/lasttheoram-logo.png';

	const sponsors = [
		{
			heading: 'Platinum Sponsor',
			logo: nutanixLogo,
			variant: 'pink' as const,
			seed: 343442
		},
		{
			heading: 'Gold Sponsor',
			logo: lillyLogo,
			variant: 'white' as const,
			seed: 3434
		},
		{
			heading: 'Silver & Diversity Sponsor',
			logo: revisualLogo,
			variant: 'yellow' as const,
			seed: 343554354
		},
		{
			heading: 'Bronze Sponsor',
			logo: lightningChartLogo,
			variant: 'orange' as const,
			seed: 343554354
		},
		{
			heading: 'Event Partner',
			logo: hasgeekLogo,
			variant: 'blue' as const,
			seed: 342
		},
		{
			heading: 'A Local Affliate for',
			logo: 'https://images.squarespace-cdn.com/content/v1/5c6055b5fb18206d45d6b27e/1562601203642-ZHLHUGGYNWOIZHZK46U9/Data+Visualization+Society+logo+2019-05-transparent.png',
			variant: 'green' as const,
			seed: 34435432
		},
		{
			heading: 'Media Partner',
			logo: ltsLogo,
			variant: 'orange' as const,
			seed: 34435432
		}
	];

	const whyAttend = [
		{
			title: 'Explore & Play',
			description: 'On practices of data exploration, interface & dashboard design for dataviz.',
			backgroundColor: 'var(--color-viz-pink)'
		},
		{
			title: 'Explain & Learn',
			description: 'Centered on fundamentals of process, design & communication for dataviz.',
			backgroundColor: 'var(--color-viz-yellow)'
		},
		{
			title: 'Imagine & Innovate',
			description:
				'Use of new mediums, approaches, AI & tech to shape how we do dataviz in future.',
			backgroundColor: 'var(--color-viz-blue)'
		}
	];

	// Consolidated venue data
	const conferenceVenue = {
		name: 'Bangalore International Centre',
		address: '7, 4th Main Rd, Stage 2, Domlur, Bengaluru, Karnataka 560071',
		googleMapsURL: 'https://maps.app.goo.gl/duqbbwf2Hi3Q8dcSA',
		transportation: [
			{
				method: 'Metro',
				details: 'Indiranagar Metro Station (Purple Line) - 20 min walk'
			},
			{
				method: 'Bus',
				details: 'Buses 335-E, 333-E, 201-G, Domlur Bridge stop'
			},
			{
				method: 'Auto/Cab',
				details: 'Ask for Bangalore International Centre'
			}
		]
	};

	const workshopVenues = [
		{
			name: 'Samagata Foundation',
			address:
				'46/1, Cobalt, 4th, Church St, Haridevpur, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001',
			googleMapsURL: 'https://maps.app.goo.gl/4vnThEKY916vymQn6',
			transportation: [
				{
					method: 'Metro',
					details: 'MG Road Metro Station (Purple Line) - 5 min walk'
				},
				{
					method: 'Bus',
					details: 'Buses 210-G, 13, Chinnaswamy Stadium/MG Statue stop'
				},
				{
					method: 'Cab',
					details: 'Ask for Empire Restaurant on Church Street'
				}
			]
		},
		{
			name: 'Underline Center',
			address:
				'3rd Floor, above Blue Tokai, #24 3rd A Cross, 1st Main Rd, Bengaluru, Karnataka 560071',
			googleMapsURL: 'https://maps.app.goo.gl/NmHhknNLt5y2xCE89',
			transportation: [
				{
					method: 'Metro',
					details: 'Indiranagar Metro Station (Purple Line) - 20 min walk'
				},
				{
					method: 'Bus',
					details: 'Buses 335-E, 333-E, 201-G, Domlur Bridge stop'
				},
				{
					method: 'Cab',
					details: 'Ask for Bangalore International Centre'
				}
			]
		}
	];
</script>

<div class="banner-container full-bleed relative h-[100svh]">
	<BannerPolygon />
	<div
		class="logo-container pointer-events-none absolute top-1/3 left-1/2 mb-2 flex -translate-x-1/2 -translate-y-1/3 flex-col items-center rounded-md bg-white px-2 pt-2 pb-4 shadow-lg md:max-w-none md:flex-row md:gap-0 md:px-8"
	>
		<div class="logo">
			{@html VizchitraLogo}
		</div>

		<h3
			class="tagline -mt-8 max-w-[20ch] border-black text-center uppercase md:mt-0 md:border-l-2 md:pl-5 md:text-left"
		>
			<CustomSlantedText textContent="A SPACE TO CONNECT AND CREATE WITH DATA"></CustomSlantedText>
		</h3>
	</div>
</div>

<CallToAction />

<div class="mt-20 flex flex-col items-center gap-10">
	<!-- OPENING SECTION -->
	<HomepageSection>
		<div slot="content">
			<h1 id="intro">
				<VizChitraLogoType></VizChitraLogoType>
			</h1>

			<p class="mb-8 font-[Cairo] text-2xl">
				This first India conference brings <span class="text-viz-pink-dark font-bold"
					>data visualization practitioners</span
				>
				from across India, representing
				<span class="text-viz-orange font-bold">different industries and disciplines,</span>
				together to facilitate
				<span class="text-viz-orange font-bold">learning and connections</span>
				around a common interest in the power of
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

			<!-- <PolygonDivider></PolygonDivider> -->
		</div>
	</HomepageSection>

	<HomepageSection>
		<div slot="content">
			<h2 id="speakers" class="content-heading !text-[2rem]">KEYNOTES</h2>
		</div>
	</HomepageSection>

	<KeyNote></KeyNote>

	<HomepageSection>
		<div slot="content">
			<h2 class="content-heading !text-[2rem]">Speakers</h2>

			<p class="content-text mb-1">
				These are the voices you won't want to miss at <strong
					>Bangalore International Centre, Bengaluru</strong
				>
				on <strong>27<sup>th</sup> June</strong>
			</p>
		</div>
	</HomepageSection>

	<Speakers2025></Speakers2025>

	<HomepageSection>
		<div slot="content">
			<h2 id="workshops" class="content-heading !text-[2rem]">WORKSHOPS</h2>
			<p class="content-text mb-1">
				So much fun to look forward to! Bear in mind, workshops are located at <b
					>two different locations</b
				>. Do check ahead of time.
			</p>
		</div>
	</HomepageSection>

	<Workshop2025></Workshop2025>

	<!-- VENUES SECTION -->
	<HomepageSection>
		<div slot="content">
			<h2 class="content-heading mb-6 text-center !text-[2rem]">EVENT LOCATIONS</h2>
			<p class="content-text mb-8 text-center">
				The conference will be held at Bangalore International Centre, while workshops are at two
				different locations in the city.
			</p>
		</div>
	</HomepageSection>

	<!-- Conference Venue -->
	<div class="w-full">
		<h3 class="mb-6 text-center text-2xl font-bold text-gray-800">Conference Venue</h3>
		<div class="mx-auto grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
			<div class="lg:col-span-2">
				<div class="h-[380px] w-full overflow-hidden rounded-2xl">
					<Map type="conference" />
				</div>
			</div>
			<div class="lg:col-span-1">
				<VenueCard venue={conferenceVenue} />
			</div>
		</div>
	</div>

	<!-- Workshop Venues -->
	<div class="mb-10 w-full">
		<h3 class="mb-6 text-center text-2xl font-bold text-gray-800">Workshop Locations</h3>
		<div class="mx-auto grid w-full grid-cols-1 gap-8 xl:grid-cols-8">
			{#each workshopVenues as venue, index}
				<div class="order-2 lg:col-span-1 xl:order-none xl:col-span-2">
					<VenueCard {venue} {index} />
				</div>
			{/each}
			<div class="order-1 lg:col-span-1 xl:order-none xl:col-span-4">
				<div class="h-full w-full overflow-hidden rounded-2xl">
					<Map type="workshop" />
				</div>
			</div>
		</div>
	</div>

	<div class="mx-auto flex max-w-4xl flex-wrap gap-4">
		{#each whyAttend as item, i}
			<Pentagons
				title={item.title}
				description={item.description}
				backgroundColor={item.backgroundColor}
				seed={Math.floor(Math.random() * 10)}
			/>
		{/each}
	</div>
	<h2 class="content-heading text-center !text-[2rem]">
		Our <span class="font-bold italic">valued partners</span>
	</h2>

	<div class="mx-auto">
		<div
			class="ml-0 grid grid-cols-2 gap-2 pb-4 md:-ml-12 md:gap-4 md:pb-0 lg:max-w-4xl lg:grid-cols-2"
		>
			{#each sponsors as sponsor}
				<SponsorCard
					heading={sponsor.heading}
					logo={sponsor.logo}
					logoType="image"
					variant={sponsor.variant}
					seed={sponsor.seed}
				/>
			{/each}
		</div>
	</div>

	<!-- FAQs SECTION -->
	<HomepageSection>
		<div slot="content">
			<h2 class="content-heading mt-16 mb-8 text-center !text-[2rem]">
				FREQUENTLY ASKED QUESTIONS
			</h2>
			<p class="content-text mb-8 text-center">
				Got questions? We've got answers! Here are some common questions about VizChitra.
			</p>
		</div>
	</HomepageSection>
</div>
<div class=" w-full">
	<FAQ />
</div>

<style>
	.banner-container {
		width: 100vw;
		position: relative;
	}

	.banner-container::before,
	.banner-container::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		height: 25vh;
		pointer-events: none;
		z-index: 1;
	}

	@media (min-width: 768px) {
		.banner-container::before,
		.banner-container::after {
			height: 40vh;
		}
	}

	.banner-container::before {
		top: 0;
		background: linear-gradient(
			to bottom,
			rgb(255 255 255) 0%,
			rgba(255, 255, 255, 0.8) 5%,
			transparent 100%
		);
	}

	.banner-container::after {
		bottom: 0;
		background: linear-gradient(
			to top,
			rgb(255 255 255) 0%,
			rgba(255, 255, 255, 0.8) 5%,
			transparent 100%
		);
	}
</style>
