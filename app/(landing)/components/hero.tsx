"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronsRight } from "lucide-react"

export function Hero() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>

      {/* Hero Section */}
      <main className="container text-center">
        <h1 className="text-4xl md:text-7xl font-normal mb-6">
          Electromovilidad
          <br />
          <span className="text-primary">sin complicaciones</span>
        </h1>

        <p className="text-base md:text-xl mb-12 max-w-xl mx-auto text-gray-600">
          Gestiona tu flota y cargadores, reduce hasta 54% en costos de energía, prolonga la vida útil de tus vehículos y opera tus estaciones públicas.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="flex w-full p-1 rounded-2xl bg-white space-x-2 shadow-sm">
            <input 
              name="email"
              type="email"
              required
              placeholder="Tu email" 
              className="w-full bg-transparent px-4 rounded-2xl outline-primary"
            />
            <Button type="submit" variant="primary" className="p-5 rounded-2xl">Empezar</Button>
          </form>
          <Button variant="outline" className="flex items-center rounded-2xl p-6 px-10" size="lg" onClick={() => window.location.href='#contacto'}>
            <Calendar className="w-6 h-6" />
            Agendar Demo
          </Button>
        </div>

        <button onClick={() => window.location.href='#contacto'} className="text-zinc-500 hover:text-zinc-700 inline-flex items-center gap-2">
          Conoce la plataforma
          <ChevronsRight className="w-4 h-4" />
        </button>

        {/* Dashboard Preview */}
        <div className="mt-4 max-w-6xl mx-auto">
          <Image 
            src="/landing/dashboard.png" 
            alt="Dashboard Preview" 
            width={10000} 
            height={10000}
            className="w-full rounded-2xl shadow-md border border-gray-300"
            quality={100}
            priority
          />
        </div>
      </main>
    </div>
  )
}