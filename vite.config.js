import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import contentCollections from "@content-collections/vite";

import { defineConfig } from 'vite';
import dsv from '@rollup/plugin-dsv';
import { hmrReload } from './text.config.js';

export default defineConfig({
	optimizeDeps: {
		// Ensure Rolldown optimization options are present to avoid esbuild deprecation warnings
		rolldownOptions: {}
	},
	resolve: {
		alias: {
			'../../content': '/content'
		}
	},
	plugins: [
		tailwindcss(),
		contentCollections(),
		sveltekit(),
		dsv(),
		hmrReload()],
	server: {
		fs: {
			allow: ['..']
		}
	}
});
