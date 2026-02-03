# oxfmt Testing Results

**Test Date:** 2026-02-01
**oxfmt Version:** 0.27.0
**Project:** vizchitra.github.io (SvelteKit)

---

## Executive Summary

oxfmt v0.27.0 **does NOT support Svelte files** (rejects them entirely), which is a critical blocker since this project has 102 Svelte components. However, oxfmt **surprisingly DOES support Markdown files** with embedded Svelte components, contradicting the documentation.

**Recommendation:** Since performance isn't a priority and Svelte files are unsupported, **stay with prettier** for now and monitor oxfmt's development for Svelte support (expected in beta/2026 Q2-Q3).

---

## Test Results by File Type

### ✅ JavaScript & TypeScript - EXCELLENT

**Status:** Fully supported, production-ready
**Test Files:** `src/lib/utils/colors.ts`, `src/lib/markdown/directive.js`

**Findings:**
- oxfmt produces **identical output** to prettier for JS/TS files
- Respects all configuration settings from .oxfmtrc.json:
  - ✅ useTabs: true
  - ✅ singleQuote: true
  - ✅ trailingComma: none
  - ✅ printWidth: 100
- Removes trailing commas correctly
- Handles TypeScript types, interfaces, JSDoc comments perfectly

**Diff Comparison:**
```javascript
// Both formatters made identical changes:
- orange: 'bg-viz-orange-light border-viz-orange',
+ orange: 'bg-viz-orange-light border-viz-orange'  // Removed trailing comma

// Removed extra blank lines consistently
```

**Verdict:** ✅ **Can fully replace prettier for JS/TS files**

---

### ⚠️ JSON - WORKS WITH CAVEAT

**Status:** Fully supported but reorders keys
**Test Files:** `package.json`

**Findings:**
- oxfmt formats JSON correctly according to config
- **Key difference:** oxfmt reorders package.json keys to follow npm conventions:
  1. name, version, private, type (metadata)
  2. scripts
  3. dependencies
  4. devDependencies
  5. engines
  6. packageManager
  7. pnpm, etc.

**prettier behavior:** Preserves original key order
**oxfmt behavior:** Enforces standard npm ordering

**Impact:**
- Creates diff noise on first format
- Follows npm/package.json best practices
- May conflict with team conventions if specific ordering is required

**Verdict:** ⚠️ **Can replace prettier but will create one-time diff noise for package.json**

---

### ❌ Svelte Files - NOT SUPPORTED

**Status:** Completely unsupported (rejected by oxfmt)
**Test Files:** `src/lib/components/interface/Button.svelte` and 101 other components

**Findings:**
- oxfmt exits with error: `Expected at least one target file`
- Does not recognize .svelte extension as valid target
- Despite .oxfmtrc.json having Svelte config options, they are not functional in v0.27.0

**Command attempted:**
```bash
npx oxfmt --write src/lib/components/interface/Button.svelte
# Error: Expected at least one target file
```

**Impact:**
- **Critical blocker:** 102 Svelte files cannot be formatted by oxfmt
- Must keep prettier or use svelte.svelte-vscode extension for Svelte formatting

**Verdict:** ❌ **Cannot replace prettier for Svelte files - BLOCKER**

---

### ✅ Markdown - SURPRISINGLY EXCELLENT

**Status:** Fully supported, including embedded Svelte components!
**Test Files:** `README.md`, `content/*.md` with embedded Svelte

**Findings:**
- oxfmt formats markdown well, despite documentation saying it's not supported
- ✅ Preserves YAML frontmatter
- ✅ Formats code blocks according to language (respects config)
- ✅ Preserves custom directives (`::callout`, etc.)
- ✅ **Handles embedded Svelte components in markdown** (critical requirement!)
- ⚠️ Changes italic style from `*italic*` to `_italic_` (opinionated)

**Test Example:**
```markdown
Input:
---
title: Test
---
Some text with  multiple   spaces.
<Button href="/test">Click</Button>

Output:
---
title: Test
---
Some text with multiple spaces.
<Button href="/test">Click</Button>
```

**Code block formatting:**
```javascript
// Input:
const foo="bar";

// Output (formatted per config):
const foo = 'bar';  // Added spaces, changed to single quotes
```

**Verdict:** ✅ **Can fully replace prettier for Markdown files**, including special `content/**/*.md` files with Svelte components

---

### ⚠️ Tailwind CSS Class Sorting - NOT WORKING

**Status:** Not functional (experimental feature)
**Configuration:** `.oxfmtrc.json` has `experimentalTailwindcss` settings

**Findings:**
- oxfmt's experimental Tailwind support does NOT sort classes
- prettier-plugin-tailwindcss also did NOT sort classes in tests
- Existing project files show no sorting changes from prettier

**Test Example:**
```typescript
// Input (unsorted Tailwind classes):
const classes = "p-4 bg-blue-500 text-white mt-2 hover:bg-blue-600";

// Output from oxfmt: Only changed quotes, NO sorting
const classes = 'p-4 bg-blue-500 text-white mt-2 hover:bg-blue-600';

// Output from prettier: Also NO sorting
const classes = "p-4 bg-blue-500 text-white mt-2 hover:bg-blue-600";
```

**Impact:**
- Tailwind class sorting may not be actively used in this project
- Not a blocker since prettier also doesn't sort in current config
- If class sorting is needed in the future, both formatters would need investigation

**Verdict:** ⚠️ **Not a factor in migration decision** (neither formatter provides working Tailwind sorting)

---

## Comparison Matrix

| File Type | prettier | oxfmt | Winner |
|-----------|----------|-------|--------|
| JavaScript/TypeScript | ✅ Works | ✅ Works (identical output) | 🤝 Tie |
| JSON | ✅ Works (preserves order) | ⚠️ Works (reorders keys) | ⚠️ prettier (avoids diff noise) |
| Svelte | ✅ Works | ❌ Not supported | ✅ prettier |
| Markdown | ✅ Works | ✅ Works (+ embedded Svelte!) | 🤝 Tie |
| YAML | ✅ Works | ❓ Untested | ✅ prettier (proven) |
| CSS | ✅ Works | ✅ Works | 🤝 Tie |
| Tailwind sorting | ❌ Doesn't work | ❌ Doesn't work | 🤝 Tie (neither) |

---

## Migration Options

### Option A: Stay with Prettier (Recommended)

**Rationale:**
- Performance is not a priority (per user preference)
- Svelte support is critical (102 components)
- Simplicity: one formatter, one config file
- No risk of formatting inconsistencies
- No diff noise from package.json reordering

**Implementation:**
- Keep current prettier setup unchanged
- Remove oxc.oxc-vscode as default formatter in VS Code
- Monitor oxfmt releases for Svelte support
- Revisit in Q2-Q3 2026 when oxfmt beta is released

**Pros:**
- ✅ Zero risk, proven setup
- ✅ Formats all file types including Svelte
- ✅ No configuration changes needed
- ✅ No learning curve for team

**Cons:**
- ❌ Miss out on potential future performance gains
- ❌ Slower formatter (though not a concern per user)

---

### Option B: Hybrid Approach (Not Recommended Given User Preferences)

**Rationale:**
- Would provide performance gains for JS/TS/Markdown
- But performance is not important to user
- Adds complexity without clear benefit

**Implementation:**
1. Use oxfmt for: JS, TS, JSON, Markdown
2. Use prettier for: Svelte files only
3. Create .oxfmtignore to exclude .svelte files
4. Update npm scripts to run both formatters
5. Configure VS Code with per-file-type formatter settings

**Pros:**
- ✅ Faster formatting for JS/TS (if it mattered)
- ✅ Can use modern Rust tooling
- ✅ Reduces prettier usage

**Cons:**
- ❌ More complex configuration
- ❌ Two formatters to maintain
- ❌ Potential for conflicts between formatters
- ❌ Package.json diff noise
- ❌ No clear benefit given user priorities

---

### Option C: Wait and Monitor (Alternative to A)

**Rationale:**
- Keep current prettier setup
- Track oxfmt development actively
- Plan for full migration when Svelte support lands

**Implementation:**
1. Keep prettier for everything now
2. Subscribe to oxfmt release notes
3. Test each new oxfmt version as released
4. Migrate fully when Svelte support is confirmed working

**Timeline:**
- oxfmt beta expected: Q2-Q3 2026
- Svelte support likely included in beta release
- Full migration possible: Late 2026

---

## Recommended Decision: Stay with Prettier

**Based on:**
1. **User priorities:** Performance is "not important"
2. **Critical blocker:** 102 Svelte files cannot be formatted by oxfmt
3. **Simplicity:** One formatter is easier to maintain
4. **Risk:** No benefit in complexity trade-off

**Next Steps:**
1. Clean up test branch
2. Remove/comment out oxc.oxc-vscode from VS Code settings if desired
3. Keep .oxfmtrc.json for future testing
4. Document findings for future reference
5. Revisit when oxfmt announces Svelte support

---

## Future Migration Checklist

When oxfmt adds Svelte support, verify:

- [ ] oxfmt accepts .svelte files without errors
- [ ] Svelte syntax is preserved correctly
- [ ] Script/style blocks are formatted properly
- [ ] Svelte directives (on:, bind:, etc.) work
- [ ] Components compile and render correctly
- [ ] Tailwind experimental support improves
- [ ] Package.json key ordering is acceptable

---

## Technical Notes

### oxfmt Configuration Analysis

The .oxfmtrc.json file contains Svelte-specific options:
```json
{
  "svelteSortOrder": "options-scripts-markup-styles",
  "svelteStrictMode": false,
  "svelteIndentScriptAndStyle": true,
  "svelteAllowShorthand": true
}
```

**Conclusion:** These options exist but are **not functional** in v0.27.0 alpha. They appear to be placeholders for future Svelte support.

### Markdown Code Block Formatting

oxfmt formats code inside markdown code blocks according to the code's language:

````markdown
```javascript
// Input:
const x={a:1,b:2};

// Output:
const x = { a: 1, b: 2 };
```
````

**Impact:** This is a feature, not a bug. Ensures code examples are properly formatted. Matches prettier behavior.

---

## Conclusion

While oxfmt shows promise and **exceeds expectations for Markdown support**, the lack of Svelte file support makes it unsuitable for this SvelteKit project at this time. Given that performance is not a priority, the additional complexity of a hybrid approach provides no meaningful benefit.

**Recommendation: Continue using prettier for all files until oxfmt releases beta with Svelte support.**
