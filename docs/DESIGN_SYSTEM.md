# Design System

The Matthew Don website design system provides a consistent visual language and user experience across all pages and components.

## Overview

The design system is centralized in `/src/lib/theme/` and provides:
- **Colors**: Brand colors, semantic colors, vendor colors, and neutral scale
- **Typography**: Display, heading, and body text scales
- **Spacing**: Component gaps, section padding, and container widths
- **Animations**: Framer Motion presets for consistent motion
- **Focus Styles**: Accessible focus indicators

## Colors

### Brand Colors

The primary brand colors establish the visual identity.

#### Primary (Black)
- **Default**: `#171717` - Main brand color, used for headers and important UI elements
- **Hover**: `#262626` - Slightly lighter for interactive states
- **Active**: `#404040` - Even lighter for active/pressed states

```tsx
import { colors } from '@/lib/theme';

<button style={{ backgroundColor: colors.brand.primary.default }}>
  Button
</button>
```

#### Secondary (Neon Green)
- **Default**: `#00ff77` - Accent color for CTAs and highlights
- **Hover**: `#00e66d` - Hover state
- **Active**: `#00cc63` - Active state

#### Accent (Coral Red)
- **Default**: `#FF6B6B` - For alerts, warnings, and special callouts
- **Hover**: `#FF5252`
- **Active**: `#FF3838`

### Semantic Colors

Colors with specific meanings:

| Color | Hex | Usage |
|-------|-----|-------|
| Success | `#00ff77` | Success messages, confirmations |
| Warning | `#FFA500` | Warnings, cautionary messages |
| Error | `#FF3838` | Errors, destructive actions |
| Info | `#3B82F6` | Informational messages |

### Vendor Colors

Brand colors for external platforms:

| Vendor | Hex | Usage |
|--------|-----|-------|
| Amazon | `#febd69` | Amazon purchase links |
| Goodreads | `#553b08` | Goodreads profile links |
| Instagram | `#E4405F` | Instagram social link |
| TikTok | `#000000` | TikTok social link |

### Neutral Scale

Gray scale for text, borders, and backgrounds:

| Level | Hex | Usage |
|-------|-----|-------|
| 50 | `#FAFAFA` | Lightest background |
| 100 | `#F5F5F5` | Light background |
| 200 | `#E5E5E5` | Borders, dividers |
| 300 | `#D4D4D4` | Disabled states |
| 400 | `#A3A3A3` | Placeholders |
| 500 | `#737373` | Secondary text |
| 600 | `#525252` | Body text |
| 700 | `#404040` | Headings |
| 800 | `#262626` | Dark headings |
| 900 | `#171717` | Darkest text |

## Typography

Typography uses the **Outfit** font family from Google Fonts with a consistent scale.

### Display Text

For hero sections and large headings:

| Size | Tailwind Class | Pixel Size | Usage |
|------|----------------|------------|-------|
| Large | `text-6xl font-bold` | 60px | Hero titles |
| Medium | `text-5xl font-bold` | 48px | Page heroes |
| Small | `text-4xl font-bold` | 36px | Section heroes |

```tsx
import { typography } from '@/lib/theme';

<h1 className={typography.display.large}>
  The Adventures of Luca and Kai
</h1>
```

### Headings

For section and component headings:

| Level | Tailwind Class | Pixel Size |
|-------|----------------|------------|
| H1 | `text-4xl font-bold` | 36px |
| H2 | `text-3xl font-bold` | 30px |
| H3 | `text-2xl font-semibold` | 24px |
| H4 | `text-xl font-semibold` | 20px |
| H5 | `text-lg font-semibold` | 18px |
| H6 | `text-base font-semibold` | 16px |

### Body Text

For paragraphs and general content:

| Size | Tailwind Class | Pixel Size | Usage |
|------|----------------|------------|-------|
| Large | `text-lg` | 18px | Lead paragraphs |
| Base | `text-base` | 16px | Body text |
| Small | `text-sm` | 14px | Captions, meta |
| Tiny | `text-xs` | 12px | Labels, fine print |

## Spacing

### Component Gaps

Internal spacing within components:

| Size | Tailwind Class | Pixel Size | Usage |
|------|----------------|------------|-------|
| XS | `gap-2` | 8px | Tight spacing |
| SM | `gap-4` | 16px | Default spacing |
| MD | `gap-6` | 24px | Comfortable spacing |
| LG | `gap-8` | 32px | Loose spacing |
| XL | `gap-12` | 48px | Section gaps |

```tsx
import { spacing } from '@/lib/theme';

<div className={`flex ${spacing.component.md}`}>
  <Card />
  <Card />
</div>
```

### Section Padding

Spacing between major page sections:

| Breakpoint | Tailwind Class | Vertical Padding |
|------------|----------------|------------------|
| Mobile | `py-16` | 64px |
| Tablet | `py-24` | 96px |
| Desktop | `py-32` | 128px |

### Container Widths

Content container max-widths:

| Size | Tailwind Class | Max Width |
|------|----------------|-----------|
| SM | `max-w-2xl` | 672px |
| MD | `max-w-4xl` | 896px |
| LG | `max-w-6xl` | 1152px |
| XL | `max-w-7xl` | 1280px |
| Full | `max-w-full` | 100% |

## Animations

Framer Motion animations with consistent timing and easing.

### Duration

```typescript
duration: {
  instant: 0.15,
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
}
```

### Easing

```typescript
easing: {
  ease: [0.4, 0.0, 0.2, 1],
  easeIn: [0.4, 0.0, 1, 1],
  easeOut: [0.0, 0.0, 0.2, 1],
  easeInOut: [0.4, 0.0, 0.2, 1],
}
```

### Variants

Pre-built animation variants:

#### Fade
```tsx
import { animations } from '@/lib/theme';

<motion.div
  initial="hidden"
  animate="visible"
  variants={animations.variants.fade}
>
  Content
</motion.div>
```

#### Slide Up
```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={animations.variants.slideUp}
>
  Content
</motion.div>
```

Available variants:
- `fade` - Fade in/out
- `slideUp` - Slide from bottom
- `slideDown` - Slide from top
- `slideLeft` - Slide from right
- `slideRight` - Slide from left
- `scale` - Scale up from 0.95

### Transitions

Pre-configured transitions:

```typescript
transitions: {
  default: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] },
  fast: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] },
  slow: { duration: 0.8, ease: [0.4, 0.0, 0.2, 1] },
  spring: { type: 'spring', stiffness: 300, damping: 30 },
}
```

## Focus Styles

Accessible focus indicators using Tailwind's `focus-visible` utilities.

### Default Focus

```tsx
<button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
  Click me
</button>
```

### Focus Utility

The design system exports a `focusRing` utility:

```tsx
import { focusRing } from '@/lib/theme';

<a href="/" className={focusRing}>
  Link
</a>
```

This applies:
```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-offset-2
focus-visible:ring-brand-primary
```

## Usage Examples

### Button Component

```tsx
import { colors, typography, focusRing } from '@/lib/theme';
import { cn } from '@/lib/utils';

export function Button({ children, variant = 'primary' }) {
  return (
    <button
      className={cn(
        typography.body.base,
        focusRing,
        'px-6 py-3 rounded-md font-semibold transition-colors',
        variant === 'primary' && [
          'bg-brand-primary text-white',
          'hover:bg-brand-primary-hover',
          'active:bg-brand-primary-active',
        ],
        variant === 'secondary' && [
          'bg-brand-secondary text-black',
          'hover:bg-brand-secondary-hover',
          'active:bg-brand-secondary-active',
        ]
      )}
    >
      {children}
    </button>
  );
}
```

### Card Component

```tsx
import { spacing, focusRing } from '@/lib/theme';
import { motion } from 'framer-motion';
import { animations } from '@/lib/theme';

export function Card({ title, description }) {
  return (
    <motion.article
      variants={animations.variants.slideUp}
      className={cn(
        'p-6 rounded-lg',
        'bg-white dark:bg-neutral-900',
        'border border-neutral-200 dark:border-neutral-800',
        spacing.component.md
      )}
    >
      <h3 className={typography.heading.h3}>{title}</h3>
      <p className={typography.body.base}>{description}</p>
    </motion.article>
  );
}
```

### Section Layout

```tsx
import { spacing } from '@/lib/theme';

export function Section({ children }) {
  return (
    <section className={cn(
      spacing.section.mobile,
      'md:py-24',
      'lg:py-32'
    )}>
      <div className={cn(
        'container mx-auto px-4',
        spacing.container.lg
      )}>
        {children}
      </div>
    </section>
  );
}
```

## Dark Mode

The design system supports dark mode through Tailwind's `dark:` modifier.

### Best Practices

1. **Always provide dark variants** for backgrounds and text
2. **Test contrast** in both modes
3. **Use semantic colors** that work in both themes
4. **Adjust borders** - lighter in dark mode

```tsx
<div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
  Content
</div>
```

## Accessibility

### Color Contrast

All color combinations meet WCAG AA standards:
- **Normal text**: 4.5:1 contrast ratio minimum
- **Large text** (18px+): 3:1 contrast ratio minimum

### Motion

Respect user's motion preferences:

```tsx
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import { motion } from 'framer-motion';

export function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : animations.transitions.default}
    >
      Content
    </motion.div>
  );
}
```

### Focus Indicators

Always visible for keyboard navigation:

```tsx
import { focusRing } from '@/lib/theme';

<a href="/" className={focusRing}>
  Link text
</a>
```

## Customization

### Tailwind Config

The design system is integrated with Tailwind CSS:

```typescript
// tailwind.config.ts
import { colors } from './src/lib/theme';

export default {
  theme: {
    extend: {
      colors: {
        'brand-primary': colors.brand.primary.default,
        'brand-secondary': colors.brand.secondary.default,
        // ...
      },
    },
  },
};
```

### Adding New Colors

1. Add to `src/lib/theme/colors.ts`:

```typescript
export const colors = {
  // ... existing colors
  custom: {
    purple: '#9333EA',
  },
} as const;
```

2. Update Tailwind config:

```typescript
colors: {
  'custom-purple': colors.custom.purple,
}
```

3. Use in components:

```tsx
<div className="bg-custom-purple">
  Content
</div>
```

---

**Last Updated**: December 6, 2025
**Version**: 1.0.0
