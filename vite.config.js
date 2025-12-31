import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dsv from '@rollup/plugin-dsv';
import path from 'path';
export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		// Watch content files and trigger full-reload on changes
		{
			name: 'watch-content-md',
			apply: 'serve',
			configureServer(server) {
				const contentDir = path.join(process.cwd(), 'content');
				const pattern = path.join(contentDir, '**/*.{md,svx}');
				try {
					server.watcher.add(pattern);
				} catch (e) { }
				const reload = () => server.ws.send({ type: 'full-reload' });
				const shouldReload = (p) => {
					if (!p) return false;
					const lp = p.toLowerCase();
					return lp.endsWith('.md') || lp.endsWith('.svx');
				};
				server.watcher.on('add', (p) => { if (shouldReload(p)) reload(); });
				server.watcher.on('change', (p) => { if (shouldReload(p)) reload(); });
				server.watcher.on('unlink', (p) => { if (shouldReload(p)) reload(); });
			}
		},
		dsv()
	],
	server: {
		fs: {
			allow: ['..']
		}
	}
});
