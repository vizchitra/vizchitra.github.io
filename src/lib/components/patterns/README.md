# Unclassified Components

This folder contains 15 components that blur the boundary between **decorative (patterns)** and
**semantic (blocks/sections)** in the design system.

Each component needs design review and clarification before being moved to its permanent home.

---

## Components Under Review

### 1. `BannerCurve.svelte`

**Current status:** Moved from patterns/ **Issue:** Is it a decorative curve pattern or a semantic
banner container?

- **If decorative:** Move back to patterns/
- **If semantic:** Move to blocks/ or sections/ **Decision needed:** Design review

---

### 2. `BannerPolygon.svelte`

**Current status:** Moved from patterns/ **Issue:** Similar to BannerCurve — is it decorative or
does it have semantic banner meaning? **Decision needed:** Design review

---

### 3. `ColumnChart.svelte`

**Current status:** Moved from patterns/ **Issue:** Data visualization component — is it:

- An interface component (just renders data)?
- A blocks component (semantic chart)?
- A pattern (decorative visualization)? **Decision needed:** Review usage and purpose

---

### 4. `Divider.svelte`

**Current status:** Moved from patterns/ **Issue:** Visual separator — is it:

- Interface (simple primitive separator)?
- Pattern (decorative visual)? **Decision needed:** Determine scope and role

---

### 5. `DividerCurves.svelte`

**Current status:** Moved from patterns/ **Issue:** Curve-based divider with animation

- Is it purely decorative?
- Does it have layout semantics? **Decision needed:** Visual audit needed

---

### 6. `DividerPolygon.svelte`

**Current status:** Moved from patterns/ **Issue:** Polygon-based divider

- Decorative pattern or semantic component? **Decision needed:** Clarify role

---

### 7. `PatternCircle.svelte`

**Current status:** Moved from patterns/ **Issue:** Circle pattern — is it:

- Pure visual decoration (patterns)?
- Building block for other components (blocks)? **Decision needed:** Check dependencies

---

### 8. `PatternFormats.svelte`

**Current status:** Moved from patterns/ **Issue:** Unclear purpose — is it:

- A visual pattern formatter?
- A semantic content block? **Decision needed:** Review implementation and usage

---

### 9. `PatternMountain.svelte`

**Current status:** Moved from patterns/ **Issue:** Mountain SVG pattern

- Decorative visual only?
- Has layout or semantic role? **Decision needed:** Visual audit

---

### 10. `PatternRiver.svelte`

**Current status:** Moved from patterns/ **Issue:** River pattern — ambiguous role **Decision
needed:** Determine if decorative or semantic

---

### 11. `PatternStream.svelte`

**Current status:** Moved from patterns/ **Issue:** Stream animation/pattern

- Purely decorative?
- Acts as semantic container? **Decision needed:** Review behavior and usage

---

### 12. `PatternWaves.svelte`

**Current status:** Moved from patterns/ **Issue:** Wave pattern/animation

- Decorative only?
- Has layout semantics? **Decision needed:** Visual and functional audit

---

### 13. `Pentagon.svelte`

**Current status:** Moved from patterns/ **Issue:** Pentagon shape renderer

- Decorative shape (patterns)?
- Reusable building block (blocks)? **Decision needed:** Check if used as block in other components

---

### 14. `Pentagons.svelte`

**Current status:** Moved from patterns/ **Issue:** Multiple pentagons component

- Decorative pattern?
- Semantic container? **Decision needed:** Review usage patterns

---

### 15. `VideoModal.svelte`

**Current status:** Moved from patterns/ **Issue:** Modal for video content

- Interface primitive (modal interaction)?
- Blocks component (semantic video modal)? **Decision needed:** Determine primary responsibility

---

## Decision Matrix

Use this to classify each component:

| Question                           | Yes →            | No →            |
| ---------------------------------- | ---------------- | --------------- |
| Is it optional/swappable?          | Patterns         | Blocks/Sections |
| Does removing it break layout?     | Blocks/Sections  | Patterns        |
| Is it purely visual decoration?    | Patterns         | Blocks/Sections |
| Does it express semantic meaning?  | Blocks/Sections  | Patterns        |
| Does it have interactive behavior? | Interface/Blocks | Patterns        |
| Is it page-level or global?        | Sections         | Blocks/Patterns |

---

## Next Steps

1. **Schedule design review session** with team (30 min)
2. **Work through decision matrix** for each component
3. **Document final decision** for each component
4. **Move components to final homes:**
   - Patterns → keep in patterns/
   - Blocks → move to blocks/
   - Sections → move to sections/
   - Interface → move to interface/
5. **Update exports** in index.ts
6. **Verify imports** across codebase
7. **Update this README** with final decisions

---

## Reference

See `COMPONENT_CLASSIFICATION_AUDIT.md` and `COMPONENT_PLACEMENT_SUMMARY.md` in repo root for
detailed analysis.
