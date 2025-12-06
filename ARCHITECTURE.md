# Architecture Documentation

## Overview

The Matthew Don author website is built with Next.js 16 using the App Router pattern. This document describes the architecture, design patterns, and data flow.

## Architecture Principles

1. **Accessibility First**: WCAG AA compliant, keyboard navigable, screen reader optimized
2. **Performance**: Optimized images, lazy loading, efficient rendering
3. **Maintainability**: Centralized configuration, type-safe, well-documented
4. **User Experience**: Responsive, intuitive, fast

## Folder Structure

### `/src/app/`

Next.js App Router pages and layouts.

- `(catalog)/` - Route group for book-related pages (books, comics)
- `components/` - Components used within app pages
- `about/`, `contact/` - Static pages
- `layout.tsx` - Root layout with navbar and footer
- `page.tsx` - Home page
- `error.tsx`, `not-found.tsx` - Error pages
- `loading.tsx` - Loading states

### `/src/components/`

Shared, reusable components organized by purpose.

- `layout/` - Layout components (header, footer, skip-to-content)
- `ui/` - Base UI components (buttons, cards, carousels)
- `book/` - Book-specific components
- `effects/` - Visual effects (animations, confetti)

### `/src/lib/`

Business logic, utilities, and configuration.

#### `/src/lib/config/`

Centralized site configuration.

- `site.ts` - Site metadata, social links, copyright
- `navigation.ts` - Navigation structure (main nav, footer, books menu)
- `vendors.ts` - External vendor configs (Amazon, Goodreads, etc.)

#### `/src/lib/data/`

All data for the site.

- `books/` - Book catalog with types and helpers
  - `types.ts` - TypeScript interfaces for books
  - `adventures-series.ts` - Luca and Kai series data
  - `comics.ts` - Comics data
  - `standalone.ts` - Standalone books
  - `index.ts` - Exports and helper functions

#### `/src/lib/theme/`

Design system tokens.

- `colors.ts` - Color palette
- `typography.ts` - Typography scale
- `spacing.ts` - Spacing values
- `animations.ts` - Animation presets
- `index.ts` - Barrel export with focus styles

#### `/src/lib/hooks/`

Custom React hooks.

- `use-reduced-motion.ts` - Detects prefers-reduced-motion

#### `/src/lib/utils/`

Utility functions.

- `slug.ts` - URL slug generation and validation
- `cn.ts` - Tailwind class name utilities

## Data Flow

### Book Data Flow

```
books/*.ts (Source data)
  ↓
books/index.ts (Exports + helpers)
  ↓
Page components (Import and use)
  ↓
UI components (Display)
```

### Configuration Flow

```
config/*.ts (Site settings)
  ↓
Components (Import directly)
  ↓
Render (Use config values)
```

## Design Patterns

### 1. Centralized Configuration

All site-wide settings are in `/src/lib/config/`:

```typescript
import { siteConfig, mainNav, vendors } from "@/lib/config"
```

**Benefits:**

- Single source of truth
- Easy to update
- Type-safe
- Prevents hardcoded values

### 2. Unified Data Structure

Books have a single, comprehensive interface:

```typescript
interface Book {
  id: string
  slug: string
  title: string
  // ... all related data nested
}
```

**Benefits:**

- No data fragmentation
- All related data in one place
- Type-safe access
- Easy to query and filter

### 3. Helper Functions

Data modules export helper functions:

```typescript
import { getBookBySlug, getBooksByCategory } from "@/lib/data/books"

const book = getBookBySlug("the-moon-queen")
const adventures = getBooksByCategory("adventures")
```

**Benefits:**

- Encapsulated logic
- Consistent querying
- Easy to test
- Prevents duplication

### 4. Design System Tokens

Theme values are centralized and exported:

```typescript
import { colors, typography, spacing } from "@/lib/theme"

;<h1 className={typography.heading.h1}>Title</h1>
```

**Benefits:**

- Consistent styling
- Easy theming
- Design at scale
- Type-safe

### 5. Custom Hooks

Reusable React logic:

```typescript
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion"

const shouldReduceMotion = useReducedMotion()
```

**Benefits:**

- Encapsulated behavior
- Reusable across components
- Testable
- Clean component code

## Routing Strategy

### App Router Structure

```
/                           → Home page
/about                      → About page
/contact                    → Contact page
/books/[slug]              → Book detail page
/comics/[slug]             → Comic detail page
```

### Dynamic Routes

Book pages use dynamic `[slug]` parameter:

```typescript
// app/(catalog)/books/[slug]/page.tsx
export default function BookPage({ params }: { params: { slug: string } }) {
  const book = getBookBySlug(params.slug)
  // ...
}
```

### Route Groups

`(catalog)` is a route group that doesn't affect URL structure but allows shared layouts/errors.

## Component Patterns

### Server Components (Default)

Most components are server components for performance:

```typescript
// No 'use client' directive
export default function BookPage() {
  // Fetches data on server
}
```

### Client Components

Only use `'use client'` when needed:

- State management (useState, useReducer)
- Event handlers (onClick, onChange)
- Browser APIs (window, localStorage)
- Custom hooks

```typescript
"use client"

export function InteractiveComponent() {
  const [state, setState] = useState()
  // ...
}
```

### Component Composition

Components are composed for flexibility:

```typescript
<AnimatedSection>
  <BookCover />
  <BookInfo />
  <Reviews />
</AnimatedSection>
```

## State Management

### No Global State

The site doesn't use Redux/Zustand because:

- Mostly static content
- Server components where possible
- Local state for interactions

### Local State

Component-level state with `useState`:

```typescript
const [isOpen, setIsOpen] = useState(false)
```

### URL State

Navigation state in URL:

- Current page
- Book slug
- Hash for sections

## Styling Strategy

### Tailwind CSS

Utility-first CSS with:

- Design tokens via config
- Responsive modifiers
- Dark mode support

### Component Styles

```typescript
<div className="flex flex-col gap-4 p-6 rounded-lg bg-white dark:bg-black">
```

### Theme Integration

```typescript
import { colors } from '@/lib/theme';

// In tailwind.config.ts
colors: {
  'brand-primary': colors.brand.primary.default,
}
```

## Accessibility

### Focus Management

- Skip-to-content link
- Visible focus indicators
- Logical tab order

### ARIA Labels

- Proper landmarks (`nav`, `main`, `article`)
- ARIA attributes where semantic HTML isn't enough
- Screen reader text

### Motion

- Respects `prefers-reduced-motion`
- Optional animations
- No forced motion

### Keyboard Navigation

- All interactive elements keyboard accessible
- No keyboard traps
- Consistent shortcuts

## Performance

### Image Optimization

- Next.js Image component
- Lazy loading
- Responsive images
- Priority for above-fold

### Code Splitting

- Dynamic imports where beneficial
- Route-based splitting (automatic)
- Component-based splitting

### Rendering

- Server components by default
- Static generation where possible
- Client-side only when needed

## Type Safety

### TypeScript Strict Mode

```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "noImplicitOverride": true,
  "noPropertyAccessFromIndexSignature": true
}
```

### Typed Data

All data structures have TypeScript interfaces:

```typescript
interface Book {
  /* ... */
}
interface NavItem {
  /* ... */
}
interface VendorConfig {
  /* ... */
}
```

## Error Handling

### Error Boundaries

- Root error boundary (`app/error.tsx`)
- Catalog error boundary (`app/(catalog)/error.tsx`)
- 404 page (`app/not-found.tsx`)

### User-Friendly Messages

Errors show:

- Clear description
- Recovery action
- Navigation options

## Future Considerations

### Potential Enhancements

1. **Search**: Add book search functionality
2. **Blog**: Content marketing with blog posts
3. **Newsletter**: Email capture and newsletter
4. **Analytics**: Track user behavior
5. **CMS**: Admin interface for content updates
6. **Testing**: Unit and E2E tests
7. **i18n**: Multiple language support

### Scalability

The architecture supports:

- Adding new book categories
- More books without restructuring
- New page types
- Feature additions

### Migration Path

Backward compatibility maintained through:

- Legacy exports in `books/index.ts`
- Gradual component migration
- Feature flags (if needed)

---

**Last Updated**: December 6, 2025
**Version**: 1.0.0
