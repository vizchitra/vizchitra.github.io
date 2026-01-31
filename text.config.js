import fs from 'fs';
import path from 'path';

/**
 * Get content slugs for prerendering - filesystem approach for build compatibility
 * @returns {string[]} - Array of slug paths
 */
export function getContentSlugs() {
  const contentDir = path.join(process.cwd(), 'content');

  function getMarkdownFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
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

  return [
    ...new Set(
      getMarkdownFiles(contentDir)
        .map((file) => {
          let slug = file.replace(contentDir, '').replace('.md', '');
          if (!slug.startsWith('/')) slug = `/${slug}`;
          return slug.replace(/\/index$/, '') || '/';
        })
    )
  ];
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
      const resolvedGuidesDir = path.resolve(process.cwd(), 'guides');
      // Add the content and guides directories to the watcher
      server.watcher.add(resolvedContentDir);
      server.watcher.add(resolvedGuidesDir);

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
        // Also invalidate content-collections generated modules
        server.moduleGraph.invalidateAll();
        server.ws.send({ type: 'full-reload' });
      };

      const shouldReload = (p) => {
        if (!p) return false;
        // Reload if file is inside content or guides directory
        const isContentFile = p.startsWith(resolvedContentDir);
        const isGuidesFile = p.startsWith(resolvedGuidesDir);
        if (!isContentFile && !isGuidesFile) return false;
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
