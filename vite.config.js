import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dsv from '@rollup/plugin-dsv';
import { contentHmrPlugin } from './text.config.js';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), contentHmrPlugin(), dsv()],
	server: {
		fs: {
			allow: ['..']
		}
	}
});
