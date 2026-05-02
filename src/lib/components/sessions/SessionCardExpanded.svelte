<script lang="ts">
	import LogoType from '../typography/LogoType.svelte';
	import ProposalBadge from '../proposals/ProposalBadge.svelte';
	import SessionCardBackground from './SessionCardBackground.svelte';
	import PatternComingSoon from './PatternComingSoon.svelte';
	import { sessionColorMap } from '$lib/utils/sessions';
	import { base } from '$app/paths';
	import { buildSpeakerImageTransform } from './speakerConfig.js';

	interface Props {
		title: string;
		speakerName?: string;
		designation?: string;
		organisation?: string;
		sessionType: string;
		subtitle?: string;
		date?: string;
		time?: string;
		venue?: string;
		slug?: string;
		speakerImage?: string;
		tbd?: boolean;
		showViewDetailsButton?: boolean;
		descriptionHtml?: string;
	}

	let {
		title,
		speakerName,
		designation,
		organisation,
		sessionType,
		subtitle,
		date,
		time,
		venue,
		slug,
		speakerImage,
		tbd = false,
		showViewDetailsButton = false,
		descriptionHtml = ''
	}: Props = $props();

	const colorClasses = {
		pink: 'viz-pink',
		blue: 'viz-blue',
		yellow: 'viz-yellow',
		teal: 'viz-teal',
		orange: 'viz-orange'
	};

	const overlayColors = {
		pink: '#F59EC2',
		blue: '#C3D1F6',
		teal: '#B4F2EB',
		orange: '#F4B696'
	};

	const color = $derived(sessionColorMap[sessionType] ?? 'blue');

	function formatDate(iso: string): string {
		const d = new Date(iso);
		const day = d.getDate();
		const suffix =
			day % 10 === 1 && day !== 11
				? 'st'
				: day % 10 === 2 && day !== 12
					? 'nd'
					: day % 10 === 3 && day !== 13
						? 'rd'
						: 'th';
		const month = d.toLocaleDateString('en-GB', { month: 'long' });
		return `${day}${suffix} ${month}`;
	}

	const formattedDate = $derived(date ? formatDate(date) : '');

	let backgroundWidth = $state(600);
	let backgroundHeight = $derived.by(() => backgroundWidth * 1.25);
	let expandedBgWidth = $derived(backgroundWidth * 0.55);

	const textPathRadius = 58;
	const overlayStrokeWidth = 12;

	let screenWidth = $state(0);
</script>

<svelte:window bind:innerWidth={screenWidth} />

{#if tbd}
	{@const currentColor = colorClasses[color] ?? colorClasses.blue}
	<div
		class="sessions-card border-viz-grey/40 overflow-hidden rounded border transition-transform hover:scale-101"
	>
		<div
			class="relative flex aspect-4/5 flex-col overflow-visible"
			bind:clientWidth={backgroundWidth}
			bind:clientHeight={backgroundHeight}
		>
			<PatternComingSoon
				tone={color}
				width={backgroundWidth}
				height={backgroundHeight}
				class="absolute inset-0 h-full w-full"
			/>

			<div class="session-card-header relative z-10 p-2.5 pb-0! md:p-4">
				<div class="title mb-2.5 flex flex-row items-baseline justify-start gap-2 md:mb-3">
					<div class="logo-container text-xl leading-none text-[#4c4c4c] md:text-2xl">
						<LogoType year={null} />
					</div>
					<div class="divider my-0.5 w-0.5 self-stretch bg-[#4c4c4c]"></div>
					<p
						class="font-display text-shadow block text-2xl leading-none font-bold tracking-tighter uppercase"
						style="color: var(--color-{currentColor})"
					>
						{sessionType}
					</p>
				</div>

				<div class="sessions-logistics">
					<p class="text-base leading-none uppercase md:text-base">
						{#if formattedDate}
							<span class="font-display leading-none! font-black md:text-[16px]"
								>{#if time}, {time}{/if}</span
							>
						{/if}{#if venue}<span class="font-display leading-none! font-light md:text-[16px]"
								>, {venue}
							</span>{/if}
					</p>
				</div>
			</div>

			<div
				class="relative z-10 flex flex-1 flex-col items-center justify-end pb-3 text-center md:pb-4"
			>
				<p class="font-display text-shadow text-2xl font-bold text-[#4c4c4c] uppercase md:text-3xl">
					Coming soon
				</p>
				<div
					class="mt-2 rounded-4xl border-2"
					style="border-color:var(--{colorClasses[color]}-dark)"
				>
					<ProposalBadge text={sessionType} {color} />
				</div>
			</div>
		</div>
	</div>
{:else}
	{@const currentColor = colorClasses[color] ?? colorClasses.blue}
	<a
		href="/2026/sessions/{slug}"
		class="sessions-card group white border-viz-grey/40 mx-auto block w-full overflow-hidden rounded border transition-all hover:scale-102"
	>
		<div
			class="session-card-body relative aspect-4/6.5 overflow-visible md:aspect-4/5.25 md:max-h-[85vh]"
			bind:clientWidth={backgroundWidth}
			bind:clientHeight={backgroundHeight}
		>
			<div class="session-card-header relative z-10 p-2.5 pb-0! md:p-4">
				<div class="title mb-2.5 flex flex-row items-baseline justify-start gap-2 md:mb-3">
					<div class="logo-container text-xl leading-none text-[#4c4c4c] md:text-2xl">
						<LogoType year={null} />
					</div>

					<div class="divider my-0.5 w-0.5 self-stretch bg-[#4c4c4c]"></div>
					<p
						class="font-display text-shadow block text-2xl leading-none font-bold tracking-tighter uppercase"
						style="color: var(--color-{currentColor})"
					>
						{sessionType}
					</p>
				</div>

				<div class="sessions-logistics">
					<p class="text-base leading-none uppercase md:text-base">
						{#if time}
							<span class="font-display leading-snug! font-bold md:text-[17px]">{time} | </span>
							<span class="font-display leading-snug! font-bold md:text-[17px]"
								>{time === '10:00 - 13:00' ? 'Morning' : 'Afternoon'}</span
							>
						{/if}{#if venue}<span class="font-display leading-snug! font-light md:text-[17px]"
								>, {venue}
							</span>{/if}
					</p>
				</div>
			</div>

			<div class="title-content relative z-10 p-3 md:p-4">
				<h3
					class="title font-display text-shadow mb-1 text-[20px] leading-none font-extrabold text-[#4c4c4c] uppercase md:text-[26px]"
				>
					{title}
				</h3>
				{#if subtitle}
					<p
						class="subtitle font-display text-shadow mb-1 text-lg leading-tight font-light text-[#4c4c4c] uppercase md:text-xl"
					>
						{subtitle}
					</p>
				{/if}
			</div>

			<div class="short-description-container relative z-10 p-3 md:p-4">
				<p
					class="short-description font-display text-shadow mb-1 max-w-[40ch] text-lg leading-tight font-normal text-[#4c4c4c] md:text-[19px]"
				>
					{@html descriptionHtml}
				</p>
			</div>

			<div class="speaker-details-overlay pointer-events-none absolute inset-0 flex flex-col">
				<div class="absolute inset-x-0 bottom-0" style="height: {backgroundHeight * 0.225}px">
					<div
						class="speaker-image absolute top-15 right-5 -translate-y-full transition-transform duration-300 group-hover:scale-104 md:top-20"
					>
						<img
							class="relative z-10 h-auto w-full"
							src="{base}{speakerImage || '/images/speakers/2026/speaker-placeholder.avif'}"
							alt="{speakerName}'s photo"
							style:transform={buildSpeakerImageTransform(speakerName)}
						/>

						<div
							class="background-container-expanded absolute -right-[30%] -bottom-[75%] z-0"
							style:width="{expandedBgWidth * (screenWidth < 768 ? 1.55 : 1.5)}px"
							style:height="{expandedBgWidth * 1.25 * (screenWidth < 768 ? 1.55 : 1.5)}px"
						>
							<SessionCardBackground
								{sessionType}
								{color}
								{slug}
								{title}
								width={expandedBgWidth}
								height={expandedBgWidth * 1.25}
								class="absolute inset-0 z-0 h-full w-full"
							/>
						</div>
					</div>

					<svg
						class="relative z-0 block h-full w-full"
						viewBox="{overlayStrokeWidth} 0 {1080 - 2 * overlayStrokeWidth} {364 -
							overlayStrokeWidth}"
						preserveAspectRatio="none"
						fill="none"
						aria-hidden="true"
					>
						<path
							class="fill {color}"
							d="M0.5 364.516V0.516363C191.5 -0.982956 456 101.337 579 114.518C705 128.018 1004.5 9.01752 1080 2.01636V364.516H0.5Z"
							fill={overlayColors[color] ?? overlayColors.blue}
							stroke="#fff"
							stroke-width={overlayStrokeWidth}
						/>
					</svg>

					{#if showViewDetailsButton}
						<svg
							class="view-details-button absolute -right-10 -bottom-8 z-40 block h-40 w-40 origin-center scale-0 transition-transform duration-400 ease-out group-hover:scale-100 md:h-50 md:w-50 lg:-right-18 lg:-bottom-18 lg:h-60 lg:w-60"
							preserveAspectRatio="none"
							viewBox="0 0 200 200"
							fill="none"
							aria-hidden="true"
						>
							<defs>
								<path
									id="view-details-path-{slug}"
									d="M 100,100 m -{textPathRadius},0 a {textPathRadius},{textPathRadius} 0 1,1 {textPathRadius *
										2},0 a {textPathRadius},{textPathRadius} 0 1,1 -{textPathRadius * 2},0"
									fill="none"
								/>
							</defs>

							<circle
								cx="100"
								cy="100"
								r="80"
								fill="#fff"
								stroke="var(--color-{colorClasses[color]})"
								stroke-width="7"
								fill-opacity="1"
							/>

							<circle
								cx="100"
								cy="100"
								r="52"
								fill="var(--color-{colorClasses[color]}-dark)"
								stroke-width="10"
								fill-opacity="0.75"
							/>

							<circle
								cx="100"
								cy="100"
								r="45"
								fill="var(--color-{colorClasses[color]})"
								fill-opacity="1"
							/>
							<circle cx="100" cy="100" r="35" fill="#fff" fill-opacity="1" />

							<g
								transform="translate(100 100) scale(0.325) translate(-63 -63)"
								stroke="#4c4c4c"
								stroke-width="13"
								stroke-linecap="round"
								stroke-linejoin="round"
								fill="none"
							>
								<path d="M26.25 63L99.75 63" />
								<path d="M63 26.25L99.75 63L63 99.75" />
							</g>

							<text
								class="view-details-text font-display"
								fill="#4c4c4c"
								font-size="16"
								font-weight="800"
								letter-spacing="2"
								text-anchor="middle"
							>
								<!-- <textPath href="#view-details-path-{slug}" startOffset="0%">•</textPath> -->
								<textPath href="#view-details-path-{slug}" startOffset="18%">VIEW DETAILS</textPath>
								<!-- <textPath href="#view-details-path-{slug}" startOffset="50%">•</textPath> -->
								<textPath href="#view-details-path-{slug}" startOffset="65%">VIEW DETAILS</textPath>
							</text>
						</svg>
					{/if}
				</div>

				<div class="speaker-details-content relative z-30 mt-auto w-full p-2.5 md:p-4">
					<div class="speaker-details relative z-10">
						<h3
							class="font-display text-shadow mb-1 text-2xl leading-none text-[#4c4c4c] uppercase md:text-[26px] lg:text-3xl xl:text-shadow-none!"
						>
							<span
								class="first-name text-xl leading-none font-extrabold md:text-[28px] 2xl:text-3xl"
								>{speakerName.split(' ')[0]}</span
							>
							<span class="last-name text-xl leading-none font-medium md:text-[28px] 2xl:text-3xl"
								>{speakerName.split(' ').slice(1).join(' ')}</span
							>
						</h3>
						{#if designation || organisation}
							<span class="font-display block leading-tight text-[#4c4c4c] uppercase md:text-lg">
								{#if designation}
									{designation}
								{/if}{#if organisation}, {organisation}
								{/if}
							</span>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</a>
{/if}

<style>
	.sessions-card {
		display: flex;
		flex-direction: column;
		gap: 0rem;

		box-shadow:
			rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
			rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
	}

	.sessions-card:hover {
		box-shadow:
			rgba(50, 50, 93, 0.2) 0px 10px 15px -2px,
			rgba(0, 0, 0, 0.2) 0px 6px 8px -3px;
	}

	.speaker-image {
		max-width: min(300px, 55%);
	}

	.text-shadow {
		text-shadow:
			-1.5px -1.5px 0 white,
			1.5px -1.5px 0 white,
			-1.5px 1.5px 0 white,
			1.5px 1.5px 0 white;
	}

	.view-details-text {
		transform-box: view-box;
		transform-origin: 100px 100px;
		animation: view-details-spin 14s linear infinite;
	}

	@keyframes view-details-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
