"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedEntryProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  className?: string
}

export function AnimatedEntry({
  children,
  direction = "up",
  delay = 200,
  className = ""
}: AnimatedEntryProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const directions = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8"
  }

  return (
    <div
      ref={ref}
      className={`
        ${className}
        transition-all duration-700 ease-out h-full
        ${isVisible ? "opacity-100 transform-none" : `opacity-0 ${directions[direction]}`}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
} 