import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dsv from '@rollup/plugin-dsv';
import { contentHmrPlugin } from './text.config.js';

export default defineConfig({
	optimizeDeps: {
		// Ensure Rolldown optimization options are present to avoid esbuild deprecation warnings
		rolldownOptions: {}
	},
	plugins: [tailwindcss(), sveltekit(), contentHmrPlugin(), dsv()],
	server: {
		fs: {
			allow: ['..']
		}
	}
});
