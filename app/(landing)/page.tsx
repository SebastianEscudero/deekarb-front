import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/app/(landing)/components/hero"
import { ClickableTabSection } from "@/app/(landing)/components/tabs"
import { CTA } from "@/app/(landing)/components/cta"
import { Logos } from "@/app/(landing)/components/logos"
import { Solutions } from "@/app/(landing)/components/solutions"
import { Stats } from "@/app/(landing)/components/stats"
import { BentoCards } from "@/app/(landing)/components/bento-cards"

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Electromovilidad, sin complicaciones",
    "provider": {
      "@type": "Organization",
      "name": "Deekarb",
      "description": "Gestiona tu flota y cargadores, reduce hasta 54% en costos de energía, prolonga la vida útil de tus vehículos y opera tus estaciones públicas",
      "areaServed": "Chile"
    },
    "serviceType": "Gestión y optimización de cargadores de vehículos eléctricos",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "areaServed": "Chile"
    }
  }

  return (
    <div className="bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}/>
      <Navbar />
      <main className="pt-48 bg-gradient-to-b from-[#EEEEEE] via-primary/5 to-[#EEEEEE] space-y-24">
        <Hero />
        <Logos />
        <Solutions />
        <ClickableTabSection />
        <Stats />
        <BentoCards />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

