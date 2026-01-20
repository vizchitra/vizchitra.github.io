<script lang="ts">
	import { BreadCrumb } from '$lib/components';

	interface Props {
		trail?: Array<{ href: string; label: string }>;
		title?: string;
		subtitle?: string | null;
	}

	let { trail = [], title = '', subtitle = null }: Props = $props();
</script>

<header class="space-y-sm">
	<BreadCrumb {trail} current={null} />
	<h1 class="text-3xl font-black text-black">{title}</h1>
	{#if subtitle}
		<p class="text-grey-dark max-w-3xl text-lg">{subtitle}</p>
	{/if}
</header>
