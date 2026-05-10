import { readFileSync } from 'node:fs';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Parse redirect paths from Cloudflare _redirects file (single source of truth)
const redirectPaths = readFileSync('static/_redirects', 'utf-8')
	.split('\n')
	.filter((line) => line.trim())
	.map((line) => line.split(' ')[0]);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			routes: {
				include: ['/*'],
				exclude: ['/app/*', '/fonts/*', '/images/*', '/docs/*']
			}
		}),
		alias: {
			'content-collections': './.content-collections/generated'
		},
		output: {
			bundleStrategy: 'split'
		},
		appDir: 'app',
		prerender: {
			entries: ['*'],
			concurrency: 8,
			handleHttpError: ({ path, message }) => {
				// Ignore API routes, studio routes (not prerendered), build assets, and Cloudflare-handled redirects
				if (
					path.startsWith('/api/') ||
					path.startsWith('/studio') ||
					path.startsWith('/app/') ||
					redirectPaths.includes(path)
				) {
					return;
				}
				throw new Error(message);
			},
			handleMissingId: 'ignore',
			handleUnseenRoutes: 'ignore'
		}
	},
	preprocess: [vitePreprocess()]
};

export default config;
