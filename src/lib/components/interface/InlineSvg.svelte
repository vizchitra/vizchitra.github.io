<script>
  export let name = '';

  // Eagerly load all SVGs as raw strings so we can inline them by filename
  const svgs = import.meta.glob('/src/lib/assets/**/*.svg', { as: 'raw', eager: true });

  function getSvg(name) {
    if (!name) return '';
    const key = Object.keys(svgs).find((p) => p.endsWith(`/${name}`) || p.endsWith(`/${name}.svg`));
    if (!key) return '';
    const val = svgs[key];
    return typeof val === 'string' ? val : (val && val.default) || '';
  }

  $: svgHtml = getSvg(name);
</script>

{#if svgHtml}
  {@html svgHtml}
{:else}
  <!-- SVG not found -->
  <span aria-hidden="true"></span>
{/if}
