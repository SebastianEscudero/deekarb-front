import type React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { AnimatedEntry } from "@/components/ui/animated-entry"
import Image from "next/image"

const steps = [
  {
    title: "Flotas",
    description: "Nos encargaremos de todas las referencias cruzadas, para que no tengas que preocuparte por las reservas dobles.",
    image: "/illustrations/flota-2.svg"
  },
  {
    title: "Operación de Cargadores",
    description: "¿Quieres bloquear los fines de semana? ¿Configurar algún margen? Lo hacemos fácil.",
    image: "/illustrations/vehiculos-medianos-cargando.svg"
  },
  {
    title: "Solución Integral",
    description: "¡Podría ser una videollamada, una llamada telefónica o un paseo por el parque!",
    image: "/illustrations/flota-3.svg"
  }
]

export default function HowItWorks() {
  return (
    <div className="w-full max-w-7xl mx-auto py-12">
      <header className="text-center mb-16">
          <h1 className="text-[2.75rem] leading-tight font-semibold text-gray-900 mb-4">
            Con nosotros, la <span className="text-primary">electromovilidad</span> es fácil.
          </h1>
          <p className="text-gray-500 text-lg">
            Programación sin esfuerzo para individuos, soluciones poderosas para empresas
            <br />
            modernas en rápido crecimiento.
          </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <AnimatedEntry key={index} delay={200 + index * 300}>
            <Card className="rounded-3xl h-full flex flex-col justify-between">
              <CardHeader className="p-10">
                <CardTitle className="text-xl">{step.title}</CardTitle>
                <CardDescription className="text-base">
                  {step.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-auto pb-10 rounded-b-3xl object-cover" 
                  width={2000}
                  height={2000}
                />
              </CardContent>
            </Card>
          </AnimatedEntry>
        ))}
      </div>
    </div>
  )
}

