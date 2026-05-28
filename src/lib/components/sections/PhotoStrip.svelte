<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		photos: string[];
		height?: string;
		ariaLabel?: string;
		autoplayInterval?: number;
	}

	let {
		photos,
		height = '280px',
		ariaLabel = 'Event photos',
		autoplayInterval = 6000
	}: Props = $props();

	// Duplicate photos for seamless looping
	const loopedPhotos = $derived([...photos, ...photos]);

	let scrollEl: HTMLElement | undefined = $state();
	let autoplayTimer: ReturnType<typeof setInterval>;
	let userInteracting = false;
	let halfwayPoint = 0;

	function initScroller(node: HTMLElement) {
		scrollEl = node;
		let isDown = false;
		let startX = 0;
		let scrollLeft = 0;
		let hasDragged = false;

		function measureHalfway() {
			const totalChildren = node.children.length;
			const halfChildren = totalChildren / 2;
			if (halfChildren > 0 && node.children[halfChildren]) {
				halfwayPoint = (node.children[halfChildren] as HTMLElement).offsetLeft;
			}
		}

		node.addEventListener('mousedown', (e) => {
			isDown = true;
			hasDragged = false;
			userInteracting = true;
			node.style.cursor = 'grabbing';
			startX = e.pageX;
			scrollLeft = node.scrollLeft;
			e.preventDefault();
		});
		node.addEventListener('mouseleave', () => {
			isDown = false;
			node.style.cursor = '';
			userInteracting = false;
		});
		node.addEventListener('mouseup', () => {
			isDown = false;
			node.style.cursor = '';
			setTimeout(() => {
				userInteracting = false;
			}, 2000);
		});
		node.addEventListener('mousemove', (e) => {
			if (!isDown) return;
			e.preventDefault();
			const walk = (e.pageX - startX) * 1.5;
			if (Math.abs(walk) > 5) hasDragged = true;
			node.scrollLeft = scrollLeft - walk;
		});
		node.addEventListener(
			'click',
			(e) => {
				if (hasDragged) {
					e.preventDefault();
					e.stopPropagation();
					hasDragged = false;
				}
			},
			true
		);

		// Reset scroll seamlessly when reaching the duplicate set
		node.addEventListener('scroll', () => {
			if (halfwayPoint > 0 && node.scrollLeft >= halfwayPoint) {
				node.scrollLeft = node.scrollLeft - halfwayPoint;
			}
		});

		measureHalfway();
		const ro = new ResizeObserver(() => measureHalfway());
		ro.observe(node);
		return {
			destroy() {
				ro.disconnect();
			}
		};
	}

	function autoScroll() {
		if (!scrollEl || userInteracting) return;
		scrollEl.scrollLeft += 1;
	}

	onMount(() => {
		// Slow continuous scroll
		autoplayTimer = setInterval(autoScroll, 30);
	});

	onDestroy(() => {
		if (autoplayTimer) clearInterval(autoplayTimer);
	});
</script>

{#if photos.length > 0}
	<div class="photo-strip-root">
		<div
			class="photo-strip-scroll"
			use:initScroller
			role="region"
			aria-label={ariaLabel}
			style="--strip-height: {height};"
		>
			{#each loopedPhotos as photo, i}
				<img
					src={photo}
					alt="VizChitra 2025 — photo {(i % photos.length) + 1}"
					class="photo-strip-img"
					loading="lazy"
				/>
			{/each}
		</div>
	</div>
{/if}

<style>
	.photo-strip-root {
		width: 100%;
		overflow: hidden;
	}

	.photo-strip-scroll {
		display: flex;
		gap: 4px;
		overflow-x: auto;
		scrollbar-width: none;
		cursor: grab;
	}

	.photo-strip-scroll::-webkit-scrollbar {
		display: none;
	}

	.photo-strip-img {
		height: var(--strip-height);
		width: auto;
		flex-shrink: 0;
		object-fit: cover;
	}

	@media (max-width: 768px) {
		.photo-strip-img {
			height: 200px;
		}
	}
</style>
