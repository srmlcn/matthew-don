# Matthew Don - Author Website

Official website for author Matthew Don, showcasing his books including The Adventures of Luca and Kai series and other published works.

## 📚 About

This is a modern, accessible website built with Next.js featuring:

- Book catalog with detailed information
- Author biography and contact information
- Responsive design for all devices
- Accessibility-first approach (WCAG AA compliant)
- Optimized performance and SEO

## 🛠 Tech Stack

- **Framework**: Next.js 16.0.7 (App Router)
- **UI Library**: HeroUI 2.6.14
- **Styling**: Tailwind CSS 3.4.1
- **Animations**: Framer Motion 12.4.1
- **Language**: TypeScript 5 (Strict Mode)
- **Font**: Outfit (Google Fonts)
- **Icons**: Heroicons v2, React Icons
- **Package Manager**: pnpm

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ or 24+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/cainspencerm/matthew-don.git
cd matthew-don

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── app/
│   ├── (site)/                 # Public storefront (navbar, footer)
│   │   ├── (catalog)/            # Dynamic book/comic routes
│   │   │   ├── books/[slug]/
│   │   │   └── comics/[slug]/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── layout.tsx            # Site chrome
│   │   └── page.tsx              # Home
│   ├── components/               # App-level components
│   ├── layout.tsx                # Root layout (html, providers only)
│   └── globals.css
├── components/                   # Shared UI and layout components
└── lib/
    ├── config/                   # Site configuration
    └── data/books/               # Book catalog, types, and query helpers
```

## 🎨 Design System

The site uses a centralized design system with:

- **Colors**: Brand colors, semantic colors, vendor colors, neutral scale
- **Typography**: Display, heading, and body text scales
- **Spacing**: Consistent gaps, padding, and container widths
- **Animations**: Motion presets with reduced-motion support

See `src/lib/theme/` for the full design system.

## ♿️ Accessibility

We're committed to making this site accessible to everyone:

- ✅ WCAG AA compliance
- ✅ Keyboard navigation support
- ✅ Screen reader optimized
- ✅ Reduced motion support
- ✅ Focus management
- ✅ Semantic HTML and ARIA labels

## Adding/Updating Books

Books are managed in `src/lib/data/books/`:

1. Add a record to the appropriate file:
   - `adventures-series.ts` — Luca and Kai series
   - `comics.ts` — Comic books
   - `standalone.ts` — Standalone titles
2. Register it in `allBooks` inside `index.ts`
3. Follow the `Book` interface in `types.ts`

No per-book page files or navigation edits are required. The site derives URLs (`getBookPath`), nav (`getBooksNav`), breadcrumbs, and detail pages from the catalog automatically.

## Testing

End-to-end tests use [Playwright](https://playwright.dev/):

```bash
pnpm test:e2e          # Run all e2e tests (builds and starts the app)
pnpm test:e2e:ui       # Interactive test UI
pnpm test:e2e:report   # Open the HTML report after a run
```

Tests run against desktop and mobile viewports (`chromium`, `mobile-chrome`).

## 🚢 Deployment

The site is optimized for deployment on Vercel:

```bash
# Build the project
pnpm build

# The build output will be in .next/
```

For other platforms, refer to [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 📝 License

Copyright © 2025 Matthew Don. All rights reserved.

## 🤝 Contributing

This is a personal website. For bug reports or suggestions, please open an issue.

## 📧 Contact

- Instagram: [@hiimmattdon](https://www.instagram.com/hiimmattdon/)
- TikTok: [@hiimmattdon](https://www.tiktok.com/@hiimmattdon)
- Amazon: [Author Page](https://www.amazon.com/stores/Matthew-Don/author/B00YF2KSWO)
- Goodreads: [Author Profile](https://www.goodreads.com/author/show/21029434.Matthew_Don)
