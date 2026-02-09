<script lang="ts">
	import type { PageData } from './$types';
	import { Slanted, Heading, SubHeading, Text, Prose } from '$lib/components/typography';
	import { TeamSection } from '$lib/components/sections';
	import { Header } from '$lib/components/structure';
	import { Container, Stack, FullBleed } from '$lib/components/layout';

	let { data }: { data: PageData } = $props();
	let banner = data.document.banner;
	let color = data.document.color;
</script>

<Header {banner} {color} />

<Container>
	<Stack>
		<Prose color="orange">
			<h1>Our Team</h1>
			<p>
				Meet the individuals working tirelessly behind the scenes to make India's data visualization
				community a reality.
			</p>
		</Prose>
		<FullBleed>
			<TeamSection />
		</FullBleed>
	</Stack>
</Container>
