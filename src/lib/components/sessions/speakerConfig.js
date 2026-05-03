/**
 * Per-speaker translate / scale tweaks for the photo on SessionCardExpanded.
 * Keyed by speaker name (matches `speaker_name` in the CSV).
 *
 * - x / y: any CSS length (e.g. '10', '-5%', 0).
 * - scale: number (1 = no scaling).
 *
 * Omit fields you don't need; defaults are no translate, scale 1.
 */

/** @type {Record<string, { x?: number; y?: number; scale?: number; order?: number }>} */
export const speakerImageTransforms = {
	'Kenneth Dsouza / Rasagy Sharma': { x: 10, y: -65, scale: 1.3, order: 1 },
	'Areena Arora': { x: 10, y: 5, scale: 1.1, order: 2 },
	'Schubert de Abreu': { x: 14, y: -25, scale: 1.1, order: 3 },
	'Priti Pandurangan': { x: 15, y: -30, scale: 0.9, order: 4 },
	'Adolfo Arranz': { x: 15, y: -30, scale: 1.2, order: 5 },
	'Prakriti Bakshi': { x: 0, y: 12, scale: 1.2, order: 6 },
	'Prasanta Kumar Dutta': { x: 15, y: -25, scale: 1.3, order: 7 },
};

/**
 * @param {string | undefined} name
 * @returns {string}
 */
export function buildSpeakerImageTransform(name, screenWidth = 1000) {
	const t = (name && speakerImageTransforms[name]) || {};
	const tx = t.x ?? 0;
	const ty = screenWidth < 768 ? (t.y ?? 0) - 6 : t.y ?? 0;
	const s = t.scale ?? 1;

	return `translate(${tx}%, ${ty}%) scale(${s})`;
}

/**
 * Sort key for ordering workshops on the listing page.
 * Speakers without an entry sort to the end (preserving CSV order).
 * @param {string | undefined} name
 * @returns {number}
 */
export function getSpeakerOrder(name) {
	const t = name ? speakerImageTransforms[name] : undefined;
	return t?.order ?? Number.POSITIVE_INFINITY;
}
