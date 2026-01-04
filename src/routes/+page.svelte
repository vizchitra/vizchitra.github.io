<script lang="ts">
	// Render the Markdown page from the site's `content/` folder.
	// MDsveX compiles `.md` files to Svelte components, so import and render.
	// @ts-expect-error - MDsveX .md imports are handled at build time via mdsvex preprocessor
	import Page from '../../content/index.md';
</script>

<Page />
