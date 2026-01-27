---
title: Our Team
description: Members of the VizChitra Core Team
banner: polygon
---

<script>
	import teamData from '$lib/data/team.json' with { type: 'json' };
	import instagramIcon from "$lib/assets/socials/instagram.svg?url";
  import twitterIcon from "$lib/assets/socials/twitter.svg?url";
  import linkedinIcon from "$lib/assets/socials/linkedin.svg?url";
  import blueskyIcon from "$lib/assets/socials/bluesky.svg?url";

	const socials = [
		{ name: 'instagram', icon: instagramIcon, alt: 'instagram link' },
		{ name: 'twitter', icon: twitterIcon, alt: 'twitter link' },
		{ name: 'bluesky', icon: blueskyIcon, alt: 'bluesky link' },
		{ name: 'linkedin', icon: linkedinIcon, alt: 'linkedin link' }
	];
	const COLOR_MAPPING = {
		'Collecting data': 'var(--color-yellow)',
		'Analyzing data': 'var(--color-teal)',
		'Coding visualizations': 'var(--color-blue)',
		'Narrating insights': 'var(--color-orange)',
		'Designing visualizations': 'var(--color-pink)'
	};
</script>

<Header title="Our Team" banner="polygon" />

<Heading type="subtitle" align="center" color="orange">
	<Slanted text="THE VIZCHITRA TEAM" />
</Heading>

<Text type="lead"> Meet the individuals working tirelessly behind the scenes to make India's data visualization
community a reality.</Text>

<FullBleed>
	<Cluster justify="center" space="xl" class="team-section not-prose">
		{#each teamData.sort((a, b) => a.order - b.order) as member}
			<Stack space="xs" class="items-center team-member mb-sm">
				<Pentagon
					data={member}
					image={`/images/team/${member.image}`}
					alt={member.name}
					strength={member.strength}
					colorMapping={COLOR_MAPPING}
					size="lg"
					name={member.name}
					role={member.role}
				/>
				<Cluster space="xs" class="socials-row mt-auto">
					{#each socials as social}
						{#if member[social.name]}
							<a href={member[social.nçame]} target="_blank">
								<Icon src={social.icon} alt={social.alt} size="sm" class_name="opacity-70" />
							</a>
						{/if}
					{/each}
				</Cluster>
			</Stack>
		{/each}
	</Cluster>
</FullBleed>
