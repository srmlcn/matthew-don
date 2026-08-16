# Contributing Guidelines

Thank you for your interest in contributing to the Matthew Don author website! This document provides guidelines for code style, component creation, and development workflow.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Code Style](#code-style)
3. [Component Guidelines](#component-guidelines)
4. [Data Management](#data-management)
5. [Accessibility Requirements](#accessibility-requirements)
6. [Testing](#testing)
7. [Git Workflow](#git-workflow)
8. [Pull Request Process](#pull-request-process)

## Getting Started

1. **Fork the repository** and clone it locally
2. **Install dependencies**: `pnpm install`
3. **Create a branch**: `git checkout -b feat/your-feature-name`
4. **Run the dev server**: `pnpm dev`
5. **Make your changes** following these guidelines
6. **Test thoroughly** before committing
7. **Submit a pull request** with a clear description

## Code Style

### TypeScript

- **Always use TypeScript**: No `.js` or `.jsx` files
- **Strict mode is enabled**: All type errors must be resolved
- **No `any` types**: Use proper types or `unknown` if truly unknown
- **Explicit return types** for functions (except simple arrow functions)
- **Interface over type** for object shapes

```typescript
// ✅ Good
interface BookProps {
  book: Book
  featured?: boolean
}

export function BookCard({ book, featured = false }: BookProps): JSX.Element {
  // ...
}

// ❌ Bad
export function BookCard({ book, featured = false }: any) {
  // ...
}
```

### Naming Conventions

- **Components**: PascalCase (`BookCard`, `AnimatedSection`)
- **Files**: kebab-case (`book-card.tsx`, `use-reduced-motion.ts`)
- **Functions**: camelCase (`getBookBySlug`, `formatDate`)
- **Constants**: SCREAMING_SNAKE_CASE (`MAX_REVIEWS`, `DEFAULT_DURATION`)
- **Types/Interfaces**: PascalCase (`Book`, `NavItem`)

### File Organization

```typescript
// 1. React and Next.js imports
import { useState } from "react"
import Image from "next/image"

// 2. Third-party imports
import { motion } from "framer-motion"

// 3. Local imports (absolute paths preferred)
import { Book } from "@/lib/data/books/types"
import { colors } from "@/lib/theme"
import { BookInfo } from "./book-info"

// 4. Types and interfaces
interface ComponentProps {
  // ...
}

// 5. Component
export function Component({ prop }: ComponentProps) {
  // ...
}
```

### Formatting

- **Indentation**: 2 spaces
- **Quotes**: Single quotes for strings, double for JSX
- **Semicolons**: Required
- **Max line length**: 100 characters (flexible for readability)
- **Trailing commas**: Always

```typescript
// ✅ Good
const config = {
  name: "Matthew Don",
  social: ["twitter", "instagram"],
}

// ❌ Bad
const config = {
  name: "Matthew Don",
  social: ["twitter", "instagram"],
}
```

## Component Guidelines

### Server Components (Default)

Default to server components unless you need:

- Client-side state
- Event handlers
- Browser APIs
- Effects

```typescript
// ✅ Server component (no 'use client')
export function BookList() {
  const books = getAllBooks()
  return <div>{/* ... */}</div>
}

// ✅ Client component (when needed)
;("use client")

export function InteractiveCarousel() {
  const [index, setIndex] = useState(0)
  return <div>{/* ... */}</div>
}
```

### Component Structure

```typescript
"use client" // Only if needed

import /* imports */ "source"

// Types
interface ComponentProps {
  children: React.ReactNode
  className?: string
}

// Component
export function Component({
  children,
  className,
}: ComponentProps): JSX.Element {
  // 1. Hooks
  const [state, setState] = useState()
  const shouldReduceMotion = useReducedMotion()

  // 2. Derived values
  const isActive = state === "active"

  // 3. Handlers
  const handleClick = () => {
    setState("active")
  }

  // 4. Effects
  useEffect(() => {
    // ...
  }, [])

  // 5. Render
  return <div className={className}>{children}</div>
}
```

### Styling

- **Use Tailwind utilities** first
- **Use theme tokens** (`colors`, `typography`, `spacing`)
- **Responsive**: mobile-first approach
- **Dark mode**: always consider dark mode

```typescript
<button
  className={cn(
    "px-4 py-2 rounded-md",
    "bg-brand-primary text-white",
    "hover:bg-brand-primary-dark",
    "focus:outline-none focus:ring-2 focus:ring-brand-primary",
    "dark:bg-brand-primary-dark dark:text-gray-100"
  )}
>
  Click me
</button>
```

### Props

- **Destructure props** in function signature
- **Default values** in destructuring
- **Required props first**, optional props last
- **Pass through props** with spread when appropriate

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(baseStyles, className)} {...props}>
      {children}
    </button>
  )
}
```

## Data Management

### Adding a New Book

1. **Add images** to `/public/` (cover and optional preview pages).

2. **Insert catalog data** via Drizzle Studio (`pnpm db:studio`), Neon console, or seed JSON:

   - Add an entry to `src/lib/db/seed-data/books.json` following the existing shape, then run `pnpm db:seed`
   - Or insert directly into `books`, `book_images`, `book_links`, and `book_reviews`

3. **Match the `Book` interface** in `src/lib/data/books/types.ts`:

```typescript
interface Book {
  id: string
  slug: string
  title: string
  subtitle?: string
  seriesInfo?: { name: string; book: number; total: number }
  status: "published" | "preorder" | "upcoming"
  category: "adventures" | "comedy" | "comics"
  releaseDate?: Date
  featured: boolean
  order: number
  shortDescription: string
  longDescription: string[]
  contentWarnings?: string[]
  cover: BookImage
  previewImages: BookImage[]
  links: { amazon?: BookLink; goodreads?: BookLink; internal?: string }
  reviews: BookReview[]
  availability: string
  isbn?: string
  pageCount?: number
}
```

4. **Test** that the book appears on the home page, nav dropdown, and `/books/[slug]` or `/comics/[slug]`.

Schema changes require `pnpm db:generate` then `pnpm db:migrate`.

### Updating Configuration

Configuration lives in `src/lib/config/`:

- **Site metadata**: `site.ts`
- **Navigation**: `navigation.ts`
- **Vendor settings**: `vendors.ts`

Always update config files rather than hardcoding values:

```typescript
// ✅ Good
import { siteConfig } from '@/lib/config';
<meta name="author" content={siteConfig.author.name} />

// ❌ Bad
<meta name="author" content="Matthew Don" />
```

## Accessibility Requirements

All contributions must meet WCAG AA standards:

### Keyboard Navigation

- **Tab order**: Logical and predictable
- **Focus indicators**: Visible on all interactive elements
- **Skip links**: Provided for bypassing navigation
- **No keyboard traps**: Users can navigate away

### Screen Readers

- **Semantic HTML**: Use proper elements (`nav`, `main`, `article`)
- **ARIA labels**: Add when semantic HTML isn't enough
- **Alt text**: All images must have descriptive alt text
- **Hidden text**: Use `.sr-only` for screen reader-only text

### Motion

- **Respect preferences**: Check `prefers-reduced-motion`
- **Use hook**: `useReducedMotion()` for animations
- **Disable when needed**: No motion if user prefers reduced

```typescript
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion"

export function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div animate={shouldReduceMotion ? {} : { opacity: 1 }}>
      Content
    </motion.div>
  )
}
```

### Color Contrast

- **4.5:1 minimum** for normal text
- **3:1 minimum** for large text
- **Test with tools**: Use browser DevTools or online checkers

### Forms

- **Labels**: All inputs must have labels
- **Error messages**: Clear, associated with inputs
- **Required fields**: Marked visually and with `aria-required`

## Testing

### Manual Testing Checklist

Before submitting:

- [ ] **Functionality**: Feature works as expected
- [ ] **Responsive**: Test mobile, tablet, desktop
- [ ] **Dark mode**: Test both light and dark themes
- [ ] **Keyboard**: Navigate with keyboard only
- [ ] **Screen reader**: Test with VoiceOver or NVDA
- [ ] **Reduced motion**: Test with `prefers-reduced-motion`
- [ ] **Errors**: Test error states
- [ ] **Loading**: Test loading states
- [ ] **Browser**: Test in Chrome, Firefox, Safari

### Automated Testing

(Coming soon)

- Unit tests with Jest
- Component tests with React Testing Library
- E2E tests with Playwright

## Git Workflow

### Branch Naming

- **Feature**: `feat/description` (e.g., `feat/add-newsletter`)
- **Bug fix**: `fix/description` (e.g., `fix/carousel-mobile`)
- **Docs**: `docs/description` (e.g., `docs/update-readme`)
- **Refactor**: `refactor/description` (e.g., `refactor/book-data`)

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semi-colons, etc.
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Updating build tasks, package manager configs, etc.

**Examples**:

```
feat(books): add The Dragon Warrior to adventures series

Added new book data for the fourth installment in the Adventures
of Luca and Kai series. Includes cover image, vendor links, and
initial reviews.

Closes #42
```

```
fix(carousel): make navigation visible on mobile

Changed carousel arrow buttons from opacity-0 to opacity-60 on
mobile so users can see and interact with them.

Fixes #38
```

### Commits Per Logical Segment

- **One logical change per commit**: Don't mix unrelated changes
- **Atomic commits**: Each commit should be a complete, working change
- **Descriptive messages**: Explain what and why, not how

## Pull Request Process

### Before Submitting

1. **Update your branch**: `git pull origin main --rebase`
2. **Run the build**: `pnpm build`
3. **Check for errors**: `pnpm lint`
4. **Test thoroughly**: Follow manual testing checklist
5. **Review your changes**: Read your own diff

### PR Description

Include:

- **Summary**: What does this PR do?
- **Motivation**: Why is this change needed?
- **Changes**: List of changes made
- **Screenshots**: For UI changes
- **Testing**: How was this tested?
- **Checklist**: Manual testing checklist (if applicable)

**Template**:

```markdown
## Summary

Brief description of changes.

## Motivation

Why is this needed? What problem does it solve?

## Changes

- Change 1
- Change 2
- Change 3

## Screenshots

(If applicable)

## Testing

- [ ] Functionality works
- [ ] Responsive on mobile/tablet/desktop
- [ ] Keyboard accessible
- [ ] Screen reader tested
- [ ] Dark mode works

## Related Issues

Closes #123
```

### Review Process

- PRs require approval before merging
- Address all review comments
- Keep discussions respectful and constructive
- Be open to feedback

### Merging

- **Squash and merge** for feature branches
- **Rebase and merge** for small fixes
- **Delete branch** after merging

---

## Questions?

If you have questions about contributing, please:

1. Check existing documentation (README, ARCHITECTURE)
2. Search existing issues
3. Open a new issue with your question
4. Contact via email: admin@matthewdon.com

Thank you for contributing! 🎉
