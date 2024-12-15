"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatedEntry } from "@/components/ui/animated-entry"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Zap, Leaf, Loader2 } from 'lucide-react'

export function Calculator() {
  const [vehicles, setVehicles] = useState("1")
  const [monthlyKm, setMonthlyKm] = useState("1000")
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateSavings = () => {
    if (isNaN(parseInt(vehicles)) || isNaN(parseInt(monthlyKm))) {
      return null
    }

    const annualKm = parseInt(monthlyKm) * 12 * parseInt(vehicles)
    const fuelCost = (annualKm / 100) * 8 * 2100 // 8L/100km, $2.100/L
    const electricityCost = (annualKm / 100) * 15 * 150 // 15kWh/100km, $150/kWh
    const savings = Math.max(0, fuelCost - electricityCost)
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(savings)
  }

  const calculateCO2Reduction = () => {
    if (isNaN(parseInt(vehicles)) || isNaN(parseInt(monthlyKm))) {
      return null
    }

    const annualKm = parseInt(monthlyKm) * 12 * parseInt(vehicles)
    const fuelCO2 = (annualKm / 100) * 20 // 20kg CO2/100km
    const electricityCO2 = (annualKm / 100) * 5 // 5kg CO2/100km
    const reduction = Math.max(0, fuelCO2 - electricityCO2)
    return new Intl.NumberFormat('es-CL').format(Math.round(reduction))
  }

  // Simular cálculo para mostrar loader
  useEffect(() => {
    setIsCalculating(true)
    const timer = setTimeout(() => {
      setIsCalculating(false)
    }, 200)
    return () => clearTimeout(timer)
  }, [vehicles, monthlyKm])

  return (
    <section className="relative py-16 md:py-24 overflow-hidden" id="calculadora">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
      <div className="container max-w-[1500px]">
        <AnimatedEntry direction="right">
          <div className="space-y-6 mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Calcula tu impacto
            </h2>
            <p className="text-lg text-muted-foreground max-w-[600px]">
              Descubre cuánto puedes ahorrar y reducir tu huella de carbono al instalar puntos de carga en tu comunidad.
            </p>
          </div>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="hidden lg:flex relative h-[400px] rounded-lg overflow-hidden max-w-[550px]">
              <Image
                src="/landing/campfire.svg"
                alt="Auto eléctrico cargando"
                fill
                className="object-cover"
              />
            </div>
            <Card className="relative border-primary/80">
              <CardHeader>
                <CardTitle>Calculadora de Ahorro</CardTitle>
                <CardDescription>
                  Ingresa los datos de tu comunidad
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="vehicles">Número de vehículos a electrificar</Label>
                  <Input
                    id="vehicles"
                    type="number"
                    value={vehicles}
                    onChange={(e) => setVehicles(e.target.value)}
                    min="1"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthly-km">Kilómetros mensuales promedio por vehículo</Label>
                  <Input
                    id="monthly-km"
                    type="number"
                    value={monthlyKm}
                    onChange={(e) => setMonthlyKm(e.target.value)}
                    min="0"
                    className="bg-background"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <Card className="bg-primary/5 border-primary/10">
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Zap className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">
                            {isCalculating ? (
                              <Loader2 className="h-6 w-6 animate-spin text-primary" />
                            ) : calculateSavings() ? (
                              calculateSavings()
                            ) : (
                              '---'
                            )}
                          </CardTitle>
                          <CardDescription>
                            Ahorro anual estimado
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                  <Card className="bg-primary/5 border-primary/10">
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Leaf className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">
                            {isCalculating ? (
                              <Loader2 className="h-6 w-6 animate-spin text-primary" />
                            ) : calculateCO2Reduction() ? (
                              `${calculateCO2Reduction()}kg`
                            ) : (
                              '---'
                            )}
                          </CardTitle>
                          <CardDescription>
                            Reducción CO2 anual
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedEntry>
      </div>
    </section>
  )
}