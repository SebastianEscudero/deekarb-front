"use client"

import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { es } from 'date-fns/locale'
import { Category, Post } from "@/sanity/lib/types"
import { ArrowRight } from "lucide-react"

interface BlogHeroProps {
    post: Post
}

export function BlogHero({ post }: BlogHeroProps) {
    return (
        <div className="relative min-h-[90vh] flex items-center bg-[#1A1A1A]">
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
            
            <div className="container relative z-10 py-16">
                <div className="max-w-3xl space-y-6 space-x-2">
                    {post.categories.map((category: Category) => (
                        <Link
                        key={category._id}
                        href={`/blog/category/${category.slug.current}`}
                        className="inline-block px-4 py-1.5 bg-primary text-[#1A1A1A] font-medium rounded-full text-sm hover:bg-primary/90 transition-colors"
                        >
                        {category.title}
                        </Link>
                    ))}

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
                        {post.title}
                    </h1>

                    {post.excerpt && (
                        <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
                            {post.excerpt}
                        </p>
                    )}

                    <Link href={`/blog/${post.slug.current}`} className="inline-flex items-center space-x-3 group">
                        <span className="text-primary font-medium">Leer artículo</span>
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                            <ArrowRight className="w-5 h-5 text-black transition-transform group-hover:translate-x-0.5" />
                        </div>
                    </Link>

                    <div className="flex items-center space-x-4 text-sm text-white/80">
                        {post.author?.name && (
                            <div className="flex items-center space-x-2">
                                {post.author?.image && (
                                    <Image
                                        src={urlFor(post.author.image).url()}
                                        alt={post.author.name}
                                        width={32}
                                        height={32}
                                        className="rounded-full border-2 border-primary/20"
                                    />
                                )}
                                <span>{post.author.name}</span>
                            </div>
                        )}
                        <span className="text-white/40">•</span>
                        <time className="text-white/80">
                            {format(new Date(post.publishedAt), "d 'de' MMMM, yyyy", { locale: es })}
                        </time>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#1A1A1A] to-transparent" />
        </div>
    )
} 