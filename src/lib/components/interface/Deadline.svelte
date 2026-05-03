<script lang="ts">
	interface Props {
		startDate: string;
		deadline: string;
		title?: string;
	}

	let { startDate, deadline, title = 'Deadline' }: Props = $props();

	let start = $derived(new Date(startDate));
	let end = $derived(new Date(deadline));
	let today = $derived(new Date());

	let totalDays = $derived(Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
	let daysProgress = $derived(
		Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
	);
	let daysLeft = $derived(Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

	let isPast = $derived(daysLeft < 0);
	let progressPercent = $derived(Math.min(Math.max((daysProgress / totalDays) * 100, 0), 100));

	// Format dates
	let formattedStart = $derived(
		start.toLocaleDateString('en-IN', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		})
	);

	let formattedEnd = $derived(
		end.toLocaleDateString('en-IN', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		})
	);

	let displayTitle = $derived(`${title}: ${formattedEnd}`);
</script>

<div class="not-prose font-display mx-auto my-16 flex w-full max-w-2xl flex-col items-center gap-6">
	<h3 class="text-viz-black text-lg font-bold tracking-wide uppercase">{displayTitle}</h3>

	<div class="flex w-full flex-col gap-6">
		<!-- Timeline Row -->
		<div class="flex items-center gap-0">
			<!-- Start Date Dot -->
			<div class="bg-viz-black h-3 w-3 flex-shrink-0 rounded-full"></div>

			<!-- Progress Bar Container -->
			<div class="relative flex-1 px-2">
				<!-- Progress bar -->
				<progress
					value={daysProgress}
					max={totalDays}
					class="bg-viz-black h-1 w-full appearance-none rounded-full"
				></progress>

				<!-- Today vertical line marker -->
				<div
					class="bg-viz-black absolute top-1/2 h-6 w-0.5 -translate-x-1/2 -translate-y-1/2"
					style="left: {progressPercent}%"
				></div>
			</div>

			<!-- End Date Dot -->
			<div class="bg-viz-pink h-3 w-3 flex-shrink-0 rounded-full"></div>
		</div>

		<!-- Labels Row -->
		<div class="relative flex items-start gap-0">
			<!-- Start Date Label -->
			<div class="w-3 flex-shrink-0">
				<span class="text-viz-black block text-xs font-bold tracking-wider uppercase"
					>{formattedStart}</span
				>
			</div>

			<!-- Center spacing -->
			<div class="flex flex-1 justify-center px-2">
				<!-- Today Label -->
				<div class="flex flex-col items-center gap-1">
					<span class="text-viz-black text-xs font-bold tracking-wider whitespace-nowrap uppercase"
						>Today</span
					>
					<span class="text-viz-pink-dark text-sm font-bold">
						{#if isPast}
							Closed
						{:else}
							{daysLeft}d remaining
						{/if}
					</span>
				</div>
			</div>

			<!-- End Date Label -->
			<div class="w-3 flex-shrink-0 text-right">
				<span class="text-viz-pink-dark block text-xs font-bold tracking-wider uppercase"
					>{formattedEnd}</span
				>
			</div>
		</div>
	</div>
</div>

<style>
	progress {
		accent-color: var(--viz-color-pink);
	}

	progress::-webkit-progress-bar {
		background-color: var(--viz-color-black);
	}

	progress::-webkit-progress-value {
		background-color: var(--viz-color-pink);
		border-radius: 9999px;
	}

	progress::-moz-progress-bar {
		background-color: var(--viz-color-pink);
		border-radius: 9999px;
	}
</style>
