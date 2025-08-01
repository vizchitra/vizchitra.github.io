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
			link: 'https://www.instagram.com/vizchitra/',
			hoverClass: 'hover:[filter:invert(39%)_sepia(61%)_saturate(663%)_hue-rotate(312deg)_brightness(93%)_contrast(92%)]'
		},
		{
			icon: twitter,
			alt: 'VizChitra twitter link',
			link: 'https://www.x.com/vizchitra/',
			hoverClass: 'hover:[filter:invert(20%)_sepia(0%)_saturate(0%)_hue-rotate(0deg)_brightness(120%)_contrast(90%)]'
		},
		{
			icon: linkedIn,
			alt: 'VizChitra linkedin link',
			link: 'https://www.linkedin.com/company/vizchitra/',
			hoverClass: 'hover:[filter:invert(29%)_sepia(82%)_saturate(746%)_hue-rotate(176deg)_brightness(91%)_contrast(98%)]'
		},
		{
			icon: blueSky,
			alt: 'VizChitra bluesky link',
			link: 'https://bsky.app/profile/vizchitra.bsky.social',
			hoverClass: 'hover:[filter:invert(48%)_sepia(97%)_saturate(2000%)_hue-rotate(178deg)_brightness(98%)_contrast(95%)]'
		},
		{
			icon: youtube,
			alt: 'VizChitra youtube link',
			link: 'https://www.youtube.com/@vizchitra',
			hoverClass: 'hover:[filter:invert(13%)_sepia(98%)_saturate(7450%)_hue-rotate(359deg)_brightness(94%)_contrast(114%)]'
		},
		{
			icon: github,
			alt: 'VizChitra github link',
			link: 'https://github.com/vizchitra',
			hoverClass: 'hover:[filter:invert(20%)_sepia(0%)_saturate(0%)_hue-rotate(0deg)_brightness(120%)_contrast(90%)]'
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
						class={`transition-all duration-50 ${social.hoverClass}`}
					/>
				</a>
			</span>
		{/each}
	</div>
</div>
