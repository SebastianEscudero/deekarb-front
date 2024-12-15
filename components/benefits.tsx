"use client"

import { AnimatedEntry } from "@/components/ui/animated-entry"
import { Watch, Battery, Leaf } from "lucide-react"

const benefits = [
  {
    title: "Tu tiempo",
    icon: <Watch className="w-20 h-20 text-primary bg-primary/10 rounded-full p-5" />,
    description: "Entregamos la carga más rápida de la industria, para que puedas dedicar más tiempo a lo que realmente importa"
  },
  {
    title: "Tu energía",
    icon: <Battery className="w-20 h-20 text-primary bg-primary/10 rounded-full p-5" />,
    description: "Cargar tu auto puede ser una oportunidad para recargarte tú también. Una pausa bienvenida en tu día"
  },
  {
    title: "Tu paz",
    icon: <Leaf className="w-20 h-20 text-primary bg-primary/10 rounded-full p-5" />,
    description: "Haciendo del mundo un lugar más saludable al ayudar a reducir el estrés y limpiar nuestras ciudades"
  }
]

export function Benefits() {
  return (
    <section className="container py-24">
      <AnimatedEntry>
        <h2 className="text-2xl font-light mb-24">
          Prioriza lo que realmente importa
        </h2>
        <div className="space-y-32">
          {benefits.map((benefit) => (
            <AnimatedEntry 
              key={benefit.title}
              className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-16 border-b border-primary/10 pb-16"
            >
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight">
                {benefit.title}
              </h3>
              <div className="flex items-center justify-center">
                {benefit.icon}
              </div>
              <p className="text-xl text-muted-foreground">
                {benefit.description}
              </p>
            </AnimatedEntry>
          ))}
        </div>
      </AnimatedEntry>
    </section>
  )
}