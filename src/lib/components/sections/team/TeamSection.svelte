<script>
	import teamData from '$lib/data/vizchitra_team.json' with { type: 'json' };
	import MemberPentagon from './MemberPentagon.svelte';

	import instagram from '$lib/assets/images/socials/instagram.svg';
	import twitter from '$lib/assets/images/socials/twitter.svg';
	import linkedIn from '$lib/assets/images/socials/linkedin.svg';
	import blueSky from '$lib/assets/images/socials/bluesky.svg';
	// import youtube from '$lib/assets/images/socials/youtube.svg';
	// import github from '$lib/assets/images/socials/github.svg';

	const socials = [
		{
			name: 'instagram',
			icon: instagram,
			alt: 'instagram link'
		},
		{
			name: 'twitter',
			icon: twitter,
			alt: 'twitter link'
		},
		{
			name: 'bluesky',
			icon: blueSky,
			alt: 'bluesky link'
		},
		{
			name: 'linkedin',
			icon: linkedIn,
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
