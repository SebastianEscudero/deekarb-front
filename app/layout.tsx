import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from 'next/font/google'
import "./globals.css"

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "Instalación de Cargadores Eléctricos en Condominios | Deekarb",
  description: "Especialistas en instalación de cargadores para autos eléctricos en condominios y edificios residenciales. Gestión integral desde la aprobación hasta el mantenimiento.",
  keywords: "cargador auto eléctrico, instalación condominio, punto de carga edificio, carga vehículo eléctrico comunidad",
  openGraph: {
    title: "Instalación de Cargadores Eléctricos en Condominios",
    description: "Solución completa para la instalación de puntos de carga en tu condominio",
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
      <body className={jakarta.className}>{children}</body>
    </html>
  )
}