"use client"

import { Button } from "@/components/ui/button"
import type React from "react"
import { CalendarIcon, ChevronsRight } from "lucide-react"
import Image from "next/image"

export const CTA = () => {
  return (
    <div className="container pb-20">
      <div className="grid gap-8 md:grid-cols-2 items-center">
        {/* Left Section */}
        <div className="space-y-6">
          <h1 className="text-4xl tracking-tight">
            Reduce tus costos energéticos
            <br />
            <span className="text-primary font-bold">desde el primer día</span>
          </h1>
          <p className="text-base max-w-sm text-justify">
            Únete a las empresas que le sacan el máximo provecho a la electrómovilidad.
            Optimiza tu operación, reduce tus costos, y prolonga la vida útil de tus vehículos.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" className="rounded-2xl p-6" onClick={() => window.location.href='#contacto'}>
              Conoce más
              <ChevronsRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="p-6 rounded-2xl" onClick={() => window.location.href='#contacto'}>
              <CalendarIcon className="h-4 w-4" />
              Agendar Demo
            </Button>
          </div>
        </div>

        {/* Right Section */}
        <Image 
          src="/illustrations/flota-cargando.svg" 
          alt="CTA" 
          width={2000} 
          height={2000} 
          className="rounded-3xl"
        />
      </div>
    </div>
  )
}