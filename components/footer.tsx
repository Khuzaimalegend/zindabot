"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCMS } from "@/components/cms-provider"

export function Footer() {
  const { settings } = useCMS()

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-pink-300 flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-serif text-xl font-semibold gradient-text">{settings.siteTitle}</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              {settings.tagline ||
                "Illuminating hearts through Islamic reflections, Quranic insights, and spiritual guidance."}
            </p>
            <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-400">
              <p className="text-sm italic text-foreground mb-1">
                "And it is He who sends down rain from heaven, and We produce thereby the vegetation of every kind."
              </p>
              <p className="text-xs text-amber-600 font-medium">— Quran 6:99</p>
            </div>
          </div>

          {/* Quick Links (editable) */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {settings.footerLinks.map((l) => (
                <li key={l.id}>
                  {l.variant === "button" ? (
                    <Button asChild variant="outline" className="border-amber-600 text-amber-600 bg-transparent">
                      <Link href={l.href}>{l.label}</Link>
                    </Button>
                  ) : (
                    <Link href={l.href} className="text-muted-foreground hover:text-amber-600 transition-colors">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Categories (static showcase) */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-amber-600 transition-colors">
                  All Articles
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-amber-600 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-amber-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-amber-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2025 {settings.siteTitle}. Created with <Heart className="h-4 w-4 inline text-red-500" /> for the Ummah.
          </p>
          <div className="flex items-center space-x-4">
            <p className="text-amber-600 font-medium text-sm">جَزَاكَ اللَّهُ خَيْرًا</p>
            <span className="text-muted-foreground text-xs">(May Allah reward you with good)</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
