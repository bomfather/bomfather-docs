import { defineCollection, z } from 'astro:content';

// Define collections schema
export const collections = {
  blog: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      publishedAt: z.date(),
      author: z.string(),
      featuredImage: z.string().optional(),
      draft: z.boolean().default(false),
    }),
  }),
}; 