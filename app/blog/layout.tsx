import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta'
})

export const metadata: Metadata = {
  title: "Blog | Deekarb",
  description: "Aprende sobre movilidad eléctrica, instalación de cargadores y las últimas tendencias en vehículos eléctricos.",
  keywords: "blog, movilidad eléctrica, cargadores, vehículos eléctricos, tendencias, Deekarb",
  openGraph: {
    title: "Blog | Deekarb",
    description: "Noticias y artículos sobre movilidad eléctrica",
  }
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`min-h-screen bg-background ${jakarta.variable}`}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
} 