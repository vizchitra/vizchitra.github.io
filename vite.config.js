import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import contentCollections from '@content-collections/vite';

import { defineConfig } from 'vite';
import dsv from '@rollup/plugin-dsv';
import { hmrReload } from './text.config.js';

export default defineConfig({
	define: {
		__BUILD_SHA__: JSON.stringify((process.env.CF_PAGES_COMMIT_SHA || 'dev').slice(0, 7)),
		__BUILD_BRANCH__: JSON.stringify(process.env.CF_PAGES_BRANCH || 'local')
	},
	optimizeDeps: {
		rolldownOptions: {
			treeshake: { commonjs: true }
		}
	},
	resolve: {
		alias: {
			'../../content': '/content'
		}
	},
	plugins: [tailwindcss(), contentCollections(), sveltekit(), dsv(), hmrReload()],
	build: {
		chunkSizeWarningLimit: 1000,
		rolldownOptions: {
			treeshake: { commonjs: true },
			output: {
				advancedChunks: {
					groups: [{ name: 'prosemirror', test: /prosemirror/ }]
				}
			}
		}
	},
	server: {
		fs: {
			allow: ['..']
		}
	}
});
