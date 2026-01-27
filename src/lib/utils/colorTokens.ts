/**
 * Centralized color token system for VizChitra components.
 * Maps color names to Tailwind utility classes.
 */

export type Color = 'pink' | 'blue' | 'yellow' | 'teal' | 'orange';

export interface ColorTokens {
	text: string;
	textLight: string;
	border: string;
	borderLight: string;
	bg: string;
	bgLight: string;
	bgLightAlpha: string;
}

export const colorTokens: Record<Color, ColorTokens> = {
	pink: {
		text: 'text-pink-dark',
		textLight: 'text-pink-light',
		border: 'border-pink-dark',
		borderLight: 'border-pink-light',
		bg: 'bg-pink-dark',
		bgLight: 'bg-pink-light',
		bgLightAlpha: 'bg-pink-light/30'
	},
	blue: {
		text: 'text-blue-dark',
		textLight: 'text-blue-light',
		border: 'border-blue-dark',
		borderLight: 'border-blue-light',
		bg: 'bg-blue-dark',
		bgLight: 'bg-blue-light',
		bgLightAlpha: 'bg-blue-light/30'
	},
	yellow: {
		text: 'text-yellow-dark',
		textLight: 'text-yellow-light',
		border: 'border-yellow-dark',
		borderLight: 'border-yellow-light',
		bg: 'bg-yellow-dark',
		bgLight: 'bg-yellow-light',
		bgLightAlpha: 'bg-yellow-light/30'
	},
	teal: {
		text: 'text-teal-dark',
		textLight: 'text-teal-light',
		border: 'border-teal-dark',
		borderLight: 'border-teal-light',
		bg: 'bg-teal-dark',
		bgLight: 'bg-teal-light',
		bgLightAlpha: 'bg-teal-light/30'
	},
	orange: {
		text: 'text-orange-dark',
		textLight: 'text-orange-light',
		border: 'border-orange-dark',
		borderLight: 'border-orange-light',
		bg: 'bg-orange-dark',
		bgLight: 'bg-orange-light',
		bgLightAlpha: 'bg-orange-light/30'
	}
};

/**
 * Get color tokens with fallback to a default color.
 */
export function getColorTokens(color: Color | undefined, fallback: Color = 'pink'): ColorTokens {
	return colorTokens[color ?? fallback] ?? colorTokens[fallback];
}

/**
 * All available colors as an array (useful for iteration/validation).
 */
export const colors: Color[] = ['pink', 'blue', 'yellow', 'teal', 'orange'];

/**
 * Type guard to check if a string is a valid Color.
 */
export function isValidColor(value: string): value is Color {
	return colors.includes(value as Color);
}
