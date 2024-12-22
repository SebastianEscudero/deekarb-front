import { client } from "@/sanity/lib/client"
import { Post, Category } from "@/sanity/lib/types"
import { notFound } from "next/navigation"
import { BlogCard } from "@/components/blog/card"
import { Metadata } from "next"

export async function generateStaticParams() {
  const categories = await client.fetch(`
    *[_type == "category"] {
      slug {
        current
      }
    }
  `)

  return categories.map((category: Category) => ({
    slug: category.slug.current,
  }))
}

async function getData(slug: string) {
  const category = await client.fetch(`
    *[_type == "category" && slug.current == $slug][0] {
      _id,
      title,
      description
    }
  `, { slug })

  if (!category) {
    return null
  }

  const posts = await client.fetch(`
    *[_type == "post" && $categoryId in categories[]._ref] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      categories[]->,
      author-> {
        name,
        image
      }
    }
  `, { categoryId: category._id })

  return { category, posts }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const data = await getData(params.slug)
    
    if (!data) {
      return {
        title: 'Categoría no encontrada | Blog Deekarb',
      }
    }
    
    const { category } = data
    const title = `${category.title} | Blog Deekarb`
    const description = category.description || `Artículos sobre ${category.title}`
    
     return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug)

  if (!data) {
    notFound()
  }

  const { category, posts } = data

  return (
    <div className="container py-16">
      {/* Category Header */}
      <div className="max-w-2xl mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {category.title}
        </h1>
        {category.description && (
          <p className="text-lg text-muted-foreground">
            {category.description}
          </p>
        )}
      </div>

      {/* Posts Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: Post) => (
          <BlogCard 
            key={post._id} 
            post={post}
          />
        ))}
      </div>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium mb-2">
            No hay artículos en esta categoría aún
          </h3>
          <p className="text-muted-foreground">
            Vuelve pronto para ver nuevo contenido
          </p>
        </div>
      )}
    </div>
  )
} 