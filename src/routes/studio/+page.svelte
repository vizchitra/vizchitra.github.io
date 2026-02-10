<script lang="ts">
	import type { PageProps } from './$types';
	import { Container, Stack } from '$lib/components/layout';

	let { data }: PageProps = $props();

	const categoryMeta = {
		typography: {
			icon: '🎨',
			name: 'Typography',
			description: 'RichText component testing and font scales'
		},
		tokens: {
			icon: '🎯',
			name: 'Design Tokens',
			description: 'Colors, spacing, and typography tokens'
		},
		components: {
			icon: '🧩',
			name: 'Components',
			description: 'Component library and playground'
		},
		patterns: {
			icon: '📐',
			name: 'Patterns',
			description: 'Layout patterns and compositions'
		},
		audit: {
			icon: '📊',
			name: 'Audits',
			description: 'Automated checks and reports'
		}
	};
</script>

<div class="min-h-screen bg-gray-50 py-12">
	<Container width="content" paddingY="lg">
		<Stack space="2xl">
			<!-- Header -->
			<div class="mb-8 text-center">
				<h1 class="mb-4 text-5xl font-bold text-gray-900">Studio</h1>
				<p class="text-xl text-gray-600">
					Design system workspace for testing, documentation, and audits
				</p>
			</div>

			<!-- Categories -->
			{#each Object.entries(data.categories) as [categoryKey, items]}
				{@const meta = categoryMeta[categoryKey]}
				{#if items.length > 0}
					<section class="rounded-lg bg-white p-8 shadow-sm">
						<div class="mb-6 border-b border-gray-200 pb-4">
							<h2 class="text-2xl font-bold text-gray-900">
								{meta.icon}
								{meta.name}
							</h2>
							<p class="mt-1 text-sm text-gray-600">{meta.description}</p>
						</div>

						<ul class="space-y-3">
							{#each items as item}
								<li class="flex flex-col gap-1">
									<div class="flex items-baseline gap-2">
										<a
											href="/studio/{item.slug}"
											class="text-lg font-medium text-blue-600 hover:text-pink-600 transition-colors underline"
										>
											{item.title}
										</a>
										{#if item.generated}
											<span
												class="rounded bg-purple-100 px-2 py-0.5 text-xs text-purple-800"
											>
												Auto-generated
											</span>
										{/if}
										{#if item.draft}
											<span class="rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">
												Draft
											</span>
										{/if}
									</div>
									{#if item.description}
										<p class="text-sm text-gray-600">{item.description}</p>
									{/if}
								</li>
							{/each}
						</ul>
					</section>
				{/if}
			{/each}
		</Stack>
	</Container>
</div>
