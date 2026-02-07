<script lang="ts">
	import { Slanted, Heading, Text } from '$lib/components/typography';
	import { FullBleed } from '$lib/components/layout';
	import { TeamSection } from '$lib/components/sections';
	import { Header } from '$lib/components/structure';
	import Container from '$lib/components/layout/Container.svelte';
	import SubHeading from '$lib/components/typography/SubHeading.svelte';
</script>

<Header banner="square" color="orange" />

<Container>
	<Heading>Our Team</Heading>

	<Text>
		<Slanted color="pink" textContent="THE VIZCHITRA TEAM" />
	</Text>

	<Text type="lead" align="center" class="pb-24">
		Meet the individuals working tirelessly behind the scenes to make India's data visualization
		community a reality.
	</Text>

	<FullBleed>
		<TeamSection />
	</FullBleed>
</Container>
