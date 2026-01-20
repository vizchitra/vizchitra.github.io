import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { contentHmrPlugin, contentImportPlugin } from './text.config.js';

export default defineConfig({
	plugins: [
		contentImportPlugin(),
		tailwindcss(),
		sveltekit(),
		contentHmrPlugin()
	],
	// logLevel: 'error',
	server: {
		fs: {
			allow: ['..']
		}
	}
});
