import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// Content directory path
export const contentDir = path.join(process.cwd(), 'content');

/**
 * Recursively find all markdown files in the content directory
 * @param {string} dir - Directory to search
 * @returns {string[]} - Array of file paths
 */
export function getMarkdownFiles(dir = contentDir) {
	let results = [];
	const list = fs.readdirSync(dir);
	list.forEach((file) => {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);
		if (stat && stat.isDirectory()) {
			results = results.concat(getMarkdownFiles(filePath));
		} else if (file.endsWith('.md')) {
			results.push(filePath);
		}
	});
	return results;
}

/**
 * Parse YAML frontmatter from a markdown file
 * @param {string} filePath - Path to the markdown file
 * @returns {object|null} - Parsed frontmatter or null
 */
export function parseFrontmatter(filePath) {
	try {
		const content = fs.readFileSync(filePath, 'utf-8');
		const match = content.match(/^---\n([\s\S]*?)\n---/);
		if (match) {
			return yaml.load(match[1]) || {};
		}
	} catch (e) {
		console.error(`Error parsing frontmatter for ${filePath}:`, e);
	}
	return null;
}

/**
 * Get content slugs for prerendering, filtering out drafts in production
 * @returns {string[]} - Array of slug paths
 */
export function getContentSlugs() {
	return getMarkdownFiles(contentDir)
		.filter((file) => {
			if (process.env.NODE_ENV === 'development') return true;
			const frontmatter = parseFrontmatter(file);
			return !frontmatter?.draft;
		})
		.map((file) => file.replace(contentDir, '').replace('.md', ''))
		.map((slug) => (slug.startsWith('/') ? slug : `/${slug}`));
}

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
			// Add the content directory to the watcher
			server.watcher.add(resolvedContentDir);

			const invalidateAndReload = () => {
				// Invalidate modules that use import.meta.glob for content
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
				// Only reload if the file is inside the content directory
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
	// Read all component names from index.ts at build time
	let componentNames = [];

	return {
		name: 'inject-content-imports',
		enforce: 'pre', // Run before mdsvex

		configResolved() {
			// Read component names once during build startup
			const indexPath = path.resolve(process.cwd(), 'src/lib/components/index.ts');
			const content = fs.readFileSync(indexPath, 'utf-8');
			const exportRegex = /export\s+\{\s*default\s+as\s+(\w+)\s*\}/g;

			let match;
			while ((match = exportRegex.exec(content)) !== null) {
				componentNames.push(match[1]);
			}

			console.log(`✅ Content import plugin loaded: ${componentNames.length} components`);
		},

		transform(code, id) {
			// Only process markdown files in /content directory
			if (!id.endsWith('.md') || !id.includes('/content/')) {
				return null;
			}

			// Check if file already has component imports from $lib/components
			const hasComponentImport = /import\s+\{[^}]*\}\s+from\s+['"](\$lib\/components|\.\.\/.*\/components)['"]/g.test(code);

			// If it already has component imports, preserve them and only inject other imports (like data)
			if (hasComponentImport) {
				return null;
			}

			// Import all components - simpler and avoids missed components
			const allComponents = componentNames.sort();
			const importStatement = `import { ${allComponents.join(', ')} } from '$lib/components';\n`;

			let transformedCode;

			// Check if file has a script block
			const scriptMatch = code.match(/^(<script[^>]*>)/m);

			if (scriptMatch) {
				// Insert import after opening <script> tag
				const scriptTag = scriptMatch[1];
				transformedCode = code.replace(scriptTag, `${scriptTag}\n\t${importStatement}`);
			} else {
				// No script block exists - inject one after frontmatter
				const frontmatterEnd = code.indexOf('---', 3);
				if (frontmatterEnd !== -1) {
					const insertPos = frontmatterEnd + 3;
					transformedCode =
						code.slice(0, insertPos) +
						`\n\n<script lang="ts">\n\t${importStatement}</script>\n` +
						code.slice(insertPos);
				} else {
					// No frontmatter - inject at start
					transformedCode = `<script lang="ts">\n\t${importStatement}</script>\n\n${code}`;
				}
			}

			return {
				code: transformedCode,
				map: null
			};
		}
	};
}
