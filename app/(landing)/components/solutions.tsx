import type React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { AnimatedEntry } from "@/components/ui/animated-entry"
import Image from "next/image"

const steps = [
  {
    title: "Solución Integral",
    description: "Asesoría completa en instalación de cargadores, paneles solares y selección del vehículo ideal para tus necesidades.",
    image: "/illustrations/ingeniero.svg"
  },
  {
    title: "Gestión y Optimización",
    description: "Reduce costos operativos, maximiza la vida útil de las baterías y gestiona la carga de forma inteligente.",
    image: "/illustrations/vehiculos-medianos-cargando.svg"
  },
  {
    title: "Operación de cargadores públicos",
    description: "Rentabiliza tu infraestructura de cargadores públicos con la mejor tecnología.",
    image: "/illustrations/cargadores.svg"
  }
]

export const Solutions = () => {
  return (
    <section className="w-full container" id="soluciones">
      <header className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl leading-tight font-semibold text-gray-900 mb-4">
            Con nosotros, la <span className="text-primary">electromovilidad</span> es fácil.
          </h1>
      </header>

      <div className="grid md:grid-cols-3 gap-6 ">
        {steps.map((step, index) => (
          <AnimatedEntry key={index} delay={200 + index * 300}>
            <Card className="rounded-3xl h-full flex flex-col justify-between shadow-none">
              <CardHeader className="p-10">
                <CardTitle className="text-xl">{step.title}</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  {step.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center max-h-[250px]">
                <Image 
                  src={step.image} 
                  alt={step.title} 
                  className="w-auto h-full pb-10 rounded-b-3xl object-cover" 
                  width={2000}
                  height={2000}
                />
              </CardContent>
            </Card>
          </AnimatedEntry>
        ))}
      </div>
    </section>
  )
}

