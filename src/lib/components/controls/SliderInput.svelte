<!--
	SliderInput - Range slider input with axis labels.
	Supports 1-5 scale with optional legend.
-->
<script lang="ts">
	interface Props {
		/** Input label */
		label: string;
		/** Bound value (1-5) */
		value?: number;
		/** Show legend text */
		showLegend?: boolean;
		/** Minimum value */
		min?: number;
		/** Maximum value */
		max?: number;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		label,
		value = $bindable(3),
		showLegend = false,
		min = 1,
		max = 5,
		class: className = ''
	}: Props = $props();

	const inputId = $derived(label.replaceAll(' ', '-'));
</script>

<div class="slider-input mb-sm {className}">
	<label for={inputId}>{label}</label>
	<input type="range" {min} {max} class="slider-range w-full" id={inputId} bind:value />

	<div class="axis px-px" class:mb-lg={showLegend}>
		<!-- eslint-disable-next-line better-tailwindcss/no-restricted-classes -->
		<div class="axis-item relative flex flex-col items-center">
			<div class="tick bg-grey -translate-y-1"></div>
			<span class="text-grey text-xs leading-none">1</span>
			{#if showLegend}
				<span class="text-grey absolute -bottom-9 left-0 text-xs leading-none">
					Not interested at all
				</span>
			{/if}
		</div>
		<!-- eslint-disable-next-line better-tailwindcss/no-restricted-classes -->
		<div class="axis-item relative flex flex-col items-center opacity-80">
			<div class="tick bg-grey -translate-y-1"></div>
			<span class="text-grey text-xs leading-none">2</span>
		</div>
		<!-- eslint-disable-next-line better-tailwindcss/no-restricted-classes -->
		<div class="axis-item relative flex flex-col items-center">
			<div class="tick bg-grey -translate-y-1"></div>
			<span class="text-grey text-xs leading-none">3</span>
			{#if showLegend}
				<span class="text-grey absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs leading-none">
					Neutral
				</span>
			{/if}
		</div>
		<!-- eslint-disable-next-line better-tailwindcss/no-restricted-classes -->
		<div class="axis-item relative flex flex-col items-center opacity-80">
			<div class="tick bg-grey -translate-y-1"></div>
			<span class="text-grey text-xs leading-none">4</span>
		</div>
		<!-- eslint-disable-next-line better-tailwindcss/no-restricted-classes -->
		<div class="axis-item relative flex flex-col items-center">
			<div class="tick bg-grey -translate-y-1"></div>
			<span class="text-grey text-xs leading-none">5</span>
			{#if showLegend}
				<span class="text-grey absolute right-0 -bottom-7 text-right text-xs leading-none">
					Very interested
				</span>
			{/if}
		</div>
	</div>
</div>

<style>
	.slider-range {
		height: 8px;
	}

	.axis-item {
		gap: 2px;
	}

	.tick {
		height: 0.25rem;
		width: 1px;
	}

	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 8px;
		background: #ddd;
		border-radius: 4px;
		outline: none;
	}

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
		margin-top: -4px;
	}

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
