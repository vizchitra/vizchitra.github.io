import { visit } from 'unist-util-visit';
import { formatSlantedText } from '../utils/slanted.js';

// ============================================
// SECTION 1: Helper Functions
// ============================================

function getTextContent(node) {
	let text = '';
	visit(node, 'text', (textNode) => {
		text += textNode.value;
	});
	return text.trim();
}

// ============================================
// SECTION 2: Container Directives (:::name)
// ============================================

const CONTAINER_DIRECTIVES = {
	notice: {
		transform: () => ({
			hName: 'div',
			hProperties: {
				className: ['notice']
			}
		})
	}
};

// ============================================
// SECTION 3: Block/Leaf Directives (::name)
// ============================================

const BLOCK_DIRECTIVES = {
	hr: {
		transform: () => ({
			hName: 'hr',
			hProperties: {
				className: ['hr']
			}
		})
	},

	spacer: {
		transform: () => ({
			hName: 'div',
			hProperties: {
				className: ['spacer'],
				'aria-hidden': 'true'
			}
		})
	}
};

// ============================================
// SECTION 4: Inline/Text Directives (:name)
// ============================================

const INLINE_DIRECTIVES = {
	slanted: {
		transformsChildren: true,
		transform: (node) => {
			const text = getTextContent(node);
			const letters = formatSlantedText(text);

			// Create hast element children for each letter
			const children = letters.map(({ letter, slant }) => ({
				type: 'element',
				tagName: 'span',
				properties: {
					className: ['slanted-text'],
					style: `--letter-slant: ${slant}`
				},
				children: [{ type: 'text', value: letter }]
			}));

			return {
				hName: 'span',
				hProperties: {
					className: ['slanted']
				},
				hChildren: children
			};
		}
	},

	color: {
		transform: (node) => {
			// Parse color attribute - support shorthand {blue} or explicit {color="blue"}
			const attrs = node.attributes || {};
			const keys = Object.keys(attrs);
			let color = 'pink'; // default

			// Shorthand: {blue} → color="blue"
			if (keys.length === 1 && !attrs[keys[0]]) {
				color = keys[0];
			}
			// Explicit: {color="blue"}
			else if (attrs.color) {
				color = attrs.color;
			}

			return {
				hName: 'span',
				hProperties: {
					className: ['color'],
					'data-color': color
				}
			};
		}
	}
};

// ============================================
// SECTION 5: Generic Directive Handler
// ============================================

function handleDirective(node, registry) {
	const directive = registry[node.name];
	if (!directive) return; // Unknown directive, pass through

	// Pass node to transform for directives that need child access
	const output = directive.transformsChildren
		? directive.transform(node)
		: directive.transform(node);

	node.data = {
		hName: output.hName,
		hProperties: output.hProperties
	};

	// If directive provides new children, replace them
	if (output.hChildren) {
		node.data.hChildren = output.hChildren;
		node.children = []; // Clear original children
	}
}

// ============================================
// SECTION 6: Plugin Export
// ============================================

export function remarkVizchitraDirectives() {
	return (tree) => {
		visit(tree, (node) => {
			if (node.type === 'containerDirective') {
				handleDirective(node, CONTAINER_DIRECTIVES);
			}

			if (node.type === 'leafDirective') {
				handleDirective(node, BLOCK_DIRECTIVES);
			}

			if (node.type === 'textDirective') {
				handleDirective(node, INLINE_DIRECTIVES);
			}
		});
	};
}
