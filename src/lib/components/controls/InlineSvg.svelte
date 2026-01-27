<script>
	import { onMount } from 'svelte';

	/**
	 * @typedef {Object} Props
	 * @property {string} [name]
	 * @property {string|number} [width]
	 * @property {string|number} [height]
	 */

	/** @type {Props} */
	let { name = '', width = undefined, height = undefined } = $props();

	let svgHtml = $state('');

	// Eagerly import SVGs from `src/lib/assets` and set svgHtml reactively.
	// This allows SVGs to be inlined during SSR and on the client.
	const svgs = import.meta.glob('/src/lib/assets/**/*.svg', {
		query: '?raw',
		import: 'default',
		eager: true
	});

	$effect(() => {
		if (!name) {
			svgHtml = '';
			return;
		}

		const raw = String(name || '');
		const basename = raw.split('/').pop();
		const candidates = [
			basename,
			raw.replace(/^\$lib\/?/, '').replace(/^assets\/?/, ''),
			raw
				.replace(/^src\/?/, '')
				.replace(/^src\/lib\/?/, '')
				.replace(/^assets\/?/, ''),
			raw.replace(/^static\/?/, '').replace(/^images\/?/, '')
		];

		const key = Object.keys(svgs).find((p) => {
			for (const c of candidates) {
				if (!c) continue;
				if (p.endsWith(`/${c}`) || p.endsWith(`/${c}.svg`)) return true;
			}
			return false;
		});

		if (key) {
			const val = svgs[key];
			let rawSvg = typeof val === 'string' ? val : (val && val.default) || '';

			// If width/height props are provided, inject or replace them on the
			// root <svg> tag so the rendered SVG respects the requested size.
			if ((width !== undefined && width !== '') || (height !== undefined && height !== '')) {
				rawSvg = rawSvg.replace(/<svg([^>]*)>/i, (match, attrs) => {
					let newAttrs = String(attrs || '');

					if (width !== undefined && width !== '') {
						if (/\swidth=(['"]).*?\1/i.test(newAttrs)) {
							newAttrs = newAttrs.replace(/\swidth=(['"]).*?\1/i, ` width="${String(width)}"`);
						} else {
							newAttrs = `${newAttrs} width="${String(width)}"`;
						}
					}

					if (height !== undefined && height !== '') {
						if (/\sheight=(['"]).*?\1/i.test(newAttrs)) {
							newAttrs = newAttrs.replace(/\sheight=(['"]).*?\1/i, ` height="${String(height)}"`);
						} else {
							newAttrs = `${newAttrs} height="${String(height)}"`;
						}
					}

					return `<svg${newAttrs}>`;
				});
			}

			svgHtml = rawSvg;
		} else {
			svgHtml = '';
			console.warn(`InlineSvg: could not find "${name}" in src/lib/assets`);
		}
	});
</script>

{#if svgHtml}
	{@html svgHtml}
{:else}
	<!-- SVG will load on mount -->
	<span aria-hidden="true"></span>
{/if}
