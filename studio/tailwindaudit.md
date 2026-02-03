---
title: Tailwind CSS Audit Report
description: Comprehensive analysis of Tailwind utility usage
category: audit
generated: true
draft: false
order: 2
---

# Tailwind CSS Audit Report

**Generated:** 2026-02-01  
**Files scanned:** 102  
**Total classes:** 3462  
**Unique classes:** 985  
**Avg classes per file:** 33.9  

## 📊 Quick Health Metrics

| Metric | Value | Status |
|--------|-------|--------|
| OKLCH Token Adoption | 22% | ❌ |
| Responsive Coverage | 30% | ❌ |
| Files with Responsive | 31/102 | ⚠️ |

## 📚 Class Usage by Category

| Category | Total | Percentage |
|----------|-------|------------|
| Colors | 739 | 21.3% |
| Other | 585 | 16.9% |
| Spacing | 539 | 15.6% |
| Sizing | 341 | 9.8% |
| Layout | 278 | 8.0% |
| Typography | 263 | 7.6% |
| Positioning | 214 | 6.2% |
| Flexgrid | 194 | 5.6% |
| Borders | 132 | 3.8% |
| Transitions | 70 | 2.0% |
| Effects | 54 | 1.6% |
| Interactivity | 41 | 1.2% |
| Transforms | 12 | 0.3% |

### Classes by Category

**Colors** (739) — `accent-blue-600`, `accent-orange-600`, `accent-pink-600`, `accent-teal-600`, `accent-viz-pink-dark`, `bg-[#444]`, `bg-[#747474]`, `bg-[#F5C7C7]`, `bg-[#ffffffaa]`, `bg-black`, `bg-blue-600`, `bg-gradient-to-b` (+199 more)

**Other** (585) — `!font-medium`, `!leading-[1.1]`, `!leading-[1.25]`, `!leading-[1.2]`, `!leading-[1.3]`, `!leading-[1.4]`, `!max-w-[750px]'}`, `!max-w-[min(90vw,1400px)]`, `!max-w-[unset]'`, `!md:leading-[1.5]`, `!outline-0`, `!px-0` (+302 more)

**Spacing** (539) — `gap-0`, `gap-1`, `gap-1.5`, `gap-10`, `gap-14`, `gap-2`, `gap-3`, `gap-4`, `gap-5`, `gap-6`, `gap-8`, `gap-[2px]` (+138 more)

**Sizing** (341) — `h-1`, `h-1.5`, `h-16`, `h-2`, `h-3`, `h-3.5`, `h-36`, `h-4`, `h-5`, `h-6`, `h-8`, `h-[100px]` (+107 more)

**Layout** (278) — `block`, `flex`, `flex-1`, `flex-col`, `flex-grow`, `flex-nowrap`, `flex-row`, `flex-shrink-0`, `flex-wrap`, `grid`, `grid-cols-1`, `grid-cols-2` (+16 more)

**Typography** (263) — `break-all`, `break-words`, `capitalize`, `font-[Cairo]`, `font-base`, `font-black`, `font-body`, `font-bold`, `font-display`, `font-display-sans`, `font-medium`, `font-normal` (+22 more)

**Positioning** (214) — `absolute`, `bottom-0`, `bottom-10`, `fixed`, `inset-0`, `inset-5`, `inset-x-0`, `inset-y-0`, `left-0`, `left-1/2`, `left-4`, `left-5` (+24 more)

**Flexgrid** (194) — `content-container`, `content-flat`, `content-heading`, `content-notice`, `content-subheading`, `content-text`, `items-baseline`, `items-center`, `items-end`, `items-start`, `justify-between`, `justify-center` (+18 more)

**Borders** (132) — `border`, `border-current`, `border-none`, `rounded`, `rounded-2xl`, `rounded-[50%]`, `rounded-full`, `rounded-lg`, `rounded-md`, `rounded-none`, `rounded-sm`, `rounded-xl`

**Transitions** (70) — `duration-150`, `duration-200`, `duration-300`, `duration-50`, `ease-in-out`, `transition`, `transition-all`, `transition-colors`, `transition-opacity`, `transition-shadow`, `transition-transform`


## 🏆 Most Used Utilities (Top 20)

| Rank | Class | Usage | Category |
|------|-------|-------|----------|
| 1 | `flex` | 118 | layout |
| 2 | `items-center` | 82 | flexgrid |
| 3 | `w-full` | 82 | sizing |
| 4 | `font-bold` | 64 | typography |
| 5 | `relative` | 60 | positioning |
| 6 | `text-sm` | 57 | colors |
| 7 | `flex-col` | 48 | layout |
| 8 | `absolute` | 47 | positioning |
| 9 | `bg-white` | 33 | colors |
| 10 | `text-viz-grey` | 31 | colors |
| 11 | `text-center` | 30 | colors |
| 12 | `h-full` | 30 | sizing |
| 13 | `border` | 29 | borders |
| 14 | `font-medium` | 28 | typography |
| 15 | `justify-center` | 28 | flexgrid |
| 16 | `text-lg` | 28 | colors |
| 17 | `gap-2` | 26 | spacing |
| 18 | `overflow-hidden` | 26 | other |
| 19 | `?` | 25 | other |
| 20 | `:` | 25 | other |

## 🎨 Color Token Analysis

| Metric | Value | Status |
|--------|-------|--------|
| OKLCH Token Usage | 164 | ✅ |
| Raw Hex/Other Colors | 570 | ⚠️ |
| Token Adoption Rate | 22% | ⚠️ |
| Unused Tokens | 49 | ℹ️ |

### Color Classes in Use

**:mark{yellow}[yellow (5)]** — `bg-yellow-100`, `text-yellow-800`

**:mark{blue}[blue (24)]** — `bg-blue-600`, `border-blue-500`, `focus:border-blue-500`, `focus:ring-blue-500`, `hover:bg-blue-700`, `from-blue-400`, `text-blue-600`, `to-blue-600`

**:mark{pink}[pink (26)]** — `hover:text-pink-600`

**:mark{grey}[grey (92)]** — `bg-grey-200`, `hover:bg-grey-300`, `text-grey-700`

### Unused Color Tokens

- `--color-yellow-50`
- `--color-yellow-200`
- `--color-yellow-300`
- `--color-yellow-400`
- `--color-yellow-500`
- `--color-yellow-600`
- `--color-yellow-900`
- `--color-yellow-950`
- `--color-teal-50`
- `--color-teal-100`
- *...and 39 more*

## 📱 Responsive Design Coverage

| Breakpoint | Usage Count | Files |
|------------|-------------|-------|
| `sm:` | 23 | - |
| `md:` | 165 | - |
| `lg:` | 19 | - |
| `xl:` | 22 | - |
| `2xl:` | 0 | - |

**Components with responsive variants:** 31  
**Components without responsive variants:** 71  

## 🎭 Variant Usage

| Variant | Count |
|---------|-------|
| `hover:` | 52 |
| `focus:` | 36 |
| `disabled:` | 8 |
| `placeholder:` | 3 |
| `active:` | 1 |
| `dark:` | 1 |

## 🧩 Component Complexity

| Complexity | Count | Percentage |
|------------|-------|------------|
| Low (<20) | 48 | 47% |
| Medium (20-50) | 30 | 29% |
| High (>50) | 24 | 24% |

## 📁 Analysis by File Type

| Type | Files | Avg Classes | Total Classes |
|------|-------|-------------|---------------|
| Sections | 30 | 42.2 | 1267 |
| Routes | 16 | 60.8 | 972 |
| Structure | 18 | 23.7 | 426 |
| Interface | 15 | 25.7 | 385 |
| Components | 6 | 51.5 | 309 |
| Typography | 8 | 11.0 | 88 |
| Other | 2 | 6.0 | 12 |
| Layout | 7 | 0.4 | 3 |

## ⚠️ High Complexity Components

| File | Classes | Score | Issues |
|------|---------|-------|--------|
| `+page` | 239 | 265 | - |
| `+page` | 181 | 182 | - |
| `NavMenu` | 159 | 171 | inline styles |
| `SpeakerCard` | 138 | 160 | inline styles |
| `SpeakerDetailsModal` | 141 | 159 | inline styles |
| `+page` | 148 | 159 | - |
| `+page` | 140 | 140 | no responsive |
| `ProposalFilters` | 127 | 132 | - |
| `SponsorshipContactForm` | 108 | 109 | - |
| `PolygonPlayground` | 103 | 106 | - |

## 💡 Recommendations

### 🔴 High Priority

**Replace 570 non-token color usages with OKLCH tokens**
- Impact: Brand consistency, easier theming
- Action: Update classes to use design tokens from app.css

**Add responsive variants to 71 components**
- Impact: Better mobile experience
- Action: Add `md:` and `lg:` breakpoints where appropriate

### 🟡 Medium Priority

**Remove 49 unused color tokens**
- Impact: Smaller CSS bundle
- Action: Delete unused tokens from app.css @theme section

**Refactor 24 high-complexity components**
- Impact: Maintainability and readability
- Action: Extract repeated patterns into utility components

---
*Report generated by VizChitra Tailwind Audit*  
*Run: `pnpm audit:tailwind`*
