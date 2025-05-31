<script>
	import VizChitraLogoType from '$lib/components/VizChitraLogoType.svelte';
    import CustomSlantedText from '../Common/CustomSlantedText.svelte';

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

	let selectedDayIndex = 0;
	let selectedConfIndex = 0;
	let selectedWorkIndex = 0;

    const scheduleStart = 8; // 8 AM
	const scheduleEnd = 18; // 5 PM
	const hourHeight = 100; // 60px = 1 hour
    
    const pixelsPerMinute = hourHeight / 60;


	const events = [
		{
			title: 'Opening Keynote',
			start: '08:30',
			end: '09:30',
			location: 'AUDI'
		},
		{
			title: 'Panel Discussion',
			start: '10:00',
			end: '11:15',
			location: 'AUDI'
		},
		{
			title: 'Lunch Break',
			start: '12:00',
			end: '13:00',
			location: 'AUDI'
		}
	];

	// Convert "HH:MM" to minutes past 00:00
	function timeToMinutes(time) {
		const [h, m] = time.split(':').map(Number);
		return h * 60 + m;
	}

	function getPositionStyle(event) {
	const startMinutes = timeToMinutes(event.start);
	const endMinutes = timeToMinutes(event.end);

	const top = (startMinutes - scheduleStart * 60) * pixelsPerMinute;
	const height = (endMinutes - startMinutes) * pixelsPerMinute;

	return `top: ${top}px; height: ${height}px;`;
}

</script>


<div class="container">
    <div class="pt-12 sticky top-0 bg-white z-10">
        <div class="flex flex-col">
            <div class="justify-center px-2 py-6 text-center">
                <h1 id="intro">
                    <VizChitraLogoType></VizChitraLogoType>
                    <span class="text-[29px] font-semibold md:text-[35px]">AGENDA</span>
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
            <div class="flex justify-center pt-4 py-4">
                <div class="flex gap-10">
                    {#each conferenceDay as conference, confIndex}
                        <button class="cursor-pointer {selectedConfIndex === confIndex
                            ? 'border-viz-orange border-b-4'
                            : ''}" on:click={() => (selectedConfIndex = confIndex)}>
                            <h4
                                class="{selectedConfIndex === confIndex
                                    ? 'text-viz-grey-dark font-bold'
                                    : 'font-normal text-gray-400'}"
                            >
                                {conference.location}
                            </h4>
                        </button>
                    {/each}
                </div>
            </div>     
        {:else}
            <div class="flex justify-center py-4 sticky top-0">
                <div class="flex gap-8">
                    {#each workshopDay as workshop, workIndex}
                        <button class="cursor-pointer {selectedWorkIndex === workIndex
                        ? 'border-viz-orange border-b-4'
                        : ''}" on:click={() => (selectedWorkIndex = workIndex)}>
                            <h4 class="{selectedWorkIndex === workIndex
                            ? 'text-viz-grey-dark font-bold'
                            : 'font-normal text-gray-400'}">{workshop.location}</h4></button
                        >
                    {/each}
                </div>
            </div>
        {/if}
    </div>
	
    <div class="schedule-wrapper flex">
        <div class="time-labels pr-4 text-right">
            {#each Array(scheduleEnd - scheduleStart + 1).fill(0).map((_, i) => scheduleStart + i) as hour}
                <div class="h-[100px] text-sm text-gray-400">{hour}:00</div>
            {/each}
        </div>
    
        <div class="relative w-full border-l border-gray-300" style="height: {(scheduleEnd - scheduleStart) * hourHeight}px">
            {#each events as event}
                <div
                    class="absolute left-0 right-0 rounded-md border border-viz-orange bg-orange-100 p-2 text-sm shadow"
                    style={getPositionStyle(event)}
                >
                    <strong>{event.title}</strong><br />
                    <em>{event.start}{event.end}</em><br />
                    <span class="text-xs">{event.location}</span>
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
