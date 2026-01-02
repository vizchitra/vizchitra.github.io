<script>
	import teamData from '$lib/data/vizchitra_team.json' with { type: 'json' };
	import MemberPentagon from './MemberPentagon.svelte';

	const socials = [
		{
			name: 'instagram',
			icon: '/images/socials/instagram.svg',
			alt: 'instagram link'
		},
		{
			name: 'twitter',
			icon: '/images/socials/twitter.svg',
			alt: 'twitter link'
		},
		{
			name: 'bluesky',
			icon: '/images/socials/bluesky.svg',
			alt: 'bluesky link'
		},
		{
			name: 'linkedin',
			icon: '/images/socials/linkedin.svg',
			alt: 'linkedin link'
		}
	];
</script>

{#if teamData}
	<div class="team-section not-prose flex flex-wrap justify-center gap-5 md:min-w-[420px]">
		{#each teamData.sort((a, b) => a.order - b.order) as teamMember}
			<div class="team-member mb-4 flex flex-col items-center gap-2">
				<MemberPentagon memberData={teamMember} />

				<div class="socials-row mt-auto flex flex-row gap-3">
					{#each socials as social}
						{#if teamMember[social.name]}
							<a href={teamMember[social.name]} target="_blank">
								<img
									src={social.icon}
									alt={social.alt}
									class="h-5 w-5 opacity-70 transition-all duration-50 hover:[filter:invert(33%)_sepia(96%)_saturate(1231%)_hue-rotate(308deg)_brightness(99%)_contrast(99%)] md:h-6 md:w-6"
								/>
							</a>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>
{/if}
