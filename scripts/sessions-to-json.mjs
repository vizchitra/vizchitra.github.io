/**
 * One-time migration: convert content/2026/data/2026-sessions.csv → content/2026/data/sessions.json
 *
 * Run: node scripts/sessions-to-json.mjs
 *
 * The generated JSON is the source-of-truth going forward.
 * The CSV file can be removed once confirmed correct.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import Papa from 'papaparse';

const __dir = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dir, '..');

function generateSlug(title, index) {
  const slugified = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  return `${slugified}-${index}`;
}

const csv = readFileSync(resolve(root, 'content/2026/data/2026-sessions.csv'), 'utf-8');

const { data } = Papa.parse(csv, {
  header: true,
  skipEmptyLines: true,
  transformHeader: (h) => h.trim().replace(/\n/g, '')
});

const sessions = data.map((row, i) => {
  const sessionType = row['session_type']?.trim() ?? '';
  const title = row['title']?.trim() ?? '';
  const speakerName = row['speaker_name']?.trim() ?? '';
  const display = row['display']?.trim().toLowerCase() === 'true';
  const tbd = (!title && !speakerName) || !display;
  const slug = tbd ? '' : generateSlug(title, String(i));

  return {
    slug,
    sessionType,
    date: row['date']?.trim() ?? '',
    time: row['time']?.trim() ?? '',
    venue: row['venue']?.trim() ?? '',
    title,
    subtitle: row['subtitle']?.trim() ?? '',
    shortDescription: row['short_description']?.trim() ?? '',
    longDescription: row['long_description']?.trim() ?? '',
    speakerName,
    designation: row['designation']?.trim() ?? '',
    organisation: row['organisation']?.trim() ?? '',
    speakerAbout: row['speaker_about']?.trim() ?? '',
    speakerImage: row['speaker_image']?.trim() ?? '',
    display
  };
});

const out = resolve(root, 'content/2026/data/sessions.json');
writeFileSync(out, JSON.stringify(sessions, null, 2) + '\n');
console.log(`✓ Wrote ${sessions.length} sessions → content/2026/data/sessions.json`);
