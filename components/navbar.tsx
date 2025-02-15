import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { ArrowRight } from "lucide-react"
import { Category, Post } from "@/sanity/lib/types"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Solutions",
    href: "/solutions",
    description: "Complete EV charging management platform.",
  },
  {
    title: "Beneficios",
    href: "/#beneficios",
    description: "Descubre las ventajas de la movilidad eléctrica.",
  },
  {
    title: "Calculadora",
    href: "/#calculadora",
    description: "Calcula el costo de tu cargador eléctrico.",
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Noticias y artículos sobre movilidad eléctrica.",
  },
  {
    title: "Contacto",
    href: "/#contacto",
    description: "Contáctanos para más información.",
  },
]

async function getNavData() {
  const [posts, categories] = await Promise.all([
    client.fetch(`
      *[_type == "post"] | order(publishedAt desc)[0...4] {
        title,
        slug,
        mainImage,
        excerpt
      }
    `),
    client.fetch(`
      *[_type == "category"] {
        title,
        slug,
        description
      }
    `)
  ])

  return { posts, categories }
}

export async function Navbar() {
  const { posts, categories } = await getNavData()

  return (
    <header className="fixed top-6 left-0 right-0 z-50 mx-auto max-w-7xl rounded-3xl bg-white shadow-sm">
      <div className="flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logos/deekarb-logo.svg" alt="Deekarb" width={150} height={150} />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
          <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-rose-500 to-indigo-700 p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium text-white">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-white/90">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <Link href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </Link>
              <Link href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </Link>
              <Link href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </Link>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Recursos</NavigationMenuTrigger>
              <NavigationMenuContent className="">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {components.map((component) => (
                    <Link
                      key={component.title}
                      href={component.href}
                      className="space-y-1 rounded-md p-3 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">{component.title}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {component.description}
                      </p>
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Blog</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[800px] p-4">
                  <div className="grid grid-cols-[2fr,1fr] gap-8">
                    <div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {posts.map((post: Post) => (
                          <Link
                            key={post.slug.current}
                            href={`/blog/${post.slug.current}`}
                            className="group block space-y-2"
                          >
                            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                              {post.mainImage && (
                                <Image
                                  src={urlFor(post.mainImage).url()}
                                  alt={post.title}
                                  fill
                                  className="object-cover transition-transform group-hover:scale-105"
                                />
                              )}
                            </div>
                            <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary">
                              {post.title}
                            </h3>
                          </Link>
                        ))}
                      </div>

                      <div className="border-t pt-4">
                        <Link
                          href="/blog"
                          className="inline-flex items-center space-x-2 text-sm font-medium text-primary hover:text-primary/80"
                        >
                          <span>Últimos artículos</span>
                          <ArrowRight className="w-4 h-4 text-primary" />
                        </Link>
                      </div>
                    </div>

                    <div className="border-l pl-8">
                      <h3 className="font-medium mb-4">Categorías</h3>
                      <div className="space-y-2">
                        {categories.map((category: Category) => (
                          <Link
                            key={category.slug.current}
                            href={`/blog/category/${category.slug.current}`}
                            className="block text-sm text-muted-foreground hover:text-primary"
                          >
                            {category.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/#contacto" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Contacto
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-[15px] font-normal hover:bg-transparent hover:text-black transition-colors"
            >
              Log In
            </Button>
            <Button variant="primary" className="rounded-2xl">
              Open Account
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px]">
              <nav className="flex flex-col space-y-6 mt-8">
                {components.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
                <Link
                  href="/#contacto"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Contacto
                </Link>
                <Button asChild className="w-full rounded-full mt-4">
                  <Link href="/onboarding">Solicitar Información</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

