---
title: CSS Audit Report
description: Automated scan for CSS issues across Svelte components
category: audit
generated: true
draft: false
order: 1
---

# CSS Audit Report

**Generated:** 2026-02-01  
**Files scanned:** 103  
**Files with issues:** 42  

## 📊 Summary by Category

| Category | Icon | Count | Description |
|----------|------|-------|-------------|
| ⚠️ **Color Issues** | 🎨 | 28 | Raw hex colors that should use design tokens |
| ⚠️ **Spacing Issues** | 📏 | 4 | Non-standard spacing values outside Tailwind scale |
| ⚠️ **Style Issues** | 💄 | 23 | Inline styles that should use Tailwind utilities |
| ⚠️ **Class Issues** | 🏷️ | 9 | Arbitrary values in class attributes |

## 📁 Issues by File Type

| File Type | Issues/Total | Percentage |
|-----------|--------------|------------|
| Other Files | 2/2 | 100% |
| Interface Components | 5/15 | 33% |
| Other Components | 2/13 | 15% |
| Section Components | 19/30 | 63% |
| Structure Components | 7/18 | 39% |
| Typography Components | 3/8 | 38% |
| Route Pages | 4/17 | 24% |

## 🧩 Components Issues

### 🎨 Color Issues - Components

| Component | Issue |
|-----------|-------|
| `ColumnChart` | #a5b4fc, #1f2937, #6b7280, #9ca3af, #f3f4f6, #e5e7eb, #ffffff |
| `PatternRough` | #000000 |
| `CallToAction` | #ffd485, #97e4dd, #a8bdf0, #f89f72, #ee88b3 |
| `HeaderCallToAction` | #4c4c4c, #222 |
| `SpeakerCard` | #F68669B3, #E6327EB3, #F3ACCA, #FFD485, #F3844C, #FBBC9D, #FACCE5, #659ABC, #9CAEDF, #ccc, #68B9B2 |
| `SpeakerCardsTrack` | #666, #666666, #999, #F5C7C7 |
| `SpeakerDetailsModal` | #ffffffaa, #ccc, #68B9B2, #444, #FFD485, #F89F72 |
| `SpeakerPentagon` | #FFD485, #F89F72, #4c4c4c |
| `FAQ` | #e5e7eb |
| `Map` | #ff00ff |
| `PolygonGenerator` | #ddd, #4c4c4c |
| `PolygonPlayground` | #ffffff, #747474, #dddddd |
| `SelectInput` | #dddddd |
| `SliderInput` | #ddd, #4c4c44, #000000, #bbb |
| `AttendeeCharts` | #a5b4fc, #8b5cf6, #f9a8d4, #ec4899, #6ee7b7, #10b981 |
| `SponsorCard` | #f8d7da, #e91e63, #fff8dc, #ffa500, #F89F72, #661e00, #e3f2fd, #2196f3, #e8f5e8, #4caf50, #F6F6F6, #4C4C4C, #3B3B3B, #444, #333 |
| `SponsorshipContactForm` | #d1d5db, #e91e63 |
| `MemberPentagon` | #4c4c4c |
| `BannerCurve` | #000000, #ffffff, #c4c4c4, #f2f2f2 |
| `BannerPolygon` | #ffffff, #c4c4c4, #f2f2f2 |
| `MobileNavDrawer` | #4C4C4C, #4c4c4c |
| `NavMenu` | #4C4C4C |
| `VizChitraLogoType` | #D46637 |

### 📏 Spacing Issues - Components

| Component | Issue |
|-----------|-------|
| `ProposalFilters` | pr-11 |
| `RecapVideo` | p-2025 |
| `SliderInput` | m-9, m-7 |

### 💄 Style Issues - Components

| Component | Issue |
|-----------|-------|
| `Button` | 1 occurrence(s) |
| `ColumnChart` | 5 occurrence(s) |
| `Deadline` | 1 occurrence(s) |
| `MarqueeRow` | 2 occurrence(s) |
| `SpeakerDeck` | 1 occurrence(s) |
| `RecapVideo` | 1 occurrence(s) |
| `VideoGrid` | 1 occurrence(s) |
| `SpeakerCard` | 4 occurrence(s) |
| `SpeakerDetailsModal` | 3 occurrence(s) |
| `SpeakerPentagon` | 4 occurrence(s) |
| `Map` | 1 occurrence(s) |
| `PolygonGenerator` | 4 occurrence(s) |
| `AttendeeMarquee` | 1 occurrence(s) |
| `SponsorCard` | 1 occurrence(s) |
| `MemberPentagon` | 2 occurrence(s) |
| `BannerBlob` | 1 occurrence(s) |
| `BannerCurve` | 1 occurrence(s) |
| `BannerPolygon` | 1 occurrence(s) |
| `BannerSquare` | 1 occurrence(s) |
| `NavMenu` | 1 occurrence(s) |
| `Pentagons` | 1 occurrence(s) |
| `Slanted` | 1 occurrence(s) |
| `VizChitraLogoTagline` | 1 occurrence(s) |

### 🏷️ Class Issues - Components

| Component | Issue |
|-----------|-------|
| `HeaderCallToAction` | [#4c4c4c], [#222] |
| `SpeakerCard` | [#ccc] |
| `SpeakerCardsTrack` | [#666], [#999], [#F5C7C7] |
| `SpeakerDetailsModal` | [#ffffffaa], [#ccc], [#444] |
| `PolygonPlayground` | [#747474], [#dddddd] |
| `SelectInput` | [#dddddd] |
| `MobileNavDrawer` | [#4C4C4C] |
| `NavMenu` | [#4C4C4C] |
| `VizChitraLogoType` | [#D46637] |


## 🛣️ Routes Issues

### 🎨 Color Issues - Routes

| Route | Issue |
|-------|-------|
| `design` | #123, #125, #f9fafb |
| `guides/[guideSlug] (layout)` | #e5e7eb, #6b7280, #374151, #111827, #f9fafb, #4b5563 |
| `guides/[guideSlug]/[sectionSlug]` | #e5e7eb, #4b5563, #111827, #9ca3af, #f9fafb, #6b7280 |

### 📏 Spacing Issues - Routes

| Route | Issue |
|-------|-------|
| `backup` | mt-18 |


## 📄 Other Files Issues

### 🎨 Color Issues - Other Files

| File | Issue |
|------|-------|
| `ButtonBar` | #f0f0f0, #333, #e0e0e0 |
| `MousePointer` | #4c4c4c |


## 🔥 Most Common Issues

| Issue | Type | Files Affected |
|-------|------|----------------|
| 💄 `1 occurrence(s)` | Inline styles | 16 |
| 💄 `4 occurrence(s)` | Inline styles | 3 |
| 🎨 `#4c4c4c` | Raw hex colors | 2 |
| 💄 `2 occurrence(s)` | Inline styles | 2 |
| 🏷️ `[#4C4C4C]` | Arbitrary hex values | 2 |
| 🎨 `#f0f0f0, #333, #e0e0e0` | Raw hex colors | 1 |
| 🎨 `#a5b4fc, #1f2937, #6b7280, #9ca3af, #f3f4f6, #e5e7eb, #ffffff` | Raw hex colors | 1 |
| 💄 `5 occurrence(s)` | Inline styles | 1 |
| 🎨 `#000000` | Raw hex colors | 1 |
| 📏 `pr-11` | Non-standard spacing | 1 |

---
*Report generated by VizChitra CSS Audit*
