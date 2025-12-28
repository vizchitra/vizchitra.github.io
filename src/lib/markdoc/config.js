import Markdoc from '@markdoc/markdoc';

import { formatSlantedText } from '../utils/utils.js';

/**
 * Generate an id attribute from heading child text.
 * @param {Array<unknown>} children
 * @param {Record<string, any>} attributes
 * @returns {string}
 */
function generateID(children, attributes) {
  if (!Array.isArray(children)) return '';
  const text = children
    .filter(child => typeof child === 'string')
    .join('')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  return text;
}

// Custom nodes
const nodes = {
  document: {
    render: 'article',
  },
  heading: {
    render: 'Heading',
    attributes: {
      level: { type: Number, required: true },
      id: { type: String }
    },
    /**
     * Transform a Markdoc heading node into a renderable Tag.
     * @param {import('@markdoc/markdoc').Node} node
     * @param {any} config
     * @returns {import('@markdoc/markdoc').Tag}
     */
    transform(node, config) {
      const attributes = node.transformAttributes(config);
      const children = node.transformChildren(config);
      const id = attributes.id || generateID(children, attributes);
      const tagName = `h${attributes.level}`;

      return new Markdoc.Tag(tagName, { ...attributes, id }, children);
    }
  }
};

// Custom tags for your use cases
const tags = {
  notice: {
    render: 'Notice',
    attributes: {},
    transform(node, config) {
      const children = node.transformChildren(config);
      return new Markdoc.Tag('div', { class: 'content-notice' }, children);
    }
  },
  slanted: {
    render: 'Slanted',
    attributes: {
      color: { type: String, default: 'pink' }
    },
    transform(node, config) {
      const attributes = node.transformAttributes(config);
      const children = node.transformChildren(config);

      // Helper to recursively get text from children
      function getText(nodes) {
        let text = '';
        for (const child of nodes) {
          if (typeof child === 'string') {
            text += child;
          } else if (child && typeof child === 'object' && Array.isArray(child.children)) {
            text += getText(child.children);
          }
        }
        return text;
      }

      const text = getText(children);

      return new Markdoc.Tag('Slanted', {
        textContent: text,
        color: attributes.color
      });
    }
  }
};

/** @type {import('@markdoc/markdoc').Config} */
export const config = {
  nodes,
  tags,
  variables: {},
  functions: {}
};