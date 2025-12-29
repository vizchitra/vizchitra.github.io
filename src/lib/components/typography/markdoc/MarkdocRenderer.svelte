<script>
	export let node;
	export let components = {};
</script>

{#if typeof node === 'string' || typeof node === 'number'}
	{node}
{:else if Array.isArray(node)}
	{#each node as child}
		<svelte:self node={child} {components} />
	{/each}
{:else if node && typeof node === 'object' && node !== null}
	{#if node.name}
		{#if components[node.name]}
			<svelte:component this={components[node.name]} {...node.attributes}>
				{#each node.children || [] as child}
					<svelte:self node={child} {components} />
				{/each}
			</svelte:component>
		{:else}
			<svelte:element this={node.name} {...node.attributes}>
				{#each node.children || [] as child}
					<svelte:self node={child} {components} />
				{/each}
			</svelte:element>
		{/if}
	{:else}
		<!-- render children for non-tag objects if they have them -->
		{#if node.children}
			{#each node.children as child}
				<svelte:self node={child} {components} />
			{/each}
		{/if}
	{/if}
{/if}
