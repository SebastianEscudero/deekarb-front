"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AnimatedEntry } from "@/components/ui/animated-entry"
import { CheckCircle } from 'lucide-react'
import { CtaButton } from "@/components/ui/cta-button"

const images = [
  {
    src: "/landing/hero-1.jpg",
    alt: "Cargador eléctrico en uso"
  },
  {
    src: "/landing/hero-2.jpg",
    alt: "Estación de carga residencial"
  },
  {
    src: "/landing/hero-3.jpg",
    alt: "Instalación de cargador"
  }
]

export function Hero() {
  return (
    <div className="bg-background py-8">
      <div className="container mx-auto">
        <div className="relative min-h-[600px] rounded-lg overflow-hidden">
          {images.map((image, index) => (
            <div
              key={image.src}
              className={`absolute inset-0 w-full h-full transition-opacity duration-[300ms] ${index === 0
                  ? 'opacity-100 z-10'
                  : 'opacity-0 z-0'
                }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-cover ${index === 0
                    ? 'animate-slow-zoom'
                    : ''
                  }`}
                priority={index === 0}
                quality={100}
                sizes="(max-width: 1280px) 100vw, 1280px"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
          <div className="relative z-20 h-full">
            <AnimatedEntry delay={300}>
              <div className="flex flex-col justify-center h-full max-w-2xl space-y-6 p-8">
                <div className="inline-flex items-center rounded-full border bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white">
                  <span className="block size-2 rounded-full bg-primary mr-2 animate-pulse" />
                  ¿Quieres un auto eléctrico y no tienes un punto de carga en tu edificio?
                </div>

                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
                  Podemos instalar un punto de carga en tu edificio sin costo
                </h1>

                <p className="text-xl text-white/90">
                  Nos encargamos de todo: desde la aprobación en la junta de vecinos
                  hasta la instalación y configuración de tu cargador.
                  Sin complicaciones, sin trámites engorrosos.
                </p>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Sin costos de mantención
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Disfruta de tu auto eléctrico sin preocupaciones
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Gestión completa sin costo adicional
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <CtaButton className="w-full">
                    Solicitar evaluación sin costo
                  </CtaButton>
                  <Button
                    variant="default"
                    size="lg"
                    className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
                    onClick={() => {
                      document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Calcular ahorros
                  </Button>
                </div>
              </div>
            </AnimatedEntry>
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 to-transparent" />
        </div>
      </div>
    </div>
  )
}