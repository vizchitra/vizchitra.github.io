import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { redirects } from './src/lib/config/redirects.js';
import { mdsvex } from 'mdsvex';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// Get content files for prerendering
const contentDir = path.join(process.cwd(), 'content');

function getMarkdownFiles(dir) {
	let results = [];
	const list = fs.readdirSync(dir);
	list.forEach((file) => {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);
		if (stat && stat.isDirectory()) {
			results = results.concat(getMarkdownFiles(filePath));
		} else if (file.endsWith('.md')) {
			results.push(filePath);
		}
	});
	return results;
}

const contentSlugs = getMarkdownFiles(contentDir)
	.filter((file) => {
		if (process.env.NODE_ENV === 'development') return true;
		try {
			const content = fs.readFileSync(file, 'utf-8');
			const match = content.match(/^---\n([\s\S]*?)\n---/);
			if (match) {
				const frontmatter = yaml.load(match[1]);
				return !frontmatter.draft;
			}
		} catch (e) {
			console.error(`Error parsing frontmatter for ${file}:`, e);
		}
		return true;
	})
	.map((file) => file.replace(contentDir, '').replace('.md', ''))
	.map((slug) => (slug.startsWith('/') ? slug : `/${slug}`));

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md', '.svx']
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	// compilerOptions: {
	// 	runes: true
	// },
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			precompress: false,
			strict: true
		}),
		output: {
			bundleStrategy: 'split'
		},
		appDir: 'app',
		prerender: {
			entries: ['*', ...Object.keys(redirects).map((path) => `/${path}`), ...contentSlugs]
		}
	},
	preprocess: [mdsvex(mdsvexOptions), vitePreprocess()]
};

export default config;
