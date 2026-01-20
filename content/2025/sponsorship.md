---
title: Sponsorship 2025
description: Sponsor the VizChitra 2025 Conference
year: 2025
---

<script>
	import sponsors from '$lib/data/sponsors2025.json' with { type: 'json' };
	import orgs from '$lib/data/orgs.json' with { type: 'json' };
	import yearsOfExperience from '$lib/data/years.json' with { type: 'json' };
	import functionalRoles from '$lib/data/roles.json' with { type: 'json' };
	import organizationSize from '$lib/data/size.json' with { type: 'json' };
	// Category colors for marquee
	const categoryColors = {
		'Academia, Education & Research': 'var(--color-yellow)',
		'Data & AI, Consulting & Services': 'var(--color-teal)',
		'Design, Media & Communication': 'var(--color-blue)',
		'Domain Specific Visualisation': 'var(--color-orange)',
		'Tool Builders & Creators': 'var(--color-pink)'
	};
	// Map orgs data for marquee
	const companies = orgs.map((org) => ({
		name: org.name,
		category: org.category,
		color: categoryColors[org.category]
	}));
	// Calculate category counts for legend
	const categoryCounts = companies.reduce((acc, company) => {
		acc[company.category] = (acc[company.category] || 0) + 1;
		return acc;
	}, {});
	const legendItems = Object.keys(categoryColors).map((category) => ({
		category,
		count: categoryCounts[category] || 0,
		color: categoryColors[category]
	}));
	// Split companies into marquee rows
	const marqueeRows = [
		{ items: companies.slice(0, 20), direction: 'right', duration: '80s' },
		{ items: companies.slice(20, 40), direction: 'left', duration: '80s' },
		{ items: companies.slice(40, 60), direction: 'right', duration: '80s' }
	];
	// Sponsorship form reasons
	const sponsorReasons = [
		'To reach out to key decision–makers/influencer',
		'To showcase our brand/offerings',
		'To launch our brand/product',
		'To showcase our employer brand',
		'To get feedback on our products and services',
		'To promote our courses/programs'
	];
	const sponsorFormFields = [
		{ name: 'full-name', label: 'Full name', type: 'text', placeholder: 'Ankit Sharma', required: true, autocomplete: 'name' },
		{ name: 'email', label: 'Email', type: 'email', placeholder: 'ankit.sharma@abc.com', required: true, autocomplete: 'email' },
		{ name: 'phone', label: 'Phone', type: 'tel', placeholder: '+91 9876543210', autocomplete: 'tel' },
		{ name: 'company', label: 'Company', type: 'text', placeholder: 'ABC Inc.', autocomplete: 'organization' },
		{ name: 'objective', label: 'Brand objective, ideas, budget, etc.', type: 'textarea', placeholder: 'Brand objective, ideas, budget, etc.', rows: 3 }
	];
</script>

<Header title="Sponsorship 2025" banner="polygon" />

<!-- Sponsor Button -->
<FullBleed>
	<div class="button-container bg-blue-light/10 relative flex h-[20svh] items-center justify-center">
		<button
			onclick={() => document.getElementById('sponsorship-contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
			class="bg-pink-dark hover:bg-pink-dark/90 center relative mt-sm mb-lg flex cursor-pointer rounded-sm px-md py-sm text-xl text-white italic"
		>
			Become a sponsor →
		</button>
		<img src="/images/patterns/header-2.png" alt="header polygon" class="absolute top-0 left-0 w-1/3 md:block md:w-1/6" />
		<img src="/images/patterns/header-1.png" alt="header polygon" class="absolute top-0 right-0 w-1/3 md:w-1/8" />
	</div>
</FullBleed>

<Grid columns={2}>
	<Card image="/images/icons/evangelise.png" alt="Evangelise" title="Evangelise Tools" color="blue">
		Evangelise your tools and solution to an engaged community
	</Card>
	<Card image="/images/icons/showcase.png" alt="Showcase" title="Showcase Innovation" color="yellow">
		Showcase your company's innovative work with Data Visualization
	</Card>
	<Card image="/images/icons/generate.png" alt="Generate" title="Lead Generation" color="pink">
		Generate leads & drive customer discovery in an underserved market
	</Card>
	<Card image="/images/icons/support.png" alt="Support" title="Community Support" color="teal">
		Support and grow the Data Visualization community
	</Card>
	<Card image="/images/icons/lead.png" alt="Lead" title="Thought Leadership" color="yellow">
		Build Thought & Industry Leadership for Data Visualization
	</Card>
	<Card image="/images/icons/connect.png" alt="Connect" title="Make Connections" color="black">
		Connect with future employees and collaborators
	</Card>
</Grid>

<Heading>Attendee Companies</Heading>

<!-- Attendee Marquee -->
<FullBleed>
	<section class="my-lg overflow-hidden py-lg">
		{#each marqueeRows as row}
			<MarqueeRow items={row.items} direction={row.direction} duration={row.duration} />
		{/each}
		<div class="mx-auto mt-md flex max-w-3xl flex-wrap justify-center gap-xs">
			{#each legendItems.sort((a, b) => b.count - a.count) as item}
				<div class="flex items-center gap-xs text-xs">
					<div class="flex size-6 items-center justify-center rounded-full" style="background-color: {item.color};">
						<span class="text-xs font-bold">{item.count}</span>
					</div>
					<span>{item.category}</span>
				</div>
			{/each}
		</div>
	</section>
</FullBleed>

<Heading>Attendee Profile</Heading>

<!-- Attendee Charts -->
<FullBleed>
	<Grid minWidth="300px" space="md" class="w-full">
		<div class="relative">
			<ColumnChart
				xkey="years"
				countKey="count"
				ykey="perc"
				data={yearsOfExperience}
				title="Years of Work Experience"
				maxValue={30}
				barColor="#a5b4fc"
				annotations={[{ text: '~70% of the attendees have more than 5+ years of work experience', position: 'bottom-right', style: 'color: #8b5cf6; max-width: 160px; width: 100%; font-size: 12px;' }]}
			/>
		</div>
		<div class="relative">
			<ColumnChart
				xkey="role"
				countKey="count"
				ykey="perc"
				data={functionalRoles}
				title="Functional Role at Work"
				maxValue={30}
				barColor="#f9a8d4"
				annotations={[{ text: 'Diverse participation with designers (~48%), followed by data & AI/BI professionals (~27%) & also journalists, educators and developers', position: 'bottom-right', style: 'color: #ec4899; max-width: 160px; width: 100%; font-size: 12px;' }]}
			/>
		</div>
		<div class="relative">
			<ColumnChart
				xkey="size"
				countKey="count"
				ykey="perc"
				data={organizationSize}
				title="Size of Work Organization"
				maxValue={30}
				barColor="#6ee7b7"
				annotations={[{ text: '~60% of the attendees are from enterprises and micro & solo orgs – covering both ends of the spectrum', position: 'bottom-right', style: 'color: #10b981; max-width: 160px; width: 100%; font-size: 12px;' }]}
			/>
		</div>
	</Grid>
</FullBleed>

<Heading>Sponsors & Partners</Heading>
<SubHeading>Organize the conference & Support the growth of the community.</SubHeading>

<Grid columns={2} space="sm">
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

<ContactForm
	formId="xzzgpgkb"
	heading="We're all ears…"
	checkboxOptions={sponsorReasons}
	checkboxName="reason"
	fields={sponsorFormFields}
	submitLabel="Contact Us"
	color="pink"
/>

<FullBleed>
	<SpeakerDeck
		id="4812baba218e4c14b34229497312bb67"
		title="Sponsor the Conference | VizChitra 2025"
		className="speakerdeck-iframe"
	/>
</FullBleed>
