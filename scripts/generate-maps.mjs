/**
 * Downloads OSM tile grids and composites them into static map PNGs.
 * Run once: node scripts/generate-maps.mjs
 * Output: static/images/map/conference.png, static/images/map/workshop.png
 */
import { get } from 'node:https';
import { writeFileSync, mkdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { Resvg, initWasm } from '@resvg/resvg-wasm';

const require = createRequire(import.meta.url);
const wasmPath = require.resolve('@resvg/resvg-wasm/index_bg.wasm');
await initWasm(await readFile(wasmPath));

// -- tile math ---------------------------------------------------------------

function toTile(lat, lng, z) {
	const x = Math.floor(((lng + 180) / 360) * 2 ** z);
	const lr = (lat * Math.PI) / 180;
	const y = Math.floor(
		((1 - Math.log(Math.tan(lr) + 1 / Math.cos(lr)) / Math.PI) / 2) * 2 ** z
	);
	return { x, y };
}

// pixel offset of a lat/lng from the top-left corner of a tile grid
function toPixel(lat, lng, z, gridOriginTile) {
	const lr = (lat * Math.PI) / 180;
	const fracX = ((lng + 180) / 360) * 2 ** z - gridOriginTile.x;
	const fracY =
		((1 - Math.log(Math.tan(lr) + 1 / Math.cos(lr)) / Math.PI) / 2) * 2 ** z -
		gridOriginTile.y;
	return { px: Math.round(fracX * 256), py: Math.round(fracY * 256) };
}

// -- tile fetch --------------------------------------------------------------

function fetchTile(z, x, y) {
	return new Promise((resolve, reject) => {
		const url = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
		get(url, { headers: { 'User-Agent': 'VizChitra/1.0 map-generator' } }, (res) => {
			const chunks = [];
			res.on('data', (c) => chunks.push(c));
			res.on('end', () => resolve(Buffer.concat(chunks)));
			res.on('error', reject);
		}).on('error', reject);
	});
}

// -- composite ---------------------------------------------------------------

async function buildMap({ name, lat, lng, zoom, cols, rows, markers }) {
	const center = toTile(lat, lng, zoom);
	const originX = center.x - Math.floor(cols / 2);
	const originY = center.y - Math.floor(rows / 2);
	const W = cols * 256;
	const H = rows * 256;

	console.log(`Fetching ${cols * rows} tiles for ${name}…`);
	const images = [];
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			const buf = await fetchTile(zoom, originX + col, originY + row);
			images.push({ x: col * 256, y: row * 256, b64: buf.toString('base64') });
			process.stdout.write('.');
		}
	}
	console.log();

	// Marker pin SVG elements
	const pins = markers
		.map(([mlat, mlng]) => {
			const { px, py } = toPixel(mlat, mlng, zoom, { x: originX, y: originY });
			return `
    <circle cx="${px}" cy="${py + 2}" r="11" fill="#00000033"/>
    <circle cx="${px}" cy="${py}" r="11" fill="#e779a6" stroke="white" stroke-width="2.5"/>
    <circle cx="${px}" cy="${py}" r="4" fill="white"/>`;
		})
		.join('');

	const svg = `<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="${W}" height="${H}">
  ${images.map((t) => `<image x="${t.x}" y="${t.y}" width="256" height="256" href="data:image/png;base64,${t.b64}"/>`).join('\n  ')}
  ${pins}
</svg>`;

	const png = new Resvg(svg, { fitTo: { mode: 'width', value: W } }).render().asPng();
	const outPath = `static/images/map/${name}.png`;
	writeFileSync(outPath, png);
	console.log(`✓ ${outPath} (${(png.length / 1024).toFixed(0)} KB)`);
}

// -- venues ------------------------------------------------------------------

mkdirSync('static/images/map', { recursive: true });

await buildMap({
	name: 'conference',
	lat: 12.966827628489266,
	lng: 77.63523618257383,
	zoom: 15,
	cols: 4,
	rows: 3,
	markers: [[12.966827628489266, 77.63523618257383]]
});

await buildMap({
	name: 'workshop',
	lat: 12.97143,
	lng: 77.6197,
	zoom: 14,
	cols: 4,
	rows: 3,
	markers: [
		[12.97563511752492, 77.6027528238416],
		[12.967223289573266, 77.63669336178374]
	]
});

console.log('Done.');
