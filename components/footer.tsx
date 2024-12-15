import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h4 className="text-xl font-bold">EcoCharge</h4>
            <p className="text-sm text-muted-foreground">
              Soluciones de carga para vehículos eléctricos en comunidades residenciales
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#servicios" className="text-muted-foreground hover:text-primary">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="#beneficios" className="text-muted-foreground hover:text-primary">
                  Beneficios
                </Link>
              </li>
              <li>
                <Link href="#calculadora" className="text-muted-foreground hover:text-primary">
                  Calculadora
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Email: info@ecocharge.com</li>
              <li className="text-muted-foreground">Tel: +56 2 2123 4567</li>
              <li className="text-muted-foreground">Santiago, Chile</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Síguenos</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          © 2024 EcoCharge. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}

