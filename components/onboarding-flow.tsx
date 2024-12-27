"use client"

import { useState } from "react"
import { AnimatedEntry } from "@/components/ui/animated-entry"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, X, Check, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import emailjs from '@emailjs/browser';
import { LocationPicker } from '@/components/location-picker'

interface FormData {
  serviceType: "ev" | "evcharger" | "solar" | ""
  name: string
  email: string
  phone: string
  region: string
  comuna: string
  direccion: string
  message: string
  coordinates: {
    lat: number | null;
    lng: number | null;
  };
}

interface FormErrors {
  serviceType?: string
  name?: string
  email?: string
  phone?: string
  region?: string
  comuna?: string
  direccion?: string
  message?: string
}

interface SuccessStats {
  installationsCompleted: number
  kwhServed: number
  communitiesHelped: number
}

const mockStats: SuccessStats = {
  installationsCompleted: 50,
  kwhServed: 25000,
  communitiesHelped: 15
}

const steps = [
  {
    id: "service",
    title: "¿Con que podemos ayudarte?",
    description: "Selecciona el servicio que necesitas",
    fields: ["serviceType"] as const
  },
  {
    id: "contact",
    title: "¿Cómo podemos contactarte?",
    description: "Te mantendremos informado sobre tu instalación",
    fields: ["name", "email", "phone"] as const
  },
  {
    id: "location",
    title: "¿Dónde estás ubicado?",
    description: "Necesitamos saber tu ubicación para brindarte el mejor servicio",
    fields: ["direccion"] as const
  },
  {
    id: "message",
    title: "Cuéntanos más sobre tus necesidades",
    description: "¿Qué necesitas específicamente?",
    fields: ["message"] as const
  }
]

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    serviceType: "",
    name: "",
    email: "",
    phone: "",
    region: "",
    comuna: "",
    direccion: "",
    message: "",
    coordinates: { lat: null, lng: null },
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateStep = (step: typeof steps[number]): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    step.fields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Este campo es requerido"
        isValid = false
      } else if (field === "email" && !validateEmail(formData.email)) {
        newErrors.email = "Email inválido"
        isValid = false
      } else if (field === "phone" && !validatePhone(formData.phone)) {
        newErrors.phone = "Teléfono inválido"
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    return /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/.test(phone)
  }

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value })
    if (errors[field as keyof FormErrors]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  const handleSelectChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field as keyof FormErrors]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  const handleSubmit = async () => {
    const publicKey = 'nB4EzsreUE3arN13-'
    const serviceId = 'service_4a0qdcu'
    const templateId = 'template_3odgr9d'

    setIsSubmitting(true)
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          to_name: "Deekarb",
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          address: formData.direccion,
          coordinates: `Lat: ${formData.coordinates.lat}, Lng: ${formData.coordinates.lng}`,
          service_type: (() => {
            switch(formData.serviceType) {
              case 'ev': return 'Vehículo Eléctrico';
              case 'evcharger': return 'Cargador EV';
              case 'solar': return 'Panel Solar';
              default: return 'No especificado';
            }
          })(),
        },
        publicKey
      )
      
      setIsSuccess(true)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    const currentStepData = steps[currentStep]
    if (!validateStep(currentStepData)) {
      return
    }

    if (currentStep === steps.length - 1) {
      handleSubmit()
      return
    }
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleLocationChange = (direccion: string, coordinates: { lat: number, lng: number }) => {
    setFormData({
      ...formData,
      direccion,
      coordinates: coordinates
    })
    if (errors.direccion) {
      setErrors({ ...errors, direccion: undefined })
    }
  }

  const renderStepContent = (step: typeof steps[number]) => {
    switch (step.id) {
      case "service":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: "ev", label: "Vehículo Eléctrico", icon: "🚗" },
                { value: "evcharger", label: "Cargador EV", icon: "⚡" },
                { value: "solar", label: "Panel Solar", icon: "☀️" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelectChange("serviceType", option.value)}
                  className={`p-6 text-center rounded-lg border transition-all hover:border-primary
                    ${formData.serviceType === option.value 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:bg-primary/5"
                    }`}
                >
                  <div className="text-4xl mb-4">{option.icon}</div>
                  <div className="font-medium">{option.label}</div>
                </button>
              ))}
            </div>
            {errors.serviceType && (
              <p className="mt-1 text-sm text-red-500">{errors.serviceType}</p>
            )}
          </div>
        )
      case "contact":
        return (
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Nombre completo"
                className={`text-lg ${errors.name ? 'border-red-500' : ''}`}
                value={formData.name}
                onChange={handleInputChange("name")}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email"
                className={`text-lg ${errors.email ? 'border-red-500' : ''}`}
                value={formData.email}
                onChange={handleInputChange("email")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <Input
                type="tel"
                placeholder="Teléfono (ej: +56912345678)"
                className={`text-lg ${errors.phone ? 'border-red-500' : ''}`}
                value={formData.phone}
                onChange={handleInputChange("phone")}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>
        )
      case "location":
        return (
          <div className="space-y-4">
            <LocationPicker
              direccion={formData.direccion}
              onDireccionChange={handleLocationChange}
            />
            <div>
              <Input
                placeholder="Dirección"
                className={`text-lg ${errors.direccion ? 'border-red-500' : ''}`}
                value={formData.direccion}
                onChange={handleInputChange("direccion")}
              />
              {errors.direccion && (
                <p className="mt-1 text-sm text-red-500">{errors.direccion}</p>
              )}
            </div>
          </div>
        )
      case "message":
        return (
          <div className="space-y-4">
            <textarea
              placeholder="Describe tu proyecto o necesidades específicas..."
              className={`w-full min-h-[200px] p-4 text-lg rounded-lg border 
                ${errors.message ? 'border-red-500' : 'border-input'}
                focus:outline-none focus:ring-2 focus:ring-primary`}
              value={formData.message}
              onChange={(e) => handleInputChange("message")(e)}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message}</p>
            )}
          </div>
        )
    }
  }

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container min-h-screen flex items-center justify-center">
          <AnimatedEntry>
            <div className="text-center space-y-8 max-w-2xl mx-auto">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-4xl font-bold tracking-tight">
                ¡Gracias por tu interés!
              </h2>
              <p className="text-xl text-muted-foreground">
                Nos pondremos en contacto contigo dentro de las próximas 24 horas para discutir las mejores opciones para tu comunidad.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="p-6 bg-card rounded-lg border">
                  <div className="text-3xl font-bold text-primary">
                    {mockStats.installationsCompleted}+
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Instalaciones completadas
                  </div>
                </div>
                <div className="p-6 bg-card rounded-lg border">
                  <div className="text-3xl font-bold text-primary">
                    {mockStats.kwhServed.toLocaleString()}+
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    kWh servidos
                  </div>
                </div>
                <div className="p-6 bg-card rounded-lg border">
                  <div className="text-3xl font-bold text-primary">
                    {mockStats.communitiesHelped}+
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Comunidades beneficiadas
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button onClick={() => router.push('/')}>
                  Volver al inicio
                </Button>
              </div>
            </div>
          </AnimatedEntry>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Button
        variant="ghost"
        className="fixed top-4 right-4"
        onClick={() => router.push('/')}
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="container min-h-screen flex items-center justify-center">
        <div className="w-full max-w-lg">
          <AnimatedEntry>
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold tracking-tight">
                  {currentStepData.title}
                </h2>
                <p className="text-xl text-muted-foreground">
                  {currentStepData.description}
                </p>
              </div>

              {renderStepContent(currentStepData)}

              <div className="space-y-6">
                <div className="flex justify-between pt-6">
                  <Button
                    variant="ghost"
                    onClick={prevStep}
                    disabled={currentStep === 0 || isSubmitting}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Anterior
                  </Button>
                  <Button 
                    onClick={nextStep}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        {currentStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                <div className="relative h-2 bg-primary/20 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex justify-center gap-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full transition-colors ${index === currentStep
                          ? "bg-primary"
                          : "bg-primary/20"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </AnimatedEntry>
        </div>
      </div>
    </div>
  )
}