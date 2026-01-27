<script lang="ts">
	import { page } from '$app/stores';
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		external?: boolean;
		children?: Snippet;
		class?: string;
	}

	let { href, external = false, children, class: className = '' }: Props = $props();

	const isActive = $derived.by(() => {
		if (external) return false;
		const currentPath = $page.url.pathname;
		return currentPath === href || currentPath.startsWith(href + '/');
	});

	const finalExternal = $derived(external || href.startsWith('http') || href.startsWith('//'));
</script>

<a
	{href}
	class="link {className}"
	class:link-active={isActive}
	target={finalExternal ? '_blank' : undefined}
	rel={finalExternal ? 'noopener noreferrer' : undefined}
>
	{@render children?.()}
</a>

<style>
	.link {
		color: var(--color-link);
		text-decoration: underline;
		transition: all 0.2s ease;
		position: relative;
		display: inline-block;
	}

	.link:hover {
		color: var(--color-blue);
		text-decoration-thickness: 2px;
		text-underline-offset: 3px;
	}

	.link:active {
		color: var(--color-blue-dark);
	}

	.link-active {
		font-weight: var(--font-weight-semibold);
		color: var(--color-blue-dark);
	}

	.link-active::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		right: 0;
		height: 2px;
		background-color: var(--color-blue-dark);
	}
</style>
