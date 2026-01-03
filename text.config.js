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
