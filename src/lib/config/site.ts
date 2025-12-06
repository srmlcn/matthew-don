/**
 * Site Configuration
 *
 * Centralized configuration for site-wide metadata and settings.
 */

export const siteConfig = {
  name: "Matthew Don",
  description: "Official website of author Matthew Don",
  author: {
    name: "Matthew Don",
    nicknames: ["Matt", "Mo", "Pete", "MoPete"],
    bio: "Author of The Adventures of Luca and Kai series and other books",
  },

  social: {
    instagram: {
      url: "https://www.instagram.com/hiimmattdon/",
      handle: "@hiimmattdon",
    },
    tiktok: {
      url: "https://www.tiktok.com/@hiimmattdon",
      handle: "@hiimmattdon",
    },
    amazon: {
      url: "https://www.amazon.com/stores/Matthew-Don/author/B00YF2KSWO",
      label: "Amazon Author Page",
    },
    goodreads: {
      url: "https://www.goodreads.com/author/show/21029434.Matthew_Don",
      label: "Goodreads Profile",
    },
  },

  contact: {
    preferredMethods: ["instagram", "tiktok"] as const,
    message:
      "Have questions? Want to say hi? Message me on Instagram or TikTok!",
  },

  copyright: {
    year: new Date().getFullYear(),
    holder: "Matthew Don",
    message: `© ${new Date().getFullYear()} Matthew Don. All rights reserved.`,
  },

  images: {
    profilePicture: "/profile-picture.png",
    authorPhoto: "/matthew-don.jpg",
    ogDefault: "/matthew-don.jpg",
  },
} as const

export type SiteConfig = typeof siteConfig
