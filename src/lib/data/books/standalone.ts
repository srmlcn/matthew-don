/**
 * Standalone Books
 * 
 * Book data for standalone titles not part of a series.
 */

import type { Book, BookImage, BookReview } from './types';

const celebrationCover: BookImage = {
  src: '/celebration/cover.jpg',
  alt: 'A Celebration of the History of Celebrating History book cover',
  width: 1200,
  height: 1920,
};

const celebrationPreviews: BookImage[] = [
  {
    src: '/celebration/1.png',
    alt: 'A Celebration of the History of Celebrating History - Preview page 1',
    width: 1026,
    height: 1539,
  },
  {
    src: '/celebration/2.png',
    alt: 'A Celebration of the History of Celebrating History - Preview page 2',
    width: 1026,
    height: 1539,
  },
  {
    src: '/celebration/3.png',
    alt: 'A Celebration of the History of Celebrating History - Preview page 3',
    width: 1026,
    height: 1539,
  },
];

const celebrationReviews: BookReview[] = [
  {
    name: 'Patsy Phililps',
    description: 'Amazon review',
    review: 'This was a great read, unexpected surprises keep you laughing. I didn\'t know what I was going to get from this book but very glad I read it. If your looking for something witty, funny, and informative, this would be a great pick up. I wish my history teachers back in the day could have picked up some of what this guy is dishing out, entertainment.',
    stars: 5,
  },
  {
    name: 'Neal B Phillips',
    description: 'Amazon review',
    review: 'I\'m not a huge reader but a friend recommended this so I gave it a shot. I\'m impressed. I really enjoy history and Mo Pete really brings some humor to the table and kept it interesting. For someone who doesn\'t read often, I finished this book pretty fast. I hope he does more!',
    stars: 5,
  },
  {
    name: 'Molly Corbin',
    description: 'Amazon review',
    review: 'Definitely laughed out loud! It was humorous and educational. Definitely worth a read. Can\'t wait till his next book and encourage everyone to give this one a shot.',
    stars: 5,
  },
  {
    name: 'Elizabeth Mangum',
    description: 'Amazon review',
    review: 'A fun read',
    stars: 5,
  },
];

export const celebrationOfHistory: Book = {
  id: 'celebration-of-history',
  slug: 'a-celebration-of-the-history-of-celebrating-history',
  
  title: 'A Celebration of the History of Celebrating History',
  
  status: 'published',
  category: 'comedy',
  releaseDate: new Date('2015-05-26'),
  featured: false,
  order: 4,
  
  shortDescription: 'Intended for mature audiences!',
  longDescription: [
    'PLEASE NOTE this book is purely a work of fiction, and does not contain any historical accuracy. FURTHERMORE, this book is intended for adults only. Yes, the humor is immature, but on top of terrible language and some cringeworthy attempts at jokes, the story also delves into serious and potentially triggering topics like depression and suicide.',
    'We all love spending a day off work and eating obscene amounts of food on our favorite holidays, but do you know the stories behind these special days? Join me as we take a journey through history and learn how our traditions came to be. Your mind will swell with knowledge as you learn things like how the customs of Halloween spur from a despicable dentist looking to make money by rotting the teeth of children, or how Hanukkah celebrates the unexpectedly decent career of Adam Sandler. You will bask in glorious wisdom while you discover how the Romans celebrated the new year by having drunken orgies, and how Cinco de Mayo was born thanks to hot dogs and an inept French cook. You will learn all this and more within the pages of this informational text, A Celebration of the History of Celebrating History.',
  ],
  contentWarnings: [
    'Strong language',
    'Adult humor',
    'Discusses depression and suicide',
    'Not historically accurate',
  ],
  
  cover: celebrationCover,
  previewImages: celebrationPreviews,
  
  links: {
    amazon: {
      url: 'https://www.amazon.com/Celebration-History-Celebrating-ebook/dp/B00YEWEHD6/ref=sr_1_1?crid=N78CCUOB5CWL&dib=eyJ2IjoiMSJ9.LSQAmVU9AyzSJfDf8FtIWGSLbaXOj99jaj7q5_x2AoFl0Wy-fHsk0AW36AyRpYEXCtI5vDMv3StvyrhCLB0Hfe0rU7lBq-yLAgXxBN0SzCDjcmt3Wul0KCv0p2g92jVcaS8Sp1PbY88g7PpJJIyvXBvJV4T3NVnQGdpYLEMfmqqumZfF-JRbPlO6dX6DEY9bbENqTOSPkyhCdH9pszKQFg.EKDZRgqw2l-09531iaBi20q6QOgBskRkt6GMNOxtyL8&dib_tag=se&keywords=a+celebration+of+the+history+of+celebrating+history&qid=1737247039&sprefix=a+celebration+of+the+history+of+celebrating+history%2Caps%2C129&sr=8-1',
      label: 'Check out on Amazon!',
    },
    goodreads: {
      url: 'https://www.goodreads.com/book/show/56486523-a-celebration-of-the-history-of-celebrating-history',
      label: 'Check out on Goodreads!',
    },
    internal: '/books/a-celebration-of-the-history-of-celebrating-history',
  },
  
  reviews: celebrationReviews,
  
  availability: 'Available now in paperback, Ebook, and FREE through Kindle Unlimited!',
};
