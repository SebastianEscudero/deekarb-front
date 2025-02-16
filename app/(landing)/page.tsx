import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/app/(landing)/components/hero"
import ClickableTabSection from "@/app/(landing)/components/clickable-tab-section"
import CTA from "@/app/(landing)/components/cta"
import Logos from "@/app/(landing)/components/logos"
import { Benefits } from "@/app/(landing)/components/benefits"

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Instalación de Cargadores Eléctricos en Condominios",
    "provider": {
      "@type": "Organization",
      "name": "Deekarb",
      "description": "Especialistas en instalación de cargadores para autos eléctricos en condominios",
      "areaServed": "Chile"
    },
    "serviceType": "Instalación de puntos de carga eléctrica",
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
      <main className="pt-48 bg-gradient-to-b from-[#EEEEEE] via-primary/15 to-[#EEEEEE] space-y-24">
        <Hero />
        <Logos />
        <ClickableTabSection />
        <Benefits />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

