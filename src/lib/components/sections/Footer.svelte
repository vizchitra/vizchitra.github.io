<script lang="ts">
	import { BannerCurve, BannerPolygon, Cluster, Stack, Text } from '$lib/components';
	import instagramIcon from '$lib/assets/socials/instagram.svg?url';
	import twitterIcon from '$lib/assets/socials/twitter.svg?url';
	import linkedinIcon from '$lib/assets/socials/linkedin.svg?url';
	import blueskyIcon from '$lib/assets/socials/bluesky.svg?url';
	import youtubeIcon from '$lib/assets/socials/youtube.svg?url';
	import githubIcon from '$lib/assets/socials/github.svg?url';

	interface Props {
		banner?: 'polygon' | 'curve';
	}

	let { banner = 'polygon' }: Props = $props();

	const socials = [
		{
			icon: instagramIcon,
			alt: 'VizChitra instagram link',
			link: 'https://www.instagram.com/vizchitra/'
		},
		{
			icon: twitterIcon,
			alt: 'VizChitra twitter link',
			link: 'https://www.x.com/vizchitra/'
		},
		{
			icon: linkedinIcon,
			alt: 'VizChitra linkedin link',
			link: 'https://www.linkedin.com/company/vizchitra/'
		},
		{
			icon: blueskyIcon,
			alt: 'VizChitra bluesky link',
			link: 'https://bsky.app/profile/vizchitra.bsky.social'
		},
		{
			icon: youtubeIcon,
			alt: 'VizChitra youtube link',
			link: 'https://www.youtube.com/@vizchitra'
		},
		{
			icon: githubIcon,
			alt: 'VizChitra github link',
			link: 'https://github.com/vizchitra'
		}
	];
</script>

<div class="pb-lg relative bg-linear-to-t from-transparent to-white">
	<footer class="relative {banner === 'curve' ? '' : 'overflow-hidden'}" aria-label="Site footer">
		<!-- <Stack space="lg" class="py-xl z-10 mx-auto max-w-2xl items-center px-md"> -->
		<Stack space="lg">
			<Cluster space="xs" align="center" justify="center" class="mt-2xl">
				{#each socials as social}
					<a href={social.link} target="_blank">
						<img
							width="30px"
							height="30px"
							src={social.icon}
							alt={social.alt}
							class="transition-all duration-50 hover:filter-[invert(33%)_sepia(96%)_saturate(1231%)_hue-rotate(308deg)_brightness(99%)_contrast(99%)]"
						/>
					</a>
				{/each}
			</Cluster>

			<Text type="small" align="center" color="grey">
				Copyright © {new Date().getFullYear()} VizChitra. All rights reserved.
			</Text>
		</Stack>
	</footer>
	<div class="absolute inset-0 -z-10 h-full w-full">
		{#if banner === 'curve'}
			<BannerCurve staticBanner direction="footer" />
		{:else}
			<BannerPolygon staticBanner fadeDirection="top" />
		{/if}
	</div>
</div>
