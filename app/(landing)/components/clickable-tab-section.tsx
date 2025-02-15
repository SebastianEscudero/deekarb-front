"use client"

import { ArrowRight } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ClickableTabSection() {
    const sections = [
        {
            name: "Profit Breakdowns",
            title: 'See corporate profit status at a glance',
            description: "Flourish intelligently recalculates cash inflows and outflows to provide a more complete picture of your financial standing",
            image: "/landing/dashboard.png"
        },
        {
            name: "Fraud Controls",
            title: 'Set alerts & controls on spending',
            description: "No longer worry about corporate cards and excessive spending. Flourish vets all alerts before sending to keep you focused on what matters",
            image: "/landing/dashboard.png"
        },
        {
            name: "Working Capital",
            title: 'Access up to 4x the working capital',
            description: "In as little as a quarter of the time of traditional banks with a variety of funding products to get you up and moving faster than ever",
            image: "/landing/dashboard.png"
        }
    ]

    return (
        <div className="w-full max-w-7xl mx-auto p-10 pb-28 bg-white rounded-3xl">
            <Tabs defaultValue="Profit Breakdowns" className="w-full">
                <div className="flex justify-center mb-20">
                    <TabsList className="w-fit h-auto space-x-2 bg-gray-100 p-1 rounded-full">
                        {sections.map((section) => (
                            <TabsTrigger 
                                key={section.name} 
                                value={section.name}
                                className="rounded-full px-6 py-2 data-[state=active]:bg-[#E76F51] data-[state=active]:text-white text-black"
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
                                    Flourish intelligently recalculates cash inflows and outflows to provide a more complete picture of your
                                    financial standing
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

