#!/usr/bin/env node
import { ESLint } from 'eslint';
import fs from 'fs/promises';
import path from 'path';

const AUDIT_DIR = path.join(process.cwd(), 'audit');
const LINT_MD = path.join(AUDIT_DIR, 'lint.md');

function classifyFromMessage(message) {
  if (!message) return null;
  const m = message.match(/\[([^\]]+)\]/);
  if (!m) return null;
  const token = m[1].toUpperCase();
  if (token === 'ACCESSIBILITY') return 'A11Y';
  if (token === 'A11Y') return 'A11Y';
  return token;
}

function shortPathForDisplay(file) {
  // Expect file is relative path like 'src/lib/components/...'
  if (file.startsWith('src/lib/components/')) return file.slice('src/lib/components/'.length);
  if (file.startsWith('content/')) return file.slice('content/'.length);
  return file;
}

async function main() {
  try {
    console.log('🔍 Running ESLint via Node API...');
    const eslint = new ESLint({});
    const patterns = ['src/**/*.{js,svelte}', 'content/**/*.md'];
    const results = await eslint.lintFiles(patterns);

    // fallback mapping removed — rely on bracketed tokens only

    const files = [];
    let totalErrors = 0;
    let totalWarnings = 0;

    for (const res of results) {
      const filePath = res.filePath;
      if (!res.messages || !res.messages.length) continue;
      const rel = path.relative(process.cwd(), filePath).replace(/\\\\/g, '/');
      const fileEntry = { file: rel, errors: 0, warnings: 0, total: 0, categories: {} };
      for (const msg of res.messages) {
        const sev = msg.severity === 2 ? 'error' : 'warning';
        if (sev === 'error') { fileEntry.errors++; totalErrors++; } else { fileEntry.warnings++; totalWarnings++; }
        const category = classifyFromMessage(msg.message) || 'OTHER';
        fileEntry.total = fileEntry.errors + fileEntry.warnings;
        fileEntry.categories[category] = (fileEntry.categories[category] || 0) + 1;
      }
      files.push(fileEntry);
    }

    await fs.mkdir(AUDIT_DIR, { recursive: true });

    // Build separate groups
    const contentFiles = files.filter(f => f.file.startsWith('content/'));
    const componentFiles = files.filter(f => f.file.startsWith('src/lib/components/'));
    const restFiles = files.filter(f => !f.file.startsWith('content/') && !f.file.startsWith('src/lib/components/'));

    let md = `# Lint Summary\n\nGenerated: ${new Date().toLocaleString()}\n\n`;
    // Summary table with aligned columns
    const summaryRows = [
      ['Errors', String(totalErrors)],
      ['Warnings', String(totalWarnings)],
      ['Total', String(totalErrors + totalWarnings)],
      ['Files impacted', String(files.length)]
    ];

    const metricColWidth = Math.max('Metric'.length, ...summaryRows.map(r => r[0].length));
    const countColWidth = Math.max('Count'.length, ...summaryRows.map(r => r[1].length));
    const padRight = (s, w) => s + ' '.repeat(w - s.length);
    const padLeft = (s, w) => ' '.repeat(w - s.length) + s;

    md += `## Summary\n\n`;
    md += `| ${padRight('Metric', metricColWidth)} | ${padRight('Count', countColWidth)} |\n`;
    md += `| ${'-'.repeat(metricColWidth)} | ${'-'.repeat(countColWidth)}:|\n`;
    for (const r of summaryRows) {
      md += `| ${padRight(r[0], metricColWidth)} | ${padLeft(r[1], countColWidth)} |\n`;
    }
    md += `\n`;

    const renderCategoryTable = (title, list) => {
      md += `### ${title}\n\n`;
      if (!list || list.length === 0) { md += '_No issues found._\n\n'; return; }

      // collect categories present in this list
      const categorySet = new Set();
      for (const f of list) Object.keys(f.categories).forEach(c => categorySet.add(c));
      const preferred = ['LAYOUT', 'SPACING', 'QUALITY', 'A11Y', 'IMPORT', 'OTHER'];
      const others = [...categorySet].filter(c => !preferred.includes(c)).sort();
      const categories = [...preferred.filter(c => categorySet.has(c)), ...others];

      // columns: File, ...categories, Total
      const rows = list.sort((a, b) => b.total - a.total).map(f => {
        const row = { File: shortPathForDisplay(f.file) };
        for (const c of categories) row[c] = f.categories[c] || 0;
        row.Total = f.total;
        return row;
      });

      // compute column widths for aligned markdown
      const cols = ['File', ...categories, 'Total'];
      const widths = {};
      for (const col of cols) {
        widths[col] = Math.max(col.length, ...rows.map(r => String(r[col]).length));
      }

      const pad = (s, w, right = false) => {
        s = String(s);
        return right ? ' '.repeat(w - s.length) + s : s + ' '.repeat(w - s.length);
      };

      // header
      md += `| ${cols.map(c => pad(c, widths[c])).join(' | ')} |\n`;
      // separator: left align File, right align numbers
      md += `| ${cols.map(c => c === 'File' ? ':' + '-'.repeat(widths[c] - 1) : '-'.repeat(widths[c] - 1) + ':').join(' | ')} |\n`;

      for (const r of rows) {
        md += `| ${cols.map(c => c === 'File' ? pad(r[c], widths[c]) : pad(r[c], widths[c], true)).join(' | ')} |\n`;
      }

      md += `\n`;
    };

    renderCategoryTable('/content', contentFiles);
    renderCategoryTable('/components', componentFiles);
    renderCategoryTable('Rest', restFiles);

    await fs.writeFile(LINT_MD, md, 'utf8');
    console.log('✅ Lint summary written to', LINT_MD);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error running lint audit:', err);
    process.exit(1);
  }
}

if (process.argv[1] && process.argv[1].endsWith('lint.js')) main();
