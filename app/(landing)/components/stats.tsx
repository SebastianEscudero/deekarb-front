"use client"

import { useEffect, useState, useRef } from 'react'

interface AnimatedNumberProps {
  end: number
  duration: number
  suffix?: string
  prefix?: string
}

function AnimatedNumber({ end, duration, suffix = '', prefix = '' }: AnimatedNumberProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const startTime = Date.now()
    const step = () => {
      const currentTime = Date.now()
      const progress = Math.min((currentTime - startTime) / duration, 1)

      countRef.current = Math.floor(progress * end)
      setCount(countRef.current)

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [end, duration, isVisible])

  return (
    <span ref={elementRef}>
      {prefix}{count}{suffix}
    </span>
  )
}

export function Stats() {
  const stats = [
    {
      value: 34,
      label: "Reducción promedio en costos de energía con carga inteligente",
      suffix: "%",
    },
    {
      value: 50,
      label: "Cargadores operados por nosotros",
      suffix: "+",
    },
    {
      value: 17,
      label: "Prolongación promedio de la vida útil de las baterías",
      suffix: "%",
    },
    {
      value: 10,
      label: "Marcas distintas de cargadores operados",
      suffix: "",
    },
  ]

  return (
    <div className="w-full container">
      <div className="space-y-4 mb-16">
        <h1 className="text-4xl font-semibold tracking-tight">
          Carga para tus vehículos, pero inteligente.
        </h1>
        <p className="text-3xl text-muted-foreground font-medium">
          Ahorra costos y maximiza la eficiencia de tu flota.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-24">
        {stats.map((stat, index) => (
          <div key={index} className="space-y-2">
            <div className="text-3xl font-semibold tracking-tight border-l-[3px] border-gray-300 pl-4">
              <AnimatedNumber end={stat.value} duration={2000} suffix={stat.suffix} />
            </div>
            <div className="text-muted-foreground text-sm font-medium leading-tight pl-4">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}