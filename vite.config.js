import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dsv from '@rollup/plugin-dsv';
export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), dsv()],
	server: {
		fs: {
			allow: ['..']
		}
	}
});
