"use client"

import { Button } from "@/components/ui/button"
import { CalendarIcon, ChevronsRight } from "lucide-react"
import Image from "next/image"
import { AnimatedEntry } from "@/components/ui/animated-entry"

export const BentoCards = () => {
    return (
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Remote Charging Card */}
          <AnimatedEntry direction="left" delay={0}>
            <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:border-primary/20 transition-colors h-full">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Carga Remota</h2>
              <div className="flex justify-center mb-8 h-[200px]">
                <Image src="/illustrations/electricity.svg" alt="Monitoring" width={500} height={500} className="w-full h-full object-contain" />
              </div>
              <p className="text-lg text-gray-600">
                Inicia y detén la carga desde cualquier lugar. Controla tu flota completa desde tu celular.
              </p>
            </div>
          </AnimatedEntry>
  
          {/* Problem Resolution Card */}
          <AnimatedEntry direction="down" delay={200}>
            <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:border-primary/20 transition-colors h-full">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">¿Problemas? te ayudamos</h2>
              <div className="flex justify-center mb-8 h-[200px]">
                <Image src="/illustrations/control-panel.svg" alt="Monitoring" width={500} height={500} className="w-full h-full object-contain" />
              </div>
              <p className="text-lg text-gray-600">
                Resetea cargadores, actualiza firmware y resuelve la mayoría de los problemas sin necesidad de visitas técnicas.
              </p>
            </div>
          </AnimatedEntry>
  
          {/* Monitoring Card */}
          <AnimatedEntry direction="right" delay={400}>
            <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:border-primary/20 transition-colors h-full">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Monitoreo Total</h2>
              <div className="flex justify-center mb-8 h-[200px]">
                <Image src="/illustrations/dashboard.svg" alt="Monitoring" width={500} height={500} className="w-full h-full object-contain" />
              </div>
              <p className="text-lg text-gray-600">
                Visualiza el estado de carga, consumo energético y diagnósticos en tiempo real de toda tu flota.
              </p>
            </div>
          </AnimatedEntry>
        </div>
  
        {/* Bottom Cost Savings Section */}
        <AnimatedEntry direction="up" delay={600}>
          <div className="bg-primary rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white md:max-w-md">¿Qué harías si tu operación costara 30% de lo que cuesta hoy?</h2>
              <p className="text-lg text-white/90 mb-8">
                Con nuestra gestión inteligente de carga, optimizamos tus costos operativos y maximizamos el rendimiento de tu flota eléctrica.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="ghost" className="bg-gray-100 p-6 rounded-3xl" onClick={() => window.location.href = '#contacto'}>
                      Más información <ChevronsRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="ghost" className="bg-gray-600/30 p-6 rounded-3xl text-white" onClick={() => window.location.href = '#contacto'}>
                      Agendar Demo <CalendarIcon className="ml-2 h-4 w-4" />
                  </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 rounded-3xl p-4 transform rotate-1">
                <div className="bg-white rounded-2xl w-full h-48 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-24 h-24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 20v60M20 50h60" stroke="#16a34a" strokeWidth="8" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </AnimatedEntry>
      </div>
    )
  }
  
  