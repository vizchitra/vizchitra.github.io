import { visit } from 'unist-util-visit';
import { z } from 'zod';
import { formatSlantedText } from '../utils/slanted.js';

// ============================================
// SECTION 1: Shared Zod Schemas
// ============================================

const ColorSchema = z
	.enum(['grey', 'pink', 'blue', 'teal', 'yellow', 'orange', 'black'])
	.default('grey');

const SizeSchema = z.enum(['sm', 'md', 'lg', 'xl']).default('md');

// ============================================
// SECTION 2: Style Mappings
// ============================================

const COLOR_BG_CLASSES = {
	grey: 'bg-gray-100 border-gray-300',
	pink: 'bg-viz-pink-light border-viz-pink-dark',
	blue: 'bg-viz-blue-light border-viz-blue-dark',
	teal: 'bg-viz-teal-light border-viz-teal-dark',
	yellow: 'bg-viz-yellow-light border-viz-yellow-dark',
	orange: 'bg-viz-orange-light border-viz-orange-dark',
	black: 'bg-gray-900 border-gray-700'
};

const COLOR_TEXT_CLASSES = {
	grey: 'text-viz-grey-dark',
	pink: 'text-viz-pink-dark',
	blue: 'text-viz-blue-dark',
	teal: 'text-viz-teal-dark',
	yellow: 'text-viz-yellow-dark',
	orange: 'text-viz-orange-dark',
	black: 'text-viz-black'
};

// ============================================
// SECTION 2.5: Helper Functions
// ============================================

function getTextContent(node) {
	let text = '';
	visit(node, 'text', (textNode) => {
		text += textNode.value;
	});
	return text.trim();
}

// ============================================
// SECTION 3: Container Directives (:::name)
// ============================================

const CONTAINER_DIRECTIVES = {
	notice: {
		schema: z.object({ color: ColorSchema }),
		transform: ({ color }) => ({
			hName: 'div',
			hProperties: {
				className: [
					'prose',
					'prose-lg',
					'prose-viz',
					'mb-8',
					'max-w-none',
					'rounded-lg',
					'border-2',
					'p-6',
					'md:p-8',
					...COLOR_BG_CLASSES[color].split(' ')
				]
			}
		})
	},

	callout: {
		schema: z.object({
			color: ColorSchema,
			title: z.string().optional()
		}),
		transform: ({ color, title }) => ({
			hName: 'aside',
			hProperties: {
				className: [
					'callout',
					'my-6',
					'p-4',
					'rounded-md',
					'border-l-4',
					...COLOR_BG_CLASSES[color].split(' ')
				],
				'data-title': title
			}
		})
	},

	card: {
		schema: z.object({
			color: ColorSchema.default('grey'),
			shadow: z.boolean().default(true)
		}),
		transform: ({ color, shadow }) => ({
			hName: 'div',
			hProperties: {
				className: [
					'card',
					'p-6',
					'rounded-xl',
					'border',
					shadow ? 'shadow-lg' : '',
					...COLOR_BG_CLASSES[color].split(' ')
				].filter(Boolean)
			}
		})
	},

	slanted: {
		schema: z.object({
			color: ColorSchema.default('pink'),
			tag: z.enum(['h1', 'h2', 'h3', 'h4', 'span', 'p']).default('h2'),
			align: z.enum(['left', 'center', 'right']).default('center')
		}),
		transformsChildren: true,
		transform: ({ color, tag, align }, node) => {
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
				hName: tag,
				hProperties: {
					className: [
						'not-prose',
						'content-subheading',
						'mt-12',
						'mb-12',
						`text-viz-${color}-dark`,
						`text-${align}`,
						'font-normal'
					]
				},
				hChildren: children
			};
		}
	},

	stepper: {
		schema: z.object({}),
		transform: () => ({
			hName: 'div',
			hProperties: {
				className: ['stepper', 'not-prose', 'relative', 'pl-12', 'md:pl-16', 'my-8']
			}
		})
	},

	step: {
		schema: z.object({
			color: ColorSchema.default('pink'),
			number: z.coerce.number().optional()
		}),
		transform: ({ color, number }) => ({
			hName: 'div',
			hProperties: {
				className: ['step', 'prose', 'prose-lg', 'prose-viz', 'relative', 'pb-8', `step-${color}`],
				'data-step-number': number ?? '',
				'data-step-color': color
			}
		})
	}
};

// ============================================
// SECTION 4: Block/Leaf Directives (::name)
// ============================================

const BLOCK_DIRECTIVES = {
	hr: {
		schema: z.object({ color: ColorSchema }),
		transform: ({ color }) => ({
			hName: 'hr',
			hProperties: {
				className: ['border-2', `border-viz-${color}-dark`, 'my-8']
			}
		})
	},

	spacer: {
		schema: z.object({ size: SizeSchema }),
		transform: ({ size }) => {
			const sizeMap = { sm: 'h-4', md: 'h-8', lg: 'h-16', xl: 'h-24' };
			return {
				hName: 'div',
				hProperties: {
					className: [sizeMap[size], 'w-full'],
					'aria-hidden': 'true'
				}
			};
		}
	},

	divider: {
		schema: z.object({
			color: ColorSchema,
			style: z.enum(['solid', 'dashed', 'dotted']).default('solid')
		}),
		transform: ({ color, style }) => ({
			hName: 'hr',
			hProperties: {
				className: [
					'my-8',
					'border-2',
					`border-viz-${color}-dark`,
					style === 'dashed' ? 'border-dashed' : '',
					style === 'dotted' ? 'border-dotted' : ''
				].filter(Boolean)
			}
		})
	}
};

// ============================================
// SECTION 5: Inline/Text Directives (:name)
// ============================================

const INLINE_DIRECTIVES = {
	color: {
		schema: z.object({
			color: ColorSchema.default('pink'),
			bold: z.boolean().default(true)
		}),
		transform: ({ color, bold }) => ({
			hName: 'span',
			hProperties: {
				className: [COLOR_TEXT_CLASSES[color], bold ? 'font-bold' : ''].filter(Boolean)
			}
		})
	},

	badge: {
		schema: z.object({
			color: ColorSchema.default('blue'),
			size: SizeSchema.default('sm')
		}),
		transform: ({ color, size }) => {
			const sizeClasses = {
				sm: 'text-xs px-2 py-0.5',
				md: 'text-sm px-3 py-1',
				lg: 'text-base px-4 py-1.5',
				xl: 'text-lg px-5 py-2'
			};
			return {
				hName: 'span',
				hProperties: {
					className: [
						'inline-flex',
						'items-center',
						'rounded-full',
						'font-medium',
						...sizeClasses[size].split(' '),
						...COLOR_BG_CLASSES[color].split(' ')
					]
				}
			};
		}
	},

	kbd: {
		schema: z.object({}),
		transform: () => ({
			hName: 'kbd',
			hProperties: {
				className: [
					'px-2',
					'py-1',
					'text-sm',
					'font-mono',
					'bg-gray-100',
					'border',
					'border-gray-300',
					'rounded'
				]
			}
		})
	},

	mark: {
		schema: z.object({ color: ColorSchema.default('yellow') }),
		transform: ({ color }) => ({
			hName: 'mark',
			hProperties: {
				className: [`bg-viz-${color}-light`, 'px-1', 'rounded']
			}
		})
	}
};

// ============================================
// SECTION 6: Attribute Parser
// ============================================

function parseAttributes(node) {
	if (!node.attributes) return {};

	const keys = Object.keys(node.attributes);

	// Shorthand: {yellow} → {color: 'yellow'}
	if (keys.length === 1 && !node.attributes[keys[0]]) {
		return { color: keys[0] };
	}

	// Explicit: { color="blue" } → {color: 'blue'}
	return node.attributes;
}

// ============================================
// SECTION 7: Generic Directive Handler
// ============================================

function handleDirective(node, registry) {
	const directive = registry[node.name];
	if (!directive) return; // Unknown directive, pass through

	const rawAttrs = parseAttributes(node);

	// Validate with Zod (uses defaults for missing values)
	const result = directive.schema.safeParse(rawAttrs);

	if (!result.success) {
		console.warn(`Invalid attributes for :${node.name}:`, result.error.format());
		return;
	}

	// Pass node to transform for directives that need child access
	const output = directive.transformsChildren
		? directive.transform(result.data, node)
		: directive.transform(result.data);

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
// SECTION 8: Plugin Export
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
