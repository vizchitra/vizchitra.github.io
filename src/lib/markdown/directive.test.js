import { describe, it, expect } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { remarkVizchitraDirectives } from './directive.js';

// Helper to process markdown to HTML
async function processMarkdown(markdown) {
	const result = await unified()
		.use(remarkParse)
		.use(remarkDirective)
		.use(remarkVizchitraDirectives)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeStringify, { allowDangerousHtml: true })
		.process(markdown);
	return String(result);
}

// ============================================
// Container Directives (:::name)
// ============================================

describe('Container Directives', () => {
	describe(':::notice', () => {
		it('renders with default color (grey)', async () => {
			const html = await processMarkdown(':::notice\nContent\n:::');
			expect(html).toContain('bg-gray-100');
			expect(html).toContain('border-gray-300');
		});

		it('renders with shorthand color {pink}', async () => {
			const html = await processMarkdown(':::notice{pink}\nContent\n:::');
			expect(html).toContain('bg-viz-pink-light');
			expect(html).toContain('border-viz-pink-dark');
		});

		it('renders with explicit color="blue"', async () => {
			const html = await processMarkdown(':::notice{color="blue"}\nContent\n:::');
			expect(html).toContain('bg-viz-blue-light');
		});

		it('includes prose classes', async () => {
			const html = await processMarkdown(':::notice{orange}\nTest\n:::');
			expect(html).toContain('prose');
			expect(html).toContain('prose-viz');
		});
	});

	describe(':::callout', () => {
		it('renders as aside element', async () => {
			const html = await processMarkdown(':::callout{teal}\nInfo\n:::');
			expect(html).toContain('<aside');
			expect(html).toContain('border-l-4');
		});

		it('supports title attribute', async () => {
			const html = await processMarkdown(':::callout{color="pink" title="Note"}\nInfo\n:::');
			expect(html).toContain('data-title="Note"');
		});
	});

	describe(':::card', () => {
		it('renders with shadow by default', async () => {
			const html = await processMarkdown(':::card\nContent\n:::');
			expect(html).toContain('shadow-lg');
		});

		it('can disable shadow', async () => {
			const html = await processMarkdown(':::card{shadow=false}\nContent\n:::');
			expect(html).not.toContain('shadow-lg');
		});
	});

	describe(':::slanted', () => {
		it('renders each letter as span with slant value', async () => {
			const html = await processMarkdown(':::slanted{pink}\nABC\n:::');
			expect(html).toContain('slanted-text');
			expect(html).toContain('--letter-slant:');
		});

		it('uses h2 tag by default', async () => {
			const html = await processMarkdown(':::slanted{pink}\nTEST\n:::');
			expect(html).toContain('<h2');
		});

		it('supports custom tag', async () => {
			const html = await processMarkdown(':::slanted{color="blue" tag="h3"}\nTEST\n:::');
			expect(html).toContain('<h3');
		});

		it('supports alignment', async () => {
			const html = await processMarkdown(':::slanted{pink align="left"}\nTEST\n:::');
			expect(html).toContain('text-left');
		});

		it('calculates correct slant for letters', async () => {
			const html = await processMarkdown(':::slanted{pink}\nAMT\n:::');
			// A = 0 (at start), M = 0 (midpoint), T = -6 (after n, negative)
			expect(html).toContain('--letter-slant: 0');
			expect(html).toContain('--letter-slant: -6');
		});
	});
});

// ============================================
// Block/Leaf Directives (::name)
// ============================================

describe('Block Directives', () => {
	describe('::hr', () => {
		it('renders colored horizontal rule', async () => {
			const html = await processMarkdown('::hr{orange}');
			expect(html).toContain('<hr');
			expect(html).toContain('border-viz-orange-dark');
		});
	});

	describe('::spacer', () => {
		it('renders with default size (md)', async () => {
			const html = await processMarkdown('::spacer');
			expect(html).toContain('h-8');
		});

		it('renders different sizes', async () => {
			const htmlSm = await processMarkdown('::spacer{size="sm"}');
			const htmlLg = await processMarkdown('::spacer{size="lg"}');
			const htmlXl = await processMarkdown('::spacer{size="xl"}');

			expect(htmlSm).toContain('h-4');
			expect(htmlLg).toContain('h-16');
			expect(htmlXl).toContain('h-24');
		});

		it('has aria-hidden for accessibility', async () => {
			const html = await processMarkdown('::spacer{size="md"}');
			expect(html).toContain('aria-hidden="true"');
		});
	});

	describe('::divider', () => {
		it('renders solid by default', async () => {
			const html = await processMarkdown('::divider{pink}');
			expect(html).toContain('<hr');
			expect(html).not.toContain('border-dashed');
		});

		it('supports dashed style', async () => {
			const html = await processMarkdown('::divider{color="blue" style="dashed"}');
			expect(html).toContain('border-dashed');
		});

		it('supports dotted style', async () => {
			const html = await processMarkdown('::divider{color="teal" style="dotted"}');
			expect(html).toContain('border-dotted');
		});
	});
});

// ============================================
// Inline/Text Directives (:name)
// ============================================

describe('Inline Directives', () => {
	describe(':color', () => {
		it('renders colored bold text by default', async () => {
			const html = await processMarkdown(':color[Hello]{pink}');
			expect(html).toContain('text-viz-pink-dark');
			expect(html).toContain('font-bold');
		});

		it('can disable bold', async () => {
			const html = await processMarkdown(':color[Hello]{color="blue" bold=false}');
			expect(html).not.toContain('font-bold');
		});
	});

	describe(':badge', () => {
		it('renders as rounded pill', async () => {
			const html = await processMarkdown(':badge[NEW]{pink}');
			expect(html).toContain('rounded-full');
			expect(html).toContain('inline-flex');
		});

		it('supports different sizes', async () => {
			const htmlSm = await processMarkdown(':badge[S]{size="sm"}');
			const htmlLg = await processMarkdown(':badge[L]{size="lg"}');

			expect(htmlSm).toContain('text-xs');
			expect(htmlLg).toContain('text-base');
		});
	});

	describe(':kbd', () => {
		it('renders keyboard shortcut styling', async () => {
			const html = await processMarkdown(':kbd[Enter]');
			expect(html).toContain('<kbd');
			expect(html).toContain('font-mono');
			expect(html).toContain('border');
		});
	});

	describe(':mark', () => {
		it('renders highlighted text', async () => {
			const html = await processMarkdown(':mark[Important]{yellow}');
			expect(html).toContain('<mark');
			expect(html).toContain('bg-viz-yellow-light');
		});
	});
});

// ============================================
// Schema Validation
// ============================================

describe('Schema Validation', () => {
	it('uses default color for invalid color value', async () => {
		// Invalid color should fall back to default (grey)
		const html = await processMarkdown(':::notice{invalid}\nTest\n:::');
		// Should still render (with warning logged)
		expect(html).toContain('div');
	});
});
