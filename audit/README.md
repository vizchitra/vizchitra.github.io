# CSS Audit

Simplified CSS audit for the VizChitra project.

## Usage

```bash
pnpm audit:css
```

This command:

- Scans all 99 Svelte files in the `src/` directory
- Categorizes issues into 4 types: Colors, Spacing, Styles, Classes
- Generates a markdown report at `audit/audit-report.md`
- Exits with code 1 if issues found (useful for CI/CD)

## Issue Categories

- **🎨 Color Issues** - Raw hex colors that should use design tokens
- **📏 Spacing Issues** - Non-standard spacing values outside Tailwind scale
- **💄 Style Issues** - Inline styles that should use Tailwind utilities
- **🏷️ Class Issues** - Arbitrary values in class attributes

## Output

The audit generates `audit-report.md` with:

- Summary statistics by category and file type
- Detailed issues grouped by category
- Most common issues across the codebase

## Example Output

```
📊 Audit Summary:
   Files scanned: 99
   Files with issues: 62

📋 Issues by category:
   ⚠️ Color Issues: 57
   ⚠️ Spacing Issues: 4
   ⚠️ Style Issues: 23
   ⚠️ Class Issues: 10
```

Check `audit-report.md` for the complete detailed report.
