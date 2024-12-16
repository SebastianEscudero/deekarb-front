"use client"

import { useRouter } from "next/navigation"
import { Button } from "./button"

export function CtaButton({ children, className }: { children: React.ReactNode, className?: string }) {
  const router = useRouter()

  return (
    <Button 
      size="lg" 
      className={className}
      onClick={() => router.push('/onboarding')}
    >
      {children}
    </Button>
  )
}