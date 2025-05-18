"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <div className="flex flex-col gap-6 px-2 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
              <span className="inline-block font-bold text-xl">MovieFlix</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="flex flex-col gap-4">
            <Link href="/" className="text-base font-medium text-primary" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link
              href="#"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
            >
              Movies
            </Link>
            <Link
              href="#"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
            >
              TV Shows
            </Link>
            <Link
              href="#"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
            >
              New & Popular
            </Link>
            <Link
              href="#"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
            >
              My List
            </Link>
          </nav>
          <div className="mt-4 border-t pt-4">
            <Link
              href="#"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
            >
              Account
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
