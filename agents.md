# Agent Operating Manual (agents.md)

Welcome, Agent. This document provides technical directives, architectural guardrails, and tactical workflows for contributing to the VizChitra codebase.

## 🧠 Core Directives

These are **non-negotiable** rules for all automated edits.

1. **Import Strategy**: Always prefer `$lib/...` imports for shared modules and components. Never use deep relative paths (e.g., `../../../lib`) unless strictly necessary for local co-located files.
2. **Markdown Policy**: Never embed utility Tailwind classes (e.g., `bg-blue-500`) directly inside Markdown/Markdoc files in `content/`. Styling must be handled by the renderer or specialized components.
3. **Token Determinism**: Use `--viz-*` tokens from `src/lib/assets/css/tokens.css`. Avoid ad-hoc hex values.
4. **Static First**: This site is fully prerendered. Ensure any new routes are compatible with `@sveltejs/adapter-static`.

## 🏗️ Architecture Quick-Reference

See [ARCH.md](file:///Users/amitkaps/Documents/@github/vizchitra.github.io/ARCH.md) for full details.

- **Stack**: SvelteKit + Tailwind v4 + mdsvex.
- **Components**: 
  - `interface/`: Pure atoms (Button, Icon).
  - `typography/`: Slanted text, prose wrappers.
  - `sections/`: High-level page blocks (Mission, Team).

## 🛠️ Tactical Workflows

### 1. Adding a Content Page
- Create a .md file (uses mdsvex) file in `content/`.
- Ensure the slug is registered or handled by `src/routes/[slug]/+page.svelte`.
- Use existing components from `src/lib/components/typography/` for specialized formatting.

### 2. Implementing a UI Component
- Place in `src/lib/components/interface/`.
- Use Tailwind v4 `@theme` variables (e.g., `text-viz-teal`).
- Add to the barrel export if intended for global use.

### 3. Modifying Styles
- Update `src/lib/assets/css/tokens.css` for low-level color changes.
- Mapping happens in `src/app.css` via the `@theme` block.

## 🔍 Agent Verification Checklist

Before calling `notify_user` or submitting changes, verify:

- [ ] **Build Check**: Does `pnpm build` pass without 404s in the crawler?
- [ ] **Import Check**: Are all imports using the `$lib` alias where appropriate?
- [ ] **Style Check**: Are no raw hex codes or ad-hoc Tailwind classes used in Markdown?
- [ ] **Accessibility**: Does the new UI have proper ARIA labels and focus states?
- [ ] **Responsive**: Is the change tested for mobile and desktop viewports?

## ⚠️ Common Pitfalls

- **Relative Paths**: Deep relative paths break during route refactors. Stick to `$lib`.
- **Global Styles**: Avoid polluting `src/app.css` with component-specific styles; use Svelte's `<style>` block.
- **Asset Paths**: Use `%sveltekit.assets%` in HTML or absolute paths for images in `static/`.
