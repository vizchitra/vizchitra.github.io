#!/usr/bin/env node

/**
 * VizChitra Tailwind CSS Audit
 *
 * Comprehensive analysis of Tailwind utility usage across all Svelte components.
 * Generates a markdown report with metrics, insights, and recommendations.
 *
 * Usage: node audit/tailwind-audit.js
 * Output: studio/tailwindaudit.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Category patterns for Tailwind utilities
const CATEGORY_PATTERNS = {
	layout: /^(flex|grid|block|inline-block|inline|hidden|table|contents|flow-root|list-item)/,
	spacing: /^([mp][xytblr]?-|gap-|space-)/,
	colors: /^(bg|text|border|ring|from|via|to|fill|stroke|caret|accent|decoration)-(?!opacity|none|current|transparent|inherit)/,
	typography: /^(font-|text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|left|center|right|justify|start|end|balance|wrap|nowrap|pretty)|leading-|tracking-|decoration-|underline|overline|line-through|no-underline|uppercase|lowercase|capitalize|normal-case|truncate|whitespace-|break-)/,
	sizing: /^(w-|h-|min-w|min-h|max-w|max-h|size-)/,
	borders: /^(border(?!-opacity)|rounded|ring-(?!opacity))/,
	effects: /^(shadow|opacity-|blur-|brightness-|contrast-|grayscale|hue-rotate|invert|saturate|sepia|backdrop-)/,
	positioning: /^(absolute|relative|fixed|sticky|static|inset-|top-|left-|right-|bottom-|z-)/,
	flexgrid: /^(justify-|items-|content-|self-|place-|order-|flex-(?!none)|grid-|col-|row-|auto-cols|auto-rows)/,
	transforms: /^(scale-|rotate-|translate|skew-|origin-)/,
	transitions: /^(transition|duration-|delay-|ease-|animate-)/,
	interactivity: /^(cursor-|select-|resize|scroll-|touch-|will-change|pointer-events)/,
	other: /^(overflow-|overscroll-|visible|invisible|sr-only|not-sr-only|aspect-|object-|mix-blend|isolation|filter|divide-|appearance-)/
};

// Color families in OKLCH tokens
const COLOR_FAMILIES = ['yellow', 'teal', 'blue', 'orange', 'pink', 'grey'];
const COLOR_SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

// Breakpoints
const BREAKPOINTS = ['sm', 'md', 'lg', 'xl', '2xl'];

// Variants
const VARIANT_PATTERNS = {
	hover: /^hover:/,
	focus: /^focus:|^focus-visible:|^focus-within:/,
	active: /^active:/,
	disabled: /^disabled:/,
	group: /^group-/,
	peer: /^peer-/,
	first: /^first:|^last:|^only:/,
	odd: /^odd:|^even:/,
	before: /^before:|^after:/,
	placeholder: /^placeholder:/,
	required: /^required:|^invalid:|^valid:/,
	dark: /^dark:/,
	rtl: /^rtl:|^ltr:/
};

function findSvelteFiles(dir) {
	const files = [];
	const excludeDirs = ['node_modules', '.svelte-kit', 'build', '.next', 'dist'];

	function walk(currentPath) {
		if (!fs.existsSync(currentPath)) return;

		const entries = fs.readdirSync(currentPath, { withFileTypes: true });
		for (const entry of entries) {
			if (entry.isDirectory() && !excludeDirs.includes(entry.name)) {
				walk(path.join(currentPath, entry.name));
			} else if (entry.name.endsWith('.svelte')) {
				files.push(path.join(currentPath, entry.name));
			}
		}
	}

	walk(dir);
	return files;
}

function extractClasses(content) {
	const classes = [];

	// Static classes: class="flex gap-4"
	const staticPattern = /class="([^"]*)"/g;
	let match;
	while ((match = staticPattern.exec(content)) !== null) {
		const classString = match[1];
		const individualClasses = classString.split(/\s+/).filter((c) => c.length > 0);
		classes.push(...individualClasses);
	}

	// Template literals: class={`bg-${color}-500`}
	const templatePattern = /class=\{`([^`]*)`\}/g;
	while ((match = templatePattern.exec(content)) !== null) {
		const classString = match[1];
		// Extract static parts (ignore ${} expressions)
		const staticParts = classString.split(/\$\{[^}]+\}/);
		staticParts.forEach((part) => {
			const individualClasses = part.split(/\s+/).filter((c) => c.length > 0);
			classes.push(...individualClasses);
		});
	}

	// Class directives: class:active={isActive}
	const directivePattern = /class:([a-zA-Z0-9-]+)=/g;
	while ((match = directivePattern.exec(content)) !== null) {
		classes.push(match[1]);
	}

	return classes;
}

function categorizeClass(className) {
	// Remove breakpoint prefixes for categorization
	const withoutBreakpoint = className.replace(/^(sm|md|lg|xl|2xl):/, '');

	// Remove variant prefixes
	const withoutVariant = withoutBreakpoint.replace(
		/^(hover|focus|focus-visible|focus-within|active|disabled|group-|peer-|first|last|only|odd|even|before|after|placeholder|required|invalid|valid|dark|rtl|ltr):/g,
		''
	);

	// Check against category patterns
	for (const [category, pattern] of Object.entries(CATEGORY_PATTERNS)) {
		if (pattern.test(withoutVariant)) {
			return category;
		}
	}

	return 'other';
}

function hasBreakpoint(className) {
	return /^(sm|md|lg|xl|2xl):/.test(className);
}

function getBreakpoint(className) {
	const match = className.match(/^(sm|md|lg|xl|2xl):/);
	return match ? match[1] : null;
}

function hasVariant(className) {
	return /^(hover|focus|focus-visible|focus-within|active|disabled|group-|peer-|first|last|only|odd|even|before|after|placeholder|required|invalid|valid|dark|rtl|ltr):/.test(
		className
	);
}

function getVariantType(className) {
	for (const [type, pattern] of Object.entries(VARIANT_PATTERNS)) {
		if (pattern.test(className)) {
			return type;
		}
	}
	return null;
}

function isColorClass(className) {
	const withoutPrefixes = className.replace(/^(sm|md|lg|xl|2xl|hover|focus|active|dark):/, '');
	return /^(bg|text|border|ring|from|via|to)-/.test(withoutPrefixes);
}

function usesOKLCHToken(className) {
	const withoutPrefixes = className.replace(/^(sm|md|lg|xl|2xl|hover|focus|active|dark):/, '');

	// Check for named variants: bg-viz-yellow, text-viz-yellow-light, border-viz-yellow-dark
	for (const family of COLOR_FAMILIES) {
		// Base variant: viz-yellow
		if (new RegExp(`-viz-${family}(?!-)(?![0-9])`).test(withoutPrefixes)) {
			return { family, shade: 'base', variant: 'base' };
		}
		// Light variant: viz-yellow-light
		if (new RegExp(`-viz-${family}-light`).test(withoutPrefixes)) {
			return { family, shade: '200', variant: 'light' };
		}
		// Dark variant: viz-yellow-dark
		if (new RegExp(`-viz-${family}-dark`).test(withoutPrefixes)) {
			return { family, shade: '700', variant: 'dark' };
		}
	}

	// Check for color ramp usage: bg-yellow-400, text-blue-600, etc.
	for (const family of COLOR_FAMILIES) {
		for (const shade of COLOR_SHADES) {
			if (new RegExp(`-(${family})-${shade}(?![0-9])`).test(withoutPrefixes)) {
				return { family, shade };
			}
		}
	}

	return null;
}

function parseOKLCHTokens(cssPath) {
	if (!fs.existsSync(cssPath)) return {};

	const content = fs.readFileSync(cssPath, 'utf-8');
	const tokens = {};

	// Match theme block
	const themeMatch = content.match(/@theme static \{([\s\S]*?)\n\}/);
	if (!themeMatch) return tokens;

	const themeBlock = themeMatch[1];

	// Extract color tokens
	for (const family of COLOR_FAMILIES) {
		tokens[family] = {};

		// Check for base brand color: --color-viz-yellow
		const basePattern = new RegExp(`--color-viz-${family}:\\s*oklch\\([^)]+\\)`, 'g');
		if (basePattern.test(themeBlock)) {
			tokens[family]['base'] = true;
		}

		// Check for numbered shades
		for (const shade of COLOR_SHADES) {
			const pattern = new RegExp(`--color-${family}-${shade}:\\s*oklch\\([^)]+\\)`, 'g');
			if (pattern.test(themeBlock)) {
				tokens[family][shade] = true;
			}
		}

		// Check for named variants (light = 200, dark = 700)
		const lightPattern = new RegExp(`--color-viz-${family}-light:`, 'g');
		if (lightPattern.test(themeBlock)) {
			tokens[family]['light'] = true;
		}

		const darkPattern = new RegExp(`--color-viz-${family}-dark:`, 'g');
		if (darkPattern.test(themeBlock)) {
			tokens[family]['dark'] = true;
		}
	}

	return tokens;
}

function getFileType(filePath) {
	if (filePath.includes('/components/interface/')) return 'interface';
	if (filePath.includes('/components/sections/')) return 'sections';
	if (filePath.includes('/components/structure/')) return 'structure';
	if (filePath.includes('/components/typography/')) return 'typography';
	if (filePath.includes('/components/layout/')) return 'layout';
	if (filePath.includes('/components/')) return 'components';
	if (filePath.includes('/routes/')) return 'routes';
	return 'other';
}

function analyzeFile(filePath, oklchTokens) {
	const content = fs.readFileSync(filePath, 'utf-8');
	const relativePath = path.relative(projectRoot, filePath);
	const classes = extractClasses(content);

	const analysis = {
		file: relativePath,
		category: getFileType(relativePath),
		totalClasses: classes.length,
		uniqueClasses: new Set(classes).size,
		classes: [],
		byCategory: {},
		breakpoints: {},
		variants: {},
		responsiveCount: 0,
		hasInlineStyles: /style="/.test(content),
		colorClasses: {
			total: 0,
			oklch: 0,
			hex: 0,
			rampUsage: {}
		}
	};

	// Analyze each class
	classes.forEach((className) => {
		const category = categorizeClass(className);
		analysis.classes.push({ class: className, category });

		// Count by category
		if (!analysis.byCategory[category]) {
			analysis.byCategory[category] = 0;
		}
		analysis.byCategory[category]++;

		// Track breakpoints
		if (hasBreakpoint(className)) {
			const bp = getBreakpoint(className);
			if (bp) {
				analysis.breakpoints[bp] = (analysis.breakpoints[bp] || 0) + 1;
				analysis.responsiveCount++;
			}
		}

		// Track variants
		if (hasVariant(className)) {
			const variant = getVariantType(className);
			if (variant) {
				analysis.variants[variant] = (analysis.variants[variant] || 0) + 1;
			}
		}

		// Track color usage
		if (isColorClass(className)) {
			analysis.colorClasses.total++;

			const tokenInfo = usesOKLCHToken(className);
			if (tokenInfo) {
				analysis.colorClasses.oklch++;
				const key = `${tokenInfo.family}-${tokenInfo.shade}`;
				analysis.colorClasses.rampUsage[key] = (analysis.colorClasses.rampUsage[key] || 0) + 1;
			} else {
				analysis.colorClasses.hex++;
			}
		}
	});

	// Calculate complexity
	const complexityScore =
		analysis.totalClasses * 1 +
		(analysis.hasInlineStyles ? 10 : 0) +
		analysis.responsiveCount * 0.5;

	if (complexityScore < 20) {
		analysis.complexity = 'low';
	} else if (complexityScore < 50) {
		analysis.complexity = 'medium';
	} else {
		analysis.complexity = 'high';
	}
	analysis.complexityScore = Math.round(complexityScore);

	return analysis;
}

function generateReport(results, oklchTokens) {
	const timestamp = new Date().toISOString().split('T')[0];

	// Aggregate statistics
	const stats = {
		filesScanned: results.length,
		totalClasses: 0,
		uniqueClasses: new Set(),
		byCategory: {},
		classesByCategory: {}, // Track actual class names by category
		breakpoints: {},
		variants: {},
		complexity: { low: 0, medium: 0, high: 0 },
		fileTypes: {},
		colorStats: {
			total: 0,
			oklch: 0,
			hex: 0,
			rampUsage: {},
			classesByFamily: {} // Track actual color classes by family
		},
		patterns: {},
		filesWithResponsive: 0,
		filesWithoutResponsive: 0
	};

	results.forEach((result) => {
		stats.totalClasses += result.totalClasses;
		result.classes.forEach((c) => {
			stats.uniqueClasses.add(c.class);

			// Track classes by category
			if (!stats.classesByCategory[c.category]) {
				stats.classesByCategory[c.category] = new Set();
			}
			stats.classesByCategory[c.category].add(c.class);
		});

		// Categories
		Object.entries(result.byCategory).forEach(([cat, count]) => {
			stats.byCategory[cat] = (stats.byCategory[cat] || 0) + count;
		});

		// Breakpoints
		Object.entries(result.breakpoints).forEach(([bp, count]) => {
			stats.breakpoints[bp] = (stats.breakpoints[bp] || 0) + count;
		});

		// Variants
		Object.entries(result.variants).forEach(([variant, count]) => {
			stats.variants[variant] = (stats.variants[variant] || 0) + count;
		});

		// Complexity
		stats.complexity[result.complexity]++;

		// File types
		if (!stats.fileTypes[result.category]) {
			stats.fileTypes[result.category] = {
				count: 0,
				totalClasses: 0,
				avgComplexity: 0
			};
		}
		stats.fileTypes[result.category].count++;
		stats.fileTypes[result.category].totalClasses += result.totalClasses;

		// Colors
		stats.colorStats.total += result.colorClasses.total;
		stats.colorStats.oklch += result.colorClasses.oklch;
		stats.colorStats.hex += result.colorClasses.hex;

		Object.entries(result.colorClasses.rampUsage).forEach(([ramp, count]) => {
			if (!stats.colorStats.rampUsage) stats.colorStats.rampUsage = {};
			stats.colorStats.rampUsage[ramp] = (stats.colorStats.rampUsage[ramp] || 0) + count;

			// Track color classes by family
			const [family] = ramp.split('-');
			if (!stats.colorStats.classesByFamily[family]) {
				stats.colorStats.classesByFamily[family] = new Set();
			}

			// Find actual classes for this ramp
			result.classes.forEach((c) => {
				if (
					isColorClass(c.class) &&
					c.class.includes(`-${family}-`) &&
					c.class.includes(ramp.split('-')[1])
				) {
					stats.colorStats.classesByFamily[family].add(c.class);
				}
			});
		});

		// Responsive
		if (Object.keys(result.breakpoints).length > 0) {
			stats.filesWithResponsive++;
		} else {
			stats.filesWithoutResponsive++;
		}

		// Pattern detection
		result.classes.forEach((c) => {
			stats.patterns[c.class] = (stats.patterns[c.class] || 0) + 1;
		});
	});

	// Calculate averages
	Object.keys(stats.fileTypes).forEach((type) => {
		const typeStats = stats.fileTypes[type];
		typeStats.avgClasses = (typeStats.totalClasses / typeStats.count).toFixed(1);
	});

	// Sort patterns by frequency
	const topPatterns = Object.entries(stats.patterns)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 30);

	// Unused tokens (only check numbered shades, not named variants)
	const unusedTokens = [];
	Object.entries(oklchTokens).forEach(([family, shades]) => {
		Object.keys(shades).forEach((shade) => {
			// Skip named variants (base, light, dark) - only check numbered shades
			if (['base', 'light', 'dark'].includes(shade)) return;

			const key = `${family}-${shade}`;
			if (!(stats.colorStats.rampUsage || {})[key]) {
				unusedTokens.push(`--color-${family}-${shade}`);
			}
		});
	});

	// Generate markdown
	let md = `---\n`;
	md += `title: Tailwind CSS Audit Report\n`;
	md += `description: Comprehensive analysis of Tailwind utility usage\n`;
	md += `category: audit\n`;
	md += `generated: true\n`;
	md += `draft: false\n`;
	md += `order: 2\n`;
	md += `---\n\n`;

	md += `# Tailwind CSS Audit Report\n\n`;
	md += `**Generated:** ${timestamp}  \n`;
	md += `**Files scanned:** ${stats.filesScanned}  \n`;
	md += `**Total classes:** ${stats.totalClasses}  \n`;
	md += `**Unique classes:** ${stats.uniqueClasses.size}  \n`;
	md += `**Avg classes per file:** ${(stats.totalClasses / stats.filesScanned).toFixed(1)}  \n\n`;

	// Overview metrics
	const tokenAdoption =
		stats.colorStats.total > 0
			? ((stats.colorStats.oklch / stats.colorStats.total) * 100).toFixed(0)
			: 0;
	const responsiveCoverage = ((stats.filesWithResponsive / stats.filesScanned) * 100).toFixed(0);

	md += `## 📊 Quick Health Metrics\n\n`;
	md += `| Metric | Value | Status |\n`;
	md += `|--------|-------|--------|\n`;
	md += `| OKLCH Token Adoption | ${tokenAdoption}% | ${tokenAdoption > 80 ? '✅' : tokenAdoption > 50 ? '⚠️' : '❌'} |\n`;
	md += `| Responsive Coverage | ${responsiveCoverage}% | ${responsiveCoverage > 70 ? '✅' : responsiveCoverage > 40 ? '⚠️' : '❌'} |\n`;
	md += `| Files with Responsive | ${stats.filesWithResponsive}/${stats.filesScanned} | ${stats.filesWithResponsive > stats.filesScanned / 2 ? '✅' : '⚠️'} |\n\n`;

	// Class usage by category
	md += `## 📚 Class Usage by Category\n\n`;
	md += `| Category | Total | Percentage |\n`;
	md += `|----------|-------|------------|\n`;

	const sortedCategories = Object.entries(stats.byCategory).sort((a, b) => b[1] - a[1]);
	sortedCategories.forEach(([cat, count]) => {
		const pct = ((count / stats.totalClasses) * 100).toFixed(1);
		md += `| ${cat.charAt(0).toUpperCase() + cat.slice(1)} | ${count} | ${pct}% |\n`;
	});
	md += `\n`;

	// Show example classes for each category
	md += `### Classes by Category\n\n`;
	sortedCategories.slice(0, 10).forEach(([cat, count]) => {
		const classes = stats.classesByCategory[cat];
		if (classes && classes.size > 0) {
			const sortedClasses = Array.from(classes)
				.sort()
				.slice(0, 12);
			const categoryName = cat.charAt(0).toUpperCase() + cat.slice(1);
			md += `**${categoryName}** (${count}) — \`${sortedClasses.join('`, `')}\`${classes.size > 12 ? ` (+${classes.size - 12} more)` : ''}\n\n`;
		}
	});
	md += `\n`;

	// Top utilities
	md += `## 🏆 Most Used Utilities (Top 20)\n\n`;
	md += `| Rank | Class | Usage | Category |\n`;
	md += `|------|-------|-------|----------|\n`;

	topPatterns.slice(0, 20).forEach(([className, count], idx) => {
		const category = categorizeClass(className);
		md += `| ${idx + 1} | \`${className}\` | ${count} | ${category} |\n`;
	});
	md += `\n`;

	// Color analysis
	md += `## 🎨 Color Token Analysis\n\n`;
	md += `| Metric | Value | Status |\n`;
	md += `|--------|-------|--------|\n`;
	md += `| OKLCH Token Usage | ${stats.colorStats.oklch} | ${stats.colorStats.oklch > 0 ? '✅' : '❌'} |\n`;
	md += `| Raw Hex/Other Colors | ${stats.colorStats.hex} | ${stats.colorStats.hex === 0 ? '✅' : '⚠️'} |\n`;
	md += `| Token Adoption Rate | ${tokenAdoption}% | ${tokenAdoption > 80 ? '✅' : '⚠️'} |\n`;
	md += `| Unused Tokens | ${unusedTokens.length} | ${unusedTokens.length === 0 ? '✅' : 'ℹ️'} |\n\n`;

	// Show color classes by family with visual marks
	if (Object.keys(stats.colorStats.classesByFamily).length > 0) {
		md += `### Color Classes in Use\n\n`;

		COLOR_FAMILIES.forEach((family) => {
			const classes = stats.colorStats.classesByFamily[family];
			if (classes && classes.size > 0) {
				const sortedClasses = Array.from(classes).sort();

				// Calculate total usage count for this family
				let familyCount = 0;
				Object.entries(stats.colorStats.rampUsage).forEach(([ramp, count]) => {
					if (ramp.startsWith(`${family}-`)) {
						familyCount += count;
					}
				});

				md += `**:mark{${family}}[${family} (${familyCount})]** — `;

				// Group by prefix (bg-, text-, border-, etc.)
				const byPrefix = {};
				sortedClasses.forEach((cls) => {
					const prefix = cls.match(/^(bg|text|border|ring|from|via|to)-/)?.[1] || 'other';
					if (!byPrefix[prefix]) byPrefix[prefix] = [];
					byPrefix[prefix].push(cls);
				});

				const examples = [];
				Object.entries(byPrefix).forEach(([prefix, classList]) => {
					examples.push(`\`${classList.slice(0, 3).join('`, `')}\`${classList.length > 3 ? ` (+${classList.length - 3})` : ''}`);
				});

				md += examples.join(', ') + '\n\n';
			}
		});
	}

	if (unusedTokens.length > 0) {
		md += `### Unused Color Tokens\n\n`;
		unusedTokens.slice(0, 10).forEach((token) => {
			md += `- \`${token}\`\n`;
		});
		if (unusedTokens.length > 10) {
			md += `- *...and ${unusedTokens.length - 10} more*\n`;
		}
		md += `\n`;
	}

	// Responsive patterns
	md += `## 📱 Responsive Design Coverage\n\n`;
	md += `| Breakpoint | Usage Count | Files |\n`;
	md += `|------------|-------------|-------|\n`;

	BREAKPOINTS.forEach((bp) => {
		const count = stats.breakpoints[bp] || 0;
		md += `| \`${bp}:\` | ${count} | - |\n`;
	});
	md += `\n`;
	md += `**Components with responsive variants:** ${stats.filesWithResponsive}  \n`;
	md += `**Components without responsive variants:** ${stats.filesWithoutResponsive}  \n\n`;

	// Variant usage
	if (Object.keys(stats.variants).length > 0) {
		md += `## 🎭 Variant Usage\n\n`;
		md += `| Variant | Count |\n`;
		md += `|---------|-------|\n`;

		Object.entries(stats.variants)
			.sort((a, b) => b[1] - a[1])
			.forEach(([variant, count]) => {
				md += `| \`${variant}:\` | ${count} |\n`;
			});
		md += `\n`;
	}

	// Component complexity
	md += `## 🧩 Component Complexity\n\n`;
	md += `| Complexity | Count | Percentage |\n`;
	md += `|------------|-------|------------|\n`;
	md += `| Low (<20) | ${stats.complexity.low} | ${((stats.complexity.low / stats.filesScanned) * 100).toFixed(0)}% |\n`;
	md += `| Medium (20-50) | ${stats.complexity.medium} | ${((stats.complexity.medium / stats.filesScanned) * 100).toFixed(0)}% |\n`;
	md += `| High (>50) | ${stats.complexity.high} | ${((stats.complexity.high / stats.filesScanned) * 100).toFixed(0)}% |\n\n`;

	// File types
	md += `## 📁 Analysis by File Type\n\n`;
	md += `| Type | Files | Avg Classes | Total Classes |\n`;
	md += `|------|-------|-------------|---------------|\n`;

	Object.entries(stats.fileTypes)
		.sort((a, b) => b[1].totalClasses - a[1].totalClasses)
		.forEach(([type, data]) => {
			md += `| ${type.charAt(0).toUpperCase() + type.slice(1)} | ${data.count} | ${data.avgClasses} | ${data.totalClasses} |\n`;
		});
	md += `\n`;

	// High complexity components
	const highComplexity = results
		.filter((r) => r.complexity === 'high')
		.sort((a, b) => b.complexityScore - a.complexityScore)
		.slice(0, 10);

	if (highComplexity.length > 0) {
		md += `## ⚠️ High Complexity Components\n\n`;
		md += `| File | Classes | Score | Issues |\n`;
		md += `|------|---------|-------|--------|\n`;

		highComplexity.forEach((result) => {
			const fileName = path.basename(result.file, '.svelte');
			const issues = [];
			if (result.hasInlineStyles) issues.push('inline styles');
			if (Object.keys(result.breakpoints).length === 0) issues.push('no responsive');
			const issueStr = issues.length > 0 ? issues.join(', ') : '-';
			md += `| \`${fileName}\` | ${result.totalClasses} | ${result.complexityScore} | ${issueStr} |\n`;
		});
		md += `\n`;
	}

	// Recommendations
	md += `## 💡 Recommendations\n\n`;

	// High priority
	if (stats.colorStats.hex > 0) {
		md += `### 🔴 High Priority\n\n`;
		md += `**Replace ${stats.colorStats.hex} non-token color usages with OKLCH tokens**\n`;
		md += `- Impact: Brand consistency, easier theming\n`;
		md += `- Action: Update classes to use design tokens from app.css\n\n`;
	}

	if (stats.filesWithoutResponsive > 0) {
		md += `**Add responsive variants to ${stats.filesWithoutResponsive} components**\n`;
		md += `- Impact: Better mobile experience\n`;
		md += `- Action: Add \`md:\` and \`lg:\` breakpoints where appropriate\n\n`;
	}

	// Medium priority
	if (unusedTokens.length > 5) {
		md += `### 🟡 Medium Priority\n\n`;
		md += `**Remove ${unusedTokens.length} unused color tokens**\n`;
		md += `- Impact: Smaller CSS bundle\n`;
		md += `- Action: Delete unused tokens from app.css @theme section\n\n`;
	}

	if (stats.complexity.high > stats.filesScanned * 0.2) {
		md += `**Refactor ${stats.complexity.high} high-complexity components**\n`;
		md += `- Impact: Maintainability and readability\n`;
		md += `- Action: Extract repeated patterns into utility components\n\n`;
	}

	// Footer
	md += `---\n`;
	md += `*Report generated by VizChitra Tailwind Audit*  \n`;
	md += `*Run: \`pnpm audit:tailwind\`*\n`;

	return md;
}

function main() {
	console.log('🔍 VizChitra Tailwind CSS Audit Starting...\n');

	// Parse OKLCH tokens
	const cssPath = path.join(projectRoot, 'src', 'app.css');
	console.log('📖 Parsing OKLCH tokens from app.css...');
	const oklchTokens = parseOKLCHTokens(cssPath);
	console.log(`   Found tokens for ${Object.keys(oklchTokens).length} color families\n`);

	// Find Svelte files
	const svelteFiles = findSvelteFiles(path.join(projectRoot, 'src'));
	console.log(`📂 Found ${svelteFiles.length} Svelte files\n`);

	// Analyze each file
	console.log('🔬 Analyzing files...');
	const results = svelteFiles.map((file) => analyzeFile(file, oklchTokens));
	console.log(`   ✅ Analysis complete\n`);

	// Generate report
	console.log('📝 Generating markdown report...');
	const report = generateReport(results, oklchTokens);

	// Write to studio folder
	const outputPath = path.join(projectRoot, 'studio', 'tailwindaudit.md');
	fs.writeFileSync(outputPath, report);
	console.log(`   ✅ Report saved: ${outputPath}\n`);

	// Summary
	const totalClasses = results.reduce((sum, r) => sum + r.totalClasses, 0);
	const uniqueClasses = new Set();
	results.forEach((r) => r.classes.forEach((c) => uniqueClasses.add(c.class)));

	console.log('📊 Audit Summary:');
	console.log(`   Files scanned: ${results.length}`);
	console.log(`   Total classes: ${totalClasses}`);
	console.log(`   Unique classes: ${uniqueClasses.size}`);
	console.log(`   Avg per file: ${(totalClasses / results.length).toFixed(1)}`);

	console.log('\n✨ Tailwind CSS audit complete!\n');
	process.exit(0);
}

main();
