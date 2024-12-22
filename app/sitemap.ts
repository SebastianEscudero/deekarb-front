import { client } from "@/sanity/lib/client"
import { Category, Post } from "@/sanity/lib/types"
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all posts
  const posts = await client.fetch(`
    *[_type == "post"] {
      slug,
      publishedAt
    }
  `)

  // Fetch all categories
  const categories = await client.fetch(`
    *[_type == "category"] {
      slug
    }
  `)

  // Base URL
  const baseUrl = 'https://www.deekarb.com'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/onboarding`,
      lastModified: new Date(),
      priority: 0.8,
    }
  ]

  // Blog posts pages
  const blogPages = posts.map((post: Post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  // Category pages
  const categoryPages = categories.map((category: Category) => ({
    url: `${baseUrl}/blog/category/${category.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }))

  return [...staticPages, ...blogPages, ...categoryPages]
} 