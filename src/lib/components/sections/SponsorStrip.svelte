<script lang="ts">
	import { Container, Heading, Slanted } from '$lib/components';

	interface Sponsor {
		name: string;
		logo: string;
		url: string;
		tier?: string;
		/** Optical-balance height in px for this logo */
		height?: number;
	}

	let {
		heading = 'OUR SPONSORS',
		sponsors = [
			{
				name: 'Revisual Labs',
				logo: '/images/logos/revisual-labs-logo.png',
				url: 'https://revisual.co',
				tier: 'Silver Sponsor',
				height: 46
			},
			{
				name: 'TypeTogether',
				logo: '/images/logos/typetogether-logo.png',
				url: 'https://www.type-together.com',
				tier: 'Bronze Sponsor',
				height: 30
			},
			{
				name: 'The Pudding',
				logo: '/images/logos/pudding-logo.svg',
				url: 'https://pudding.cool',
				tier: 'Community Sponsor',
				height: 40
			}
		]
	}: { heading?: string; sponsors?: Sponsor[] } = $props();
</script>

<Container paddingY="sm">
	<div class="strip">
		<Heading tag="h2" align="center">
			<Slanted color="pink" textContent={heading} />
		</Heading>

		<ul class="strip-logos">
			{#each sponsors as s (s.name)}
				<li class="strip-item">
					<a
						class="strip-logo-link"
						href={s.url}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={s.name}
						style="--logo-h: {s.height ?? 40}px"
					>
						<img src={s.logo} alt="{s.name} logo" loading="lazy" />
					</a>
					{#if s.tier}
						<span class="strip-tier">{s.tier}</span>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</Container>

<style>
	.strip {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.75rem;
		padding: 0;
	}

	.strip-logos {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: center;
		gap: 2.5rem 4rem;
	}

	.strip-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.9rem;
	}

	.strip-logo-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 48px;
		transition: transform 0.25s ease;
	}

	.strip-logo-link:hover {
		transform: scale(1.08);
	}

	.strip-logo-link img {
		height: var(--logo-h, 40px);
		max-width: 200px;
		width: auto;
		object-fit: contain;
		display: block;
	}

	.strip-tier {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-viz-pink-dark);
	}

	@media (max-width: 40rem) {
		.strip-logos {
			gap: 2rem 2.75rem;
		}

		.strip-logo-link {
			height: 38px;
		}

		.strip-logo-link img {
			height: calc(var(--logo-h, 40px) * 0.78);
			max-width: 150px;
		}
	}
</style>
