import { client } from "@/sanity/lib/client"
import Link from "next/link"
import { BlogHero } from "@/app/blog/components/hero"
import { Post, Category } from "@/sanity/lib/types"
import { BlogCard } from "@/app/blog/components/card"

// Function to fetch posts and categories from Sanity
async function getData() {
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
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
  `)

  const categories = await client.fetch(`
    *[_type == "category"] {
      _id,
      title,
      description,
      slug
    }
  `)

  return { posts, categories }
}

export default async function BlogPage() {
  const { posts, categories } = await getData()
  const [latestPost, ...otherPosts] = posts
  
  return (
    <>
      <BlogHero post={latestPost} />

      {/* Categories Section */}
      <section className="border-b">
        <div className="container py-8">
          <h2 className="text-xl font-semibold mb-6">Explora nuestros temas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category: Category) => (
              <Link
                key={category._id}
                href={`/blog/category/${category.slug.current}`}
                className="group"
              >
                <div className="bg-muted hover:bg-primary/5 rounded-lg p-4 transition-colors">
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <div className="container py-16">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-bold">Artículos Recientes</h2>
          <div className="h-px flex-1 bg-border mx-8 hidden md:block" />
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {otherPosts.map((post: Post) => (
            <BlogCard 
              key={post._id} 
              post={post}
            />
          ))}
        </div>
      </div>
    </>
  )
} 