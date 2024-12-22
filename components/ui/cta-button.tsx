"use client"

import { Button } from "./button"
import Link from "next/link"

export function CtaButton({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <Button 
      size="lg" 
      className={className}
    >
      <Link href="/onboarding">
        {children}
      </Link>
    </Button>
  )
}