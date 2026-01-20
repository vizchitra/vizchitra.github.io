#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BUILD_DIR = path.join(process.cwd(), 'build');
const AUDIT_DIR = path.join(process.cwd(), 'audit');

async function findHtmlFiles(dir) {
  const out = [];
  async function recurse(d) {
    const entries = await fs.readdir(d, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) await recurse(full);
      else if (e.isFile() && e.name.endsWith('.html')) out.push(full);
    }
  }
  try { await recurse(dir); } catch { }
  return out;
}

function extractAttributes(tag) {
  const attrs = {};
  for (const m of tag.matchAll(/(\w+)=["']([^"']+)["']/g)) {
    attrs[m[1].toLowerCase()] = m[2];
  }
  return attrs;
}

function extractAssetsFromHtml(htmlText) {
  const assets = { css: [], js: [] };
  for (const tag of htmlText.matchAll(/<link\b[^>]*>/g)) {
    const t = tag[0];
    const attrs = extractAttributes(t);
    if (attrs.rel && attrs.rel.toLowerCase().includes('stylesheet') && attrs.href) assets.css.push(attrs.href);
    if (attrs.rel && attrs.rel.toLowerCase().includes('modulepreload') && attrs.href) assets.js.push(attrs.href);
  }
  for (const m of htmlText.matchAll(/<script[^>]+src=["']([^"']+)["']/g)) assets.js.push(m[1]);
  return assets;
}

function normalizeUrlPath(url) {
  let p = url.split('?')[0].split('#')[0];
  if (p.startsWith('./')) p = p.slice(2);
  return p;
}

function resolveAssetPathForHtml(relHtmlPath, urlPath) {
  const cleaned = normalizeUrlPath(urlPath);
  if (cleaned.startsWith('/')) {
    return path.join(BUILD_DIR, cleaned.slice(1));
  }
  if (cleaned.startsWith('app/')) return path.join(BUILD_DIR, cleaned);
  const htmlDir = path.dirname(path.join(BUILD_DIR, relHtmlPath));
  return path.normalize(path.join(htmlDir, cleaned));
}

async function statIfExists(p) {
  try { const s = await fs.stat(p); return s.size; } catch { return null; }
}

async function main() {
  const htmlFiles = await findHtmlFiles(BUILD_DIR);
  const pages = [];

  for (const file of htmlFiles) {
    const text = await fs.readFile(file, 'utf8');
    const rel = path.relative(BUILD_DIR, file).replace(/\\\\/g, '/');
    const assets = extractAssetsFromHtml(text);
    let cssTotal = 0; let jsTotal = 0;
    for (const css of assets.css) {
      const ap = resolveAssetPathForHtml(rel, css);
      const size = await statIfExists(ap);
      if (size) cssTotal += size;
    }
    for (const js of assets.js) {
      const ap = resolveAssetPathForHtml(rel, js);
      const size = await statIfExists(ap);
      if (size) jsTotal += size;
    }
    const cssKb = Math.round(cssTotal / 1024);
    const jsKb = Math.round(jsTotal / 1024);
    const totalKb = Math.round((cssTotal + jsTotal) / 1024);
    pages.push({ page: rel, css_kb: cssKb, js_kb: jsKb, total_kb: totalKb });
  }

  try { await fs.mkdir(AUDIT_DIR, { recursive: true }); } catch { }
  const summaryMd = path.join(AUDIT_DIR, 'assets.md');

  let md = `# Build Assets Summary\n\nGenerated: ${new Date().toLocaleString()}\n\n`;
  if (pages.length === 0) {
    md += '_No pages found._\n';
  } else {
    const pageColWidth = Math.max('Page'.length, ...pages.map(p => p.page.length));
    const cssColWidth = Math.max('CSS (KB)'.length, ...pages.map(p => String(p.css_kb).length));
    const jsColWidth = Math.max('JS (KB)'.length, ...pages.map(p => String(p.js_kb).length));
    const totalColWidth = Math.max('Total (KB)'.length, ...pages.map(p => String(p.total_kb).length));

    const padRight = (s, w) => s + ' '.repeat(w - String(s).length);
    const padLeft = (s, w) => ' '.repeat(w - String(s).length) + s;

    md += `| ${padRight('Page', pageColWidth)} | ${padRight('CSS (KB)', cssColWidth)} | ${padRight('JS (KB)', jsColWidth)} | ${padRight('Total (KB)', totalColWidth)} |\n`;
    md += `| ${':' + '-'.repeat(pageColWidth - 1)} | ${'-'.repeat(cssColWidth - 1) + ':'} | ${'-'.repeat(jsColWidth - 1) + ':'} | ${'-'.repeat(totalColWidth - 1) + ':'} |\n`;

    for (const p of pages.sort((a, b) => b.total_kb - a.total_kb)) {
      md += `| ${padRight(p.page, pageColWidth)} | ${padLeft(p.css_kb, cssColWidth)} | ${padLeft(p.js_kb, jsColWidth)} | ${padLeft(p.total_kb, totalColWidth)} |\n`;
    }
  }

  await fs.writeFile(summaryMd, md, 'utf8');
  console.log('Wrote audit summary:', summaryMd);
}

if (process.argv[1] && process.argv[1].endsWith('assets.js')) main();
