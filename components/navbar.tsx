import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
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

// Update the getLatestPosts function to also fetch categories
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
    <header className="sticky top-0 z-50 w-full border-t-2 border-t-primary bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logos/deekarb-logo.svg" alt="Deekarb" width={150} height={150} />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Recursos</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Blog</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[800px] p-4">
                  <div className="grid grid-cols-[2fr,1fr] gap-8">
                    {/* Posts Section */}
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

                    {/* Categories Section */}
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
          <Button asChild size="sm" className="rounded-full px-6">
            <Link href="/onboarding">Solicitar Información</Link>
          </Button>
          
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

