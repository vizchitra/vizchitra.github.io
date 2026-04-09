<script lang="ts">
	import ProposalBadge from '../proposals/ProposalBadge.svelte';
	import LogoType from '../typography/LogoType.svelte';
	import PatternWaves from '../patterns/PatternWaves.svelte';
	import { sessionColorMap } from '$lib/utils/sessions';
	import { base } from '$app/paths';

	interface Props {
		title: string;
		speakerName?: string;
		designation?: string;
		organisation?: string;
		sessionType: string;
		subtitle?: string;
		date?: string;
		slug?: string;
		speakerImage?: string;
		tbd?: boolean;
	}

	let {
		title,
		speakerName,
		designation,
		organisation,
		sessionType,
		subtitle,
		date,
		slug,
		speakerImage,
		tbd = false
	}: Props = $props();

	const colorClasses = {
		pink: 'viz-pink',
		blue: 'viz-blue',
		yellow: 'viz-yellow',
		teal: 'viz-teal',
		orange: 'viz-orange'
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

	// --- Wave background ---
	let waveW = $state(600);
	let waveH = $derived.by(() => waveW * 1.25);

	function hashStringToUnit(s: string): number {
		let h = 0;
		for (let i = 0; i < s.length; i++) {
			h = (h * 31 + s.charCodeAt(i)) % 1000000007;
		}
		return (h % 1000000) / 1000000;
	}

	const cardVariation = $derived(hashStringToUnit(slug ?? title));

	const cardLayerConfig = [
		{ yFactor: 0.3, ampFactor: 1.5, frequency: 1.8, fillKey: 'light' as const, hatched: true },
		{ yFactor: 0.5, ampFactor: 1.2, frequency: 1.5, fill: '#778ECE' }
	];
</script>

{#if tbd}
	<div
		class="border-viz-grey/15 flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center"
	>
		<ProposalBadge text={sessionType} {color} />
		<p class="text-viz-grey/50 mt-3 text-sm">Coming soon</p>
	</div>
{:else}
	{@const currentColor = colorClasses[color] ?? colorClasses.blue}
	<a
		href="/2026/sessions/{slug}"
		class="sessions-card group white border-viz-grey/40 block overflow-hidden rounded border transition-shadow hover:shadow-md"
	>
		<div class="session-card-header p-2.5 pb-0! md:p-4">
			<div class="title mb-3 flex flex-row items-baseline justify-start gap-2">
				<div class="logo-container text-2xl leading-none text-[#4c4c4c]">
					<LogoType year={null} />
				</div>

				<div class="divider my-0.5 w-[2px] self-stretch bg-[#4c4c4c]"></div>
				<p
					class="font-display block text-2xl leading-none font-bold tracking-tighter uppercase"
					style="color: var(--color-{currentColor})"
				>
					{sessionType}
				</p>
			</div>

			<div class="sessions-logistics">
				<p class="text-base leading-none uppercase md:text-base">
					{#if formattedDate}
						<span class="font-display leading-none! font-black md:text-[16px]">{formattedDate}</span
						>
					{/if}<span class="font-display leading-none! font-light md:text-[16px]"
						>, Bangalore International Centre
					</span>
				</p>
			</div>
		</div>

		<div
			class="session-card-body relative aspect-[4/5] overflow-hidden"
			bind:clientWidth={waveW}
			bind:clientHeight={waveH}
		>
			<div class="title-content relative z-10 p-3 md:p-4">
				<h3
					class="title font-display text-shadow mb-1 text-2xl leading-none font-extrabold text-[#4c4c4c] uppercase md:text-[26px]"
				>
					{title}
				</h3>
				{#if subtitle}
					<p
						class="subtitle font-display mb-1 text-2xl leading-tight font-light text-[#4c4c4c] uppercase md:text-xl"
					>
						{subtitle}
					</p>
				{/if}
			</div>

			<PatternWaves
				tone={color}
				variation={cardVariation}
				width={waveW}
				height={waveH}
				layerConfig={cardLayerConfig}
				class="absolute inset-0 h-full w-full"
			/>

			<div class="speaker-details-overlay pointer-events-auto absolute inset-0 flex flex-col">
				<div class="absolute inset-x-0 bottom-0" style="height: {waveH * 0.3}px">
					<div class="speaker-image absolute top-15 right-5 -translate-y-full">
						<img
							class="h-auto w-full"
							src="{base}/images/speakers/2026/speaker-placeholder.avif"
							alt="Speaker placeholder image"
						/>
					</div>

					<svg
						class="relative block h-full w-full"
						viewBox="0 0 1080 365"
						preserveAspectRatio="none"
						fill="none"
						aria-hidden="true"
					>
						<path
							d="M0.5 364.516V0.516363C191.5 -0.982956 456 101.337 579 114.518C705 128.018 1004.5 9.01752 1080 2.01636V364.516H0.5Z"
							fill="#C3D1F6"
						/>
					</svg>
				</div>

				<div class="speaker-details-content relative z-30 mt-auto w-full p-2.5 md:p-4">
					<div class="speaker-details relative z-10">
						<h3
							class="font-display text-shadow mb-1 text-2xl leading-none text-[#4c4c4c] uppercase md:text-[26px] lg:text-3xl"
						>
							<span
								class="first-name text-2xl leading-none font-extrabold md:text-[28px] 2xl:text-3xl"
								>{speakerName.split(' ')[0]}</span
							>
							<span class="last-name text-2xl leading-none font-medium md:text-[28px] 2xl:text-3xl"
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

	.speaker-image {
		max-width: min(300px, 55%);
	}

	.text-shadow {
		text-shadow:
			-1px -1px 0 white,
			1px -1px 0 white,
			-1px 1px 0 white,
			1px 1px 0 white;
	}
</style>
