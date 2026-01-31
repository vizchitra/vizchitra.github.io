import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { redirects } from './src/lib/config/redirects.js';
import { mdsvex } from 'mdsvex';
import { getContentSlugs } from './text.config.js';

// Generate content slugs for prerendering
const contentSlugs = getContentSlugs();

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md', '.svx']
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	// compilerOptions: {
	// 	runes: true
	// },
	kit: {
		adapter: adapter(),
		alias: {
			"content-collections": "./.content-collections/generated",
		},
		output: {
			bundleStrategy: 'split'
		},
		appDir: 'app',
		prerender: {
			entries: ['*', ...Object.keys(redirects).map((path) => `/${path}`), ...contentSlugs],
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore errors for API routes during prerendering
				if (path.startsWith('/api/')) {
					return;
				}
				throw new Error(message);
			}
		}
	},
	preprocess: [mdsvex(mdsvexOptions), vitePreprocess()]
};

export default config;
