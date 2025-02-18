import Image from "next/image"

export const Logos = () => {
  const logos = [
    {
      src: "/landing/logos/logo-1.svg",
      alt: "Company logo 1",
    },
    {
      src: "/landing/logos/logo-2.svg",
      alt: "Company logo 2",
    },
    {
      src: "/landing/logos/logo-3.svg",
      alt: "Company logo 3",
    },
    {
      src: "/landing/logos/logo-4.svg",
      alt: "Company logo 4",
    },
    {
      src: "/landing/logos/logo-5.svg",
      alt: "Company logo 5",
    },
  ]

  return (
    <section className="w-full container">
      <div>
        <h2 className="text-center text-lg font-semibold text-muted-foreground mb-12">
          Operamos la infraestructura líder del mercado
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 items-center justify-between gap-4">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center">
              <Image
                src={logo.src || "/placeholder.svg"}
                alt={logo.alt}
                width={100}
                height={40}
                className="w-[150px] h-[100px] object-contain opacity-70 hover:opacity-90 transition-opacity grayscale"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

