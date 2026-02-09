<script>
	import { Flex, FullBleed } from '$lib/components/layout';
	import { CallCard, Button } from '$lib/components/interface';
	import { Heading, SubHeading, Text, Slanted, LogoType } from '$lib/components/typography';
	import { DividerCurves, Hero, Header } from '$lib/components/structure';
	import { Container, Stack, Cluster, Grid } from '$lib/components/layout';
</script>

<svelte:head>
	<title>VizChitra 2026</title>
	<meta property="og:image" content="https://vizchitra.com/images/preview/preview-2026.jpg" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<Hero banner="curve" />

<Container>
	<Stack>
		<Heading tag="h1">
			<LogoType year="2026" />
		</Heading>

		<Text type="lead">
			India's community-driven conference dedicated to <strong>data visualization</strong> returns
			to <strong>Bangalore</strong>
			on <strong>3rd & 4th July, 2026</strong>. Join us for <strong>two days</strong> of learning, sharing,
			and connecting with the data visualization community.
		</Text>

		<DividerCurves />

		<Heading tag="h2" class="font-normal">
			<Slanted textContent="APPLICATIONS ARE OPEN" />
		</Heading>

		<Text type="body">
			We invite submissions across across four formats—<span class="text-viz-blue-dark font-bold"
				>Talks</span
			>, <span class="text-viz-teal-dark font-bold">Dialogues</span>,
			<span class="text-viz-pink-dark font-bold">Workshops</span>, and
			<span class="text-viz-orange-dark font-bold">Exhibition</span>. Select the one that best suits
			your contribution.
		</Text>

		<Cluster justify="start">
			<Button href="/2026/proposals" color="pink">Submit your Proposal</Button>
			<Button href="/2026/exhibition" color="orange">Submit for Exhibition</Button>
		</Cluster>

		<Text type="caption">
			Note: The deadline for all submissions is <strong>15 Feb, 2026</strong>.
		</Text>

		<DividerCurves />

		<Heading tag="h3" class="font-normal">
			<Slanted color="blue" textContent="BROWSE SUBMISSIONS" />
		</Heading>

		<Text type="lead">
			Explore all submitted proposals for VizChitra 2026. Browse talks, dialogues, workshops, and
			exhibitions from our community.
		</Text>

		<Cluster justify="start">
			<Button href="/2026/submissions" color="blue">View All Submissions</Button>
		</Cluster>

		<div class="mt-6 mb-1 flex flex-row items-end gap-1">
			<span class="block pb-px text-lg text-[#666] md:text-[18px]">
				Click on the cards to learn more</span
			>
			<svg
				width="23"
				height="21"
				viewBox="0 0 23 21"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M15.5299 20.6648C15.6209 20.9255 15.906 21.0631 16.1668 20.9721L20.4155 19.4895C20.6762 19.3985 20.8138 19.1134 20.7228 18.8526C20.6319 18.5919 20.3467 18.4543 20.086 18.5453L16.3094 19.8632L14.9914 16.0866C14.9005 15.8258 14.6154 15.6882 14.3546 15.7792C14.0939 15.8702 13.9563 16.1553 14.0473 16.416L15.5299 20.6648ZM3.9998 5.99999L4.22341 6.4472C8.11498 4.5014 12.6393 4.55262 15.3118 6.70208C17.9167 8.79707 19.0096 13.1178 15.5517 20.2827L16.002 20.5L16.4523 20.7174C19.9924 13.3822 19.0843 8.45288 15.9386 5.92284C12.8605 3.44726 7.88477 3.49847 3.77619 5.55278L3.9998 5.99999Z"
					fill="#666666"
				/>
			</svg>
		</div>

		<FullBleed>
			<Cluster>
				<CallCard
					title="Talks"
					subtitle="Best for deep dives into projects, case studies or bodies of work."
					pattern="waves"
					tone="blue"
					titlePosition="top-1 left-4 text-left"
					subtitlePosition="bottom-0 left-4 text-left"
					href="/2026/proposals"
				/>

				<CallCard
					title="Dialogues"
					subtitle="Best for shared questions, challenges, or themes."
					pattern="river"
					tone="teal"
					titlePosition="top-12 left-4 text-left"
					subtitlePosition="top-30 left-4 text-left"
					href="/2026/proposals"
				/>

				<CallCard
					title="Workshops"
					subtitle="Best for practice-oriented, skill-building sessions"
					pattern="circle"
					tone="pink"
					titlePosition="top-25 left-1/2 -translate-x-1/2 text-center"
					subtitlePosition="top-45 left-1/2 -translate-x-1/2 text-center"
					href="/2026/proposals"
					variation={1}
				/>

				<CallCard
					title="Exhibition"
					subtitle="Focused on climate & ecological change"
					pattern="stream"
					tone="orange"
					titlePosition="top-0 left-1/2 -translate-x-1/2 text-center"
					subtitlePosition="bottom-0 left-1/2 -translate-x-1/2 text-center"
					href="/2026/exhibition"
				/>
			</Cluster>
		</FullBleed>
	</Stack>
</Container>
