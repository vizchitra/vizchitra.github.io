<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import { tick } from 'svelte';

	let isVisible = false;
	let hasShownConfetti = false;

	const cards = [
		{
			image: '/images/events/community-banner.webp',
			alt: 'Join the community banner',
			title: 'Join the community',
			description: 'Join our 1000+ growing member community on WhatsApp',
			link: 'https://chat.whatsapp.com/G9p4HbALukeAa5NSVn0OoA',
			buttonText: 'Connect',
			isAnimated: false
		},
		{
			image: '/images/events/sponsorship-banner.webp',
			alt: 'VizChitra 2025 Recap',
			title: 'VizChitra 2025 Recap',
			description:
				'Catch up on VizChitra 2025. Explore  keynotes, panels and alternative sessions.',
			link: '/2025/videos',
			buttonText: 'View Recap',
			isAnimated: false
		}
		// {
		// 	image: conferenceBanner,
		// 	alt: 'Call for conference proposals banner',
		// 	title: 'VizChitra 2025',
		// 	description: 'Annual flagship in-person conference, on 27 June',
		// 	link: 'https://hasgeek.com/VizChitra/2025/#tickets',
		// 	buttonText: 'Buy tickets now!',
		// 	isAnimated: false
		// }
		// {
		// 	image: sponsorshipBanner,
		// 	alt: 'Sponsor the Conference',
		// 	title: 'Sponsor the Conference',
		// 	description:
		// 		'Want to partner with VizChitra? Sponsorships are open for orgs big and small. Reach out to us at sales@hasgeek.com',
		// 	link: '/sponsorship',
		// 	buttonText: 'Sponsorship info',
		// 	isAnimated: false
		// }
	];

	function handleCardMouseLeave() {
		isVisible = false;
		hasShownConfetti = false;
	}

	async function handleCardMouseOver(card: (typeof cards)[number]) {
		if (card.isAnimated && !hasShownConfetti) {
			isVisible = false;
			await tick();
			isVisible = true;
			hasShownConfetti = true;
		}
	}
</script>

<div
	class="cta-container gap-sm px-sm py-sm sm:px-md lg:px-sm z-12 grid grid-cols-1 rounded-2xl bg-white lg:grid-cols-2"
>
	{#each cards as card}
		<a
			href={card.link}
			target="_blank"
			class:shadow-viz-pink={card.isAnimated}
			class="group relative flex flex-col overflow-hidden rounded-sm border border-slate-200 no-underline shadow-lg transition-all duration-300"
			on:mouseleave={handleCardMouseLeave}
			on:mouseover={() => handleCardMouseOver(card)}
			on:focus={() => handleCardMouseOver(card)}
		>
			<div class="cta-image-container overflow-hidden">
				<img
					src={card.image}
					alt={card.alt}
					class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			</div>
			<div class="p-md flex flex-1 flex-col">
				<h3 class="mb-xs text-xl font-bold tracking-tight">{card.title}</h3>
				<p class="mb-sm text-slate-600 group-hover:no-underline">{card.description}</p>
				<div class="mt-auto">
					{#if card.isAnimated}
						{#if isVisible}
							<div class="pointer-events-none absolute bottom-10 left-0 z-10">
								<div
									use:confetti={{ colors: ['#ffd485', '#97e4dd', '#a8bdf0', '#f89f72', '#ee88b3'] }}
								></div>
							</div>
						{/if}
					{/if}
					<span class="text-viz-pink-dark inline-flex items-center font-semibold transition-colors">
						{card.buttonText}
						<span class="ml-xs text-lg">↗</span>
					</span>
				</div>
			</div>
		</a>
	{/each}
</div>

<style>
	.cta-container {
		margin-top: -15%;
	}

	.cta-image-container {
		aspect-ratio: 3 / 2;
	}

	@keyframes borderAnimation {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
