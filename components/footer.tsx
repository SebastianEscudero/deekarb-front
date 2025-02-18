"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const CTASection = () => (
  <div className="container pt-10">
    <div className="flex flex-col lg:flex-row w-full gap-12">
      <div className="max-w-3xl mb-16">
        <h2 className="text-6xl font-bold tracking-tight mb-4">
          Ahorra hasta un <span className="text-primary">54%</span> en costos de energía
        </h2>
        <p className="text-gray-300 text-xl my-6 max-w-md">
          Agenda una demo rápida de 30 minutos y conoce nuestras soluciones.
        </p>
        <Image
          src="/illustrations/connect.svg"
          alt="Agenda una demo"
          width={500}
          height={500}
          className="rounded-2xl"
        />
      </div>
      <div className="w-full max-w-md h-[700px] rounded-3xl">
        <Cal namespace="30min"
          calLink="sebastian-deekarb/30min"
          className="w-full h-full overflow-scroll rounded-3xl"
          config={{ "layout": "month_view" }}
        />
      </div>
    </div>
  </div>
)

const MainFooter = () => (
  <div className="border-t border-zinc-800 container">
    <div className="py-16">
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Link href="/" className="inline-block">
            <Image
              src="/logos/deekarb-logo-dark.svg"
              alt="Deekarb"
              width={140}
              height={140}
            />
          </Link>
        </div>

        <div>
          <h4 className="text-zinc-400 text-sm font-medium mb-4">Soluciones</h4>
          <ul className="space-y-3">
            <li><Link href="/#servicios" className="text-white hover:text-zinc-400 transition-colors text-sm">Flotas Eléctricas</Link></li>
            <li><Link href="/#servicios" className="text-white hover:text-zinc-400 transition-colors text-sm">Cargadores Públicos</Link></li>
            <li><Link href="/#servicios" className="text-white hover:text-zinc-400 transition-colors text-sm">Gestión de Energía</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-zinc-400 text-sm font-medium mb-4">Recursos</h4>
          <ul className="space-y-3">
            <li><Link href="/blog" className="text-white hover:text-zinc-400 transition-colors text-sm">Blog</Link></li>
            <li><Link href="/#calculadora" className="text-white hover:text-zinc-400 transition-colors text-sm">Calculadora de Ahorro</Link></li>
            <li><Link href="/#docs" className="text-white hover:text-zinc-400 transition-colors text-sm">Documentación API</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-zinc-400 text-sm font-medium mb-4">Contacto</h4>
          <ul className="space-y-3">
            <li className="text-white text-sm">Los Militares 5620<br />Las Condes, Santiago</li>
            <li className="text-white text-sm">contacto@deekarb.com<br />+56 9 9947 4229</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="border-t border-zinc-800 py-6">
      <div className="flex justify-between items-center">
        <div className="text-zinc-400 text-sm">© 2024 Deekarb. Todos los derechos reservados.</div>
        <div className="flex space-x-4">
          <Link href="#" className="text-zinc-400 hover:text-white transition-colors"><Facebook className="h-4 w-4" /></Link>
          <Link href="#" className="text-zinc-400 hover:text-white transition-colors"><Twitter className="h-4 w-4" /></Link>
          <Link href="#" className="text-zinc-400 hover:text-white transition-colors"><Instagram className="h-4 w-4" /></Link>
          <Link href="#" className="text-zinc-400 hover:text-white transition-colors"><Linkedin className="h-4 w-4" /></Link>
        </div>
      </div>
    </div>
  </div>
)

export function Footer() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "30min" });
      cal("ui", { 
        "theme": "dark", 
        "hideEventTypeDetails": true, 
        "layout": "month_view"
      });
    })();
  }, [])

  return (
    <footer id="contacto" className="bg-zinc-900 text-white py-16">
      <CTASection />
      <MainFooter />
    </footer>
  )
}

