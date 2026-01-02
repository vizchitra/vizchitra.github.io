---
title: Sponsorship 2025
description: Sponsor the VizChitra 2025 Conference
year: 2025
---

<script>
	import {Card, ColumnChart, SpeakerDeck} from '$lib/components/interface'
	import {Grid, FullBleed } from '$lib/components/layout';
	import {SponsorshipContactForm, SponsorCard, SponsorButton} from '$lib/components/sections';
	import {AttendeeCharts, AttendeeMarquee} from '$lib/components/sections';
	import {Heading, SubHeading} from '$lib/components/typography'
	import sponsors from '$lib/data/sponsors2025.json' with { type: 'json' };

</script>

<SponsorButton/>
<Grid columns={2} >
	<Card image="/images/icons/evangelise.png" alt="Evangelise" 
				title="Evangelise Tools" color="blue">
		Evangelise your tools and solution to an engaged community
	</Card>
	<Card image="/images/icons/showcase.png" alt="Showcase" 
				title="Showcase Innovation" color="yellow">
		Showcase your company's innovative work with Data Visualization
	</Card>
	<Card image="/images/icons/generate.png" alt="Generate" 
			  title="Lead Generation" color="pink">
		Generate leads & drive customer discovery in an underserved market
	</Card>
	<Card image="/images/icons/support.png" alt="Support" 
				title="Community Support" color="teal">
		Support and grow the Data Visualization community
	</Card>
	<Card image="/images/icons/lead.png" alt="Lead" 
				title="Thought Leadership" color="yellow">
		Build Thought & Industry Leadership for Data Visualization 
	</Card>
	<Card image="/images/icons/connect.png" alt="Connect" 
				title="Make Connections" color="black">
		Connect with future employees and collaborators
	</Card>
</Grid>

<Heading>Attendee Companies</Heading>

<FullBleed>
	<AttendeeMarquee/>
</FullBleed>

<Heading>Attendee Profile</Heading>

<FullBleed>
	<AttendeeCharts/>
</FullBleed>

<Heading>Sponsors & Partners</Heading>
<SubHeading>Organize the conference & Support the growth of the community.</SubHeading>

<Grid columns={2} gap={4}>
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

<SponsorshipContactForm />

<FullBleed>
	<SpeakerDeck
		id="4812baba218e4c14b34229497312bb67"
		title="Sponsor the Conference | VizChitra 2025"
		className="speakerdeck-iframe"
	/>
</FullBleed>
