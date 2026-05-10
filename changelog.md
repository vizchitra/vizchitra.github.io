# Changelog

Append-only running log for AI agents. Add a new entry at the top each session.
Format: date, what changed, why, key files, notes for the next agent.

---

## 2026-05-10 — Quality gates, changelog enforcement & faster CI

**What changed:** Added pre-commit hooks via `lefthook` that run oxfmt, prettier, oxlint, and a changelog guard on staged files. Split `pnpm lint` into `lint:fmt` (oxfmt for TS/JS/JSON, ~800ms) and `lint:fmt:svelte` (prettier for Svelte/MD only). Updated CI to run both as separate steps with individual pass/fail rows in the PR comment. Added a Changelog section to `agents.md` requiring agents to update `changelog.md` before committing when source files change.

**Why:** Prettier format check was failing in CI but never caught locally (no pre-commit gate). Changelog was being skipped by agents. CI was slow running prettier over all files including TS/JS that oxfmt handles faster.

**Key files:** `lefthook.yml` (new), `package.json`, `.github/workflows/pr-checks.yml`, `agents.md`

**Notes for next agent:** `pnpm install` auto-installs lefthook hooks via the `prepare` script. The changelog guard checks whether any `src/`, `content/`, or `studio.config.ts` file is staged — if so, `changelog.md` must also be staged. All TS/JS/JSON files in the repo were reformatted by oxfmt (double quotes, 2-space indent) as part of this change.

---

## 2026-05-10 — Studio OAuth & Cloudflare Workers fixes (PRs #287, #288)

### fix(studio): node:fs crash in CF Workers + auth error visibility

**What changed:** `buildContentTree()` in the studio dashboard called `await import('node:fs')` without a try-catch. Cloudflare Workers have no real filesystem — the import throws at runtime, crashing `/studio` for authenticated users. Fixed by probing `node:fs` first (`try { await import('node:fs') } catch { return [] }`); the page now loads with an empty content list if the filesystem is unavailable. Also surfaced the specific OAuth error code in the login error banner (`Sign-in failed (no_token)`) instead of the generic catch-all message.

**Why:** After fixing the OAuth CSRF bug (below), users could complete GitHub auth but landed on a broken studio page. The generic error message made it impossible to diagnose which OAuth step was failing.

**Key files:** `src/routes/studio/+page.server.ts`, `src/routes/studio/login/+page.svelte`

**Notes for next agent:** `buildContentTree` always returns `[]` in production (CF Workers have no filesystem). To make the content list work in prod, the options are: (a) pre-build the tree at build time and bundle it as a static import, or (b) fetch the file list from the GitHub API at runtime using `STUDIO_GITHUB_TOKEN`.

---

### fix(studio/oauth): replace KV CSRF state with cookie; add redirect_uri to token exchange

**What changed:** The CSRF state token was written to KV during `/studio/auth/github` and read back during `/studio/auth/callback`. These run as separate CF Worker invocations that may land on different Cloudflare edge locations — KV eventual consistency (up to 60s propagation) caused the callback to return `invalid_state` every time. Replaced with a short-lived `SameSite=Lax; HttpOnly; Secure` cookie (the standard OAuth pattern; `SameSite=Lax` ensures the cookie survives the cross-site GET redirect from GitHub). Also added the missing `redirect_uri` parameter to the token exchange call (GitHub requires it when `redirect_uri` was sent in the authorization request).

**Why:** Production OAuth was always failing at the CSRF state validation step.

**Key files:** `src/routes/studio/auth/github/+server.ts`, `src/routes/studio/auth/callback/+server.ts`

**Notes for next agent:** KV (`STUDIO_SESSIONS`) is still used for actual session storage — only the ephemeral CSRF state was moved to cookies. The session cookie (`studio_session`) is `SameSite=Strict` (set by our own callback, not cross-site). The CSRF state cookie (`oauth_state`) is `SameSite=Lax` and is cleared on every callback response (success or error).

---

### fix(routing): CF Worker not serving nested studio routes (PRs #285, #286)

**What changed:** `adapter-cloudflare` was configured with an explicit `include` list that didn't cover all nested studio paths. Routes like `/studio/auth/callback` and `/studio/auth/github` weren't reaching the Worker and returned 404. Fixed by setting `include: ['/*']` (with specific `exclude` patterns for static assets) in `svelte.config.js`.

**Why:** GitHub OAuth callback URL was reachable in the browser but the Worker never handled it.

**Key files:** `svelte.config.js`

---

## 2026-05-10 — feat(studio): editorial studio (PR #283)

**What changed:** Full editorial studio at `/studio` — GitHub OAuth login, Markdown/JSON content editor, CFP/CFE feedback management, session editing, and PR-based publishing workflow.

**Why:** The team needed a web UI to edit site content and manage conference submissions without pushing directly to git.

**Key files:** `src/routes/studio/` (all files), `src/lib/studio/session.ts`, `src/hooks.server.ts`, `wrangler.toml`, `studio.config.ts`

**Architecture summary:**

- **Auth:** GitHub OAuth app. Required env vars: `STUDIO_GITHUB_CLIENT_ID`, `STUDIO_GITHUB_CLIENT_SECRET`, `STUDIO_ALLOWED_USERS` (comma-separated GitHub handles), `STUDIO_BASE_URL` (`https://vizchitra.com` — set in wrangler.toml `[vars]`).
- **Sessions:** KV namespace `STUDIO_SESSIONS` (binding in wrangler.toml). Session ID stored in `studio_session` cookie (7-day TTL, `HttpOnly; SameSite=Strict; Secure`).
- **Dev mode:** `hooks.server.ts` always injects a fake `studioUser` in dev — no login page, no OAuth, no KV needed locally.
- **Publishing:** Edits are staged to a `studio/{handle}/{date}` GitHub branch, then a PR is opened to `master` via `@octokit/rest` using `STUDIO_GITHUB_TOKEN`.
- **Content tree:** Built at runtime by reading the filesystem (`node:fs`). Works in dev; returns `[]` in CF Workers (see note above).

**Notes for next agent:**

- `STUDIO_ALLOWED_USERS` must be set in Cloudflare Pages environment variables (the `[vars]` section in wrangler.toml is for non-secret vars; secrets go in the CF dashboard).
- The studio's `+layout.ts` exports `prerender = false` — all studio routes are dynamic, none are prerendered.
- `studio.config.ts` at repo root defines the content collections (name, path, type, URL template). Edit this to add/remove editable content sections.
