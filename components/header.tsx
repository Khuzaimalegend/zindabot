"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"
import { Menu } from "lucide-react"
import { useCMS } from "@/components/cms-provider"

export function Header() {
  const { settings } = useCMS()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-sm">ن</span>
            </div>
            <span className="font-serif text-xl font-semibold gradient-text">{settings.siteTitle}</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {settings.navLinks.map((l) => (
              <Link
                key={l.id}
                href={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <SearchBar />
            </div>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
