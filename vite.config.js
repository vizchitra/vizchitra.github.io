import { contentHmrPlugin, contentImportPlugin } from './text.config.js';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [contentImportPlugin(), tailwindcss(), sveltekit(), contentHmrPlugin()],
	// logLevel: 'error',
	server: {
		fs: {
			allow: ['..']
		}
	}
});
