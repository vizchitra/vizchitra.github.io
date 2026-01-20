import betterTailwindcss from 'eslint-plugin-better-tailwindcss';
import boundaries from 'eslint-plugin-boundaries';
import svelteParser from 'svelte-eslint-parser';
import tsParser from '@typescript-eslint/parser';

/* Message Category Prefix Tokens:
Prefixes used to classify ESLint rules into categories. e.g.
	message: '[CATEGORY] Human-readable guidance'

[LAYOUT]  → layout primitives, grid/flex, positioning
[SPACING] → spacing tokens, gaps, margins, padding
[IMPORT]  → barrel imports, boundaries
[QUALITY] → correctness, duplication, conflicts
[A11Y]    → accessibility
*/


export default [
	{
		files: ['**/*.svelte', 'content/**/*.md'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tsParser
			}
		},
		plugins: {
			'better-tailwindcss': betterTailwindcss,
			boundaries
		},
		// Boundaries settings derive from src/lib/components/system.md
		// Zones declare which layer may import from which lower layers.
		settings: {
			'better-tailwindcss': {
				entryPoint: 'src/app.css'
			},
			// js-boundaries expects element types under the 'boundaries/elements' setting
			'boundaries/elements': [
				{ type: 'Foundation', pattern: 'src/lib/components/foundation/**' },
				{ type: 'Typography', pattern: 'src/lib/components/typography/**' },
				{ type: 'Structure', pattern: 'src/lib/components/structure/**' },
				{ type: 'Interface', pattern: 'src/lib/components/interface/**' },
				{ type: 'Blocks', pattern: 'src/lib/components/blocks/**' },
				{ type: 'Sections', pattern: 'src/lib/components/sections/**' },
				{ type: 'Patterns', pattern: 'src/lib/components/patterns/**' }
			]
		},
		rules: {
			// Catch contradicting classes like flex-row flex-col
			'better-tailwindcss/no-conflicting-classes': 'error',

			// No duplicate classes
			'better-tailwindcss/no-duplicate-classes': 'error',

			// Enforce layout primitives over raw flex/grid classes + spacing token usage
			// Tailwind v4 with @theme static only defines aliases (xs, sm, md, lg, xl, 2xl, 3xl, 4xl),
			// not numeric spacing. Block numeric tokens to enforce consistent design system usage.
			'better-tailwindcss/no-restricted-classes': [
				'error',
				{
					restrict: [
						// =========================================================
						// CATEGORY: LAYOUT PRIMITIVES
						// Use Stack, Cluster, Grid components instead of raw CSS
						// =========================================================
						{
							pattern: '^flex$',
							message: '[LAYOUT] Use Stack, Cluster, or Grid components instead of "flex"'
						},
						{
							pattern: '^inline-flex$',
							message: '[LAYOUT] Use Cluster component instead of "inline-flex"'
						},
						{
							pattern: '^grid$',
							message: '[LAYOUT] Use Grid component instead of "grid"'
						},
						{
							pattern: '!$',
							message: '[QUALITY] Do not use !important in Tailwind classes'
						},

						// =========================================================
						// CATEGORY: SPACING TOKENS
						// Use design system aliases: xs, sm, md, lg, xl, 2xl, 3xl, 4xl
						// =========================================================

						// Padding utilities
						{
							pattern: '^(p|px|py|pt|pr|pb|pl)-([1-9]\\d*)$',
							message: '[SPACING] Replace numeric "$1-$2" with alias e.g. "$1-md"'
						},

						// Margin utilities
						{
							pattern: '^(m|mx|my|mt|mr|mb|ml)-([1-9]\\d*)$',
							message: '[SPACING] Replace numeric "$1-$2" with alias e.g. "$1-md"'
						},

						// Gap utilities
						{
							pattern: '^(gap|gap-x|gap-y)-([1-9]\\d*)$',
							message: '[SPACING] Replace numeric "$1-$2" with alias e.g. "$1-md"'
						},

						// Space utilities
						{
							pattern: '^(space-x|space-y)-([1-9]\\d*)$',
							message: '[SPACING] Replace numeric "$1-$2" with alias e.g. "$1-md"'
						}
					]
				}
			],

			// Enforce single barrel import for components
			// CATEGORY: IMPORT
			// Enforce single barrel import for components (prefer `from $lib/components`)
			'no-restricted-imports': [
				'error',
				{
					paths: [
						{
							name: '$lib/components/interface',
							message: '[IMPORT] Import from $lib/components instead.'
						},
						{
							name: '$lib/components/structure',
							message: '[IMPORT] Import from $lib/components instead.'
						},
						{
							name: '$lib/components/patterns',
							message: '[IMPORT] Import from $lib/components instead.'
						},
						{
							name: '$lib/components/sections',
							message: '[IMPORT] Import from $lib/components instead.'
						},
						{
							name: '$lib/components/typography',
							message: '[IMPORT] Import from $lib/components instead.'
						}
					],
					patterns: [
						{
							group: ['$lib/components/*/*'],
							message: '[IMPORT] Deep imports from $lib/components subdirectories are not allowed. Use the barrel import from $lib/components.'
						}
					]
				}
			]
			,

			// boundaries plugin will additionally enforce layer relationships and private imports
			'boundaries/element-types': [
				'error',
				{
					default: 'disallow',
					rules: [
						{ from: 'Sections', allow: ['Sections', 'Blocks', 'Interface', 'Structure', 'Typography', 'Foundation'] },
						{ from: 'Blocks', allow: ['Blocks', 'Interface', 'Structure', 'Typography', 'Foundation'] },
						{ from: 'Interface', allow: ['Interface', 'Structure', 'Typography', 'Foundation'] },
						{ from: 'Structure', allow: ['Structure', 'Typography', 'Foundation'] },
						{ from: 'Typography', allow: ['Typography', 'Foundation'] },
						{ from: 'Foundation', allow: ['Foundation'] },
						{ from: 'Patterns', allow: ['Patterns'] }
					]
				}
			],

		}
	},
	{
		// Special handling for layout primitives and components with complex internal layouts
		files: [
			'src/lib/components/structure/Grid.svelte',
			'src/lib/components/interface/DragScrollTrack.svelte',
			'src/lib/components/interface/SliderInput.svelte'
		],
		rules: {
			// These components need layout utilities for their specialized purposes:
			// Grid: legitimate use of grid for layout primitive
			// DragScrollTrack: needs flex for specialized layout interactions (drag-scrolling)
			// SliderInput: needs flex for specialized layout interactions (slider axis positioning)
			'better-tailwindcss/no-restricted-classes': 'off'
		}
	}
];

// Rule category fallback mapping for audit tools and parsers.
// Prefer parsing bracketed category headers from rule messages (e.g. "[Spacing] ...");
// this mapping is used when rules do not emit a customizable message.
// Values are uppercase category tokens the audit expects.

export const ruleCategories = {
	"better-tailwindcss/no-conflicting-classes": "QUALITY",
	"better-tailwindcss/no-duplicate-classes": "QUALITY",
	"better-tailwindcss/no-restricted-classes": "LAYOUT",
	"no-restricted-imports": "IMPORT",
	"svelte3/no-unknown-property": "QUALITY",
	"no-unused-vars": "QUALITY",
	"no-undef": "QUALITY",
	"jsx-a11y/alt-text": "A11Y",
	"jsx-a11y/anchor-is-valid": "A11Y",
	"accessibility/no-autofocus": "A11Y",
	"boundaries/element-types": "IMPORT"
};
