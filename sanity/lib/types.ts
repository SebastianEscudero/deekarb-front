import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

export interface Author {
  _type: 'author'
  _id: string
  name: string
  slug: {
    current: string
  }
  image?: Image
  bio?: PortableTextBlock[]
}

export interface Category {
  _type: 'category'
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
}

export interface Post {
  _type: 'post'
  _id: string
  title: string
  slug: {
    current: string
  }
  author: Author
  mainImage?: Image
  categories: Category[]
  publishedAt: string
  body: PortableTextBlock[]
  excerpt?: string
} 