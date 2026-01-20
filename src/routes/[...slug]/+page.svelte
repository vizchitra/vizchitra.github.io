<script lang="ts">
  import { getContentModules } from "$lib/loaders/content";

  export let data: any = { slug: "", frontmatter: {} };

  const pages = getContentModules();

  // Match component by exact path: /content/{slug}.md or /content/{slug}/index.md
  let Component: any = null;

  $: {
    const slug = data?.slug || "index";
    // Try exact match first: /content/team.md for slug "team"
    let pageKey = Object.keys(pages).find((p) => p === `/content/${slug}.md`);
    // Fallback to directory index: /content/2025/index.md for slug "2025"
    if (!pageKey) {
      pageKey = Object.keys(pages).find(
        (p) => p === `/content/${slug}/index.md`,
      );
    }
    Component = pageKey ? (pages as any)[pageKey].default : null;
  }
</script>

{#key data.slug}
  {#if Component}
    <Component frontmatter={data.frontmatter} />
  {:else}
    <div class="prose mx-auto max-w-7xl px-4 py-8">
      <h1>404 - Page Not Found</h1>
      <p>The page <code>{data.slug}</code> could not be found.</p>
    </div>
  {/if}
{/key}
