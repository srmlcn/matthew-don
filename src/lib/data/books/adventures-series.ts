/**
 * Adventures of Luca and Kai Series
 * 
 * Book data for the Adventures of Luca and Kai series (Books 1-3).
 */

import type { Book, BookImage, BookReview } from './types';

// Book 1: The Moon Queen
const moonQueenCover: BookImage = {
  src: '/adventures/book1-cover.jpg',
  alt: 'The Adventures of Luca and Kai: The Moon Queen book cover',
  width: 1169,
  height: 1749,
};

const moonQueenPreviews: BookImage[] = [
  {
    src: '/adventures/book1-1.png',
    alt: 'The Adventures of Luca and Kai: The Moon Queen - Preview page 1',
    width: 1026,
    height: 1539,
  },
  {
    src: '/adventures/book1-2.png',
    alt: 'The Adventures of Luca and Kai: The Moon Queen - Preview page 2',
    width: 1026,
    height: 1539,
  },
  {
    src: '/adventures/book1-3.png',
    alt: 'The Adventures of Luca and Kai: The Moon Queen - Preview page 3',
    width: 1026,
    height: 1539,
  },
];

const moonQueenReviews: BookReview[] = [
  {
    name: 'SirchNod',
    description: 'Amazon review',
    review: 'This is a great book to read to the family at night. Fun for the kids and fun for the adult reading it too!',
    stars: 5,
  },
  {
    name: 'Liz Mangum',
    description: 'Goodreads review',
    review: 'Adorable, heartfelt book about brotherly love, courage, and adventure!',
    stars: 5,
  },
];

export const moonQueen: Book = {
  id: 'luca-kai-1-moon-queen',
  slug: 'the-adventures-of-luca-and-kai-the-moon-queen',
  
  title: 'The Adventures of Luca and Kai',
  subtitle: 'The Moon Queen',
  seriesInfo: {
    name: 'The Adventures of Luca and Kai',
    book: 1,
    total: 3,
  },
  
  status: 'published',
  category: 'adventures',
  releaseDate: new Date('2024-06-28'),
  featured: false,
  order: 2,
  
  shortDescription: 'Fun for all ages!',
  longDescription: [
    'Luca and Kai are two young brothers with an openness for adventure that\'s as big as their imagination. At least what their imagination can allow while grounded in their room. When two portals open next to them, they are thrust into an experience like no other, meeting unique friends and fearsome enemies along the way. Through fast paced action, hilarious antics and mind-bending physics, our heroes discover they are in control of their own destinies. Who will they decide to become?',
  ],
  
  cover: moonQueenCover,
  previewImages: moonQueenPreviews,
  
  links: {
    amazon: {
      url: 'https://www.amazon.com/Adventures-Luca-Kai-Moon-Queen/dp/B0D8BGZWNG/ref=sr_1_1?crid=32XVBESZWY8XY&dib=eyJ2IjoiMSJ9.5kREcehvyjzCUnPVvAVzezHkbkoApLN3dbZvZ2PtLvrRg5B8S0i8Fcd4y01pCFbi5NP5uZElRzNBwzzpIg_U0SjGYGaLUvi5m_MEUZwq0fRsyetbZgh5AJ4eRjROJnuTpBPfBuQWCpDFDgam2G0bdYjLjNpQ9Ng7zXfZEQZxbCySR7tNELmMNYpsKsEQeIXeW-oUWcyG9atztMPmWtI4bOMuqunicRfafPVCQZOnyAg.sR81PuCIdQRkAZht0_uKFNbQECAGGXm10Eb9EpaMYJY&dib_tag=se&keywords=adventures+of+luca+and+kai&qid=1737246838&sprefix=adventures+of+luca+and+kai%2Caps%2C129&sr=8-1',
      label: 'Check out on Amazon!',
    },
    goodreads: {
      url: 'https://www.goodreads.com/book/show/215561548-adventures-of-luca-and-kai',
      label: 'Check out on Goodreads!',
    },
    internal: '/books/the-adventures-of-luca-and-kai-the-moon-queen',
  },
  
  reviews: moonQueenReviews,
  
  availability: 'Available now in paperback, Ebook, and FREE through Kindle Unlimited!',
};

// Book 2: The Celestial Samurai
const celestialSamuraiCover: BookImage = {
  src: '/adventures/book2-cover.jpg',
  alt: 'The Adventures of Luca and Kai: The Celestial Samurai book cover',
  width: 1233,
  height: 1850,
};

export const celestialSamurai: Book = {
  id: 'luca-kai-2-celestial-samurai',
  slug: 'the-adventures-of-luca-and-kai-the-celestial-samurai',
  
  title: 'The Adventures of Luca and Kai',
  subtitle: 'The Celestial Samurai',
  seriesInfo: {
    name: 'The Adventures of Luca and Kai',
    book: 2,
    total: 3,
  },
  
  status: 'preorder',
  category: 'adventures',
  releaseDate: new Date('2025-08-23'),
  featured: true,
  order: 1,
  
  shortDescription: 'Fun for all ages!',
  longDescription: [
    'Five years have passed since the crew of The Esby heroically saved the children on the moon. Luca and Kai have become celebrities, with the story of their bravery becoming known worldwide. But some doubt them, and after years without seeing their former crew, Luca and Kai begin to doubt themselves. That is until a familiar face returns, threatening the existence of Earth itself. Will the courageous brothers be able to stop The Celestial Samurai?',
  ],
  
  cover: celestialSamuraiCover,
  previewImages: [],
  
  links: {
    amazon: {
      url: 'https://a.co/d/6XwHEyG',
      label: 'Check out on Amazon!',
    },
    goodreads: {
      url: 'https://www.goodreads.com/book/show/239357868-the-adventures-of-luca-and-kai',
      label: 'Check out on Goodreads!',
    },
    internal: '/books/the-adventures-of-luca-and-kai-the-celestial-samurai',
  },
  
  reviews: [],
  
  availability: 'Pre-order now! Available in paperback, Ebook, and FREE through Kindle Unlimited!',
};

// Book 3: Upcoming
const book3Cover: BookImage = {
  src: '/adventures/book3-cover.png',
  alt: 'The Adventures of Luca and Kai Book 3 - Coming Soon',
  width: 1271,
  height: 1906,
};

export const book3: Book = {
  id: 'luca-kai-3',
  slug: 'the-adventures-of-luca-and-kai-book-3',
  
  title: 'The Adventures of Luca and Kai',
  subtitle: 'Book 3',
  seriesInfo: {
    name: 'The Adventures of Luca and Kai',
    book: 3,
    total: 3,
  },
  
  status: 'upcoming',
  category: 'adventures',
  featured: false,
  order: 100,
  
  shortDescription: 'Coming Later...',
  longDescription: [
    'The epic conclusion to the Adventures of Luca and Kai trilogy is coming soon! Stay tuned for more updates.',
  ],
  
  cover: book3Cover,
  previewImages: [],
  
  links: {
    amazon: {
      url: 'https://www.amazon.com/stores/Matthew-Don/author/B00YF2KSWO?ref=ap_rdr&isDramIntegrated=true&shoppingPortalEnabled=true',
      label: 'Follow on Amazon',
    },
    goodreads: {
      url: 'https://www.goodreads.com/author/show/21029434.Matthew_Don',
      label: 'Follow on Goodreads',
    },
  },
  
  reviews: [],
  
  availability: 'Coming soon! Follow Matthew Don for updates.',
};
