<script lang="ts">
	import { Button } from '$lib/components/interface';
	import { RecapVideo, Mission } from '$lib/components/sections';
	import { DividerCurves, Hero } from '$lib/components/structure';
	import { Slanted, SubHeading, Heading, LogoType, Text } from '$lib/components/typography';
	import { Container, Stack, Cluster } from '$lib/components/layout';
	import FullBleed from '$lib/components/layout/FullBleed.svelte';
</script>

<Hero banner="curve" />

<Container>
	<Stack>
		<Heading tag="h1" align="center">
			<LogoType year={2026} />
		</Heading>

		<Text type="lead" align="center">
			India's community-driven conference dedicated to <span class="text-viz-yellow-dark font-bold"
				>data visualization</span
			>
			is back again in <span class="text-viz-teal-dark font-bold">2026</span>. This flagship event
			over
			<span class="text-viz-blue-dark font-bold">two days</span>
			will be in <span class="text-viz-orange-dark font-bold">Bangalore</span> on
			<span class="text-viz-pink-dark font-bold">3rd & 4th July, 2026 </span>
		</Text>

		<Cluster>
			<Button href="/2026" color="pink">Go to our 2026 page</Button>
		</Cluster>

		<DividerCurves />

		<Heading align="center">
			<LogoType year={2025} />
		</Heading>

		<Text type="lead" align="center">Missed the event last year. See the highlights below.</Text>

		<FullBleed paddingY="md">
			<RecapVideo />
		</FullBleed>

		<Heading tag="h2" align="center">
			Our Ethos @ <LogoType />
		</Heading>

		<Text type="lead">
			Our goal is to build a community of diverse, interdisciplinary individuals working across the
			visualization spectrum, and facilitate learning and connections between people from different
			industries and disciplines who share a common interest in the power of data and storytelling.
		</Text>

		<Heading tag="h3" align="center" class="font-normal">
			<Slanted textContent="A SPACE TO CONNECT AND CREATE WITH DATA" />
		</Heading>

		<DividerCurves />

		<Heading align="center">
			Our Mission @ <LogoType />
		</Heading>

		<Text type="lead" align="center">
			To foster a vibrant <span class="font-bold">community of data storytellers in India</span>
			bridging technical analysis and design expertise to shape perspectives and drive change
		</Text>

		<Heading tag="h3" align="center" class="font-normal">
			<Slanted color="black" textContent="BUILD AN INDIAN DATA VISUALIZATION COMMUNITY" />
		</Heading>

		<Mission></Mission>

		<DividerCurves />
	</Stack>
</Container>
