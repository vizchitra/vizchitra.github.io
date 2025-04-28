<script lang="ts">
	import communityBanner from '$lib/assets/images/call-to-action/community-banner.webp';
	import conferenceBanner from '$lib/assets/images/call-to-action/conference-banner.webp';
	import vizBizBanner from '$lib/assets/images/call-to-action/viz-biz-banner.png';
	import proposalJamBanner from '$lib/assets/images/call-to-action/proposal-jam-banner.png';

	import { confetti } from '@neoconfetti/svelte';
	import { tick } from 'svelte';

	let isVisible = false;
	let hasShownConfetti = false;

	const cards = [
		{
			image: communityBanner,
			alt: 'Join the community banner',
			title: 'Join the community',
			description: 'Join our 1000+ growing member community on WhatsApp',
			link: 'https://chat.whatsapp.com/G9p4HbALukeAa5NSVn0OoA',
			buttonText: 'Connect',
			isAnimated: false
		},

		{
			image: conferenceBanner,
			alt: 'Call for conference proposals banner',
			title: 'VizChitra 2025',
			description: 'Annual flagship in-person conference, on 27 June',
			link: 'https://hasgeek.com/VizChitra/2025/sub',
			buttonText: 'Buy tickets now!',
			isAnimated: true
		},
		{
			image: vizBizBanner,
			alt: 'Panel Discussion: Breaking into the Viz Biz',
			title: 'Panel Discussion: Breaking into the Viz Biz',
			description:
				'Curious about building a career in data visualization? Join us for a dynamic discussion with professionals, on 26th April',
			link: 'https://hasgeek.com/VizChitra/designing-a-career-with-data/',
			buttonText: 'Registrations open',
			isAnimated: false
		}
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
	class="z-12 -mt-[15%] grid grid-cols-1 gap-4 rounded-2xl bg-white px-4 py-4 sm:px-6 lg:grid-cols-3 lg:px-4"
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
			<div class="aspect-[3/2] overflow-hidden">
				<img
					src={card.image}
					alt={card.alt}
					class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			</div>
			<div class="flex flex-1 flex-col p-6">
				<h3 class="mb-2 text-xl font-bold tracking-tight">{card.title}</h3>
				<p class="mb-4 text-slate-600 group-hover:no-underline">{card.description}</p>
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
						<span class="ml-1 text-lg">↗</span>
					</span>
				</div>
			</div>
		</a>
	{/each}
</div>

<style>
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
