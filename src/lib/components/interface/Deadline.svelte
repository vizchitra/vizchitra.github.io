<script lang="ts">
	interface Props {
		startDate: string;
		deadline: string;
		title?: string;
	}

	let { startDate, deadline, title = 'Deadline' }: Props = $props();

	const start = new Date(startDate);
	const end = new Date(deadline);
	const today = new Date();

	// Calculate days
	const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
	const daysProgress = Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
	const daysLeft = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

	const isPast = daysLeft < 0;
	const progressPercent = Math.min(Math.max((daysProgress / totalDays) * 100, 0), 100);

	// Format dates
	const formattedStart = start.toLocaleDateString('en-IN', {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	});

	const formattedEnd = end.toLocaleDateString('en-IN', {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	});

	const displayTitle = `${title}: ${formattedEnd}`;
</script>

<div class="not-prose font-display mx-auto my-16 flex w-full max-w-2xl flex-col items-center gap-6">
	<h3 class="text-viz-black text-lg font-bold tracking-wide uppercase">{displayTitle}</h3>

	<div class="flex w-full flex-col gap-6">
		<!-- Timeline Row -->
		<div class="flex items-center gap-0">
			<!-- Start Date Dot -->
			<div class="h-3 w-3 rounded-full bg-viz-black flex-shrink-0"></div>

			<!-- Progress Bar Container -->
			<div class="relative flex-1 px-2">
				<!-- Progress bar -->
				<progress
					value={daysProgress}
					max={totalDays}
					class="h-1 w-full appearance-none rounded-full bg-viz-black"
				></progress>

				<!-- Today vertical line marker -->
				<div
					class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-0.5 h-6 bg-viz-black"
					style="left: {progressPercent}%"
				></div>
			</div>

			<!-- End Date Dot -->
			<div class="h-3 w-3 rounded-full bg-viz-pink flex-shrink-0"></div>
		</div>

		<!-- Labels Row -->
		<div class="flex items-start gap-0 relative">
			<!-- Start Date Label -->
			<div class="flex-shrink-0 w-3">
				<span class="text-viz-black text-xs font-bold tracking-wider uppercase block">{formattedStart}</span>
			</div>

			<!-- Center spacing -->
			<div class="flex-1 flex justify-center px-2">
				<!-- Today Label -->
				<div class="flex flex-col items-center gap-1">
					<span class="text-viz-black text-xs font-bold tracking-wider uppercase whitespace-nowrap"
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
			<div class="flex-shrink-0 w-3 text-right">
				<span class="text-viz-pink-dark text-xs font-bold tracking-wider uppercase block">{formattedEnd}</span>
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
