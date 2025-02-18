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
    <header className="fixed top-6 left-0 right-0 z-50 container">
      <div className="flex h-16 items-center justify-between bg-white rounded-2xl shadow-sm px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logos/deekarb-logo.svg" alt="Deekarb" width={150} height={150} />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex items-center space-x-4">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Soluciones</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[700px] p-4">
                  <div className="grid grid-cols-3 gap-3">

                    <Link href="/#soluciones" className="bg-gray-50 hover:bg-gray-100 rounded-3xl p-4 border border-gray-200">
                      <h3 className="text-base font-medium">Gestión de flota</h3>
                      <p className="text-sm text-muted-foreground mb-4">Opera y optimiza la carga de tu flota electrica.</p>
                      <Image src="/illustrations/van-cargando.svg" alt="Corporate Card" width={300} height={300} className="h-[150px]" />
                    </Link>

                    <Link href="/#soluciones" className="bg-gray-50 hover:bg-gray-100 rounded-3xl p-4 border border-gray-200">
                      <h3 className="text-base font-medium">Gestión de cargadores</h3>
                      <p className="text-sm text-muted-foreground mb-4">Optimiza el uso de tus cargadores eléctricos.</p>
                      <Image src="/illustrations/cargador.svg" alt="Corporate Card" width={300} height={300} className="h-[150px]" />
                    </Link>
                    
                    <div className="pl-3">
                      <h4 className="text-sm font-medium mb-2">Soluciones</h4>
                      <div className="flex flex-col gap-2">
                        <Link href="/#soluciones" className="text-sm text-muted-foreground hover:text-primary">
                          Gestión y optimización
                        </Link>
                        <Link href="/#soluciones" className="text-sm text-muted-foreground hover:text-primary">
                          Asesoría y soporte
                        </Link>
                        <Link href="/#soluciones" className="text-sm text-muted-foreground hover:text-primary">
                          Monitoreo y alertas
                        </Link>
                        <Link href="/#soluciones" className="text-sm text-muted-foreground hover:text-primary">
                          Solución integral
                        </Link>
                      </div>
                    </div>
                  </div>  
                </div>
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
                      <h3 className="text-sm font-medium mb-2">Categorías</h3>
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
                <NavigationMenuLink className="text-base group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Contacto
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-3">
            <Link href="https://app.deekarb.com/">
              <Button
                variant="ghost"
                className="hidden sm:flex text-[15px] font-normal hover:bg-transparent hover:text-black transition-colors"
              >
                Log In
              </Button>
            </Link>
            <Link href="/#contacto">
              <Button variant="primary" className="rounded-2xl" >
                Conoce más
              </Button>
            </Link>
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
              <div className="sr-only">Menu de navegación</div>
              <nav className="flex flex-col space-y-6 mt-8">
                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Soluciones</h2>
                  <div className="ml-4 flex flex-col space-y-3">
                    <Link href="/#soluciones" className="text-muted-foreground hover:text-primary">
                      Gestión y optimización
                    </Link>
                    <Link href="/#soluciones" className="text-muted-foreground hover:text-primary">
                      Asesoría y soporte
                    </Link>
                    <Link href="/#soluciones" className="text-muted-foreground hover:text-primary">
                      Monitoreo y alertas
                    </Link>
                    <Link href="/#soluciones" className="text-muted-foreground hover:text-primary">
                      Solución integral
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Blog</h2>
                  <div className="ml-4 flex flex-col space-y-3">
                    <Link href="/blog" className="text-muted-foreground hover:text-primary">
                      Últimos artículos
                    </Link>
                    {categories.map((category: Category) => (
                      <Link
                        key={category.slug.current}
                        href={`/blog/category/${category.slug.current}`}
                        className="text-muted-foreground hover:text-primary"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  href="/#contacto"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Contacto
                </Link>

                <div className="flex flex-col gap-3 pt-4">
                  <Link href="https://app.deekarb.com/">
                    <Button variant="outline" className="w-full">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/#contacto">
                    <Button variant="primary" className="w-full">
                      Conoce más
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

