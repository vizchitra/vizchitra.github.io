<script lang="ts">
	import VizChitraLogoType from '$lib/components/VizChitraLogoType.svelte';
	import agenda from '$lib/data/agenda.csv';
	import { onMount } from 'svelte';
	import alternate from '$lib/assets/images/icons/alternate.png'
	import bof from '$lib/assets/images/icons/bof.png'
	import keynote from '$lib/assets/images/icons/keynote.png'
	import lightning from '$lib/assets/images/icons/lightning.png'
	import panel from '$lib/assets/images/icons/panel.png'
	import sponsored from '$lib/assets/images/icons/sponsored.png'
	import standard from '$lib/assets/images/icons/standard.png'
	import workshop from '$lib/assets/images/icons/workshop.png'
	import {group} from 'd3';

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
		icon: string,
		bgFill: string,
		audience: string;
		room: string;
		location: string;
		day: string;
	}

	interface IconType {
		iconName: string;
		icon: string;
		iconLine: string;
	}

	const scheduleDate = [
		{
			day: 'Conference Day',
			date: '27 June'
		},
		{
			day: 'Workshop Day',
			date: '28 June'
		},
		{
			day: '&nbsp;',
			date: 'Chitra'
		}
	];

	const byDay = [
		['AUDI', 'HALL 1', 'HALL 2'],
		['Samagata', 'Underline Center'],
		['By Topic', 'By Talk']
	];

	const icon = [
		{iconName: 'alternate', icon: alternate},
		{iconName: 'bof', icon: bof},
		{iconName: 'keynote', icon: keynote},
		{iconName: 'lightning', icon: lightning},
		{iconName: 'panel', icon: panel},
		{iconName: 'sponsored', icon: sponsored},
		{iconName: 'standard', icon: standard},
		{iconName: 'workshop', icon: workshop}
	]

	const iconGroup = group(icon, (d: IconType)=>d.iconName)

	console.log(iconGroup.get('alternate'))

	const audiSchedule = agenda.filter((d: AgendaType) => d.room === 'Audi' && d.show === 'TRUE');
	const hall1Schedule = agenda.filter((d: AgendaType) => d.room === 'Hall 1' && d.show === 'TRUE');
	const hall2Schedule = agenda.filter((d: AgendaType) => d.room === 'Hall 2' && d.show === 'TRUE');


	const schedule = [
		[
			audiSchedule,
			hall1Schedule,
			hall2Schedule
		],
		[
			hall1Schedule,
			hall2Schedule
		],
		[
			hall1Schedule,
			hall2Schedule
		]
	]

	let selectedDayIndex = 0;
	let selectedLocationIndex = 0;
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
			hourHeight = window.matchMedia('(min-width: 1024px)').matches ? 190 : 290;
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
			<div class="flex justify-evenly items-center">
				{#each scheduleDate as schedule, index}
					<button
						class="flex cursor-pointer flex-col  {selectedDayIndex === index
							? 'border-viz-orange border-b-4'
							: ''}"
						on:click={() => (selectedDayIndex = index)}
					>
						<h4
							class="text-sm {selectedDayIndex === index
								? 'text-viz-grey-dark font-bold'
								: 'font-normal text-gray-400'}"
						>
							{@html schedule.day}
						</h4>
						<h1
							class="{selectedDayIndex === index
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
		<div class="flex justify-center py-4 pt-4">
			<div class="flex gap-10">
				{#each byDay[selectedDayIndex] as day, dayIndex}
					<button
						class="cursor-pointer {selectedLocationIndex === dayIndex
							? 'border-viz-orange border-b-4'
							: ''}"
						on:click={() => (selectedLocationIndex= dayIndex)}
					>
						<h4
							class="{selectedLocationIndex === dayIndex
								? 'text-viz-grey-dark font-bold'
								: 'font-normal text-gray-400'}"
						>
							{day}
						</h4>
					</button>
				{/each}
			</div>
		</div>
	</div>

	<div class="mt-6 mr-1 flex">
		<div class="time-labels pr-4 text-right">
			{#each Array(scheduleEnd - scheduleStart + 1)
				.fill(0)
				.map((_, i) => scheduleStart + i) as hour}
				<div style="height: {hourHeight}px" class="text-sm text-gray-400">{hour}:00</div>
			{/each}
		</div>
		<div
			class="relative w-full border-l border-gray-300"
			style="height: {(scheduleEnd - scheduleStart) * hourHeight}px"
		>
			{#each schedule[selectedDayIndex][selectedLocationIndex] as event}
				<div
					class="absolute right-0 left-0 flex gap-2 rounded-xs border-y border-white px-2 shadow {event.bgFill}"
					style={getPositionStyle(event)}
				>
					{#if event.type === 'other'}
					<div class="flex items-center">
						<span class="text-white">{event.session}</span>
					</div>
					{:else}
					<div class="flex items-center gap-4">
						<div>
							<img
								src={iconGroup.get(event.icon)?.[0].icon}
								alt={iconGroup.get(event.icon)?.[0].iconName}
								class="h-[20px] w-auto self-center"
							/>
						</div>
						<div class="text-md lg:text-lg leading-4.5">
							<div>
								<span>{event.session} - </span>
								<span class="font-bold">{event.facilitator}</span>
							</div>
						</div>
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
