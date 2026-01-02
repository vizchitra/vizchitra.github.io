<!--
  Flex.svelte

  Reusable flex container component.

  Props:
  - `direction` ("row" | "col") default: "row"
  - `directionSm`, `directionMd`, `directionLg` (optional) : responsive directions
  - `wrap` (boolean) : enable `flex-wrap`
  - `align` (string) : Tailwind `items-*` class (e.g. `items-center`)
  - `justify` (string) : Tailwind `justify-*` class (e.g. `justify-between`)
  - `gap` (string) : Tailwind `gap-*` class
  - `className` (string) : extra classes to append

  Example:
  <Flex direction="row" directionMd="col" gap="gap-4" align="items-center" justify="justify-between">
    <ItemA />
    <ItemB />
  </Flex>

  Note: Tailwind's JIT needs to see used classes; the safelist below covers the common utilities used.

  safelist: flex flex-row flex-col sm:flex-row md:flex-row lg:flex-row flex-wrap
  safelist: items-start items-center items-end items-baseline items-stretch
  safelist: justify-start justify-center justify-end justify-between justify-around justify-evenly
  safelist: gap-0 gap-1 gap-2 gap-3 gap-4 gap-6 gap-8
-->

<script lang="ts">
	interface Props {
		direction?: 'row' | 'col';
		directionSm?: 'row' | 'col';
		directionMd?: 'row' | 'col';
		directionLg?: 'row' | 'col';
		wrap?: boolean;
		align?: string;
		justify?: string;
		gap?: string;
		className?: string;
		children?: import('svelte').Snippet;
	}

	let {
		direction = 'row',
		directionSm,
		directionMd,
		directionLg,
		wrap = false,
		align = '',
		justify = '',
		gap = '',
		className = '',
		children
	}: Props = $props();

	const dirClass = (d: 'row' | 'col' | undefined) =>
		d === 'col' ? 'flex-col' : d === 'row' ? 'flex-row' : '';

	let classes = $derived(
		[
			'flex',
			dirClass(direction),
			directionSm ? `sm:${dirClass(directionSm)}` : '',
			directionMd ? `md:${dirClass(directionMd)}` : '',
			directionLg ? `lg:${dirClass(directionLg)}` : '',
			wrap ? 'flex-wrap' : '',
			align,
			justify,
			gap,
			className
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class={classes}>
	{@render children?.()}
</div>
