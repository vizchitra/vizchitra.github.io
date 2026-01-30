---
title: Tools & Patterns
description: A small set of tools and patterns used in the VizChitra Website
banner: polygon
---

<script lang="ts">
	import ToolsCard from '$lib/components/interface/ToolsCard.svelte';
	import ToolsHeader from '$lib/components/interface/ToolsHeader.svelte';
	import { Header } from '$lib/components/structure';
</script>

<Header title="Tools & Patterns" banner="square" />

<ToolsCard widthClass="w-full" maxWidthClass="max-w-6xl">
	<ul class="space-y-3">
		<li><a class="text-viz-blue-dark font-medium" href="/tools/selfie">Selfie Playground</a></li>
		<li><a class="text-viz-blue-dark font-medium" href="/tools/pattern">Pattern Variations</a></li>
		<li><a class="text-viz-blue-dark font-medium" href="/tools/banner">Banner Variations</a></li>
	</ul>
</ToolsCard>
