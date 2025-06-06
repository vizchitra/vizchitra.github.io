<script>
	import { browser } from '$app/environment';
	import CalendarIcon from '$lib/assets/images/icons/calendar.svg?raw';
	import LocationIcon from '$lib/assets/images/icons/location.svg?raw';
	import SpeakerCardPattern1 from '$lib/assets/images/speakers-2025/speaker-card-pattern-1.svg?raw';
	import SpeakerCardPattern2 from '$lib/assets/images/speakers-2025/speaker-card-pattern-2.svg?raw';
	import CloseIcon from '$lib/assets/images/icons/x.svg?raw';

	export let modalOpen = false;
	export let data = {};
	export let colorMapping = {};

	$: if (modalOpen && browser && data?.talkInfo) {
		document.body.style.overflow = 'hidden';
	} else if (browser) {
		document.body.style.overflow = '';
	}

	let screenWidth = 0;
</script>

<svelte:window bind:innerWidth={screenWidth} />
{#if modalOpen === true && data?.talkInfo}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="details-modal fixed top-0 left-0 z-50 flex h-screen w-screen cursor-default items-center justify-center"
		on:click={(event) => {
			event.stopPropagation();
			modalOpen = false;
		}}
		on:mousedown|stopPropagation
	>
		<div
			class="overlay pointer-events-auto fixed top-0 left-0 z-10 h-full w-full bg-[#ffffffaa] opacity-100 backdrop-blur-[2px]"
		></div>
		<div
			class="modal relative z-20 overflow-auto rounded-md border-[1px] border-[#ccc] bg-white shadow-2xl"
			on:mousedown|stopPropagation
			on:click|stopPropagation
		>
			<div class="button-wrapper sticky top-0 z-50">
				<button
					class="close-btn absolute top-4 right-4 z-50 cursor-pointer"
					aria-label="close modal"
					on:click={() => (modalOpen = false)}
				>
					{@html CloseIcon}
				</button>
			</div>
			<div
				class="modal-header p-8 pt-4"
				style:background-color={colorMapping[data.talkType]?.primary}
			>
				<div class="title text-white">
					{#if data.talkType}
						<p class="kicker-text mb-1 !font-medium uppercase">
							{data.talkType}
						</p>
					{/if}

					<h3
						class="talk-title text-shadow mb-[6px] text-[1.75rem] !leading-[1.1] font-bold sm:text-[2rem] xl:text-[2.5rem]"
					>
						{data.title}
					</h3>

					{#if data.subtitle}
						<p
							class="talk-subtitle text-shadow text-[1.5rem] !leading-[1.1] sm:text-[1.75rem] xl:text-[2rem]"
						>
							{data.subtitle}
						</p>
					{/if}
				</div>
			</div>
			<div class="details-section relative h-full p-8 px-6 md:px-8 xl:px-12">
				<div class="details-content pb-16">
					<div class="title-text max-w-unset mb-6 min-w-[240px]">
						<h3
							style="text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;"
							class="font-display mb-1 text-left align-bottom text-[2rem] leading-[1]
							  font-bold uppercase xl:text-[2.25rem]"
						>
							{data.name}
						</h3>
						<p
							style="text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;"
							class="text-left text-[1rem] !leading-[1.2] sm:text-[1.25rem]"
						>
							{data.role}
						</p>
					</div>

					<div class="details mb-8 flex flex-col gap-2">
						{#if data.talkInfo}
							<p
								class="talk-subtitle text-shadow !md:leading-[1.5] mb-6 text-[1.125rem] !leading-[1.4] md:text-[1.4rem] xl:text-[1.4rem]"
							>
								{@html data.talkInfo}
							</p>
						{/if}

						{#if data.time}
							<div class="detail flex items-center gap-3">
								<div class="icon-container w-4 md:w-5">
									{@html CalendarIcon.replaceAll('#68B9B2', colorMapping[data.talkType]?.primary)}
								</div>
								<p class="text-[1rem] leading-none sm:text-[1.25rem]">{data.time}</p>
							</div>
						{/if}

						{#if data.location}
							<div class="detail flex items-center gap-3">
								<div class="icon-container w-4 md:w-5">
									{@html LocationIcon.replaceAll('#68B9B2', colorMapping[data.talkType]?.primary)}
								</div>
								<p class="text-[1rem] leading-none sm:text-[1.25rem]">{data.location}</p>
							</div>
						{/if}
					</div>

					{#if data.link && data.link !== ''}
						<a
							class="block w-fit rounded-sm bg-[#444] px-4 py-3 text-[1rem] leading-none text-white hover:opacity-90 sm:text-[1.25rem]"
							target="_blank"
							href="{data.link}/#tickets"
							>{data.talkType === 'workshop' ? 'Buy tickets' : 'Learn more'}</a
						>
					{/if}
				</div>

				<div
					class="pattern-container absolute right-0 bottom-0 z-[-1] opacity-70"
					style="transform: translate({0}px, {20}px); "
				>
					{@html SpeakerCardPattern2.replaceAll(
						'#FFD485',
						colorMapping[data.talkType]?.patternGradient[0]
					).replaceAll('#F89F72', colorMapping[data.talkType]?.patternGradient[1])}
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.details-modal .modal {
		position: absolute;
		top: 50%;
		left: 50%;

		width: 100%;
		height: fit-content;
		max-width: min(800px, calc(100% - 1rem));
		max-height: 95vh;
		max-height: 95dvh;
		transform: translate(-50%, -50%);

		transition: 0.2s all ease;
	}

	@media (max-width: 420px) {
		.details-modal .modal {
			height: 100%;
		}
	}
</style>
