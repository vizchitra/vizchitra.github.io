<script lang="ts">
	import communityBanner from '$lib/assets/images/call-to-action/community-banner.webp';
	import conferenceBanner from '$lib/assets/images/call-to-action/conference-banner.webp';
	import launchPartyBanner from '$lib/assets/images/call-to-action/launch-party-banner.webp';

	const cards = [
		{
			image: communityBanner,
			alt: 'Join the community banner',
			title: 'Join the community',
			description: 'Join our 600+ growing member community on WhatsApp',
			link: 'https://chat.whatsapp.com/CbIu7z6ITmGFvwfw0BjDdL',
			buttonText: 'Connect',
			isAnimated: false
		},
		{
			image: launchPartyBanner,
			alt: 'launch party banner',
			title: 'Launch Party',
			description:
				'Connect with the data viz community in India, virtually on 21 Feb 2025, 5pm IST',
			link: 'https://hasgeek.com/VizChitra/launch-party/',
			buttonText: 'Registrations open',
			isAnimated: true
		},
		{
			image: conferenceBanner,
			alt: 'Call for conference proposals banner',
			title: 'VizChitra 2025',
			description: 'A space to connect and create with data',
			link: 'https://hasgeek.com/VizChitra/2025/',
			buttonText: 'Call for proposals',
			isAnimated: false
		}
	];
</script>

<div
	class="z-12 -mt-[15%] grid grid-cols-1 gap-4 rounded-2xl bg-white px-4 py-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-4"
>
	{#each cards as card}
		<div
			class="group relative flex flex-col overflow-hidden rounded-sm border border-slate-200 shadow-lg transition-all duration-300"
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
				<p class="mb-4 text-slate-600">{card.description}</p>
				<div class="mt-auto">
					<a
						href={card.link}
						target="_blank"
						class="text-viz-pink-dark inline-flex items-center font-semibold transition-colors"
					>
						{card.buttonText}
						<span class="ml-1 text-lg">↗</span>
					</a>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.animated-border {
		background: linear-gradient(90deg, #ffd485, #97e4dd, #a8bdf0, #f89f72, #ee88b3);
		background-size: 300% 300%;
		animation: borderAnimation 10s linear infinite;
		position: relative;
		z-index: 1;
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

	.group:not(.animated-border) {
		background: #fff;
		transition: background 0.3s ease;
	}

	.group:not(.animated-border):hover {
		background: linear-gradient(to right bottom, #fff, #f8f8f8);
	}

	.group {
		transition: box-shadow 0.3s ease;
	}

	.group:hover {
		box-shadow:
			0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);
	}
</style>
