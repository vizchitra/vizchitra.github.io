import Markdoc from '@markdoc/markdoc';
import { config } from './config.js';
import yaml from 'js-yaml';

/**
 * Parse a Markdoc content string and return serializable output.
 * @param {string} content
 * @returns {{frontmatter: Record<string, any>, html: string, renderable: any, debugInfo: string, errors: any[]}}
 */
export function parseMarkdoc(content) {
  // Parse frontmatter
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  /** @type {Record<string, any>} */
  let frontmatter = {};
  let markdown = content;

  if (match) {
    frontmatter = yaml.load(match[1]) || {};
    markdown = match[2];
  }

  // Parse Markdoc
  const ast = Markdoc.parse(markdown);
  // cast config to any to avoid TS tooling complaints about strict types
  const cfg = /** @type {any} */ (config);
  const errors = Markdoc.validate(ast, cfg);

  if (errors.length > 0) {
    console.error('Markdoc validation errors:', errors);
  }

  const renderable = Markdoc.transform(ast, cfg);

  /**
   * Escape text for safe HTML insertion.
   * @param {unknown} str
   * @returns {string}
   */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /**
   * Render a Markdoc renderable node tree into an HTML string.
   * @param {any} node
   * @returns {string}
   */
  function renderNodeToHTML(node) {
    const nd = /** @type {any} */ (node);
    if (typeof nd === 'string' || typeof nd === 'number') return escapeHtml(nd);
    if (Array.isArray(nd)) return nd.map(renderNodeToHTML).join('');

    if (nd && typeof nd === 'object') {
      // Tag nodes represent elements
      if (nd.$$mdtype === 'Tag') {
        const name = /** @type {any} */ (nd.name);
        const attributes = /** @type {Record<string, any>} */ (nd.attributes || {});

        // Map Markdoc Tag names to plain HTML tag names
        let tagName = (typeof name === 'string') ? name : 'div';


        if (tagName === 'Heading') {
          const level = attributes.level || 1;
          tagName = `h${level}`;
        } else if (tagName === 'Article') {
          tagName = 'article';
        } else {
          tagName = String(tagName).toLowerCase();
        }

        // Build attributes string, omit Markdoc-only attrs like `level`
        const attrs = Object.entries(attributes)
          .filter(([k]) => k !== 'level')
          .map(([k, v]) => `${k}="${String(v).replace(/"/g, '&quot;')}"`)
          .join(' ');

        const open = attrs ? `<${tagName} ${attrs}>` : `<${tagName}>`;
        const children = Array.isArray(nd.children) ? nd.children.map(renderNodeToHTML).join('') : '';
        return `${open}${children}</${tagName}>`;
      }

      // Fallback: render children if present
      if (Array.isArray(nd.children)) return nd.children.map(renderNodeToHTML).join('');
    }

    return '';
  }

  let html = renderNodeToHTML(renderable);

  // Replace simple frontmatter variable placeholders like {$frontmatter.title}
  /**
   * @param {string} _m
   * @param {string} key
   * @returns {string}
   */
  function _replaceFrontmatter(_m, key) {
    const val = frontmatter && Object.prototype.hasOwnProperty.call(frontmatter, key) ? frontmatter[key] : undefined;
    return val == null ? '' : escapeHtml(val);
  }

  html = html.replace(/\{\$frontmatter\.([a-zA-Z0-9_]+)\}/g, /** @type {(m:string,k:string)=>string} */(_replaceFrontmatter));

  // Hard sanitize: convert to pure JSON immediately to kill any hidden references or prototype issues
  const debugInfo = JSON.stringify(renderable, null, 2);
  const safeRenderable = JSON.parse(debugInfo);

  // We still need to rename $$mdtype to type because SvelteKit might strip $$ props (internal convention)
  function recursiveRename(node) {
    if (Array.isArray(node)) return node.map(recursiveRename);
    if (node && typeof node === 'object') {
      const { $$mdtype, children, ...rest } = node;
      const out = { ...rest };
      if ($$mdtype) out.type = $$mdtype;
      if (children) out.children = recursiveRename(children);
      return out;
    }
    return node;
  }

  const finalRenderable = recursiveRename(safeRenderable);

  return {
    frontmatter,
    html,
    renderable: finalRenderable,
    debugInfo,
    errors
  };
}
