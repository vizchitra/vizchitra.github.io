<script lang="ts">
	import VizChitraLogoType from '$lib/components/VizChitraLogoType.svelte';
	import agenda from '$lib/data/agenda.csv';
	import chitra from '$lib/data/chitra.csv';
	import { onMount } from 'svelte';
	import alternate from '$lib/assets/images/icons/alternate.png';
	import bof from '$lib/assets/images/icons/bof.png';
	import keynote from '$lib/assets/images/icons/keynote.png';
	import lightning from '$lib/assets/images/icons/lightning.png';
	import panel from '$lib/assets/images/icons/panel.png';
	import sponsored from '$lib/assets/images/icons/sponsored.png';
	import standard from '$lib/assets/images/icons/standard.png';
	import workshop from '$lib/assets/images/icons/workshop.png';
	import { group, hierarchy, pack, scaleOrdinal } from 'd3';
	import tippy from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/themes/light.css';

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
		icon: string;
		bgFill: string;
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

	interface ChitraType {
		session: string;
		facilitator: string;
		duration: number;
		type: string;
		icon: string;
		bgFill: string;
		audience: string;
		theme: string;
		topic: string;
		room: string;
		location: string;
		day: string;
		date: string;
	}

	interface HierarchyNode {
		name: string;
		value?: number;
		children?: HierarchyNode[];
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
		{ iconName: 'alternate', icon: alternate },
		{ iconName: 'bof', icon: bof },
		{ iconName: 'keynote', icon: keynote },
		{ iconName: 'lightning', icon: lightning },
		{ iconName: 'panel', icon: panel },
		{ iconName: 'sponsored', icon: sponsored },
		{ iconName: 'standard', icon: standard },
		{ iconName: 'workshop', icon: workshop }
	];

	const iconGroup = group(icon, (d: IconType) => d.iconName);

	const audiSchedule = agenda.filter((d: AgendaType) => d.room === 'Audi' && d.show === 'TRUE');
	const hall1Schedule = agenda.filter((d: AgendaType) => d.room === 'Hall 1' && d.show === 'TRUE');
	const hall2Schedule = agenda.filter((d: AgendaType) => d.room === 'Hall 2' && d.show === 'TRUE');

	const samagataSchedule = agenda.filter(
		(d: AgendaType) => d.location === 'Samagata' && d.show === 'TRUE'
	);
	const underlineSchedule = agenda.filter(
		(d: AgendaType) => d.location === 'Underline Center' && d.show === 'TRUE'
	);
	const underlineScheduleMap1 = {
		start: '10:00',
		end: '13:00',
		type: 'Workshop',
		icon: 'workshop',
		bgFill: 'bg-viz-teal',
		floor2: underlineSchedule.slice(1)[0],
		floor3: underlineSchedule.slice(1)[2]
	};
	const underlineScheduleMap2 = {
		start: '14:30',
		end: '17:30',
		type: 'Workshop',
		icon: 'workshop',
		bgFill: 'bg-viz-teal',
		floor2: underlineSchedule.slice(1)[1],
		floor3: underlineSchedule.slice(1)[3]
	};

	const schedule = [
		[audiSchedule, hall1Schedule, hall2Schedule],
		[samagataSchedule, [underlineSchedule[0], underlineScheduleMap1, underlineScheduleMap2]],
		[hall1Schedule, hall2Schedule]
	];

	let selectedDayIndex = 0;
	let selectedConfIndex = 0;
	let selectedWorkIndex = 0;
	let selectedChitraIndex = 0;

	const scheduleStart = 8;
	const scheduleEnd = 18;
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

	let containerEl: HTMLDivElement;
	let containerWidth = 500;

	function buildHierarchy(grouped: Map<string, Map<string, ChitraType[]>>): any {
		return {
			name: 'root',
			children: Array.from(grouped, ([key, sessions]) => ({
				name: key,
				children: Array.from(sessions, ([sessionKey, values]) => ({
					name: sessionKey,
					value: values.reduce((sum, d) => sum + Number(d.duration), 0),
					type: values[0].type,
					session: values[0].session,
					facilitator: values[0].facilitator,
					location: values[0].location,
					date: values[0].date
				}))
			}))
		};
	}

	function circlePackingData(data: ChitraType[], type: string, containerWidth: number) {
		const chitraByTopic = group(
			data,
			(d: ChitraType) => d.topic,
			(d: ChitraType) => d.session
		);
		const chitraByTalk = group(
			data,
			(d: ChitraType) => d.type,
			(d: ChitraType) => d.session
		);

		const grouped = type === 'topic' ? chitraByTopic : chitraByTalk;

		const rootObject = buildHierarchy(grouped);

		const root = hierarchy(rootObject)
			.sum((d: HierarchyNode) => d.value || 0)
			.sort((a: HierarchyNode, b: HierarchyNode) => (b.value || 0) - (a.value || 0));

		const layout = pack().size([containerWidth, containerWidth]).padding(30);

		return layout(root).descendants().slice(1);
	}

	const colorScale = scaleOrdinal()
		.domain([
			'Alternate',
			'Bof',
			'Keynote',
			'Lightning',
			'Panel',
			'Sponsored',
			'Standard',
			'Workshop'
		])
		.range([
			'#F89F72',
			'#A8BDF0',
			'#EE88B3',
			'#FFD485',
			'#97E4DD',
			'#97E4DD',
			'#F89F72',
			'#97E4DD'
		]);

	function tooltip(node: SVGCircleElement, params: object) {
		let tip = tippy(node, {
			...params,
			theme: 'light',
			allowHTML: true
		});
		return {
			update: (newParams: object) => {
				tip.setProps({
					...newParams,
					theme: 'light',
					allowHTML: true
				});
			},
			destroy: () => {
				tip.destroy();
			}
		};
	}

	onMount(() => {
		const updateHourHeight = () => {
			hourHeight = window.matchMedia('(min-width: 1024px)').matches ? 190 : 290;
		};

		updateHourHeight(); // initial check
		window.addEventListener('resize', updateHourHeight);

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const width = entry.contentRect.width;
				if (width !== containerWidth) {
					containerWidth = width;
				}
			}
		});

		resizeObserver.observe(containerEl);

		return () => {
			window.removeEventListener('resize', updateHourHeight);
			resizeObserver.disconnect();
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
			<div class="flex items-center justify-evenly">
				{#each scheduleDate as schedule, index}
					<button
						class="flex cursor-pointer flex-col {selectedDayIndex === index
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
							class={selectedDayIndex === index
								? 'text-viz-grey-dark font-bold'
								: 'font-normal text-gray-400'}
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
				{#each byDay[selectedDayIndex] as room, roomIndex}
					<button
						class="cursor-pointer {(selectedDayIndex === 0 && selectedConfIndex === roomIndex) ||
						(selectedDayIndex === 1 && selectedWorkIndex === roomIndex) ||
						(selectedDayIndex === 2 && selectedChitraIndex === roomIndex)
							? 'border-viz-orange border-b-4'
							: ''}"
						on:click={() =>
							selectedDayIndex === 0
								? (selectedConfIndex = roomIndex)
								: selectedDayIndex === 1
									? (selectedWorkIndex = roomIndex)
									: (selectedChitraIndex = roomIndex)}
					>
						<h4
							class={(selectedDayIndex === 0 && selectedConfIndex === roomIndex) ||
							(selectedDayIndex === 1 && selectedWorkIndex === roomIndex) ||
							(selectedDayIndex === 2 && selectedChitraIndex === roomIndex)
								? 'text-viz-grey-dark font-bold'
								: 'font-normal text-gray-400'}
						>
							{room}
						</h4>
					</button>
				{/each}
			</div>
		</div>
	</div>
	{#if selectedDayIndex !== 2}
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
				{#each schedule[selectedDayIndex][selectedDayIndex === 0 ? selectedConfIndex : selectedDayIndex === 1 ? selectedWorkIndex : selectedChitraIndex] as event}
					<div
						class="absolute right-0 left-0 flex gap-2 rounded-xs border-y border-white px-2 shadow {event.bgFill}"
						style={getPositionStyle(event)}
					>
						{#if event.type === 'other'}
							<div class="flex items-center">
								<span class="text-white">{event.session}</span>
							</div>
						{:else if selectedDayIndex === 1 && selectedWorkIndex === 1 && event.type !== 'other'}
							<div class="flex flex-col justify-center gap-4">
								<div class="flex items-center gap-4">
									<img
										src={iconGroup.get(event.icon)?.[0].icon}
										alt={iconGroup.get(event.icon)?.[0].iconName}
										class="h-[20px] w-auto self-center"
									/>
									<div class="text-md leading-4.5 lg:text-lg">
										<div>
											<span>{event.floor2.session} - </span>
											<span class="font-bold">{event.floor2.facilitator}</span>
											<span>| 2nd Floor</span>
										</div>
									</div>
								</div>
								<div class="flex items-center gap-4">
									<img
										src={iconGroup.get(event.icon)?.[0].icon}
										alt={iconGroup.get(event.icon)?.[0].iconName}
										class="h-[20px] w-auto self-center"
									/>
									<div class="text-md leading-4.5 lg:text-lg">
										<div>
											<span>{event.floor3.session} - </span>
											<span class="font-bold">{event.floor3.facilitator}</span>
											<span>| 3rd Floor</span>
										</div>
									</div>
								</div>
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
								<div class="text-md leading-4.5 lg:text-lg">
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
	{:else}
		<div bind:this={containerEl}>
			{#if selectedChitraIndex === 0}
				<svg
					viewBox={`0 0 ${containerWidth} ${containerWidth}`}
					preserveAspectRatio="xMidYMid meet"
					class="h-auto w-full"
				>
					{#each circlePackingData(chitra, 'topic', containerWidth) as d, i}
						<circle
							use:tooltip={{
								content: `${
									d.depth !== 2
										? d.data.name
										: `<div class="font-[Cairo]">
							<h3 class="font-bold">${d.data.name}</h3>
							<span>by ${d.data.facilitator}</span>
							<hr class="border border-gray-300 my-2">
							<span>${d.data.date}</span><br>
							<span>${d.data.location}</span>
							</div>
							`
								}`
							}}
							class="cursor-pointer"
							cx={d.x}
							cy={d.y}
							r={d.r}
							fill={d.depth === 2 ? colorScale(d.data.type) : 'white'}
							stroke={d.depth === 2 ? 'white' : 'grey'}
							stroke-width="2"
						/>

						<defs>
							<path
								id={`circlePath-${i}`}
								d={`M ${d.x} ${d.y}
m -${d.r}, 0
a ${d.r},${d.r} 0 1,1 ${2 * d.r},0
a ${d.r},${d.r} 0 1,1 -${2 * d.r},0`}
								fill="white"
							/>
						</defs>
						{#if d.depth === 1}
							<text class="lg:text-md text-sm" fill="grey" y="-5" text-anchor="middle">
								<textPath href={`#circlePath-${i}`} startOffset="40%" dy="-10" fill="black">
									{d.data.name}
								</textPath>
							</text>
						{/if}
					{/each}
				</svg>
			{:else}
				<svg
					viewBox={`0 0 ${containerWidth} ${containerWidth}`}
					preserveAspectRatio="xMidYMid meet"
					class="h-auto w-full"
				>
					{#each circlePackingData(chitra, 'type', containerWidth) as d, i}
						<circle
							use:tooltip={{
								content: `${
									d.depth !== 2
										? d.data.name
										: `<div class="font-[Cairo]">
					<h3 class="font-bold">${d.data.name}</h3>
					<span>by ${d.data.facilitator}</span>
					<hr class="border border-gray-300 my-2">
					<span>${d.data.date}</span><br>
					<span>${d.data.location}</span>
					</div>
					`
								}`
							}}
							class="cursor-pointer"
							cx={d.x}
							cy={d.y}
							r={d.r}
							fill={d.depth === 2 ? colorScale(d.data.type) : 'white'}
							stroke={d.depth === 2 ? 'white' : 'grey'}
							stroke-width="2"
						/>

						<defs>
							<path
								id={`circlePath-${i}`}
								d={`M ${d.x} ${d.y}
m -${d.r}, 0
a ${d.r},${d.r} 0 1,1 ${2 * d.r},0
a ${d.r},${d.r} 0 1,1 -${2 * d.r},0`}
								fill="white"
							/>
						</defs>
						{#if d.depth === 1}
							<text class="lg:text-md text-sm" fill="grey" y="-5" text-anchor="middle">
								<textPath href={`#circlePath-${i}`} startOffset="25%" dy="-10" fill="black">
									{d.data.name}
								</textPath>
							</text>
						{/if}
					{/each}
				</svg>
			{/if}
		</div>
	{/if}
</div>

<style>
	* {
		font-family: 'Cairo';
	}
</style>
