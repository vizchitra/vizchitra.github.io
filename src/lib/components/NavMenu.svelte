<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav class="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<div class="flex">
				<a href="/" class="flex items-center">
					<span class="text-xl font-semibold">VizChitra</span>
				</a>
			</div>
			<div class="flex items-center space-x-4">
				<a
					href="/"
					class="rounded-md px-3 py-2 text-sm font-medium {$page.url.pathname === '/'
						? 'text-viz-blue'
						: 'hover:text-blue-dark text-viz-gray'}"
				>
					Home
				</a>
				<a
					href="/code-of-conduct"
					class="rounded-md px-3 py-2 text-sm font-medium {$page.url.pathname === '/code-of-conduct'
						? 'text-blue-600'
						: 'text-gray-600 hover:text-blue-600'}"
				>
					Code of Conduct
				</a>
			</div>
		</div>
	</div>
</nav>
