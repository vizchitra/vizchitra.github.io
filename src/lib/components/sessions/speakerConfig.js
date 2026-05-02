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
	'Adolfo Arranz': { x: 9, y: 5, scale: 0.9, order: 1 },
	'Prasanta Kumar Dutta': { x: 5, y: 5, scale: 1, order: 2 },
	'Kenneth Dsouza': { x: 15, y: 2, scale: 1, order: 3 },
	'Schubert de Abreu': { x: 12, y: 2, scale: 0.95, order: 4 },
	'Priti Pandurangan': { x: 10, y: -7, scale: 0.96, order: 5 },
	'Prakriti Bakshi': { x: 5, y: 10, scale: 0.95, order: 6 },
	'Areena Arora': { x: 10, y: -20, scale: 1.1, order: 7 }
};

/**
 * @param {string | undefined} name
 * @returns {string}
 */
export function buildSpeakerImageTransform(name) {
	const t = (name && speakerImageTransforms[name]) || {};
	const tx = t.x ?? 0;
	const ty = t.y ?? 0;
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
