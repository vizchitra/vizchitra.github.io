/**
 * Centralized color token system for VizChitra components.
 * Maps design tokens to raw values for canvas/D3.
 */

export type Color = 'yellow' | 'teal' | 'blue' | 'orange' | 'pink' | 'grey';

export interface ColorTokens {
	// Raw hex values for canvas/D3 styles
	hex: string;
	// CSS custom properties
	cssVar: string;
}

export const colorTokens: Record<Color, ColorTokens> = {
	yellow: {
		hex: '#FFD485',
		cssVar: 'var(--color-viz-yellow)'
	},
	teal: {
		hex: '#88E0D8',
		cssVar: 'var(--color-viz-teal)'
	},
	blue: {
		hex: '#9FBAFC',
		cssVar: 'var(--color-viz-blue)'
	},
	orange: {
		hex: '#FC915B',
		cssVar: 'var(--color-viz-orange)'
	},
	pink: {
		hex: '#EF75AB',
		cssVar: 'var(--color-viz-pink)'
	},
	grey: {
		hex: '#4C4C4C',
		cssVar: 'var(--color-viz-grey)'
	}
};

/**
 * Get color tokens with fallback to a default color.
 */
export function getColorTokens(color: Color | undefined, fallback: Color = 'yellow'): ColorTokens {
	return colorTokens[color ?? fallback] ?? colorTokens[fallback];
}

/**
 * Get hex color value for canvas/D3 usage.
 */
export function getColorHex(color: Color): string {
	const tokens = colorTokens[color] ?? colorTokens.yellow;
	return tokens.hex;
}

/**
 * Get CSS custom property for dynamic styling.
 */
export function getColorVar(color: Color): string {
	return colorTokens[color]?.cssVar ?? colorTokens.yellow.cssVar;
}

/**
 * All available colors as an array (useful for iteration/validation).
 */
export const colors: Color[] = ['yellow', 'teal', 'blue', 'orange', 'pink', 'grey'];

/**
 * Type guard to check if a string is a valid Color.
 */
export function isValidColor(value: string): value is Color {
	return colors.includes(value as Color);
}

/**
 * Get random color for dynamic components.
 */
export function getRandomColor(): Color {
	return colors[Math.floor(Math.random() * colors.length)];
}
