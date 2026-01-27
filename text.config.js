import fs from 'fs';
import path from 'path';

/**
 * Vite plugin for watching content files and triggering HMR
 * @returns {import('vite').Plugin}
 */
export function contentHmrPlugin() {
	return {
		name: 'watch-content-md',
		apply: 'serve',
		configureServer(server) {
			const resolvedContentDir = path.resolve(process.cwd(), 'content');
			server.watcher.add(resolvedContentDir);

			const invalidateAndReload = () => {
				const modules = server.moduleGraph.getModulesByFile(
					path.resolve(process.cwd(), 'src/routes/[...slug]/+page.server.ts')
				);
				if (modules) {
					modules.forEach((mod) => server.moduleGraph.invalidateModule(mod));
				}
				const pageModules = server.moduleGraph.getModulesByFile(
					path.resolve(process.cwd(), 'src/routes/[...slug]/+page.svelte')
				);
				if (pageModules) {
					pageModules.forEach((mod) => server.moduleGraph.invalidateModule(mod));
				}
				server.ws.send({ type: 'full-reload' });
			};

			const shouldReload = (p) => {
				if (!p) return false;
				if (!p.startsWith(resolvedContentDir)) return false;
				const lp = p.toLowerCase();
				return lp.endsWith('.md') || lp.endsWith('.svx');
			};

			server.watcher.on('add', (p) => {
				if (shouldReload(p)) invalidateAndReload();
			});
			server.watcher.on('change', (p) => {
				if (shouldReload(p)) invalidateAndReload();
			});
			server.watcher.on('unlink', (p) => {
				if (shouldReload(p)) invalidateAndReload();
			});
		}
	};
}

/**
 * Vite plugin to auto-inject component imports into markdown files
 * Runs BEFORE mdsvex processes the files
 */
export function contentImportPlugin() {
	let componentNames = [];

	return {
		name: 'inject-content-imports',
		enforce: 'pre',

		configResolved() {
			const indexPath = path.resolve(process.cwd(), 'src/lib/components/index.ts');
			const content = fs.readFileSync(indexPath, 'utf-8');
			const exportRegex = /export\s+\{\s*default\s+as\s+(\w+)\s*\}/g;

			let match;
			while ((match = exportRegex.exec(content)) !== null) {
				componentNames.push(match[1]);
			}

			console.log(`✅ Content import plugin loaded: ${componentNames.length} components`);
		},

		async transform(code, id) {
			if (!id.endsWith('.md') || !id.includes('/content/')) {
				return null;
			}

			// Step: Inject component imports
			const hasComponentImport =
				/import\s+\{[^}]*\}\s+from\s+['"](\$lib\/components|\.\.\/.*\/components)['"]/g.test(code);

			if (!hasComponentImport) {
				const allComponents = componentNames.sort();
				const importStatement = `import { ${allComponents.join(', ')} } from '$lib/components';\n`;

				const scriptMatch = code.match(/^(<script[^>]*>)/m);

				if (scriptMatch) {
					const scriptTag = scriptMatch[1];
					code = code.replace(scriptTag, `${scriptTag}\n\t${importStatement}`);
				} else {
					const frontmatterEnd = code.indexOf('---', 3);
					if (frontmatterEnd !== -1) {
						const insertPos = frontmatterEnd + 3;
						code =
							code.slice(0, insertPos) +
							`\n\n<script lang="ts">\n\t${importStatement}</script>\n` +
							code.slice(insertPos);
					} else {
						code = `<script lang="ts">\n\t${importStatement}</script>\n\n${code}`;
					}
				}
			}

			return {
				code: code,
				map: null
			};
		}
	};
}
