import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { redirects } from './src/lib/config/redirects.js';
import fs from 'fs';
import path from 'path';

// Get content files for prerendering
const contentDir = path.join(process.cwd(), 'content');
const contentSlugs = fs.readdirSync(contentDir)
	.filter(file => file.endsWith('.md'))
	.map(file => file.replace('.md', ''))
	.map(slug => `/${slug}`);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),
		output: {
			bundleStrategy: 'single'
		},
		appDir: 'app',
		prerender: {
			entries: ['*', ...Object.keys(redirects).map((path) => `/${path}`), ...contentSlugs]
		}
	},
	preprocess: vitePreprocess()
};

export default config;
