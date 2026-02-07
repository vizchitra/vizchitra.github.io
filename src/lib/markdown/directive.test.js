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
		it('renders with notice class', async () => {
			const html = await processMarkdown(':::notice\nContent\n:::');
			expect(html).toContain('class="notice"');
			expect(html).toContain('<div');
		});

		it('ignores color attributes - styling via CSS variables', async () => {
			const html = await processMarkdown(':::notice{pink}\nContent\n:::');
			expect(html).toContain('class="notice"');
			expect(html).not.toContain('data-color');
		});
	});
});

// ============================================
// Block/Leaf Directives (::name)
// ============================================

describe('Block Directives', () => {
	describe('::hr', () => {
		it('renders with hr class', async () => {
			const html = await processMarkdown('::hr');
			expect(html).toContain('<hr');
			expect(html).toContain('class="hr"');
		});

		it('ignores color attributes - styling via CSS variables', async () => {
			const html = await processMarkdown('::hr{orange}');
			expect(html).toContain('class="hr"');
			expect(html).not.toContain('data-color');
		});
	});

	describe('::spacer', () => {
		it('renders with spacer class', async () => {
			const html = await processMarkdown('::spacer');
			expect(html).toContain('class="spacer"');
		});

		it('has aria-hidden for accessibility', async () => {
			const html = await processMarkdown('::spacer');
			expect(html).toContain('aria-hidden="true"');
		});

		it('ignores size attributes - fixed size via CSS', async () => {
			const html = await processMarkdown('::spacer{size="lg"}');
			expect(html).toContain('class="spacer"');
			expect(html).not.toContain('data-size');
		});
	});
});

// ============================================
// Inline/Text Directives (:name)
// ============================================

describe('Inline Directives', () => {
	describe(':slanted', () => {
		it('renders each letter as span with slant value', async () => {
			const html = await processMarkdown(':slanted[ABC]');
			expect(html).toContain('slanted-text');
			expect(html).toContain('--letter-slant:');
		});

		it('wraps in span with slanted class', async () => {
			const html = await processMarkdown(':slanted[TEST]');
			expect(html).toContain('<span class="slanted">');
		});

		it('calculates correct slant for letters', async () => {
			const html = await processMarkdown(':slanted[AMT]');
			// A = 0 (at start), M = 0 (midpoint), T = -6 (after n, negative)
			expect(html).toContain('--letter-slant: 0');
			expect(html).toContain('--letter-slant: -6');
		});
	});

	describe(':color', () => {
		it('renders with color class and data-color attribute', async () => {
			const html = await processMarkdown(':color[Hello]{pink}');
			expect(html).toContain('class="color"');
			expect(html).toContain('data-color="pink"');
		});

		it('supports shorthand syntax', async () => {
			const html = await processMarkdown(':color[Text]{blue}');
			expect(html).toContain('data-color="blue"');
		});

		it('supports explicit color attribute', async () => {
			const html = await processMarkdown(':color[Text]{color="teal"}');
			expect(html).toContain('data-color="teal"');
		});

		it('uses default color when no attribute provided', async () => {
			const html = await processMarkdown(':color[Text]');
			expect(html).toContain('data-color="pink"'); // default
		});
	});
});
