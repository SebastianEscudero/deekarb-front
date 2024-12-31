import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react'
import { Button } from "./ui/button"

export function Footer() {
  return (
    <footer>
      {/* CTA Section */}
      <section className="bg-background py-16">
        <div className="container mx-auto">
          <div className="bg-primary/5 rounded-3xl overflow-hidden">
            <div className="p-12 lg:p-16 flex flex-col lg:flex-row items-start gap-8">
              {/* Left side with illustration */}
              <div className="hidden lg:block w-1/3">
                <Image 
                  src="/illustrations/connect.svg" 
                  alt="Construyamos el futuro" 
                  width={350} 
                  height={350}
                  className="rounded-2xl"
                />
              </div>

              {/* Right side with content */}
              <div className="flex-1 space-y-8">
                <div className="space-y-4 max-w-2xl">
                  <h2 className="text-4xl font-bold tracking-tight">
                    Construyamos el futuro. <span className="text-muted-foreground">Un cargador a la vez.</span>
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    ¿Listo para ser parte del cambio? Únete a nuestra comunidad y mantente al día con las últimas novedades en instalación de cargadores eléctricos, promociones exclusivas y tips de expertos.
                  </p>
                </div>
                <Button asChild size="lg" className="rounded-full px-8 group">
                 <Link href="/onboarding">
                   <span>Quiero ser parte</span>
                   <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                 </Link>
               </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="border-t">
        <div className="container mx-auto py-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
            {/* Logo Column */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block">
                <Image 
                  src="/logos/deekarb-logo.svg" 
                  alt="Deekarb - Inicio" 
                  width={180} 
                  height={180}
                />
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Liderando la revolución de la movilidad eléctrica en Chile a través de instalaciones profesionales de cargadores rápidos.
              </p>
            </div>

            {/* Navigation Columns */}
            <div className="space-y-6">
              <h4 className="font-bold text-lg">Soluciones</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/#servicios" className="text-muted-foreground hover:text-primary transition-colors">
                    Instalación Residencial
                  </Link>
                </li>
                <li>
                  <Link href="/#servicios" className="text-muted-foreground hover:text-primary transition-colors">
                    Carga Comercial
                  </Link>
                </li>
                <li>
                  <Link href="/#servicios" className="text-muted-foreground hover:text-primary transition-colors">
                    Mantenimiento
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-lg">Recursos</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/#calculadora" className="text-muted-foreground hover:text-primary transition-colors">
                    Calculadora de Costos
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="text-muted-foreground hover:text-primary transition-colors">
                    Preguntas Frecuentes
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-lg">Contacto</h4>
              <ul className="space-y-4">
                <li className="text-muted-foreground">
                  <strong className="text-foreground">Oficina Central:</strong><br />
                  Los Militares 5620<br />
                  Las Condes, Santiago
                </li>
                <li className="text-muted-foreground">
                  <strong className="text-foreground">Ventas:</strong><br />
                  greg@deekarb.com<br />
                  +56 9 9947 4229
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-lg">Síguenos</h4>
              <div className="flex space-x-4">
                <Link 
                  href="#" 
                  className="bg-muted p-3 rounded-full hover:bg-muted/80 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link 
                  href="#" 
                  className="bg-muted p-3 rounded-full hover:bg-muted/80 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link 
                  href="#" 
                  className="bg-muted p-3 rounded-full hover:bg-muted/80 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link 
                  href="#" 
                  className="bg-muted p-3 rounded-full hover:bg-muted/80 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">
                Mantente conectado con las últimas novedades en instalación de cargadores eléctricos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t">
        <div className="container mx-auto py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div>© 2024 Deekarb. Pioneros en instalación de cargadores eléctricos en Chile.</div>
          </div>
        </div>
      </div>
    </footer>
  )
}

