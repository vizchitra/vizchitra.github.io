/**
 * Color map and helpers.
 * Provide simple hex color tokens for normal, light and dark variants.
 */
export const colorMap = {
	orange: { normal: '#f89f72', light: '#fbd6c6', dark: '#b3563f' },
	yellow: { normal: '#ffd485', light: '#ffe8b8', dark: '#b3862f' },
	pink: { normal: '#ee88b3', light: '#ffd9ef', dark: '#c85a85' },
	teal: { normal: '#97e4dd', light: '#cff3ee', dark: '#58b7a8' },
	blue: { normal: '#a8bdf0', light: '#dbe6ff', dark: '#6b86d6' }
};

/**
 * Return an array of banner colors (length 8) based on baseNames.
 * Behavior: for the first three bases include normal + light; for the last two include normal only.
 */
export function getBannerColorList(baseNames = ['orange', 'yellow', 'pink', 'teal', 'blue']) {
	const out = [];
	for (let i = 0; i < baseNames.length; i++) {
		const name = baseNames[i];
		const entry = colorMap[name] || { normal: '#000000', light: '#444444', dark: '#000000' };
		if (i < 3) {
			out.push(entry.normal);
			out.push(entry.light);
		} else {
			out.push(entry.normal);
		}
	}
	return out.slice(0, 8);
}

export default getBannerColorList;

/**
 * Return a simple array of normal colors for divider components.
 */
export function getDividerColorList(baseNames = ['yellow', 'teal', 'blue', 'orange', 'pink']) {
	return baseNames.map((n) => (colorMap[n] ? colorMap[n].normal : '#000000'));
}

/**
 * Simple Fisher-Yates shuffle helper exported for reuse.
 */
export function shuffleArray(array) {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
