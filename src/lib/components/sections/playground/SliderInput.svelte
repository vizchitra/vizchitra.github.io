<script>
	export let label = null;
	export let formValue = null;
	export let showLegend = false;
</script>

<div class="slider-input mb-4">
	<label for={label.replaceAll(' ', '-')}>{label}</label>
	<input
		type="range"
		min="1"
		max="5"
		class="h-[8px] w-full"
		id={label.replaceAll(' ', '-')}
		bind:value={formValue}
	/>

	<div class="axis flex justify-between px-1" class:mb-10={showLegend}>
		<div class="axis-item relative flex flex-col items-center gap-[2px]">
			<div class="tick bg-viz-grey h-1 w-[1px] -translate-y-1"></div>
			<span class="text-viz-grey text-[12px] leading-none">1</span>
			{#if showLegend}
				<span class="text-viz-grey absolute -bottom-9 left-0 text-[12px] leading-none"
					>Not interested at all
				</span>
			{/if}
		</div>
		<div class="axis-item relative flex flex-col items-center gap-[2px] opacity-80">
			<div class="tick bg-viz-grey h-1 w-[1px] -translate-y-1"></div>
			<span class="text-viz-grey text-[12px] leading-none">2</span>
		</div>
		<div class="axis-item relative flex flex-col items-center gap-[2px]">
			<div class="tick bg-viz-grey h-1 w-[1px] -translate-y-1"></div>
			<span class="text-viz-grey text-[12px] leading-none">3</span>
			{#if showLegend}
				<span
					class="text-viz-grey absolute -bottom-4 left-1/2 -translate-x-1/2 text-[12px] leading-none"
					>Neutral
				</span>
			{/if}
		</div>
		<div class="axis-item relative flex flex-col items-center gap-[2px] opacity-80">
			<div class="tick bg-viz-grey h-1 w-[1px] -translate-y-1"></div>
			<span class="text-viz-grey text-[12px] leading-none">4</span>
		</div>
		<div class="axis-item relative flex flex-col items-center gap-[2px]">
			<div class="tick bg-viz-grey h-1 w-[1px] -translate-y-1"></div>
			<span class="text-viz-grey text-[12px] leading-none">5</span>
			{#if showLegend}
				<span class="text-viz-grey absolute right-0 -bottom-7 text-right text-[12px] leading-none"
					>Very interested</span
				>
			{/if}
		</div>
	</div>
</div>

<style>
	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 8px;
		background: #ddd; /* Default track color */
		border-radius: 4px;
		outline: none;
	}

	/* Special styling for WebKit/Blink */
	input[type='range']::-webkit-slider-thumb {
		position: relative;
		-webkit-appearance: none;
		border: 3px solid white;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: #4c4c44;
		cursor: pointer;
		outline: 1px solid #000000;
		z-index: 2;
		margin-top: -4px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
	}

	/* All the same stuff for Firefox */
	input[type='range']::-moz-range-thumb {
		position: relative;
		border: 3px solid white;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: #4c4c44;
		cursor: pointer;
		outline: 1px solid #000000;
		z-index: 2;
		margin-top: -4px;
	}

	/* All the same stuff for IE */
	input[type='range']::-ms-thumb {
		position: relative;
		border: 3px solid white;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: #4c4c44;
		cursor: pointer;
		outline: 1px solid #000000;
		z-index: 2;
		margin-top: -4px;
	}

	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: 4px;
		cursor: pointer;
		background: #ddd;
	}

	input[type='range']:focus::-webkit-slider-runnable-track {
		height: 100%;
		background: #bbb;
	}

	input[type='range']::-moz-range-track {
		width: 100%;
		height: 4px;
		cursor: pointer;
		background: #ddd;
	}

	input[type='range']::-ms-track {
		width: 100%;
		height: 4px;
		cursor: pointer;
		background: #ddd;
	}
</style>
