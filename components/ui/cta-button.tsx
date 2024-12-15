import { cn } from "@/lib/utils"
import { Button } from "./button"
import { ChevronRight } from "lucide-react"

export const CtaButton = ({ 
  children, 
  className,
}: { 
  children: React.ReactNode, 
  className?: string,
}) => {
  const onClick = () => {
    console.log('clicked')
  }

  return (
    <Button variant="default" className={cn(className)} onClick={onClick}>
      {children}
      <ChevronRight className="ml-2 h-4 w-4" />
    </Button>
  )
}