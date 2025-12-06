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
├── app/                      # Next.js app router pages
│   ├── (catalog)/           # Book catalog routes
│   ├── components/          # Page-specific components
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   └── layout.tsx          # Root layout
├── components/              # Shared components
│   ├── layout/             # Layout components
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── config/             # Site configuration
│   ├── data/               # Centralized data
│   │   └── books/         # Book data and types
│   ├── hooks/              # Custom React hooks
│   ├── theme/              # Design system tokens
│   └── utils/              # Utility functions
└── styles/
    └── globals.css         # Global styles
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

## 📖 Adding/Updating Books

Books are managed in `src/lib/data/books/`:

1. Add book data to the appropriate file:

   - `adventures-series.ts` - Luca and Kai books
   - `comics.ts` - Comic books
   - `standalone.ts` - Standalone titles

2. Follow the `Book` interface in `types.ts`

3. Books will automatically appear on the site

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
