"use client"

import { urlFor } from "@/sanity/lib/image"
import { Post } from "@/sanity/lib/types"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { es } from 'date-fns/locale'
import { useRouter } from 'next/navigation'

interface BlogCardProps {
  post: Post
  isCompact?: boolean
}

export function BlogCard({ post, isCompact = false }: BlogCardProps) {
  const router = useRouter()

  return (
    <article className="group">
      <Link href={`/blog/${post.slug.current}`} className="block">
        {/* Image Container */}
        {post.mainImage && (
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl mb-4">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Categories */}
            {post.categories && (
              <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                {post.categories.map((category) => (
                  <span
                    key={category._id}
                    onClick={(e) => {
                      e.preventDefault()
                      router.push(`/blog/category/${category.slug.current}`)
                    }}
                    className="px-3 py-1 text-xs font-medium bg-primary/90 text-black hover:bg-primary 
                             rounded-full transition-colors cursor-pointer"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="space-y-2">
          <h3 className={`font-semibold group-hover:text-primary transition-colors
            ${isCompact ? 'text-lg' : 'text-xl'}`}
          >
            {post.title}
          </h3>
          {!isCompact && post.excerpt && (
            <p className="text-muted-foreground line-clamp-2">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.image && (
                  <Image
                    src={urlFor(post.author.image).url()}
                    alt={post.author.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                <span>{post.author.name}</span>
              </div>
            )}
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {format(new Date(post.publishedAt), "d 'de' MMMM, yyyy", { locale: es })}
              </time>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
} 