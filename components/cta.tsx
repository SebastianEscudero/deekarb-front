"use client"

import { AnimatedEntry } from "@/components/ui/animated-entry"
import { CtaButton } from "./ui/cta-button"
import { Card } from "./ui/card"
import { Zap, Clock, Shield, Wallet } from "lucide-react"
import Image from "next/image"

const benefits = [
  {
    icon: <Zap className="h-5 w-5 text-primary" />,
    title: "Sin costos de instalación",
    description: "Instalamos sin costo inicial para la comunidad"
  },
  {
    icon: <Clock className="h-5 w-5 text-primary" />,
    title: "Proceso rápido",
    description: "Instalación completa en menos de 2 semanas"
  },
  {
    icon: <Shield className="h-5 w-5 text-primary" />,
    title: "Garantía total",
    description: "2 años de garantía en equipos y servicio"
  },
  {
    icon: <Wallet className="h-5 w-5 text-primary" />,
    title: "Gana tiempo",
    description: "Carga tu auto en el mínimo tiempo posible"
  }
]

export function CTA() {
  return (
    <section className="bg-background py-8" id="contacto">
      <div className="container mx-auto">
        <div className="relative rounded-lg overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/landing/cta.jpg"
              alt="Cargador eléctrico"
              fill
              className="object-cover animate-slow-zoom"
              priority
              quality={100}
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>

          <div className="relative z-20 h-full">
            <AnimatedEntry>
              <div className="flex flex-col justify-center h-full max-w-2xl space-y-8 p-8">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  ¿Listo para electrificar tu comunidad?
                </h2>
                <p className="text-xl text-white/90">
                  Agenda una evaluación gratuita y descubre cómo podemos ayudarte a implementar la carga eléctrica en tu condominio.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {benefits.map((benefit) => (
                    <Card key={benefit.title} className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
                      <div className="flex gap-4">
                        <div className="p-2 h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center">
                          {benefit.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{benefit.title}</h3>
                          <p className="text-sm text-white/70">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <CtaButton>
                  Solicitar evaluación sin costo
                </CtaButton>
              </div>
            </AnimatedEntry>
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 to-transparent" />
        </div>
      </div>
    </section>
  )
}