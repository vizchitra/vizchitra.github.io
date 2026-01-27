<script lang="ts">
	import type { ChildProcess } from 'node:child_process';
	import { onMount } from 'svelte';
	import type { HTMLAttributes, ClassValue } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLElement> {
		src: string;
		alt: string;
		caption?: string;
		lazy?: boolean;
		width?: string | number;
		height?: string | number;
		ratio?: '1:1' | '4:3' | '16:9' | '3:2' | 'auto';
		class?: ClassValue;
	}

	let {
		src,
		alt,
		caption,
		lazy = true,
		width,
		height,
		ratio = 'auto',
		class: className = ''
	}: Props = $props();

	let isLoaded = $state(false);
	let hasError = $state(false);

	onMount(() => {
		if (!lazy) {
			isLoaded = true;
		}
	});

	function onLoad() {
		isLoaded = true;
	}

	function onError() {
		hasError = true;
	}
</script>

<figure class="image-figure {className}" style:--image-ratio={ratio}>
	<div class="image-wrapper" data-ratio={ratio} style:width style:height>
		{#if hasError}
			<div class="image-error">
				<div class="error-content">
					<span>⚠️</span>
					<p>Image failed to load</p>
				</div>
			</div>
		{:else}
			<img
				{src}
				{alt}
				{width}
				{height}
				loading={lazy ? 'lazy' : 'eager'}
				class="image-img"
				class:image-loaded={isLoaded}
				onload={onLoad}
				onerror={onError}
			/>
		{/if}
	</div>
	{#if caption}
		<figcaption class="image-caption">{caption}</figcaption>
	{/if}
</figure>

<style>
	.image-figure {
		margin: var(--spacing-lg) 0;
		display: inline-block;
		width: 100%;
	}

	.image-wrapper {
		position: relative;
		background-color: var(--color-grey-light);
		overflow: hidden;
		border-radius: var(--radius-md);
	}

	.image-wrapper[data-ratio='auto'] {
		width: 100%;
	}

	.image-wrapper[data-ratio='1:1'] {
		aspect-ratio: 1;
	}

	.image-wrapper[data-ratio='4:3'] {
		aspect-ratio: 4 / 3;
	}

	.image-wrapper[data-ratio='16:9'] {
		aspect-ratio: 16 / 9;
	}

	.image-wrapper[data-ratio='3:2'] {
		aspect-ratio: 3 / 2;
	}

	.image-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	.image-loaded {
		opacity: 1;
	}

	.image-error {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, var(--color-grey-light) 0%, var(--color-grey) 100%);
		min-height: 200px;
	}

	.error-content {
		text-align: center;
		opacity: 0.6;
	}

	.error-content span {
		font-size: 2rem;
		display: block;
		margin-bottom: var(--spacing-sm);
	}

	.error-content p {
		font-size: var(--text-caption);
		margin: 0;
	}

	.image-caption {
		margin-top: var(--spacing-sm);
		padding: 0 var(--spacing-sm);
		font-size: var(--text-caption);
		color: var(--color-muted);
		font-style: italic;
		text-align: center;
		line-height: var(--leading-normal);
	}
</style>
