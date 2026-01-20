---
title: VizChitra 2025
description: India's first data visualization conference - June 27th, 2025 at Bangalore International Centre
image: /images/preview/vizchitra-preview.jpg
layout: full
---

<script lang="ts">
	import sponsors from '$lib/data/sponsors2025.json' with { type: 'json' };
	// FAQ items data
	const faqItems = [
		{
			title: 'What is VizChitra and who should attend?',
			content:
				"VizChitra is India's first data visualization conference bringing together practitioners from diverse industries and disciplines. Perfect for data analysts, designers, researchers, journalists, developers, and anyone passionate about visual storytelling with data."
		},
		{
			title: 'When and where is the conference taking place?',
			content:
				'The main conference is on June 27th, 2025 at Bangalore International Centre, Bengaluru. Workshops are held at two different locations: Samagata Foundation and Underline Center. Check the venue section for detailed addresses and transportation information.'
		},
		{
			title: "What's the difference between the conference and workshops?",
			content:
				"The conference features keynotes, talks, and networking opportunities focused on learning from industry experts. Workshops are hands-on, interactive sessions where you'll get practical experience with tools and techniques. Workshops have limited capacity and require separate registration."
		},
		{
			title: 'Do I need any technical background to attend?',
			content:
				"Not at all! VizChitra welcomes attendees from all backgrounds. Whether you're a complete beginner curious about data visualization or a seasoned professional, you'll find valuable content. Our sessions range from foundational concepts to advanced techniques."
		},
		{
			title: 'What should I bring to the conference?',
			content:
				'Just bring yourself and your curiosity! We recommend bringing a laptop if you plan to attend workshops, a notebook for taking notes, business cards for networking, and comfortable shoes for walking around the venues.'
		},
		{
			title: 'Are there networking opportunities?',
			content:
				"Absolutely! VizChitra is designed to foster connections within India's data visualization community. We'll have dedicated networking sessions, coffee breaks, lunch, and informal meetups throughout the event. It's a great opportunity to meet like-minded professionals and potential collaborators."
		}
	];
	// Marker data for maps
	const conferenceMarkers = [
		{
			id: 'conference',
			name: 'Bangalore International Centre',
			lnglat: { lng: 77.63523618257383, lat: 12.966827628489266 },
			address: '7, 4th Main Rd, Stage 2, Domlur, Bengaluru, Karnataka 560071',
			popupOpen: true
		}
	];
	const workshopMarkers = [
		{
			id: 'samagata',
			name: 'Samagata Foundation',
			lnglat: { lng: 77.6027528238416, lat: 12.97563511752492 },
			address:
				'46/1, Cobalt, 4th, Church St, Haridevpur, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001',
			popupOpen: true
		},
		{
			id: 'underline',
			name: 'Underline Center',
			lnglat: { lng: 77.63669336178374, lat: 12.967223289573266 },
			address:
				'3rd Floor, above Blue Tokai, #24 3rd A Cross, 1st Main Rd, Bengaluru, Karnataka 560071',
			popupOpen: true
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

<div class="banner-container full-bleed relative">
	<BannerPolygon />
	<div
		class="logo-container pointer-events-none"
	>
		<div class="logo">
			<InlineSvg name="viz-logo-animate.svg" />
		</div>

    	<h3
    		class="tagline"
    	>
    		<Slanted tag="h2" textContent="A SPACE TO CONNECT AND CREATE WITH DATA" />
    	</h3>
    </div>

</div>

<FullBleed>
  <CallToAction />
</FullBleed>

<div class="mt-xl flex flex-col items-center gap-xl">
	<!-- OPENING SECTION -->
	<HomepageSection>
		<div slot="content">
			<h1 id="intro">
				<LogoType></LogoType>
			</h1>

    		<p class="mb-lg font-[Cairo] text-2xl">
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

    		<p class="mx-auto mb-md">
    			<Slanted
    				tag="h2"
    				classes="text-[18px] md:text-[24px]"
    				textContent="A SPACE TO CONNECT AND CREATE WITH DATA"
    			/>
    		</p>

    		<p class="content-text mb-xs">
    			Our goal is to build a community of diverse, interdisciplinary individuals working across
    			the visualization spectrum, and facilitate learning and connections between people from
    			different industries and disciplines who share a common interest in the power of data and
    			storytelling.
    		</p>
    	</div>
    </HomepageSection>

<Heading tag="h2">KEYNOTES</Heading>x
<KeyNote/>

<Heading tag="h2">SPEAKERS</Heading>x

These are the voices you won't want to miss at <strong>Bangalore International Centre, Bengaluru</strong> on <strong>27<sup>th</sup> June</strong>

<FullBleed>	
	<Speakers2025/>
</FullBleed>

<Heading tag="h2">WORKSHOPS</Heading>x

<p class="content-text mb-xs">
	So much fun to look forward to! Bear in mind, workshops are located at <b
		>two different locations</b
	>. Do check ahead of time.
</p>

<FullBleed>	
	<Workshop2025/>
</FullBleed>

<!-- VENUES SECTION -->
<HomepageSection>
	<div slot="content">
		<h2 class="content-heading mb-md text-center !text-[2rem]">EVENT LOCATIONS</h2>
		<p class="content-text mb-lg text-center">
			The conference will be held at Bangalore International Centre, while workshops are at two
			different locations in the city.
		</p>
	</div>
</HomepageSection>

<!-- Conference Venue -->
<div class="w-full">
	<h3 class="mb-md text-center text-2xl font-bold text-black">Conference Venue</h3>
	<div class="mx-auto grid w-full grid-cols-1 gap-lg lg:grid-cols-3">
		<div class="lg:col-span-2">
			<div class="h-[380px] w-full overflow-hidden rounded-2xl">
				<Map markers={conferenceMarkers} height="h-[380px]" />
			</div>
		</div>
		<div class="lg:col-span-1">
			<VenueCard venue={conferenceVenue} />
		</div>
	</div>
</div>

<!-- Workshop Venues -->
<div class="mb-xl w-full">
	<h3 class="mb-md text-center text-2xl font-bold text-black">Workshop Locations</h3>
	<div class="mx-auto grid w-full grid-cols-1 gap-lg xl:grid-cols-8">
		{#each workshopVenues as venue, index}
			<div class="order-2 lg:col-span-1 xl:order-none xl:col-span-2">
				<VenueCard {venue} {index} />
			</div>
		{/each}
		<div class="order-1 lg:col-span-1 xl:order-none xl:col-span-4">
			<div class="h-full w-full overflow-hidden rounded-2xl">
				<Map markers={workshopMarkers} height="h-full" />
			</div>
		</div>
	</div>
</div>

<div class="mx-auto flex max-w-4xl flex-wrap gap-sm">
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

<Grid columns={2} space="sm" class="ml-0 pb-sm md:-ml-12 md:pb-0 lg:max-w-4xl">
	{#each sponsors as sponsor}
		<SponsorCard
			heading={sponsor.heading}
			logo={sponsor.logo}
			logoType="image"
			variant={sponsor.variant}
			seed={sponsor.seed}
		/>
	{/each}
</Grid>

</div>

<Heading tag="h2">FREQUENTLY ASKED QUESTIONS</Heading>

<p>Got questions? We've got answers! Here are some common questions about VizChitra.</p>

<Accordion items={faqItems} />

<style>
	.banner-container {
		width: 100vw;
		height: 100svh;
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

	.logo-container {
		position: absolute;
		top: 33.333333%;
		left: 50%;
		margin-bottom: var(--spacing-xs);
		display: flex;
		transform: translate(-50%, -33.333333%);
		flex-direction: column;
		align-items: center;
		border-radius: var(--radius-md);
		background-color: white;
		padding-left: var(--spacing-xs);
		padding-right: var(--spacing-xs);
		padding-top: var(--spacing-xs);
		padding-bottom: var(--spacing-sm);
		box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
	}

	@media (min-width: 768px) {
		.logo-container {
			max-width: none;
			flex-direction: row;
			gap: 0;
			padding-left: var(--spacing-lg);
			padding-right: var(--spacing-lg);
		}
	}

	.tagline {
		margin-top: -2rem;
		max-width: 20ch;
		border-color: black;
		text-align: center;
		text-transform: uppercase;
	}

	@media (min-width: 768px) {
		.tagline {
			margin-top: 0;
			border-left: 2px solid black;
			padding-left: var(--spacing-md);
			text-align: left;
		}
	}
</style>
