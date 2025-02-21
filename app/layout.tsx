import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"

const font = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
})


export const metadata: Metadata = {
  title: "Electromovilidad, sin complicaciones | Deekarb",
  description: "Gestiona tu flota y cargadores, reduce hasta 54% en costos de energía, prolonga la vida útil de tus vehículos y opera tus estaciones públicas",
  keywords: "electromovilidad, cargadores eléctricos, ahorro energético, gestión de carga, optimización energética, vehículos eléctricos, cargadores inteligentes",
  openGraph: {
    title: "Electromovilidad, sin complicaciones",
    description: "Gestiona tu flota y cargadores, reduce hasta 54% en costos de energía, prolonga la vida útil de tus vehículos y opera tus estaciones públicas",
    images: ['/og-image.jpg'],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={font.className}>{children}</body>
    </html>
  )
}