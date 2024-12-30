import { Suspense } from 'react'
import { OnboardingFlow } from '@/app/onboarding/components/onboarding-flow'
import { Loader2 } from 'lucide-react'

export default function OnboardingPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <OnboardingFlow />
    </Suspense>
  )
} 