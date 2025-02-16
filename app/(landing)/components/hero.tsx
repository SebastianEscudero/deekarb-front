"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, ChevronsRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    
    <div>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto text-center">
        <h1 className={cn("text-7xl font-normal mb-6")}>
          Advance your business.
          <br />
          Simplify your finances.
        </h1>

        <p className={cn("text-xl mb-12 max-w-xl mx-auto")}>
          Transform how you handle financial transactions with automated controls and advanced warnings systems.
        </p>

        <div className="flex justify-center gap-4 mb-16">
          <div className="flex max-w-md w-full p-1 rounded-2xl bg-white space-x-2">
            <input placeholder="Enter your email" className="w-full bg-transparent px-4 rounded-2xl outline-primary"/>
            <Button variant="primary" className="p-5 rounded-2xl">Open Account</Button>
          </div>
          <Button variant="outline" className="flex items-center rounded-2xl p-6 px-10" size="lg">
            <Calendar className="w-6 h-6" />
            Book Call
          </Button>
        </div>

        <Link href="#interface" className="text-zinc-500 hover:text-zinc-700 inline-flex items-center gap-2">
          explore the interface
          <ChevronsRight className="w-4 h-4" />
        </Link>

        {/* Dashboard Preview */}
        <div className="mt-4">
          <Image 
            src="/landing/dashboard.png" 
            alt="Dashboard Preview" 
            width={10000} 
            height={10000}
            className="w-full rounded-2xl"
            quality={100}
            priority
          />
        </div>
      </main>
    </div>
  )
}