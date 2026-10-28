// The article registry. Add an entry here and the site, series pages and prev/next links pick it up.
export type Series = { slug: string; title: string; blurb: string; icon: string };
export type Article = {
  series: string;
  slug: string;
  n: number;
  title: string;
  short: string;
  desc: string;
  kind: 'article' | 'interactive';
  source: 'html' | 'md';
  file: string; // html: file in src/articles/ · md: id in the docs collection
};

export const allSeries: Series[] = [
  { slug: 'authentication', title: 'Authentication', icon: 'shield',
    blurb: 'How logging in really works, one protocol at a time. Starts with OAuth.' },
  { slug: 'text-to-image', title: 'Text to Image', icon: 'image',
    blurb: 'From words to numbers, noise to tokens, attention to pixels.' },
];

export const articles: Article[] = [
  { series: 'authentication', slug: 'oauth', n: 1, kind: 'interactive', source: 'html', file: 'oauth.html',
    title: 'Continue with Google: Sundar Pichai is vouching for you',
    short: 'How OAuth works',
    desc: 'A revision of the Authorization Code flow with PKCE: the eight steps, why state and code_challenge are sent in the open, what is inside a JWT and how to verify it, and a working Flask implementation.' },

  { series: 'text-to-image', slug: 'words-to-numbers', n: 1, kind: 'article', source: 'md', file: '1_text-to-image',
    title: 'From Words to Numbers', short: 'Words to numbers',
    desc: 'How a sentence becomes a table of numbers (an embedding) that a model can read.' },
  { series: 'text-to-image', slug: 'empty-canvas', n: 2, kind: 'interactive', source: 'html', file: 'empty-canvas.html',
    title: 'The Empty Canvas: From Noise to Tokens', short: 'The empty canvas',
    desc: 'Start from pure noise and see how an image becomes the same list of rows as your text.' },
  { series: 'text-to-image', slug: 'cross-attention', n: 3, kind: 'interactive', source: 'html', file: 'cross-attention.html',
    title: 'Cross-Attention: Where the Prompt Meets the Picture', short: 'Cross-attention',
    desc: 'Click words and watch which parts of the picture they steer. Every multiplication is visible.' },
  { series: 'text-to-image', slug: 'architecture-pixels', n: 4, kind: 'interactive', source: 'html', file: 'architecture-pixels.html',
    title: 'The Architecture, Pixel by Pixel', short: 'The architecture',
    desc: 'Walk the whole model diagram and inspect real pixel data at every stage.' },
];

export const seriesOf = (slug: string) => allSeries.find((s) => s.slug === slug)!;
export const inSeries = (slug: string) => articles.filter((a) => a.series === slug);
export const href = (a: Article) => `/articles/${a.series}/${a.slug}`;
