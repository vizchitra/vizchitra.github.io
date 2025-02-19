export function getLetterDistance(char) {
	const startCode = 'a'.charCodeAt(0);
	const endCode = 'z'.charCodeAt(0);
	const leftMidpointCode = 'm'.charCodeAt(0);
	const rightMidpointCode = 'n'.charCodeAt(0);

	let currentCode = char.toLowerCase().charCodeAt(0);

	let distance = 0;

	if (currentCode === leftMidpointCode || currentCode === rightMidpointCode) {
		distance = 0;
	} else if (currentCode < leftMidpointCode && currentCode >= startCode) {
		distance = currentCode - startCode;
	} else if (currentCode > rightMidpointCode && currentCode <= endCode) {
		distance = (endCode - currentCode) * -1;
	}

	return distance;
}

// returns an array of objects containing the alphabet and slant angle for each letter in `text`
export function formatSlantedText(text) {
	let characters = text.split('');
	let lettersList = [];

	characters.forEach((letter, index) => {
		let slant = getLetterDistance(letter);

		lettersList.push({ letter: letter, slant: slant });
	});

	return lettersList;
}

// Add location utilities
export const INDIA_STATE_ABBR = {
	'Andhra Pradesh': 'AP',
	'Arunachal Pradesh': 'AR',
	Assam: 'AS',
	Bihar: 'BR',
	Chhattisgarh: 'CG',
	Goa: 'GA',
	Gujarat: 'GJ',
	Haryana: 'HR',
	'Himachal Pradesh': 'HP',
	Jharkhand: 'JH',
	Karnataka: 'KA',
	Kerala: 'KL',
	'Madhya Pradesh': 'MP',
	Maharashtra: 'MH',
	Manipur: 'MN',
	Meghalaya: 'ML',
	Mizoram: 'MZ',
	Nagaland: 'NL',
	Odisha: 'OD',
	Punjab: 'PB',
	Rajasthan: 'RJ',
	Sikkim: 'SK',
	'Tamil Nadu': 'TN',
	Telangana: 'TS',
	Tripura: 'TR',
	'Uttar Pradesh': 'UP',
	Uttarakhand: 'UK',
	'West Bengal': 'WB',
	// Union Territories
	Delhi: 'DL',
	'Jammu and Kashmir': 'JK',
	Ladakh: 'LA',
	Puducherry: 'PY',
	'Andaman and Nicobar Islands': 'AN',
	Chandigarh: 'CH',
	'Dadra and Nagar Haveli and Daman and Diu': 'DN',
	Lakshadweep: 'LD'
};

export function getFlagEmoji(countryCode) {
	if (!countryCode) return null;
	return String.fromCodePoint(
		...countryCode
			.toUpperCase()
			.split('')
			.map((char) => 127397 + char.charCodeAt(0))
	);
}

export function getLocationLabel(location) {
	if (!location?.country) return '';

	// // For India, show state abbreviation
	// if (location.country === 'IN' && location.region) {
	// 	// Try to find the abbreviation for the state
	// 	for (const [stateName, abbr] of Object.entries(INDIA_STATE_ABBR)) {
	// 		if (location.region.includes(stateName)) {
	// 			return abbr;
	// 		}
	// 	}
	// 	// Fallback to first word if no abbreviation found
	// 	return location.region.split(' ')[0];
	// }

	// For others, prefer city, fallback to first word of region
	return location.city || location.region?.split(' ')[0] || '';
}
