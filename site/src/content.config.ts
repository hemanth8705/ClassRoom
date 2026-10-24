import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

// Written (markdown) articles live in the repo's top-level series folders.
const docs = defineCollection({
  loader: glob({ pattern: '1_text-to-image.md', base: '../text-to-image' }),
});

export const collections = { docs };
