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

# Copy environment template and set DATABASE_URL (Neon connection string)
cp .env.example .env.local

# Apply migrations and seed catalog (first-time setup)
pnpm db:migrate
pnpm db:seed

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
pnpm db:generate  # Generate migration from schema changes
pnpm db:migrate   # Apply migrations to DATABASE_URL
pnpm db:seed      # Upsert catalog from src/lib/db/seed-data/books.json
pnpm db:studio    # Open Drizzle Studio (catalog browser/editor)
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
│   ├── (admin)/                # Kinde-gated admin (own shell, no site chrome)
│   │   ├── admin/page.tsx        # Dashboard (section placeholders)
│   │   ├── components/           # Admin nav
│   │   └── layout.tsx            # Admin shell (top bar, nav, session check)
│   ├── api/auth/[kindeAuth]/    # Kinde login/logout/callback handler
│   ├── components/               # App-level components
│   ├── layout.tsx                # Root layout (html, providers only)
│   └── globals.css
├── components/                   # Shared UI and layout components
└── lib/
    ├── config/                   # Site configuration
    ├── db/                       # Drizzle schema, Neon client, seed data
    └── data/books/               # Book types and async query helpers
```

## Environment

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Neon Postgres connection string (dev branch locally, prod in Vercel) |
| `KINDE_CLIENT_ID` | Admin only | Kinde application client ID |
| `KINDE_CLIENT_SECRET` | Admin only | Kinde application client secret |
| `KINDE_ISSUER_URL` | Admin only | Kinde issuer URL (`https://<subdomain>.kinde.com`) |
| `KINDE_SITE_URL` | Admin only | App base URL (`http://localhost:3000` locally) |
| `KINDE_POST_LOGOUT_REDIRECT_URL` | Admin only | Post-logout redirect (usually = `KINDE_SITE_URL`) |
| `KINDE_POST_LOGIN_REDIRECT_URL` | Admin only | Post-login redirect (`<site>/admin`) |

Copy `.env.example` to `.env.local` for local development. Production and CI builds need `DATABASE_URL` set because catalog pages pre-render at build time.

For CI and Playwright (`pnpm test:e2e`), configure a Neon dev-branch URL as a secret.

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

The catalog is stored in Neon Postgres. Until the admin panel exists, use one of:

1. **Drizzle Studio** — `pnpm db:studio`
2. **Seed JSON** — edit `src/lib/db/seed-data/books.json`, then `pnpm db:seed`
3. **Neon SQL console** — direct table edits

Workflow for a new title:

1. Add cover/preview images under `public/`
2. Insert or seed a book row matching the `Book` interface in `src/lib/data/books/types.ts`
3. Add related rows in `book_images`, `book_links`, and `book_reviews` as needed

No per-book page files or navigation edits are required. The site derives URLs (`getBookPath`), nav (`getBooksNav`), breadcrumbs, and detail pages from the database automatically.

## Admin Panel

`/admin` hosts the Kinde-gated content backend. Phase 0 ships the auth boundary + shell only (dashboard placeholders, no CRUD yet).

**Setup:**

1. Create a Kinde application (web app) at [kinde.com](https://kinde.com) with callback `<site>/api/auth/kinde_callback` and logout redirect `<site>`.
2. Copy `.env.example` to `.env.local` and fill the six `KINDE_*` vars.
3. Run `pnpm dev`, open `http://localhost:3000/admin`, sign in via Kinde.

**How auth works:** `src/middleware.ts` (matcher `/admin/:path*`) redirects signed-out visitors to Kinde login; `src/app/(admin)/layout.tsx` re-checks the server session and renders the shell (top bar, section nav, user email, sign out). Auth callbacks live at `src/app/api/auth/[kindeAuth]/route.ts`. Admin routes are `force-dynamic` and `noindex`. The storefront stays fully public with zero auth overhead.

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
