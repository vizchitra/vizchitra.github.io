<!--
  FullBleed.svelte

  Simple wrapper that applies the project's full-bleed layout pattern.

  Props:
  - `className`   : extra classes for the outer element
  - `innerClass`  : classes applied to the centered inner container (defaults to `mx-auto`)
  - `outerClass`  : outer wrapper class (defaults to `full-bleed`)

	Usage:
	&lt;FullBleed innerClass="mx-auto mb-20 md:px-12"&gt;
		(content)
	&lt;/FullBleed&gt;

-->
<script lang="ts">
	/**
	 * FullBleed - simple full-bleed wrapper used across pages.
	 *
	 * Props:
	 * - className: extra classes for the outer element
	 * - innerClass: classes applied to the centered inner container (defaults to `mx-auto`)
	 * - outerClass: outer wrapper class (defaults to `full-bleed`)
	 * - contained: when true, renders an inner container with `containerClass` + `innerClass`
	 * - containerClass: class used for the contained inner wrapper
	 */
	export let className: string = '';
	export let innerClass: string = 'mx-auto';
	export let outerClass: string = 'full-bleed';
	export let contained: boolean = false;
	export let containerClass: string = 'content-container';

	$: outer = [outerClass, className].filter(Boolean).join(' ');
</script>

<div class={outer}>
	{#if contained}
		<div class={[containerClass, innerClass].filter(Boolean).join(' ')}>
			<slot />
		</div>
	{:else}
		<div class={innerClass}>
			<slot />
		</div>
	{/if}
</div>
