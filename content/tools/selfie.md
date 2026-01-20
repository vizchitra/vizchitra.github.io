---
title: Selfie Tool | VizChitra
description: Selfie / polygon playground for experimenting with shapes and cameras.
layout: full
---

<Stack>
	<ToolsHeader
		trail={[
			{ href: '/tools', label: 'Tools' },
			{ href: '/tools/selfie', label: 'Selfie' }
		]}
		title="Selfie Playground"
		subtitle="Interactive playground for polygon selfies and experimental canvas-based compositions."
	/>

    <FullBleed>
    	<ToolsCard widthClass="w-full" maxWidthClass="max-w-6xl">
    		<PolygonPlayground />
    	</ToolsCard>
    </FullBleed>

</Stack>
