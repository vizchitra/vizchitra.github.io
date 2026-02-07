<script lang="ts">
	import { Card, ColumnChart, SpeakerDeck } from '$lib/components/interface';
	import { Grid, FullBleed } from '$lib/components/layout';
	import { SponsorshipContactForm, SponsorCard, SponsorButton } from '$lib/components/sections';
	import { AttendeeCharts, AttendeeMarquee } from '$lib/components/sections';
	import { Heading, SubHeading } from '$lib/components/typography';
	import sponsors from '$lib/data/sponsors2025.json' with { type: 'json' };
	import { Header } from '$lib/components/structure';
	import DividerPolygon from '$lib/components/structure/DividerPolygon.svelte';
</script>

<div class="mx-auto max-w-7xl px-4">
	<Header title="Sponsorship 2025" banner="polygon" />

	<SponsorButton />

	<div class="max-w-4xl">
		<Grid columns={2}>
			<Card
				image="/images/icons/evangelise.png"
				alt="Evangelise"
				title="Evangelise Tools"
				color="blue"
			>
				Evangelise your tools and solution to an engaged community
			</Card>
			<Card
				image="/images/icons/showcase.png"
				alt="Showcase"
				title="Showcase Innovation"
				color="yellow"
			>
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
			<Card image="/images/icons/connect.png" alt="Connect" title="Make Connections" color="yellow">
				Connect with future employees and collaborators
			</Card>
		</Grid>
	</div>

	<DividerPolygon />

	<div class="py-4"></div>
	<Heading>Attendee Companies</Heading>

	<FullBleed>
		<AttendeeMarquee />
	</FullBleed>

	<Heading>Attendee Profile</Heading>

	<FullBleed>
		<AttendeeCharts />
	</FullBleed>

	<DividerPolygon />

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

	<DividerPolygon />

	<SponsorshipContactForm />

	<FullBleed>
		<SpeakerDeck
			id="4812baba218e4c14b34229497312bb67"
			title="Sponsor the Conference | VizChitra 2025"
			className="speakerdeck-iframe"
		/>
	</FullBleed>
</div>
