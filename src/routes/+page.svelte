<script lang="ts">
	import { Button } from '$lib/components/interface';
	import { RecapVideo, Mission } from '$lib/components/sections';
	import { DividerCurves, Hero } from '$lib/components/structure';
	import {
		Slanted,
		SubHeading,
		Heading,
		LogoType,
		Text,
		ColorSpan
	} from '$lib/components/typography';
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
			India's community-driven conference dedicated to <ColorSpan color="yellow"
				>data visualization</ColorSpan
			>
			is back again in <ColorSpan color="teal">2026</ColorSpan>. This flagship event over
			<ColorSpan color="blue">two days</ColorSpan>
			will be in <ColorSpan color="orange">Bangalore</ColorSpan> on
			<ColorSpan color="pink">3rd & 4th July, 2026</ColorSpan>
		</Text>

		<Cluster>
			<Button href="/2026" color="pink">Go to our 2026 page</Button>
		</Cluster>

		<Cluster>
			<Text type="caption">Accepting Submissions till <strong>15 Feb 2025, 23:59 IST</strong></Text>
		</Cluster>

		<DividerCurves />

		<Heading align="center">
			<LogoType year={2025} />
		</Heading>

		<Text type="lead" align="center">Missed the event last year. See the highlights below.</Text>

		<FullBleed>
			<RecapVideo />
		</FullBleed>

		<DividerCurves />

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
			To foster a vibrant <strong>community of data storytellers in India</strong>
			bridging technical analysis and design expertise to shape perspectives and drive change
		</Text>

		<Heading tag="h3" align="center" class="font-normal">
			<Slanted color="black" textContent="BUILD AN INDIAN DATA VISUALIZATION COMMUNITY" />
		</Heading>

		<Mission></Mission>

		<DividerCurves />
	</Stack>
</Container>
