import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('mdsvex').MdsvexOptions} */
export const mdsvexOptions = {
	extensions: ['.md', '.svx']
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	output: {
		bundleStrategy: 'single'
	},
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			precompress: false,
			fallback: undefined,
			strict: true
		}),
		appDir: 'app',
		prerender: {
			entries: ['*']
		}
	},
	// Directives are processed by the Vite plugin (text.config.js) before mdsvex
	// mdsvex processes the markdown with embedded components
	// Finally vitePreprocess handles Svelte-specific features
	preprocess: [mdsvex(mdsvexOptions), vitePreprocess()],
	compilerOptions: {}
};

export default config;
