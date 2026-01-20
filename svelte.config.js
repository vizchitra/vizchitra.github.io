import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { getContentSlugs } from './text.config.js';

/** @type {import('mdsvex').MdsvexOptions} */
export const mdsvexOptions = {
	extensions: ['.md', '.svx']
};

const contentSlugs = getContentSlugs();

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
			entries: ['*', ...contentSlugs]
		}
	},
	preprocess: [mdsvex(mdsvexOptions), vitePreprocess()],
	compilerOptions: {
		// warningFilter: () => false
	}
};

export default config;
