<script lang="ts">
	interface Props {
		photos: string[];
		height?: string;
		ariaLabel?: string;
	}

	let { photos, height = '280px', ariaLabel = 'Event photos' }: Props = $props();

	let scrollProgress = $state(0);
	let isOverflowing = $state(false);

	function initScroller(node: HTMLElement) {
		let isDown = false;
		let startX = 0;
		let scrollLeft = 0;
		let hasDragged = false;

		function checkOverflow() {
			isOverflowing = node.scrollWidth > node.clientWidth + 10;
		}

		function onScroll() {
			const maxScroll = node.scrollWidth - node.clientWidth;
			isOverflowing = maxScroll > 10;
			scrollProgress = maxScroll > 0 ? node.scrollLeft / maxScroll : 0;
		}

		node.addEventListener('mousedown', (e) => {
			isDown = true;
			hasDragged = false;
			node.style.cursor = 'grabbing';
			startX = e.pageX;
			scrollLeft = node.scrollLeft;
			e.preventDefault();
		});
		node.addEventListener('mouseleave', () => {
			isDown = false;
			node.style.cursor = '';
		});
		node.addEventListener('mouseup', () => {
			isDown = false;
			node.style.cursor = '';
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
		node.addEventListener('scroll', onScroll);

		checkOverflow();
		const ro = new ResizeObserver(() => checkOverflow());
		ro.observe(node);
		return {
			destroy() {
				ro.disconnect();
			}
		};
	}
</script>

{#if photos.length > 0}
	<div class="photo-strip-root">
		{#if isOverflowing}
			<div class="progress-track" aria-hidden="true">
				<div class="progress-thumb" style="left: {scrollProgress * 70}%; width: 30%"></div>
			</div>
		{/if}

		<div
			class="photo-strip-scroll"
			class:photo-draggable={isOverflowing}
			use:initScroller
			role="region"
			aria-label={ariaLabel}
			style="--strip-height: {height};"
		>
			{#each photos as photo, i}
				<img
					src={photo}
					alt="VizChitra 2025 — photo {i + 1}"
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
	}

	.progress-track {
		position: relative;
		height: 8px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 999px;
		margin: 0 auto 10px;
		max-width: 200px;
	}

	.progress-thumb {
		position: absolute;
		top: 0;
		height: 100%;
		background: rgba(255, 255, 255, 0.6);
		border-radius: 999px;
		transition: left 300ms ease;
	}

	.photo-strip-scroll {
		display: flex;
		gap: 8px;
		overflow-x: auto;
		scrollbar-width: none;
		scroll-snap-type: x mandatory;
	}

	.photo-strip-scroll::-webkit-scrollbar {
		display: none;
	}

	.photo-draggable {
		cursor: grab;
	}

	.photo-strip-img {
		height: var(--strip-height);
		width: auto;
		flex-shrink: 0;
		object-fit: cover;
		border-radius: 6px;
		scroll-snap-align: start;
	}

	@media (max-width: 768px) {
		.photo-strip-img {
			height: 200px;
		}
	}
</style>
