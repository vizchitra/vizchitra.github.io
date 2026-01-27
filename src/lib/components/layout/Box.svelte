<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, ClassValue } from 'svelte/elements';

	type Color = 'none' | 'grey' | 'yellow' | 'blue' | 'teal' | 'pink' | 'orange';
	type Space = '0' | 'xs' | 'sm' | 'md' | 'lg';
	type Radius = '0' | 'sm' | 'md' | 'lg';
	type Inset = 'normal' | 'stretch' | 'squish';

	/**
	 * Box - Visual container with border and background color
	 *
	 * A bordered container for visually distinct sections. Combines color theming,
	 * padding, and optional border-radius to create cohesive component groupings.
	 *
	 * @prop color - Background color theme ('none', 'grey', 'yellow', 'blue', 'teal', 'pink', 'orange') (default: 'grey')
	 * @prop space - Internal padding using spacing tokens (default: 'sm')
	 * @prop inset - Differentiated padding on x and y (default: 'normal')
	 * @prop radius - Border radius ('0', 'sm', 'md', 'lg') (default: '0')
	 * @prop tag - HTML element to render (default: 'div')
	 *
	 * @example
	 * <Box color="yellow" space="md" radius="md">
	 *   <Stack gap="sm">
	 *     <Heading>Note</Heading>
	 *     <Text>Important information goes here</Text>
	 *   </Stack>
	 * </Box>
	 */
	interface Props extends HTMLAttributes<HTMLElement> {
		color?: Color;
		space?: Space;
		inset?: Inset;
		radius?: Radius;
		class?: ClassValue;
		tag?: string;
		children?: Snippet;
	}

	let {
		color = 'grey',
		space = 'sm',
		radius = '0',
		inset = 'normal',
		tag = 'div',
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const bgClasses: Record<Color, string> = {
		none: 'bg-white',
		grey: 'bg-grey-subtle',
		yellow: 'bg-yellow-subtle',
		blue: 'bg-blue-subtle',
		teal: 'bg-teal-subtle',
		pink: 'bg-pink-subtle',
		orange: 'bg-orange-subtle'
	};

	const borderClasses: Record<Color, string> = {
		none: 'border-white',
		grey: 'border-grey-muted',
		yellow: 'border-yellow-muted',
		blue: 'border-blue-muted',
		teal: 'border-teal-muted',
		pink: 'border-pink-muted',
		orange: 'border-orange-muted'
	};

	const radiusClasses: Record<Radius, string> = {
		'0': 'rounded-0',
		sm: 'rounded-sm',
		md: 'rounded-md',
		lg: 'rounded-lg'
	};
</script>

<svelte:element
	this={tag}
	{...rest}
	class={[
		'box',
		bgClasses[color],
		borderClasses[color],
		radiusClasses[radius],
		`space-${space}`, // Generic space class
		`inset-${inset}`, // Inset modifier class
		className
	]}
>
	{@render children?.()}
</svelte:element>

<style>
	.box {
		border-width: 1px;
		border-style: solid;
		outline: 2px solid transparent;
		outline-offset: -3px;
		transition: all 0.2s;

		/* Using logical properties for better support */
		padding: var(--padding-v) var(--padding-h);
	}

	/* Define base spacing via a variable based on the space class */
	.space-0 {
		--base-space: 0px;
	}
	.space-xs {
		--base-space: var(--spacing-xs);
	}
	.space-sm {
		--base-space: var(--spacing-sm);
	}
	.space-md {
		--base-space: var(--spacing-md);
	}
	.space-lg {
		--base-space: var(--spacing-lg);
	}

	/* Handle Inset logic by modifying the vertical/horizontal variables */
	.inset-normal {
		--padding-v: var(--base-space);
		--padding-h: var(--base-space);
	}

	.inset-squish {
		--padding-v: calc(var(--base-space) * 0.5); /* Reduced vertical */
		--padding-h: var(--base-space);
	}

	.inset-stretch {
		--padding-v: calc(var(--base-space) * 1.5); /* Increased vertical */
		--padding-h: var(--base-space);
	}
</style>
