<script lang="ts">
	import instagram from '$lib/assets/images/socials/instagram.svg';
	import twitter from '$lib/assets/images/socials/twitter.svg';
	import linkedIn from '$lib/assets/images/socials/linkedin.svg';
	import blueSky from '$lib/assets/images/socials/bluesky.svg';
	import youtube from '$lib/assets/images/socials/youtube.svg';
	import github from '$lib/assets/images/socials/github.svg';

	const socials = [
		{
			icon: instagram,
			alt: 'VizChitra instagram link',
			link: 'https://www.instagram.com/vizchitra/'
		},
		{
			icon: twitter,
			alt: 'VizChitra twitter link',
			link: 'https://www.x.com/vizchitra/'
		},
		{
			icon: linkedIn,
			alt: 'VizChitra linkedin link',
			link: 'https://www.linkedin.com/company/vizchitra/'
		},
		{
			icon: blueSky,
			alt: 'VizChitra bluesky link',
			link: 'https://bsky.app/profile/vizchitra.bsky.social'
		},
		{
			icon: youtube,
			alt: 'VizChitra youtube link',
			link: 'https://www.youtube.com/@vizchitra'
		},
		{
			icon: github,
			alt: 'VizChitra github link',
			link: 'https://github.com/vizchitra'
		}
	];
</script>

<div class="mt-14 flex items-center justify-center gap-6">
	<span class="text-left text-lg font-semibold">Follow Us</span>
	<div class="flex gap-6">
		{#each socials as social}
			<span>
				<a href={social.link} target="_blank">
					<img
						width="30px"
						height="30px"
						src={social.icon}
						alt={social.alt}
						class="transition-all duration-50 hover:[filter:invert(33%)_sepia(96%)_saturate(1231%)_hue-rotate(308deg)_brightness(99%)_contrast(99%)]"
					/>
				</a>
			</span>
		{/each}
	</div>
</div>
