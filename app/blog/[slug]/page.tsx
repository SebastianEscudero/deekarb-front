import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { PortableText } from "@portabletext/react"
import type { PortableTextComponents } from "@portabletext/react"
import { format } from "date-fns"
import { es } from 'date-fns/locale'
import Image from "next/image"
import type { Category, Post } from "@/sanity/lib/types"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Metadata } from "next"
import { CheckCircle } from "lucide-react"
import { BlogCard } from "@/components/blog/card"
import { CtaButton } from "@/components/ui/cta-button"

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="relative w-full my-12">
        <div className="aspect-[16/9] overflow-hidden rounded-xl">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || ""}
            fill
            className="object-cover"
          />
        </div>
        {value.alt && (
          <p className="mt-3 text-sm text-[#4A4A4A] text-center">{value.alt}</p>
        )}
      </div>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-5xl font-bold mt-16 mb-6 text-[#1A1A1A]">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-4xl font-bold mt-12 mb-6 text-[#1A1A1A]">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-3xl font-bold mt-8 mb-4 text-[#1A1A1A]">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-6 text-lg leading-relaxed text-[#4A4A4A]">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-[#1A1A1A]">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[#1A1A1A]">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-[#1A1A1A]">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 rounded px-1 py-0.5 text-sm">{children}</code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-primary underline decoration-primary/30 hover:decoration-primary transition-all"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-[#4A4A4A]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-[#4A4A4A]">
        {children}
      </ol>
    ),
  },
}

async function getPost(slug: string): Promise<Post> {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      slug,
      body,
      mainImage,
      publishedAt,
      excerpt,
      author->{
        name,
        image
      },
      categories[]->
    }
  `, { slug })
}

async function getRelatedPosts(currentPostId: string, categoryIds: string[]) {
  return client.fetch(`
    *[_type == "post" && _id != $currentPostId && count((categories[]->_id)[@ in $categoryIds]) > 0][0...3] {
      title,
      slug,
      mainImage,
      excerpt,
      categories[]->
    }
  `, { currentPostId, categoryIds })
}

export async function generateStaticParams() {
  const posts = await client.fetch(`
    *[_type == "post"] {
      slug {
        current
      }
    }
  `)
  
  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug)
  if (!post) {
    return {
      title: 'Post no encontrado | Blog Deekarb',
    }
  }
  return {
    title: `${post.title} | Blog Deekarb`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      images: post.mainImage ? [
        {
          url: urlFor(post.mainImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.mainImage ? [urlFor(post.mainImage).width(1200).height(630).url()] : [],
    }
  }
}

export default async function BlogPost({ params }: Props) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug)
  const relatedPosts = await getRelatedPosts(
    post._id, 
    post.categories.map((cat: Category) => cat._id)
  )

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with full-width image */}
      <div className="relative h-[70vh]">
        {post.mainImage && (
          <>
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/30 to-[#1A1A1A]" />
        </>
        )}

        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="max-w-3xl">
              <div className="space-y-6">
                <div className="flex gap-2 flex-wrap">
                  {post.categories.map((category: Category) => (
                    <Link
                      key={category._id}
                      href={`/blog/category/${category.slug.current}`}
                      className="inline-block px-4 py-1.5 bg-primary text-[#1A1A1A] font-medium rounded-full text-sm hover:bg-primary/90 transition-colors"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
                  {post.title}
                </h1>

                <div className="flex items-center space-x-4 text-sm text-white/80">
                  {post.author && (
                    <div className="flex items-center space-x-2">
                      {post.author.image && (
                        <Image
                          src={urlFor(post.author.image).url()}
                          alt={post.author.name}
                          width={32}
                          height={32}
                          className="rounded-full border-2 border-white/20"
                        />
                      )}
                      <span>{post.author.name}</span>
                    </div>
                  )}
                  <span>•</span>
                  <time>
                    {format(new Date(post.publishedAt), "d 'de' MMMM, yyyy", { locale: es })}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back button */}
      <div className="sticky top-0 z-50 bg-white border-b">
        <div className="container py-4">
          <Link 
            href="/blog" 
            className="inline-flex items-center space-x-2 text-[#4A4A4A] hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Volver al blog</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-16">
          {/* Main Content */}
          <article>
            <div className="prose prose-lg max-w-none">
              <PortableText 
                value={post.body} 
                components={portableTextComponents}
              />
            </div>

            {/* Related Posts */}
            <section className="mt-16 pt-16 border-t">
              <h2 className="text-2xl font-bold mb-8">Artículos Relacionados</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((post: Post) => (
                  <BlogCard 
                    key={post._id} 
                    post={post}
                    isCompact
                  />
                ))}
              </div>
            </section>
          </article>

          {/* Sticky CTA */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="rounded-xl bg-primary/5 p-6 space-y-4 border border-primary/50">
                <h3 className="font-semibold text-lg">
                  ¿Listo para instalar tu cargador?
                </h3>
                <p className="text-muted-foreground">
                  Descubre cómo podemos ayudarte a instalar tu punto de carga sin costo inicial.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Sin costos de mantención
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Instalación profesional
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Soporte 24/7
                  </li>
                </ul>
                <CtaButton className="w-full">
                  Solicitar evaluación gratuita
                </CtaButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-32 bg-gradient-to-t from-white to-transparent" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            url: `https://www.deekarb.com/blog/${post.slug.current}`,
            headline: post.title,
            image: post.mainImage ? [urlFor(post.mainImage).url()] : [],
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            author: {
              '@type': 'Person',
              name: post.author.name,
            },
            description: post.excerpt || '',
          }),
        }}
      />
    </div>
  )
} 