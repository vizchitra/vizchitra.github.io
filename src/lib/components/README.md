# Component Import Guide

This guide standardizes how components are imported across the VizChitra codebase.

## Standard Pattern (Recommended)

Import all components from the root barrel export for consistency:

```typescript
import { Button, Stack, Header, Heading } from '$lib/components';
```

## Alternative: Category-Level Imports

For better IDE autocomplete and code organization, you can use category-level imports:

```typescript
import { Button, Card, Dropdown } from '$lib/components/interface';
import { Stack, Grid, Container } from '$lib/components/layout';
import { Heading, Text, Prose } from '$lib/components/typography';
```

## Component Organization

Components are organized into 7 main categories:

### **layout/** - Layout Primitives
Stack, Grid, Flex, Container, Cluster, Switcher, FullBleed

### **typography/** - Text Components
Heading, SubHeading, Text, Prose, Slanted, ColorSpan, LogoType, LogoTagline, Notice

### **patterns/** - Visual Patterns & Decorations
BannerPolygon, BannerCurve, BannerSquare, BannerBlob, DividerPolygon, DividerCurves, PatternWaves, PatternRiver, PatternCircle, PatternStream, PatternRough, PatternFormats, Pentagons

### **interface/** - Interactive UI Components
Button, ButtonBar, Card, FormatCard, CallCard, Dropdown, VideoModal, ColorSwatch, SpeakerDeck, ColumnChart, MarqueeRow, InlineSvg, Deadline, BreadCrumb, ToolsCard, ToolsHeader

### **structure/** - Page Structure & Navigation
Header, Footer, Hero, NavMenu, MobileNavDrawer, SEO, SocialLink

### **sections/** - Page Sections & Features
RecapVideo, PurposeThree, VideoGrid, Mission, CallToAction, HeaderCallToAction, FAQ, Map, VenueCard, SponsorCard, SponsorButton, SponsorshipContactForm, TeamSection, MemberPentagon, HomepageSection, ConferenceDetails, KeyNote, Workshop2025, Speakers2025, SpeakerCard, SpeakerDetailsModal, SpeakerCardsTrack, SpeakerPentagon, PolygonPlayground, ImageUpload, SliderInput, SelectInput

### **proposals/** - Proposal Components
ProposalCard, ProposalBadge, ProposalStatusBadge, ProposalFilters, UpvoteButton

## Exception: Sibling Component Imports

Components in the same directory/feature can use relative imports for cohesion:

```typescript
// In /sections/conference/SpeakerCard/SpeakerCard.svelte
import SpeakerPentagon from './SpeakerPentagon.svelte';
import SpeakerDetailsModal from './SpeakerDetailsModal.svelte';
```

## Deprecated Patterns

❌ **Avoid direct .svelte imports from other directories:**

```typescript
// Don't do this
import Button from '$lib/components/interface/Button.svelte';
import Stack from '$lib/components/layout/Stack.svelte';

// Do this instead
import { Button, Stack } from '$lib/components';
```

## Migration Examples

### Example 1: Route File

**Before:**
```typescript
import Header from '$lib/components/structure/Header.svelte';
import Stack from '$lib/components/layout/Stack.svelte';
import Cluster from '$lib/components/layout/Cluster.svelte';
```

**After:**
```typescript
import { Header, Stack, Cluster } from '$lib/components';
```

### Example 2: Component File

**Before:**
```typescript
import BannerPolygon from '$lib/components/patterns/BannerPolygon.svelte';
import BannerCurve from '$lib/components/patterns/BannerCurve.svelte';
import FullBleed from '$lib/components/layout/FullBleed.svelte';
```

**After:**
```typescript
import { BannerPolygon, BannerCurve, FullBleed } from '$lib/components';
```

### Example 3: Mixed Category Imports

**Before:**
```typescript
import { Flex, FullBleed } from '$lib/components/layout';
import { CallCard, Button } from '$lib/components/interface';
import { Heading, Text } from '$lib/components/typography';
```

**After (consolidated):**
```typescript
import {
  Flex, FullBleed,
  CallCard, Button,
  Heading, Text
} from '$lib/components';
```

**Or (with comments for clarity):**
```typescript
import {
  // Layout
  Flex, FullBleed,
  // Interface
  CallCard, Button,
  // Typography
  Heading, Text
} from '$lib/components';
```

## Benefits

1. **Consistency** - One clear pattern across entire codebase
2. **Maintainability** - Move components without updating many import paths
3. **Readability** - Cleaner, less verbose import statements
4. **Developer Experience** - Predictable import locations
5. **Tree-shaking** - Modern bundlers handle barrel exports efficiently
6. **Discoverability** - Easier to find available components via IDE autocomplete

## Adding New Components

When creating new components:

1. Place the component in the appropriate category directory
2. Export it from that category's `index.ts` file:
   ```typescript
   export { default as MyNewComponent } from './MyNewComponent.svelte';
   ```
3. Verify the root `index.ts` re-exports the category
4. Use the component via barrel import in your code

## Future Considerations

- **ESLint Rule**: Add a rule to enforce barrel imports
- **Auto-import Configuration**: Update IDE settings to prefer barrel imports
- **Monitoring**: Periodically check for import pattern drift
