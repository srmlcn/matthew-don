/**
 * Navigation Configuration
 * 
 * Centralized navigation structure for the site.
 */

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

// Main navigation items (header)
export const mainNav: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

// Books dropdown navigation
export const booksNav: NavSection[] = [
  {
    title: 'The Adventures of Luca and Kai',
    items: [
      {
        label: 'The Moon Queen (Book 1)',
        href: '/books/the-adventures-of-luca-and-kai-the-moon-queen',
      },
      {
        label: 'The Celestial Samurai (Book 2)',
        href: '/books/the-adventures-of-luca-and-kai-the-celestial-samurai',
      },
      {
        label: 'The Comics',
        href: '/comics/the-adventures-of-luca-and-kai-the-comics',
      },
    ],
  },
  {
    title: 'Other Books',
    items: [
      {
        label: 'A Celebration of the History of Celebrating History',
        href: '/books/a-celebration-of-the-history-of-celebrating-history',
      },
    ],
  },
];

// Footer navigation
export const footerNav: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
  {
    label: 'Books',
    href: '/#books',
  },
];

// Social links
export const socialNav: NavItem[] = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/hiimmattdon/',
    external: true,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@hiimmattdon',
    external: true,
  },
  {
    label: 'Amazon',
    href: 'https://www.amazon.com/stores/Matthew-Don/author/B00YF2KSWO',
    external: true,
  },
  {
    label: 'Goodreads',
    href: 'https://www.goodreads.com/author/show/21029434.Matthew_Don',
    external: true,
  },
];
