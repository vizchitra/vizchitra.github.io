import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { parseMarkdoc } from '$lib/markdoc/parser.js';

// Import all markdown files from content folder as raw strings
const contentModules = import.meta.glob('../../../content/*.md', { query: '?raw', import: 'default' });

const contentMap: Record<string, string> = {};
for (const path in contentModules) {
  const fileName = path.split('/').pop()?.replace('.md', '') || '';
  contentMap[fileName] = path;
}

export const prerender = true;

export const entries = async () => {
  return Object.keys(contentMap).map((slug) => ({ slug }));
};

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;

  if (!contentMap[slug]) {
    throw error(404, `Content page "${slug}" not found`);
  }

  try {
    const contentPath = contentMap[slug];
    const content = await contentModules[contentPath]();

    const result = parseMarkdoc(content as string);

    // Strategy: Send data as string to avoid serialization issues
    const payloadString = JSON.stringify(result.renderable);

    const { frontmatter, html } = result;

    const data = {
      slug,
      frontmatter,
      html,
      payloadString
    };

    return data;
  } catch (err) {
    console.error('[slug] error loading:', err);
    throw error(500, `Failed to load content for "${slug}"`);
  }
};
