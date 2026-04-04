<script lang="ts">
	import ProposalBadge from '../proposals/ProposalBadge.svelte';
	import LogoType from '../typography/LogoType.svelte';
	import { sessionColorMap } from '$lib/utils/sessions';

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
		class="sessions-card group white block overflow-hidden rounded border p-5 transition-shadow hover:shadow-md md:p-6"
	>
		<div class="session-card-header">
			<div class="title mb-3 flex flex-row items-baseline justify-start gap-2">
				<div class="logo-container text-viz-grey text-2xl leading-[1]">
					<LogoType year={null} />
				</div>

				<div class="divider bg-viz-grey my-0.5 w-[2px] self-stretch"></div>
				<p
					class="font-display block text-2xl leading-[1] font-bold tracking-tighter uppercase"
					style="color: var(--color-{currentColor})"
				>
					{sessionType}
				</p>
			</div>

			<div class="sessions-logistics">
				<p class="text-xl uppercase">
					{#if formattedDate}
						<span class="font-display font-black">{formattedDate}</span>
					{/if}
					<span class="font-display font-light">, Bangalore International Centre </span>
				</p>
			</div>
		</div>

		<div class="session-card-body">
			<div class="title-content">
				<h3 class="title">{title}</h3>
				{#if subtitle}
					<p class="subtitle">{subtitle}</p>
				{/if}
			</div>
			<div class="speaker-details-content">
				<!-- background Component -->
				<div class="speaker-details">
					<h3>
						{speakerName}
					</h3>
					{#if designation || organisation}
						<span class="text-viz-grey/50">
							{#if designation}
								{designation}
							{/if}
							{#if organisation}, {organisation}{/if}
						</span>
					{/if}
				</div>
			</div>
		</div>
	</a>
{/if}

<style>
	.sessions-card {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
</style>
