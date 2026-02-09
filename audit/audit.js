#!/usr/bin/env node

/**
 * VizChitra CSS Audit
 * 
 * Simplified CSS audit that scans all Svelte components and generates
 * a markdown report with issues categorized by type.
 * 
 * Usage: node audit/audit.js
 * Output: audit/audit-report.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Issue categories
const ISSUE_CATEGORIES = {
  COLORS: {
    name: 'Color Issues',
    icon: '🎨',
    description: 'Raw hex colors that should use design tokens'
  },
  SPACING: {
    name: 'Spacing Issues',
    icon: '📏',
    description: 'Non-standard spacing values outside Tailwind scale'
  },
  STYLES: {
    name: 'Style Issues',
    icon: '💄',
    description: 'Inline styles that should use Tailwind utilities'
  },
  CLASSES: {
    name: 'Class Issues',
    icon: '🏷️',
    description: 'Arbitrary values in class attributes'
  }
};

// Patterns
const HEX_PATTERN = /#([a-fA-F0-9]{3}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})(?![a-fA-F0-9])/g;
const STYLE_ATTR_PATTERN = /style="([^"]*)"/g;
const CLASS_ATTR_PATTERN = /class="([^"]*)"|class=\{`([^`]*)`\}|class=\{([^}]*)\}/g;
const ARBITRARY_HEX_PATTERN = /\[#[0-9a-fA-F]{3,8}\]/g;
const SPACING_PATTERN = /[pm][xytblr]?-(\d+)/g;

// Standard Tailwind spacing scale
const TAILWIND_SPACING = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96];

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

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(projectRoot, filePath);
  const issues = {
    COLORS: [],
    SPACING: [],
    STYLES: [],
    CLASSES: []
  };

  // Find raw hex colors
  let match;
  const hexColors = new Set();
  while ((match = HEX_PATTERN.exec(content)) !== null) {
    // Skip if this is part of Svelte syntax like {#each}
    const beforeMatch = content.substring(Math.max(0, match.index - 2), match.index);
    if (beforeMatch.includes('{') || match[0] === '#000' || match[0] === '#fff') {
      continue;
    }
    hexColors.add(match[0]);
  }
  if (hexColors.size > 0) {
    issues.COLORS.push({
      type: 'Raw hex colors',
      details: Array.from(hexColors).join(', '),
      count: hexColors.size
    });
  }

  // Find inline styles
  const styleMatches = [];
  while ((match = STYLE_ATTR_PATTERN.exec(content)) !== null) {
    styleMatches.push(match[1]);
  }
  if (styleMatches.length > 0) {
    issues.STYLES.push({
      type: 'Inline styles',
      details: `${styleMatches.length} occurrence(s)`,
      count: styleMatches.length
    });
  }

  // Find arbitrary hex in classes
  const arbitraryHex = [];
  while ((match = ARBITRARY_HEX_PATTERN.exec(content)) !== null) {
    arbitraryHex.push(match[0]);
  }
  if (arbitraryHex.length > 0) {
    issues.CLASSES.push({
      type: 'Arbitrary hex values',
      details: [...new Set(arbitraryHex)].join(', '),
      count: arbitraryHex.length
    });
  }

  // Find non-standard spacing
  const nonStandardSpacing = [];
  while ((match = SPACING_PATTERN.exec(content)) !== null) {
    const value = parseInt(match[1]);
    if (!TAILWIND_SPACING.includes(value)) {
      nonStandardSpacing.push(`${match[0].split('-')[0]}-${value}`);
    }
  }
  if (nonStandardSpacing.length > 0) {
    issues.SPACING.push({
      type: 'Non-standard spacing',
      details: [...new Set(nonStandardSpacing)].join(', '),
      count: nonStandardSpacing.length
    });
  }

  return {
    file: relativePath,
    issues: issues,
    hasIssues: Object.values(issues).some(categoryIssues => categoryIssues.length > 0)
  };
}

function generateMarkdownReport(results, summary) {
  const timestamp = new Date().toISOString().split('T')[0];

  // Add frontmatter for studio content collection
  let markdown = `---\n`;
  markdown += `title: CSS Audit Report\n`;
  markdown += `description: Automated scan for CSS issues across Svelte components\n`;
  markdown += `category: audit\n`;
  markdown += `generated: true\n`;
  markdown += `draft: false\n`;
  markdown += `order: 1\n`;
  markdown += `---\n\n`;

  markdown += `# CSS Audit Report\n\n`;
  markdown += `**Generated:** ${timestamp}  \n`;
  markdown += `**Files scanned:** ${summary.totalFiles}  \n`;
  markdown += `**Files with issues:** ${summary.filesWithIssues}  \n\n`;

  // Summary by category as table
  markdown += `## 📊 Summary by Category\n\n`;
  markdown += `| Category | Icon | Count | Description |\n`;
  markdown += `|----------|------|-------|-------------|\n`;
  for (const [category, info] of Object.entries(ISSUE_CATEGORIES)) {
    const count = summary.categories[category] || 0;
    const status = count === 0 ? '✅' : '⚠️';
    markdown += `| ${status} **${info.name}** | ${info.icon} | ${count} | ${info.description} |\n`;
  }

  // File type analysis as table
  const fileTypes = {};
  results.forEach(result => {
    const type = getFileType(result.file);
    if (!fileTypes[type]) fileTypes[type] = { total: 0, withIssues: 0 };
    fileTypes[type].total++;
    if (result.hasIssues) fileTypes[type].withIssues++;
  });

  markdown += `\n## 📁 Issues by File Type\n\n`;
  markdown += `| File Type | Issues/Total | Percentage |\n`;
  markdown += `|-----------|--------------|------------|\n`;
  for (const [type, stats] of Object.entries(fileTypes)) {
    const percentage = Math.round((stats.withIssues / stats.total) * 100);
    markdown += `| ${type} | ${stats.withIssues}/${stats.total} | ${percentage}% |\n`;
  }

  // Group results by Components vs Routes
  const componentResults = results.filter(r => r.file.includes('/components/') && r.hasIssues);
  const routeResults = results.filter(r => r.file.includes('/routes/') && r.hasIssues);
  const otherResults = results.filter(r => !r.file.includes('/components/') && !r.file.includes('/routes/') && r.hasIssues);

  // Components section
  if (componentResults.length > 0) {
    markdown += `\n## 🧩 Components Issues\n\n`;

    for (const [category, info] of Object.entries(ISSUE_CATEGORIES)) {
      const categoryComponentResults = componentResults.filter(r => r.issues[category].length > 0);
      if (categoryComponentResults.length === 0) continue;

      markdown += `### ${info.icon} ${info.name} - Components\n\n`;
      markdown += `| Component | Issue |\n`;
      markdown += `|-----------|-------|\n`;

      categoryComponentResults.forEach(result => {
        const componentName = path.basename(result.file, '.svelte');
        result.issues[category].forEach(issue => {
          markdown += `| \`${componentName}\` | ${issue.details} |\n`;
        });
      });
      markdown += '\n';
    }
  }

  // Routes section
  if (routeResults.length > 0) {
    markdown += `\n## 🛣️ Routes Issues\n\n`;

    for (const [category, info] of Object.entries(ISSUE_CATEGORIES)) {
      const categoryRouteResults = routeResults.filter(r => r.issues[category].length > 0);
      if (categoryRouteResults.length === 0) continue;

      markdown += `### ${info.icon} ${info.name} - Routes\n\n`;
      markdown += `| Route | Issue |\n`;
      markdown += `|-------|-------|\n`;

      categoryRouteResults.forEach(result => {
        const routeName = result.file.replace('src/routes/', '').replace('/+page.svelte', '').replace('/+layout.svelte', ' (layout)') || 'index';
        result.issues[category].forEach(issue => {
          markdown += `| \`${routeName}\` | ${issue.details} |\n`;
        });
      });
      markdown += '\n';
    }
  }

  // Other files section
  if (otherResults.length > 0) {
    markdown += `\n## 📄 Other Files Issues\n\n`;

    for (const [category, info] of Object.entries(ISSUE_CATEGORIES)) {
      const categoryOtherResults = otherResults.filter(r => r.issues[category].length > 0);
      if (categoryOtherResults.length === 0) continue;

      markdown += `### ${info.icon} ${info.name} - Other Files\n\n`;
      markdown += `| File | Issue |\n`;
      markdown += `|------|-------|\n`;

      categoryOtherResults.forEach(result => {
        const fileName = path.basename(result.file, '.svelte');
        result.issues[category].forEach(issue => {
          markdown += `| \`${fileName}\` | ${issue.details} |\n`;
        });
      });
      markdown += '\n';
    }
  }

  // Top issues summary
  const topIssues = [];
  results.forEach(result => {
    Object.entries(result.issues).forEach(([category, issues]) => {
      issues.forEach(issue => {
        const existing = topIssues.find(t => t.type === issue.type && t.details === issue.details);
        if (existing) {
          existing.files.push(result.file);
        } else {
          topIssues.push({
            category,
            type: issue.type,
            details: issue.details,
            files: [result.file]
          });
        }
      });
    });
  });

  if (topIssues.length > 0) {
    markdown += `\n## 🔥 Most Common Issues\n\n`;
    markdown += `| Issue | Type | Files Affected |\n`;
    markdown += `|-------|------|----------------|\n`;
    topIssues
      .sort((a, b) => b.files.length - a.files.length)
      .slice(0, 10)
      .forEach(issue => {
        const categoryIcon = ISSUE_CATEGORIES[issue.category].icon;
        markdown += `| ${categoryIcon} \`${issue.details}\` | ${issue.type} | ${issue.files.length} |\n`;
      });
  }

  markdown += `\n---\n*Report generated by VizChitra CSS Audit*\n`;

  return markdown;
}

function getFileType(filePath) {
  if (filePath.includes('/components/interface/')) return 'Interface Components';
  if (filePath.includes('/components/sections/')) return 'Section Components';
  if (filePath.includes('/components/structure/')) return 'Structure Components';
  if (filePath.includes('/components/typography/')) return 'Typography Components';
  if (filePath.includes('/components/')) return 'Other Components';
  if (filePath.includes('/routes/')) return 'Route Pages';
  return 'Other Files';
}

function main() {
  console.log('🔍 VizChitra CSS Audit Starting...\n');

  const svelteFiles = findSvelteFiles(path.join(projectRoot, 'src'));
  console.log(`Found ${svelteFiles.length} Svelte files`);

  const results = [];
  const summary = {
    totalFiles: svelteFiles.length,
    filesWithIssues: 0,
    categories: {}
  };

  // Initialize category counts
  Object.keys(ISSUE_CATEGORIES).forEach(cat => {
    summary.categories[cat] = 0;
  });

  // Analyze each file
  svelteFiles.forEach(file => {
    const analysis = analyzeFile(file);
    results.push(analysis);

    if (analysis.hasIssues) {
      summary.filesWithIssues++;
    }

    // Count issues by category
    Object.entries(analysis.issues).forEach(([category, issues]) => {
      if (issues.length > 0) {
        summary.categories[category]++;
      }
    });
  });

  // Generate report
  const report = generateMarkdownReport(results, summary);
  // Output to studio folder with single-word filename (no hyphens)
  const outputPath = path.join(projectRoot, 'studio', 'cssaudit.md');
  fs.writeFileSync(outputPath, report);

  // Console summary
  console.log('\n📊 Audit Summary:');
  console.log(`   Files scanned: ${summary.totalFiles}`);
  console.log(`   Files with issues: ${summary.filesWithIssues}`);
  console.log('\n📋 Issues by category:');

  Object.entries(ISSUE_CATEGORIES).forEach(([category, info]) => {
    const count = summary.categories[category];
    const status = count === 0 ? '✅' : '⚠️';
    console.log(`   ${status} ${info.name}: ${count}`);
  });

  console.log(`\n📄 Report saved: ${outputPath}`);

  // Exit with appropriate code
  process.exit(summary.filesWithIssues > 0 ? 1 : 0);
}

main();