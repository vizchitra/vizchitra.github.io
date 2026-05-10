---
title: Typography Test
description: Comprehensive test of RichText component with all typography elements
category: typography
draft: false
order: 1
---

# Heading 1

This is a a lead paragraph with **bold text**, _italic text_, and `inline code`. The RichText component handles all standard markdown elements with proper styling and spacing.

## Heading 2

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.

### Heading 3

Here's a paragraph followed by lists to test vertical rhythm.

#### Heading 4

Here's a paragraph followed by lists to test vertical rhythm.

##### Heading 5

Here's a paragraph followed by lists to test vertical rhythm.

###### Heading 6

Here's a paragraph followed by lists to test vertical rhythm.

#### Unordered Lists

- First item with some text
- Second item with more content
- Third item with nested list:
  - Nested item one
  - Nested item two
  - Deeper nesting:
    - Very deep item
    - Another deep item

#### Ordered Lists

1. First step in the process
2. Second step with details, with a really long text to test wrapping and see the font rhythm in list items
3. Third step to complete
   1. Sub-step one
   2. Sub-step two

### Links and Code

Visit [VizChitra](https://vizchitra.com) to see more examples. Links should have proper hover states.

Here's a code block:

```javascript
function calculateVerticalRhythm(elements) {
	return elements.filter(Boolean).map((el, index) => ({
		type: el.tagName.toLowerCase(),
		marginTop: index === 0 ? 0 : 'var(--space-m)'
	}));
}
```

The code should have syntax highlighting or at least monospace font with proper background.

## Blockquotes

> "Typography is the craft of endowing human language with a durable visual form."
>
> — Robert Bringhurst

Blockquotes should have a left border and distinct styling.

## Tables

| Feature        | Old (prose-viz)         | New (RichText)    | Status      |
| -------------- | ----------------------- | ----------------- | ----------- |
| Font Size      | 16px → 18px             | 16px → 20px       | ✅ Updated  |
| List Markers   | Missing                 | Visible           | ✅ Fixed    |
| Table Overflow | Not handled             | Horizontal scroll | ✅ Improved |
| Dependencies   | @tailwindcss/typography | Custom CSS        | ✅ Removed  |

Tables should be scrollable horizontally if they're too wide.

## Horizontal Rule

Content before the rule.

---

Content after the rule.

## Special Formatting

This is <small>small text</small> for fine print.

Mathematical notation: E = mc<sup>2</sup> and H<sub>2</sub>O

## Images

![Placeholder Image](/images/vizchitra-preview.png)

_Image caption: This demonstrates how images are rendered_

---

**Test completed!** All typography elements should render correctly with consistent spacing and styling.
