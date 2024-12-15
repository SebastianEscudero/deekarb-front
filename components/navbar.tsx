"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Deekarb</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="#servicios" className="transition-colors hover:text-primary">
            Servicios
          </Link>
          <Link href="#beneficios" className="transition-colors hover:text-primary">
            Beneficios
          </Link>
          <Link href="#calculadora" className="transition-colors hover:text-primary">
            Calculadora
          </Link>
          <Link href="#contacto" className="transition-colors hover:text-primary">
            Contacto
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button>Solicitar Información</Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-4">
                <Link href="#servicios" className="text-sm font-medium">
                  Servicios
                </Link>
                <Link href="#beneficios" className="text-sm font-medium">
                  Beneficios
                </Link>
                <Link href="#calculadora" className="text-sm font-medium">
                  Calculadora
                </Link>
                <Link href="#contacto" className="text-sm font-medium">
                  Contacto
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

