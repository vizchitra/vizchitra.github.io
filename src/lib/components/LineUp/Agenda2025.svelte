<script lang="ts">
	import VizChitraLogoType from '$lib/components/VizChitraLogoType.svelte';
	import agenda from '$lib/data/agenda.csv';
	import { onMount } from 'svelte';

	interface EventType {
		title: string;
		start: string;
		end: string;
		location: string;
	}

	interface AgendaType {
		start: string;
		end: string;
		session: string;
		show: string;
		facilitator: string;
		link: string;
		duration: string;
		type: string;
		audience: string;
		room: string;
		location: string;
		day: string;
	}
	const scheduleDate = [
		{
			day: 'Conference Day',
			date: '27 June'
		},
		{
			day: 'Workshop Day',
			date: '28 June'
		}
	];

	const conferenceDay = [
		{
			location: 'AUDI'
		},
		{
			location: 'HALL 1'
		},
		{
			location: 'HALL 2'
		}
	];

	const workshopDay = [
		{
			location: 'Samagata'
		},
		{
			location: 'Underline Center'
		}
	];

	const audiSchedule = agenda.filter((d: AgendaType) => d.room === 'Audi' && d.show === 'True');

	let selectedDayIndex = 0;
	let selectedConfIndex = 0;
	let selectedWorkIndex = 0;

	const scheduleStart = 8;
	const scheduleEnd = 17;
	let hourHeight = 250; 

	function timeToMinutes(time: String) {
		const [h, m] = time.split(':').map(Number);
		return h * 60 + m;
	}

	function getPositionStyle(event: EventType) {
		const pixelsPerMinute = hourHeight / 60;
		const startMinutes = timeToMinutes(event.start);
		const endMinutes = timeToMinutes(event.end);

		const top = (startMinutes - scheduleStart * 60) * pixelsPerMinute;
		const height = (endMinutes - startMinutes) * pixelsPerMinute;

		return `top: ${top}px; height: ${height}px;`;
	}

	onMount(() => {
		const updateHourHeight = () => {
			hourHeight = window.matchMedia('(min-width: 1024px)').matches ? 110 : 250;
		};

		updateHourHeight(); // initial check
		window.addEventListener('resize', updateHourHeight);

		return () => {
			window.removeEventListener('resize', updateHourHeight);
		};
	});
</script>

<div class="container">
	<div class="sticky top-0 z-10 bg-white pt-12">
		<div class="m-0 flex flex-col p-0">
			<div class="justify-center px-2 py-6 text-center">
				<h1 id="agenda">
					<VizChitraLogoType></VizChitraLogoType>
					<span class="text-[30px] font-semibold md:text-[36px]">AGENDA</span>
				</h1>
			</div>
			<div class="flex justify-evenly">
				{#each scheduleDate as schedule, index}
					<button
						class="flex cursor-pointer flex-col items-center px-8 {selectedDayIndex === index
							? 'border-viz-orange border-b-4'
							: ''}"
						on:click={() => (selectedDayIndex = index)}
					>
						<h3
							class="text-sm {selectedDayIndex === index
								? 'text-viz-grey-dark font-bold'
								: 'font-normal text-gray-400'}"
						>
							{schedule.day}
						</h3>
						<h1
							class="text-2xl {selectedDayIndex === index
								? 'text-viz-grey-dark font-bold'
								: 'font-normal text-gray-400'}"
						>
							{schedule.date}
						</h1>
					</button>
				{/each}
			</div>
			<hr class="border border-gray-200" />
		</div>
		{#if selectedDayIndex === 0}
			<div class="flex justify-center py-4 pt-4">
				<div class="flex gap-10">
					{#each conferenceDay as conference, confIndex}
						<button
							class="cursor-pointer {selectedConfIndex === confIndex
								? 'border-viz-orange border-b-4'
								: ''}"
							on:click={() => (selectedConfIndex = confIndex)}
						>
							<h4
								class={selectedConfIndex === confIndex
									? 'text-viz-grey-dark font-bold'
									: 'font-normal text-gray-400'}
							>
								{conference.location}
							</h4>
						</button>
					{/each}
				</div>
			</div>
		{:else}
			<div class="sticky top-0 flex justify-center py-4">
				<div class="flex gap-8">
					{#each workshopDay as workshop, workIndex}
						<button
							class="cursor-pointer {selectedWorkIndex === workIndex
								? 'border-viz-orange border-b-4'
								: ''}"
							on:click={() => (selectedWorkIndex = workIndex)}
						>
							<h4
								class={selectedWorkIndex === workIndex
									? 'text-viz-grey-dark font-bold'
									: 'font-normal text-gray-400'}
							>
								{workshop.location}
							</h4></button
						>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<div class="mt-6 flex">
		<div class="time-labels pr-4 text-right">
			{#each Array(scheduleEnd - scheduleStart + 1)
				.fill(0)
				.map((_, i) => scheduleStart + i) as hour}
				<div style="height: {hourHeight}px" class="text-sm text-gray-400">{hour}:00</div>
			{/each}
		</div>
		<!-- <div class="time-labels pr-4 text-right">
			{#each Array(scheduleEnd - scheduleStart + 1)
				.fill(0)
				.map((_, i) => scheduleStart + i) as hour}
				<div class="h-[250px] text-sm text-gray-400">{hour}:00</div>
			{/each}
		</div> -->

		<div
			class="relative w-full border-l border-gray-300"
			style="height: {(scheduleEnd - scheduleStart) * hourHeight}px"
		>
			{#each audiSchedule as event}
				<div
					class="absolute right-0 left-0 flex gap-2 rounded-xs border-y border-white px-2 shadow {event.type ===
					'Keynote'
						? 'bg-viz-pink'
						: event.type === 'Standard'
							? 'bg-viz-orange'
							: event.type === 'Lightning'
								? 'bg-viz-yellow'
								: event.type === 'Sponsored' || event.type === 'Panel'
									? 'bg-viz-teal'
									: 'bg-viz-grey'}"
					style={getPositionStyle(event)}
				>
					{#if event.type === 'other'}
						<span class="text-white">{event.session}</span>
					{:else}
						<div class="text-lg font-semibold">
							<span>{event.session} - </span> <span class="font-bold">{event.facilitator}</span>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	* {
		font-family: 'Cairo';
	}
</style>
