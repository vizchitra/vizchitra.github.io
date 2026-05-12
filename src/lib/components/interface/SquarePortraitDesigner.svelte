<script lang="ts">
	import { onMount } from 'svelte';
	import { Text } from '$lib/components';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let uploadInput: HTMLInputElement;

	let img: HTMLImageElement | null = null;
	let scale = 1;
	let offsetX = 0;
	let offsetY = 0;

	let dragging = false;
	let lastX = 0;
	let lastY = 0;

	const SIZE = 700;
	const CIRCLE_RADIUS = 250;
	const CX = SIZE / 2;
	const CY = SIZE / 2;

	function draw() {
		if (!ctx) return;

		ctx.clearRect(0, 0, SIZE, SIZE);
		ctx.fillStyle = '#f6f4ef';
		ctx.fillRect(0, 0, SIZE, SIZE);

		if (img) {
			const drawW = img.width * scale;
			const drawH = img.height * scale;
			ctx.drawImage(img, CX - drawW / 2 + offsetX, CY - drawH / 2 + offsetY, drawW, drawH);
		}

		// Dark overlay outside guide circle
		ctx.save();
		ctx.fillStyle = 'rgba(0,0,0,0.35)';
		ctx.beginPath();
		ctx.rect(0, 0, SIZE, SIZE);
		ctx.arc(CX, CY, CIRCLE_RADIUS, 0, Math.PI * 2, true);
		ctx.fill('evenodd');
		ctx.restore();

		// Circle border
		ctx.strokeStyle = '#fff';
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.arc(CX, CY, CIRCLE_RADIUS, 0, Math.PI * 2);
		ctx.stroke();

		// Guide lines
		ctx.strokeStyle = 'rgba(255,255,255,0.75)';
		ctx.lineWidth = 1;

		// Eye line
		ctx.beginPath();
		ctx.moveTo(CX - 180, CY - 70);
		ctx.lineTo(CX + 180, CY - 70);
		ctx.stroke();

		// Chin line
		ctx.beginPath();
		ctx.moveTo(CX - 180, CY + 150);
		ctx.lineTo(CX + 180, CY + 150);
		ctx.stroke();

		// Vertical center
		ctx.beginPath();
		ctx.moveTo(CX, CY - 220);
		ctx.lineTo(CX, CY + 220);
		ctx.stroke();
	}

	function handleUpload(e: Event) {
		const file = (e.target as HTMLInputElement).files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = () => {
			const image = new Image();
			image.onload = () => {
				img = image;
				const fitScale = Math.max(SIZE / img.width, SIZE / img.height);
				scale = fitScale;
				offsetX = 0;
				offsetY = 0;
				draw();
			};
			image.src = reader.result as string;
		};
		reader.readAsDataURL(file);
	}

	function exportImage(size: number) {
		if (!img) return;

		const out = document.createElement('canvas');
		out.width = size;
		out.height = size;
		const octx = out.getContext('2d')!;

		const sf = size / SIZE;
		const drawW = img.width * scale * sf;
		const drawH = img.height * scale * sf;

		octx.drawImage(
			img,
			size / 2 - drawW / 2 + offsetX * sf,
			size / 2 - drawH / 2 + offsetY * sf,
			drawW,
			drawH
		);

		const link = document.createElement('a');
		link.download = `portrait-${size}.webp`;
		link.href = out.toDataURL('image/webp', 0.92);
		link.click();
	}

	function onPointerDown(e: PointerEvent) {
		dragging = true;
		lastX = e.clientX;
		lastY = e.clientY;
		canvas.setPointerCapture(e.pointerId);
	}

	function onPointerMove(e: PointerEvent) {
		if (!dragging) return;
		offsetX += e.clientX - lastX;
		offsetY += e.clientY - lastY;
		lastX = e.clientX;
		lastY = e.clientY;
		draw();
	}

	function onPointerUp() {
		dragging = false;
	}

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		draw();
	});
</script>

<div class="flex flex-col gap-6 lg:flex-row">
	<!-- Controls -->
	<div class="flex w-full flex-col gap-5 lg:w-72 lg:shrink-0">
		<div>
			<label class="text-viz-black mb-1.5 block text-sm font-semibold" for="upload">
				Upload image
			</label>
			<input
				id="upload"
				type="file"
				accept="image/*"
				class="border-viz-grey-light text-viz-grey-dark w-full rounded-lg border px-3 py-2 text-sm"
				bind:this={uploadInput}
				on:change={handleUpload}
			/>
			<Text type="small" color="grey" class="mt-1">Transparent PNG or solid background image</Text>
		</div>

		<div>
			<label class="text-viz-black mb-1.5 block text-sm font-semibold" for="scale">
				Scale — {scale.toFixed(2)}
			</label>
			<input
				id="scale"
				type="range"
				min="0.1"
				max="5"
				step="0.01"
				bind:value={scale}
				on:input={draw}
				class="w-full accent-pink-500"
			/>
		</div>

		<div>
			<label class="text-viz-black mb-1.5 block text-sm font-semibold" for="offsetX">
				Horizontal — {Math.round(offsetX)}px
			</label>
			<input
				id="offsetX"
				type="range"
				min="-400"
				max="400"
				step="1"
				bind:value={offsetX}
				on:input={draw}
				class="w-full accent-pink-500"
			/>
		</div>

		<div>
			<label class="text-viz-black mb-1.5 block text-sm font-semibold" for="offsetY">
				Vertical — {Math.round(offsetY)}px
			</label>
			<input
				id="offsetY"
				type="range"
				min="-400"
				max="400"
				step="1"
				bind:value={offsetY}
				on:input={draw}
				class="w-full accent-pink-500"
			/>
		</div>

		<Text type="small" color="grey">
			Drag directly on the canvas to position your portrait. The circle is a framing guide only —
			exports are always square.
		</Text>

		<div class="border-viz-grey-light border-t pt-4">
			<p class="text-viz-black mb-3 text-sm font-semibold">Export as WebP</p>
			<div class="flex flex-col gap-2">
				<button
					style="background-color: var(--color-viz-pink-solid);"
					class="rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
					disabled={!img}
					on:click={() => exportImage(300)}
				>
					300 × 300
				</button>
				<button
					style="background-color: var(--color-viz-pink-solid);"
					class="rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
					disabled={!img}
					on:click={() => exportImage(600)}
				>
					600 × 600 @2×
				</button>
			</div>
		</div>
	</div>

	<!-- Canvas -->
	<div class="flex flex-1 items-center justify-center">
		<canvas
			bind:this={canvas}
			width={SIZE}
			height={SIZE}
			class="max-w-full cursor-grab rounded-2xl shadow-lg active:cursor-grabbing"
			style="aspect-ratio: 1;"
			on:pointerdown={onPointerDown}
			on:pointermove={onPointerMove}
			on:pointerup={onPointerUp}
			on:pointercancel={onPointerUp}
		></canvas>
	</div>
</div>
