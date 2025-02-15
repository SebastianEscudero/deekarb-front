"use client"

import { AnimatedEntry } from "@/components/ui/animated-entry"
import { DollarSign, BatteryCharging, Monitor } from "lucide-react"

export function Benefits() {
  return (
    <section className="max-w-7xl mx-auto space-y-24 p-6">
      <AnimatedEntry 
        className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-16 border-b border-primary/10 pb-16"
      >
        <div className="space-y-4">
          <h3 className="text-4xl font-light tracking-tight text-foreground">
            Reduce tus costos
          </h3>
          <p className="text-muted-foreground font-medium text-2xl">
            Hasta <span className="text-primary">36% menos</span> en costos de energía
          </p>
        </div>
        <div className="flex items-center justify-center">
          <DollarSign className="w-14 h-14 text-primary bg-primary/10 rounded-full p-4" />
        </div>
        <p className="text-xl text-muted-foreground">
          Optimiza tus horarios de carga al aprovechar las tarifas en horarios de menor demanda.
        </p>
      </AnimatedEntry>

      <AnimatedEntry 
        className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-16 border-b border-primary/10 pb-16"
      >
        <div className="space-y-4">
          <h3 className="text-4xl font-light tracking-tight text-foreground">
            Cuida tus baterías
          </h3>
          <p className="text-muted-foreground font-medium text-2xl">
            <span className="text-primary">Mayor vida útil</span> garantizada
          </p>
        </div>
        <div className="flex items-center justify-center">
          <BatteryCharging className="w-14 h-14 text-primary bg-primary/10 rounded-full p-4" />
        </div>
        <p className="text-xl text-muted-foreground">
          Optimiza la potencia de carga según tus necesidades operacionales específicas.
        </p>
      </AnimatedEntry>

      <AnimatedEntry 
        className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-16 border-b border-primary/10 pb-16"
      >
        <div className="space-y-4">
          <h3 className="text-4xl font-light tracking-tight text-foreground">
            Gestiona remotamente
          </h3>
          <p className="text-muted-foreground font-medium text-2xl">
            <span className="text-primary">Control total</span> centralizado
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Monitor className="w-14 h-14 text-primary bg-primary/10 rounded-full p-4" />
        </div>
        <p className="text-xl text-muted-foreground">
          Monitoreo, control y reportes de todas tus estaciones desde una sola plataforma.
        </p>
      </AnimatedEntry>
    </section>
  )
}