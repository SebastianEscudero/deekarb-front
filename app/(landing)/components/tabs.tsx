"use client"

import { ArrowRight, ChevronsRight } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, LineChart, Line, Tooltip, TooltipProps } from "recharts"
import { useEffect } from "react"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart, Pie, Cell, Label } from 'recharts'
import { ResponsiveContainer } from "recharts"

const calculateSavings = (vehicles: number, dailyKm: number) => {
    const annualKm = dailyKm * 365 * vehicles
    const kwhPer100km = 16.7

    const peakRate = 250
    const offPeakRate = 125

    const annualKwh = (annualKm / 100) * kwhPer100km

    const costWithoutOptimization = annualKwh * peakRate
    const costWithOptimization = annualKwh * offPeakRate

    return Number(((costWithoutOptimization - costWithOptimization) / 1000000).toFixed(1))
}

const generateData = (dailyKm: number) => {
    const cantidadVehiculos = [5, 10, 15, 20, 25]

    return cantidadVehiculos.map(vehicles => ({
        vehicles: `${vehicles} vehículos`,
        savings: calculateSavings(vehicles, dailyKm)
    }))
}

export function SavingsChart() {
    const [isMounted, setIsMounted] = useState(false)
    const [dailyKm, setDailyKm] = useState(50)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    const data = generateData(dailyKm)

    return (
        <div className="flex flex-col gap-2 leading-none tracking-tight text-sm p-6 bg-gray-100 rounded-3xl w-full">
            <div className="flex flex-row justify-between mb-2 items-center px-6 border-b border-gray-300 pb-4 gap-4">
                <p className="hidden sm:flex text-lg leading-none text-gray-800 font-medium">Ahorro anual</p>
                <Select value={dailyKm.toString()} onValueChange={(value) => setDailyKm(Number(value))}>
                    <SelectTrigger className="w-[140px] rounded-2xl border-gray-300 bg-white">
                        <SelectValue placeholder="Seleccionar km" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="focus:ring-0">
                        <SelectItem value="30" className="focus:bg-primary/10">30 km diarios</SelectItem>
                        <SelectItem value="50" className="focus:bg-primary/10">50 km diarios</SelectItem>
                        <SelectItem value="100" className="focus:bg-primary/10">100 km diarios</SelectItem>
                        <SelectItem value="150" className="focus:bg-primary/10">150 km diarios</SelectItem>
                        <SelectItem value="200" className="focus:bg-primary/10">200 km diarios</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="w-full overflow-x-auto">
                <div className="w-full">
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart
                            data={data}
                            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                        >
                            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis
                                dataKey="vehicles"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                className="text-xs text-muted-foreground"
                            />
                            <Bar
                                dataKey="savings"
                                fill="#16a24b"
                                radius={[8, 8, 0, 0]}
                            >
                                <LabelList
                                    dataKey="savings"
                                    position="top"
                                    formatter={(value: number) => `${value.toFixed(1)}M`}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export function BatteryLifeChart() {
    const generateData = () => {
        const data = []
        for (let year = 0; year <= 5; year++) {
            const normalDegradation = Math.max(100 - (year * 13) - (year * year * 0.8), 0)
            const optimizedDegradation = Math.max(100 - ((year * 13) + (year * year * 0.8)) * 0.8, 0)

            data.push({
                year: `Año ${year}`,
                "Sin optimización": Number(normalDegradation.toFixed(1)),
                "Con optimización": Number(optimizedDegradation.toFixed(1))
            })
        }
        return data
    }

    const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-medium text-gray-900 mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-gray-600">{entry.name}:</span>
                            <span className="font-medium">{entry.value}%</span>
                        </div>
                    ))}
                </div>
            )
        }
        return null
    }

    return (
        <div className="flex flex-col gap-2 leading-none tracking-tight text-sm p-6 bg-gray-100 rounded-3xl w-full">
            <div className="flex flex-row items-center justify-between px-6 border-b border-gray-200 pb-4 gap-4">
                <div className="hidden sm:block space-y-1">
                    <h3 className="text-xl leading-none text-gray-800 font-medium">
                        Capacidad de la batería
                    </h3>
                    <p className="text-sm text-gray-500">
                        Simulación de degradación en el tiempo
                    </p>
                </div>

                <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2.5">
                        <div className="w-3 h-3 bg-red-500/90 rounded-full"></div>
                        <span className="text-gray-600 whitespace-nowrap">Sin optimización</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="text-gray-600 whitespace-nowrap">Con optimización</span>
                    </div>
                </div>
            </div>

            <div className="w-full overflow-x-auto">
                <div className="w-full">
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart
                            data={generateData()}
                            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                            <XAxis
                                dataKey="year"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 12 }}
                                interval={1}
                                className="text-gray-500"
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                domain={[0, 100]}
                                tick={{ fontSize: 12 }}
                                tickFormatter={(value) => `${value}%`}
                                className="text-gray-500"
                            />
                            <Tooltip
                                content={CustomTooltip}
                                cursor={{ stroke: '#94a3b8', strokeWidth: 1 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="Sin optimización"
                                stroke="#ef4444"
                                strokeWidth={3}
                                dot={false}
                            />
                            <Line
                                type="monotone"
                                dataKey="Con optimización"
                                stroke="#16a34a"
                                strokeWidth={3}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

function ChargerStatusChart() {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    const data = [
        { name: "Cargando", value: 8, color: "#16a34a" },
        { name: "Disponible", value: 12, color: "#3b82f6" },
        { name: "Offline", value: 2, color: "#94a3b8" }
    ]

    const total = data.reduce((acc, item) => acc + item.value, 0)

    return (
        <div className="flex flex-col gap-2 leading-none tracking-tight text-sm p-6 bg-gray-100 rounded-3xl w-full">
            <div className="space-y-1 px-6">
                <h3 className="text-xl leading-none text-gray-800 font-medium">
                    Estado de cargadores
                </h3>
                <p className="text-sm text-gray-500">
                    Monitoreo en tiempo real
                </p>
            </div>

            <div className="relative w-full overflow-x-auto">
                <div className="w-full">
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={85}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                                <Label
                                    content={({ viewBox }) => {
                                        const { cx, cy } = viewBox as { cx: number; cy: number }
                                        return (
                                            <text
                                                x={cx}
                                                y={cy}
                                                textAnchor="middle"
                                                dominantBaseline="central"
                                                className="fill-gray-900"
                                            >
                                                <tspan
                                                    x={cx}
                                                    dy="-0.5em"
                                                    className="text-2xl font-semibold"
                                                >
                                                    {total}
                                                </tspan>
                                                <tspan
                                                    x={cx}
                                                    dy="1.6em"
                                                    className="text-sm fill-gray-500"
                                                >
                                                    Cargadores
                                                </tspan>
                                            </text>
                                        )
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="hidden sm:flex gap-6 items-center justify-center mt-2">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-gray-600 whitespace-nowrap">
                            {item.name} ({item.value})
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export const ClickableTabSection = () => {
    const sections = [
        {
            name: "Reduce tus costos",
            title: (
                <>
                    Hasta <span className="text-primary font-semibold">54% menos</span> en costos de energía
                </>
            ),
            description: (
                <>
                    Al optimizar tus cargas y evitar horas pico, puedes llegar a ahorrar
                    <span className="font-semibold"> hasta 50%</span> en el consumo de energía para tus vehículos.
                </>
            ),
            illustration: <SavingsChart />
        },
        {
            name: "Cuida tus baterías",
            title: (
                <>
                    Prolonga la vida de tus baterías en <span className="text-primary font-semibold">un 17%</span>
                </>
            ),
            description: (
                <>
                    Nuestro sistema inteligente puede extender la vida de tus baterías en un
                    <span className="font-semibold"> 15% - 20%</span> al optimizar los ciclos de carga y evitar cargas rápidas.
                </>
            ),
            illustration: (
                <BatteryLifeChart />
            )
        },
        {
            name: "Gestiona remotamente",
            title: (
                <>
                    Asegura <span className="text-primary font-semibold">99.99%</span> tiempo de disponibilidad
                </>
            ),
            description: (
                <>
                    Monitoreo, control y reportes de todas tus estaciones de carga con
                    <span className="font-semibold"> una sola plataforma.</span>
                </>
            ),
            illustration: <ChargerStatusChart />
        }
    ]

    return (
        <div className="w-full container">
            <div className="bg-white rounded-3xl px-10 py-6">
                <Tabs defaultValue="Reduce tus costos">
                    <div className="flex justify-center mb-10">
                        <TabsList className="h-auto bg-transparent p-1 rounded-2xl flex-wrap gap-2 w-fit mx-auto">
                            {sections.map((section) => (
                                <TabsTrigger
                                    key={section.name}
                                    value={section.name}
                                    className="rounded-2xl text-base px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-white text-black data-[state=active]:shadow-none whitespace-nowrap bg-gray-100"
                                >
                                    {section.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {sections.map((section) => (
                        <TabsContent key={section.name} value={section.name} className="mt-12">
                            <div className="grid lg:grid-cols-2 gap-12 items-start">
                                <div className="space-y-4 max-w-sm h-full flex flex-col justify-center">
                                    <h2 className="text-4xl font-medium tracking-tight">{section.title}</h2>
                                    <p className="text-gray-600">
                                        {section.description}
                                    </p>
                                    <Button variant="ghost" className="bg-gray-100 p-6 rounded-3xl w-fit" onClick={() => window.location.href = '#contacto'}>
                                        Más información <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="w-full flex flex-col items-center justify-center gap-4">
                                    {section.illustration}
                                    <button onClick={() => window.location.href = '#contacto'} className="text-primary font-medium flex items-center text-sm">
                                        Agenda una demo
                                        <ChevronsRight className="ml-2 h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    )
}

