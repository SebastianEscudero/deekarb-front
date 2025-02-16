"use client"

import { ArrowRight } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ClickableTabSection() {
    const sections = [
        {
            name: "Reduce tus costos",
            title: (
                <>
                    Hasta <span className="text-primary font-semibold">36% menos</span> en costos de energía
                </>
            ),
            description: (
                <>
                    Al optimizar tus cargas y evitar horas pico, podemos llegar a{' '}
                    <span className="text-primary font-semibold">ahorrar hasta 50%</span>
                    {' '}en el consumo de energía para tus vehículos.
                </>
            ),
            image: "/landing/dashboard.png"
        },
        {
            name: "Cuida tus baterías",
            title: (
                <>
                    <span className="text-primary font-semibold">Mayor vida útil</span> garantizada
                </>
            ),
            description: (
                <>
                    Nuestro sistema inteligente puede{' '}
                    <span className="text-primary font-semibold">extender la vida útil de tus baterías hasta un 15%</span>
                    {' '}al optimizar los ciclos de carga.
                </>
            ),
            image: "/landing/dashboard.png"
        },
        {
            name: "Gestiona remotamente",
            title: (
                <>
                    Control <span className="text-primary font-semibold">total centralizado</span>
                </>
            ),
            description: (
                <>
                    Monitoreo y control centralizado que{' '}
                    <span className="text-primary font-semibold">garantiza una disponibilidad del 99.99%</span>
                    {' '}de tus estaciones de carga.
                </>
            ),
            image: "/landing/dashboard.png"
        }
    ]

    return (
        <div className="w-full max-w-7xl mx-auto py-10 px-16 pb-28 bg-white rounded-3xl">
            <Tabs defaultValue="Reduce tus costos" className="w-full">
                <div className="flex justify-center mb-20">
                    <TabsList className="w-fit h-auto space-x-2 bg-gray-100 p-1 rounded-full">
                        {sections.map((section) => (
                            <TabsTrigger 
                                key={section.name} 
                                value={section.name}
                                className="rounded-full text-base px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-white text-black data-[state=active]:shadow-none"
                            >
                                {section.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {sections.map((section) => (
                    <TabsContent key={section.name} value={section.name} className="mt-12">
                        <div className="grid md:grid-cols-2 gap-12 items-start">
                            <div className="space-y-4 max-w-sm">
                                <h2 className="text-4xl font-medium tracking-tight">{section.title}</h2>
                                <p className="text-gray-600">
                                    {section.description}
                                </p>
                                <Button variant="ghost" className="bg-gray-100 p-6 rounded-3xl">
                                    Show me more <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                            <Image src={section.image} alt={section.title} width={1000} height={1000} />
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

