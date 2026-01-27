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

	characters.forEach((letter) => {
		let slant = getLetterDistance(letter);

		lettersList.push({ letter: letter, slant: slant });
	});

	return lettersList;
}
