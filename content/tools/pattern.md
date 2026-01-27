---
title: Pattern Gallery | VizChitra
description: Preview the hatched SVG pattern set (waves, river, circle, stream) across VizChitra color tones.
layout: full
---

<script lang="ts">
	const variants = ['waves', 'river', 'circle', 'stream'];
	const tones = ['blue', 'teal', 'pink', 'orange', 'yellow'];
	// Reference images mapping
	const referenceImages = {
		waves: '/images/patterns/patterns-waves-hatched.png',
		river: '/images/patterns/patterns-river-hatched.png',
		circle: '/images/patterns/patterns-circle-hatched.png',
		stream: '/images/patterns/patterns-stream-hatched.png'
	};
	let waveVariation = 0.5;
	let riverVariation = 0.5;
	let circleVariation = 0.5;
	let streamVariation = 0.5;
	let waveTone = 'blue';
	let riverTone = 'teal';
	let circleTone = 'pink';
	let streamTone = 'orange';
</script>

<Header type='Pattern Gallery' align='center'/>

<Text type="lead">Four hatched SVG motifs (waves, river, circle, stream) rendered with VizChitra token colors. Compare the generated patterns with their reference designs.</Text>

<!-- Pattern Grid with Reference Comparison -->

{#each variants as variant}
<ToolsCard widthClass="w-full" maxWidthClass="max-w-6xl">
<Stack space="xs">

<div>
<h2 class="text-viz-black text-2xl font-bold capitalize">{variant}</h2>
<p class="text-viz-grey text-sm">
Adjust tone and variation - Compare reference vs generated
</p>
</div>
<ControlGroup space="sm">
{#if variant === 'waves'}
<FormControl label="Tone" htmlFor="waveTone">
<select
						id="waveTone"
						bind:value={waveTone}
						class="text-viz-black border-viz-grey-light rounded-md border bg-white px-xs py-px text-sm"
					>
{#each tones as tone}
<option value={tone}>{tone}</option>
{/each}
</select>
</FormControl>
<FormControl label="Variation" htmlFor="waveVariation">
<div class="cluster" data-space="xs">
<input
							id="waveVariation"
							type="range"
							min="0"
							max="1"
							step="0.01"
							bind:value={waveVariation}
							class="h-2 w-32 cursor-pointer appearance-none rounded-lg bg-grey-light accent-blue"
						/>
<span class="text-viz-black w-8 text-sm font-semibold"
							>{Number(waveVariation).toFixed(2)}</span
						>
</div>
</FormControl>
{:else if variant === 'river'}
<FormControl label="Tone" htmlFor="riverTone">
<select
						id="riverTone"
						bind:value={riverTone}
						class="text-viz-black border-viz-grey-light rounded-md border bg-white px-xs py-px text-sm"
					>
{#each tones as tone}
<option value={tone}>{tone}</option>
{/each}
</select>
</FormControl>
<FormControl label="Variation" htmlFor="riverVariation">
<div class="cluster" data-space="xs">
<input
							id="riverVariation"
							type="range"
							min="0"
							max="1"
							step="0.01"
							bind:value={riverVariation}
							class="h-2 w-32 cursor-pointer appearance-none rounded-lg bg-grey-light accent-teal"
						/>
<span class="text-viz-black w-8 text-sm font-semibold"
							>{Number(riverVariation).toFixed(2)}</span
						>
</div>
</FormControl>
{:else if variant === 'circle'}
<FormControl label="Tone" htmlFor="circleTone">
<select
						id="circleTone"
						bind:value={circleTone}
						class="text-viz-black border-viz-grey-light rounded-md border bg-white px-xs py-px text-sm"
					>
{#each tones as tone}
<option value={tone}>{tone}</option>
{/each}
</select>
</FormControl>
<FormControl label="Variation" htmlFor="circleVariation">
<div class="cluster" data-space="xs">
<input
							id="circleVariation"
							type="range"
							min="0"
							max="1"
							step="0.01"
							bind:value={circleVariation}
							class="h-2 w-32 cursor-pointer appearance-none rounded-lg bg-grey-light accent-pink"
						/>
<span class="text-viz-black w-8 text-sm font-semibold"
							>{Number(circleVariation).toFixed(2)}</span
						>
</div>
</FormControl>
{:else if variant === 'stream'}
<FormControl label="Tone" htmlFor="streamTone">
<select
						id="streamTone"
						bind:value={streamTone}
						class="text-viz-black border-viz-grey-light rounded-md border bg-white px-xs py-px text-sm"
					>
{#each tones as tone}
<option value={tone}>{tone}</option>
{/each}
</select>
</FormControl>
<FormControl label="Variation" htmlFor="streamVariation">
<div class="cluster" data-space="xs">
<input
							id="streamVariation"
							type="range"
							min="0"
							max="1"
							step="0.01"
							bind:value={streamVariation}
							class="h-2 w-32 cursor-pointer appearance-none rounded-lg bg-grey-light accent-orange"
						/>
<span class="text-viz-black w-8 text-sm font-semibold"
							>{Number(streamVariation).toFixed(2)}</span
						>
</div>
</FormControl>
{/if}
</ControlGroup>
</Stack>

    <Grid maxColumns={2} space="md">
    	<!-- Reference Image -->
    	<Stack space="xs">
    		<p class="text-viz-grey text-xs font-medium tracking-wide uppercase">Reference Design</p>
    		<div class="border-viz-grey-light overflow-hidden rounded-xl border bg-grey-light">
    			<img
    				src={referenceImages[variant]}
    				alt={`Reference ${variant} pattern`}
    				class="block h-auto w-full"
    			/>
    		</div>
    	</Stack>

    	<!-- Generated Pattern -->
    	<Stack space="xs">
    		<p class="text-viz-grey text-xs font-medium tracking-wide uppercase">Generated Pattern</p>
    		<div class="border-viz-grey-light overflow-hidden rounded-xl border bg-white">
    			{#if variant === 'waves'}
    				<PatternWaves
    					color={waveTone}
    					variation={waveVariation}
    					width={400}
    					height={500}
    					class="block h-auto w-full"
    					ariaLabel={`${variant} pattern in ${waveTone}`}
    				/>
    			{:else if variant === 'river'}
    				<PatternRiver
    					color={riverTone}
    					variation={riverVariation}
    					width={400}
    					height={500}
    					class="block h-auto w-full"
    					ariaLabel={`${variant} pattern in ${riverTone}`}
    				/>
    			{:else if variant === 'circle'}
    				<PatternCircle
    					color={circleTone}
    					variation={circleVariation}
    					width={400}
    					height={500}
    					class="block h-auto w-full"
    					ariaLabel={`${variant} pattern in ${circleTone}`}
    				/>
    			{:else if variant === 'stream'}
    				<PatternStream
    					color={streamTone}
    					variation={streamVariation}
    					width={400}
    					height={500}
    					class="block h-auto w-full"
    					ariaLabel={`${variant} pattern in ${streamTone}`}
    				/>
    			{/if}
    		</div>
    	</Stack>
    </Grid>

</ToolsCard>
{/each}
