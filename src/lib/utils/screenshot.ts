interface CaptureOptions {
	scale?: number;
	backgroundColor?: string;
}

interface CaptureResult {
	dataUrl: string;
	canvas: HTMLCanvasElement;
	blob: Blob;
	download: (filename?: string) => void;
}

// Capture DOM node as PNG using native browser APIs
export async function captureNodeAsPNG(
	element: HTMLElement,
	options: CaptureOptions = {}
): Promise<CaptureResult> {
	try {
		const { scale = 2, backgroundColor = '#ffffff' } = options;

		// Get element dimensions
		const rect = element.getBoundingClientRect();
		const width = rect.width * scale;
		const height = rect.height * scale;

		// Clone the element to avoid modifying original
		const clone = element.cloneNode(true);

		// Get computed styles
		const styles = window.getComputedStyle(element);
		const styleString = Array.from(styles).reduce((str, property) => {
			return `${str}${property}:${styles.getPropertyValue(property)};`;
		}, '');

		// Create SVG with foreignObject
		const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/2000/svg" style="${styleString}">
            ${element.outerHTML}
          </div>
        </foreignObject>
      </svg>
    `;

		// Convert SVG to blob
		const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
		const url = URL.createObjectURL(blob);

		// Load image from SVG
		const img = new Image();
		img.width = width;
		img.height = height;

		await new Promise<void>((resolve, reject) => {
			img.onload = () => resolve();
			img.onerror = () => reject();
			img.src = url;
		});

		// Draw to canvas
		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext('2d');

		if (!ctx) {
			throw new Error('Could not get canvas context');
		}

		// Set background
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0, 0, width, height);

		// Draw image
		ctx.drawImage(img, 0, 0, width, height);

		// Clean up
		URL.revokeObjectURL(url);

		// Convert to PNG
		const pngDataUrl = canvas.toDataURL('image/png');

		return {
			dataUrl: pngDataUrl,
			canvas: canvas,
			blob: await new Promise(resolve => canvas.toBlob(resolve, 'image/png')),
			download: (filename = 'screenshot.png') => {
				const link = document.createElement('a');
				link.download = filename;
				link.href = pngDataUrl;
				link.click();
			}
		};
	} catch (error) {
		console.error('Screenshot failed:', error);
		throw error;
	}
}

// Example usage:

// // 1. Basic capture
// const el = document.querySelector('#myElement');
// const result = await captureNodeAsPNG(el);
// result.download('screenshot.png');

// // 2. With options
// const result2 = await captureNodeAsPNG(
//   document.querySelector('.card'),
//   {
//     scale: 3,
//     backgroundColor: 'transparent'
//   }
// );
