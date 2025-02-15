import Image from "next/image"

export default function Logos() {
  const logos = [
    {
      src: "/landing/logos/logo-1.svg",
      alt: "Company logo 1",
      width: 80,
      height: 50,
    },
    {
      src: "/landing/logos/logo-2.svg",
      alt: "Company logo 2",
      width: 80,
      height: 50,
    },
    {
      src: "/landing/logos/logo-3.svg",
      alt: "Company logo 3",
      width: 80,
      height: 50,
    },
    {
      src: "/landing/logos/logo-4.svg",
      alt: "Company logo 4",
      width: 80,
      height: 50,
    },
    {
      src: "/landing/logos/logo-5.svg",
      alt: "Company logo 5",
      width: 150,
      height: 50,
    },
  ]

  return (
    <section className="w-full max-w-5xl mx-auto">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center">
              <Image
                src={logo.src || "/placeholder.svg"}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="max-w-[120px] md:max-w-[150px] h-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

