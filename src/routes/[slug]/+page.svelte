<script lang="ts">
	import type { PageData } from './$types';
	import { Prose } from '$lib/components/typography';
	import { Container } from '$lib/components/layout';
	import { Header } from '$lib/components/structure';

	let { data }: { data: PageData } = $props();
	const color = $derived(data.document.color ?? 'grey');
	const banner = $derived(data.document.banner ?? 'curve');
</script>

{#if data.document.banner}
	<Header {color} {banner} />
{/if}

<Container>
	<Prose color={data.document.color}>
		{@html data.document.html}
	</Prose>
</Container>
