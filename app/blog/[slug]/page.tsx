import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { PortableText } from "@portabletext/react"
import type { PortableTextComponents } from "@portabletext/react"
import { format } from "date-fns"
import { es } from 'date-fns/locale'
import Image from "next/image"
import type { Category, Post } from "@/sanity/lib/types"
import Link from "next/link"
import { ArrowLeft, Car, ChevronRight, Fuel, Sun, CalendarIcon, ChevronsRight } from "lucide-react"
import { Metadata } from "next"
import { BlogCard } from "@/app/blog/components/card"
import { Button } from "@/components/ui/button"

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="relative w-full my-12">
        <div className="aspect-[16/9] overflow-hidden rounded-xl">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || ""}
            fill
            className="object-cover rounded-xl"
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
      _id,
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

      <div className="bg-white border-b">
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

            <div className="bg-primary rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white md:max-w-md">¿Qué harías si tu operación costara 30% de lo que cuesta hoy?</h2>
                <p className="text-lg text-white/90 mb-8">
                  Con nuestra gestión inteligente de carga, optimizamos tus costos operativos y maximizamos el rendimiento de tu flota eléctrica.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="#contacto">
                    <Button variant="ghost" className="bg-gray-100 p-6 rounded-3xl" >
                        Más información <ChevronsRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#contacto">
                    <Button variant="ghost" className="bg-gray-600/30 p-6 rounded-3xl text-white" >
                        Agendar Demo <CalendarIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/10 rounded-3xl p-4 transform rotate-1">
                  <div className="bg-white rounded-2xl w-full h-48 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-24 h-24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M50 20v60M20 50h60" stroke="#16a34a" strokeWidth="8" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
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
              <div className="rounded-xl overflow-hidden border shadow-lg">
                {/* Header */}
                <div className="bg-gradient-to-br from-primary to-primary/80 p-4 text-center">
                  <h3 className="font-semibold text-lg text-white">
                    ¿Buscas soluciones de movilidad eléctrica?
                  </h3>
                  <p className="mt-1 text-sm text-white/90">
                    Descubre nuestras soluciones integrales
                  </p>
                </div>

                {/* Service Options */}
                <div className="p-3 space-y-2 bg-white">
                  <Link 
                    href="/onboarding?service=solar" 
                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-yellow-100">
                        <Sun className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Paneles solares</h4>
                        <p className="text-xs text-gray-600">Energía limpia para tu hogar</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                  </Link>

                  <Link 
                    href="/onboarding?service=evcharger" 
                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <Fuel className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Punto de carga</h4>
                        <p className="text-xs text-gray-600">Instala un cargador rápido de auto eléctrico con nosotros</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                  </Link>

                  <Link 
                    href="/onboarding?service=ev" 
                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-red-100">
                        <Car className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Auto eléctrico</h4>
                        <p className="text-xs text-gray-600">Leasing de vehículos eléctricos</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                </div>

                {/* Footer */}
                <div className="p-2 bg-gray-50 border-t text-center">
                  <p className="text-xs text-gray-600">
                    Soluciones para individuos y empresas
                  </p>
                </div>
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