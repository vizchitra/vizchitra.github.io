import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { redirects } from './src/lib/config/redirects.js';
import { mdsvex } from 'mdsvex';
import fs from 'fs';
import path from 'path';

// Get content files for prerendering
const contentDir = path.join(process.cwd(), 'content');
const contentSlugs = fs
	.readdirSync(contentDir)
	.filter((file) => file.endsWith('.md'))
	.map((file) => file.replace('.md', ''))
	.map((slug) => `/${slug}`);

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md', '.svx']
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			precompress: false,
			strict: true
		}),
		output: {
			bundleStrategy: 'split'
		},
		appDir: 'app',
		prerender: {
			entries: ['*', ...Object.keys(redirects).map((path) => `/${path}`), ...contentSlugs]
		}
	},
	preprocess: [mdsvex(mdsvexOptions), vitePreprocess()]
};

export default config;
