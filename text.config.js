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