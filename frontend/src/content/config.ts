import { defineCollection, z } from 'astro:content';

// Define the schema for blog posts
export const collections = {
  blog: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      publishedDate: z.string(),
      author: z.string().default('Bomfather Team'),
      excerpt: z.string(),
      image: z.string().optional(),
    }),
  }),
}; 