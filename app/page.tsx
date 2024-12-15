import { Calculator } from "@/components/calculator"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { CTA } from "@/components/cta"
import { Benefits } from "@/components/benefits"

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
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Benefits />
        <Calculator />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

