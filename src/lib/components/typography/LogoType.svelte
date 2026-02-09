<script>
	/**
	/** @typedef {Object} Props
	 * @property {string} [classes]
	 * @property {string} [yearClasses]
	 * @property {number|null} [year] - year to show (e.g. 2025). Set to `null`/omit to hide.
	 */

	/** @type {Props} */
	let { classes = '', yearClasses = 'text-[#D46637]', year = 2025 } = $props();
</script>

<span class="viz-logo-type {classes}">
	<span class="V1">V</span><span class="I1">I</span><span class="Z1">Z</span><span class="C2"
		>C</span
	><span class="H2">H</span><span class="I2">I</span><span class="T2">T</span><span class="R2"
		>R</span
	><span class="A2">A</span>

	{#if year}
		<span class="year font-bold {yearClasses}">{year}</span>
	{/if}
</span>

<style>
	.viz-logo-type {
		font-family: var(--font-display);
		font-optical-sizing: auto;
		max-width: 10ch;
	}

	.V1 {
		font-variation-settings:
			'slnt' -4,
			'wght' 750;
		letter-spacing: 0.25rem;
	}

	.I1 {
		font-variation-settings:
			'slnt' 8,
			'wght' 750;
		letter-spacing: 0rem;
	}

	.Z1 {
		font-variation-settings:
			'slnt' 0,
			'wght' 750;
		letter-spacing: -0.1rem;
	}

	.C2 {
		font-variation-settings:
			'slnt' 2,
			'wght' 400;
		letter-spacing: -0.1rem;
	}

	.H2 {
		font-variation-settings:
			'slnt' 7,
			'wght' 400;
		letter-spacing: -0.1rem;
	}

	.I2 {
		font-variation-settings:
			'slnt' 8,
			'wght' 400;
		letter-spacing: -0.3rem;
	}

	.T2 {
		font-variation-settings:
			'slnt' -6,
			'wght' 400;
		letter-spacing: -0.1rem;
	}

	.R2 {
		font-variation-settings:
			'slnt' -8,
			'wght' 400;
		letter-spacing: -0.1rem;
	}

	.A2 {
		font-variation-settings:
			'slnt' 0,
			'wght' 400;
		letter-spacing: 0rem;
	}
	.year {
		font-variation-settings: 'slnt' 8;
	}
</style>
