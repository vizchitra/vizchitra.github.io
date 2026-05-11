// Vite 6+ no longer triggers a full page reload when SSR-only modules change.
// This plugin restores that behavior so content-collection updates (loaded via
// +page.server.js / +layout.server.js) are reflected in the browser during dev.
// See: https://v6.vite.dev/guide/migration#advanced
export function hmrReload() {
	return {
		name: 'hmr-reload',
		enforce: 'post',
		hotUpdate: {
			order: 'post',
			handler({ modules, server, timestamp }) {
				if (this.environment.name !== 'ssr') return;

				let hasSsrOnlyModules = false;
				const invalidatedModules = new Set();
				for (const mod of modules) {
					if (mod.id == null) continue;
					const clientModule = server.environments.client.moduleGraph.getModuleById(mod.id);
					if (clientModule != null) continue;

					this.environment.moduleGraph.invalidateModule(mod, invalidatedModules, timestamp, true);

					// Studio data files are handled via in-memory overrides + invalidateAll().
					// Skip the full-reload for them — the page already shows correct data.
					if (mod.id.includes('/content/') && mod.id.endsWith('.json')) continue;

					hasSsrOnlyModules = true;
				}

				if (hasSsrOnlyModules) {
					server.ws.send({ type: 'full-reload' });
					return [];
				}
			}
		}
	};
}
