// tailwind.config.js
module.exports = {
    content: [
      './src/**/*.{html,js,svelte,ts}', // Adjust for your Svelte app
    ],
    theme: {
      extend: {
        colors: {
          'viz-yellow': 'var(--color-viz-yellow)',
          'viz-teal': 'var(--color-viz-teal)',
          'viz-blue': 'var(--color-viz-blue)',
          'viz-orange': 'var(--color-viz-orange)',
          'viz-pink': 'var(--color-viz-pink)',
          'viz-grey': 'var(--color-viz-grey)',
          // Add light/dark variants if needed
          'viz-yellow-light': 'var(--color-viz-yellow-light)',
          'viz-yellow-dark': 'var(--color-viz-yellow-dark)',
          // ...
        },
      },
    },
  };
  