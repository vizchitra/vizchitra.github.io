<script lang="ts">
	import { getOrCreateDeviceId } from '$lib/utils/device-id';
	import { browser } from '$app/environment';

	interface Props {
		slug: string;
		initialVotes?: number;
		initialHasVoted?: boolean;
		color?: 'pink' | 'blue' | 'yellow' | 'teal' | 'orange';
		variant?: 'inline' | 'prominent';
	}

	let {
		slug,
		initialVotes = 0,
		initialHasVoted = false,
		color = 'pink',
		variant = 'inline'
	}: Props = $props();

	let votes = $state(0);
	let hasVoted = $state(false);
	let isLoading = $state(false);
	let deviceId = $state<string>('');

	// Initialize state from props
	$effect(() => {
		votes = initialVotes;
		hasVoted = initialHasVoted;
	});

	// Color configurations
	const colorConfig = {
		pink: {
			filled: 'text-viz-pink-dark',
			outline: 'text-viz-grey/50 hover:text-viz-pink-dark',
			bg: 'bg-viz-pink-light/20 hover:bg-viz-pink-light/40',
			bgActive: 'bg-viz-pink-light/30',
			border: 'border-viz-pink/20',
			shadow: 'shadow-viz-pink/10'
		},
		blue: {
			filled: 'text-viz-blue-dark',
			outline: 'text-viz-grey/50 hover:text-viz-blue-dark',
			bg: 'bg-viz-blue-light/20 hover:bg-viz-blue-light/40',
			bgActive: 'bg-viz-blue-light/30',
			border: 'border-viz-blue/20',
			shadow: 'shadow-viz-blue/10'
		},
		yellow: {
			filled: 'text-viz-yellow-dark',
			outline: 'text-viz-grey/50 hover:text-viz-yellow-dark',
			bg: 'bg-viz-yellow-light/20 hover:bg-viz-yellow-light/40',
			bgActive: 'bg-viz-yellow-light/30',
			border: 'border-viz-yellow/20',
			shadow: 'shadow-viz-yellow/10'
		},
		teal: {
			filled: 'text-viz-teal-dark',
			outline: 'text-viz-grey/50 hover:text-viz-teal-dark',
			bg: 'bg-viz-teal-light/20 hover:bg-viz-teal-light/40',
			bgActive: 'bg-viz-teal-light/30',
			border: 'border-viz-teal/20',
			shadow: 'shadow-viz-teal/10'
		},
		orange: {
			filled: 'text-viz-orange-dark',
			outline: 'text-viz-grey/50 hover:text-viz-orange-dark',
			bg: 'bg-viz-orange-light/20 hover:bg-viz-orange-light/40',
			bgActive: 'bg-viz-orange-light/30',
			border: 'border-viz-orange/20',
			shadow: 'shadow-viz-orange/10'
		}
	};

	const config = $derived(colorConfig[color]);

	// Initialize device ID and fetch vote status on mount
	$effect(() => {
		if (!browser) return;

		// Get or create device ID
		deviceId = getOrCreateDeviceId();

		// Fetch current vote status with device ID
		if (deviceId) {
			loadVoteStatus();
		}
	});

	async function loadVoteStatus() {
		if (!browser || !deviceId) return;

		try {
			const response = await fetch(`/api/proposals/${slug}/votes?deviceId=${deviceId}`);
			if (response.ok) {
				const data = await response.json();
				votes = data.votes;
				hasVoted = data.hasVoted;
			}
		} catch (err) {
			// Silent failure - use initial values
			console.warn('Failed to load vote status:', err);
		}
	}

	async function toggleUpvote() {
		if (isLoading || !browser || !deviceId) return;

		// Store previous state for rollback
		const previousVotes = votes;
		const previousHasVoted = hasVoted;

		// Optimistic update
		isLoading = true;
		hasVoted = !hasVoted;
		votes = hasVoted ? votes + 1 : votes - 1;

		try {
			const method = previousHasVoted ? 'DELETE' : 'POST';
			const response = await fetch(`/api/proposals/${slug}/upvote`, {
				method,
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ deviceId })
			});

			if (response.ok) {
				const data = await response.json();
				votes = data.votes;
				hasVoted = data.hasVoted;
			} else {
				// Revert on error
				votes = previousVotes;
				hasVoted = previousHasVoted;
			}
		} catch (err) {
			// Revert on error (silent handling)
			votes = previousVotes;
			hasVoted = previousHasVoted;
			console.warn('Failed to toggle upvote:', err);
		} finally {
			isLoading = false;
		}
	}
</script>

{#if variant === 'prominent'}
	<!-- Compact prominent variant - floats on desktop, integrates in header on mobile -->
	<button
		onclick={toggleUpvote}
		disabled={isLoading}
		class="group relative flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-2.5 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 {config.border} {hasVoted
			? config.bgActive
			: config.bg} shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
		aria-label={hasVoted ? 'Remove upvote' : 'Upvote proposal'}
		aria-pressed={hasVoted}
	>
		<!-- Heart icon -->
		{#if hasVoted}
			<svg
				class="h-5 w-5 transition-all duration-200 group-hover:scale-110 {config.filled}"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path
					fill-rule="evenodd"
					d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
					clip-rule="evenodd"
				/>
			</svg>
		{:else}
			<svg
				class="h-5 w-5 transition-all duration-200 group-hover:scale-110 {config.outline}"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				stroke-width="2.5"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
				/>
			</svg>
		{/if}

		<!-- Vote count -->
		<div class="flex flex-col items-center gap-0">
			<span
				class="font-display-sans text-lg font-bold tabular-nums leading-none transition-colors {hasVoted
					? config.filled
					: config.outline}"
			>
				{votes}
			</span>
			<span class="text-viz-grey/50 text-[9px] font-medium uppercase tracking-wider leading-tight mt-0.5">
				{votes === 1 ? 'Vote' : 'Votes'}
			</span>
		</div>
	</button>
{:else}
	<!-- Inline compact variant -->
	<button
		onclick={toggleUpvote}
		disabled={isLoading}
		class="inline-flex items-center gap-1.5 rounded-full border border-current px-2.5 py-1 text-xs font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50 {hasVoted
			? config.filled
			: config.outline} hover:bg-current/5"
		aria-label={hasVoted ? 'Remove upvote' : 'Upvote proposal'}
		aria-pressed={hasVoted}
	>
		{#if hasVoted}
			<svg class="h-3.5 w-3.5 transition-transform hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
				<path
					fill-rule="evenodd"
					d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
					clip-rule="evenodd"
				/>
			</svg>
		{:else}
			<svg
				class="h-3.5 w-3.5 transition-transform hover:scale-110"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
				/>
			</svg>
		{/if}
		<span class="font-semibold tabular-nums">{votes}</span>
	</button>
{/if}
