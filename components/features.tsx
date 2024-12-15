"use client"

import { Building2, Wallet, Wrench, BarChart3 } from 'lucide-react'
import { AnimatedEntry } from "@/components/ui/animated-entry"
import { Card } from "./ui/card"

const features = [
  {
    icon: <Building2 className="w-6 h-6 text-primary" />,
    title: "Instalación sin costo",
    description: "Instalamos y configuramos los puntos de carga en tu edificio o condominio sin costo inicial para la comunidad."
  },
  {
    icon: <Wrench className="w-6 h-6 text-primary" />,
    title: "Mantenimiento incluido",
    description: "Nos encargamos de todo el mantenimiento y soporte técnico 24/7, sin costos adicionales."
  },
  {
    icon: <Wallet className="w-6 h-6 text-primary" />,
    title: "Nueva fuente de ingresos",
    description: "Tu comunidad genera ingresos pasivos por el uso de los cargadores, mejorando el fondo común."
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-primary" />,
    title: "Gestión inteligente",
    description: "Sistema automatizado de cobros y reportes mensuales de uso e ingresos para la comunidad."
  }
]

export function Features() {
  return (
    <section className="container py-24" id="beneficios">
      <AnimatedEntry>
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            La solución completa para tu comunidad
          </h2>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            Transformamos espacios de estacionamiento en puntos de carga rentables, 
            sin inversión inicial y con beneficios directos para tu comunidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <AnimatedEntry key={feature.title} className="flex">
              <Card className="p-6 flex flex-col items-start space-y-4 h-full hover:shadow-lg transition-shadow">
                <div className="p-3 rounded-lg bg-primary/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            </AnimatedEntry>
          ))}
        </div>
      </AnimatedEntry>
    </section>
  )
}