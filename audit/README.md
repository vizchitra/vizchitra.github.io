Audit folder: lightweight static audit for the site

How to run

- `pnpm run audit` — runs lint categorization and the build-asset summary. The asset scan reads the static `build/` output.
- `pnpm run audit:ci` — runs `pnpm run build` then the audit (use in CI).

Outputs

- `audit/lint.md` — human-readable, aligned markdown table(s) with per-file counts grouped into `/content`, `/components`, and `Rest`.
- `audit/assets.md` — human-readable, aligned markdown table listing per-page CSS / JS / Total sizes (KB).

Category mapping and expectations

- The audit is now message-driven: rules should include an uppercase bracketed token at the start of their message, e.g. `[LAYOUT]`, `[SPACING]`, `[A11Y]`, `[IMPORTS]`, `[QUALITY]`.
- The lint reporter parses the bracketed token from each ESLint message and uses it as the category. If no token is present the issue is classified as `OTHER`.
- The previous `ruleCategories` JSON fallback has been removed — prefer adding an explicit bracketed token to rule messages when categorization is required.

Notes

- The lint reporter uses the ESLint Node API and produces aligned markdown tables (readable raw source) with one column per category.
- The asset scanner resolves asset paths referenced by pages and reports per-page totals. The audit no longer emits machine-readable JSON by default; if you need JSON outputs for automation we can add an optional `--json` flag.
- The build asset scanner resolves asset paths referenced by pages (handles `./app/...`, `../app/...` and `/app/...`) and reports per-page totals only.
