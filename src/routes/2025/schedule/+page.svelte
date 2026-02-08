<script lang="ts">
	import { Header } from '$lib/components/structure';
	import { Heading } from '$lib/components/typography';
	import Container from '$lib/components/layout/Container.svelte';
</script>

<Header title="Schedule 2025" banner="polygon" />

<Container width="full">
	<Heading tag="h1" align="center">Schedule 2025</Heading>

	<div class="mx-auto w-full max-w-7xl px-4">
		<object
			data="/images/events/schedule-2025-audi.svg"
			type="image/svg+xml"
			aria-label="Schedule 2025 — Audi"
		></object>
		<object
			data="/images/events/schedule-2025-hall.svg"
			type="image/svg+xml"
			aria-label="Schedule 2025 — Hall"
		></object>
	</div>
</Container>

<!-- -->

<style>
	object {
		width: 100%;
		height: auto;
		display: block;
		aspect-ratio: 420 / 595;
	}
</style>
