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
  return (
    <section className="container py-16 md:py-24">
      <div className="grid gap-8 md:grid-cols-3 text-center">
        <div className="space-y-2">
          <h3 className="text-4xl font-bold">
            <AnimatedNumber end={38} duration={2000} suffix="%" />
          </h3>
          <p className="text-muted-foreground">Ahorro en Costos de Carga</p>
          <p className="text-sm text-muted-foreground">vs. estaciones públicas</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-4xl font-bold">
            <AnimatedNumber end={200} duration={2000} suffix="+" />
          </h3>
          <p className="text-muted-foreground">Toneladas de CO₂ Evitadas</p>
          <p className="text-sm text-muted-foreground">por nuestros usuarios</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-4xl font-bold">
            <AnimatedNumber end={13} duration={2000} suffix="+" />
          </h3>
          <p className="text-muted-foreground">Puntos de Carga</p>
          <p className="text-sm text-muted-foreground">instalados en comunidades</p>
        </div>
      </div>
    </section>
  )
}