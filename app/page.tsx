"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedPosts } from "@/components/featured-posts"
import { RecentPosts } from "@/components/recent-posts"
import { Footer } from "@/components/footer"
import { PrayerTimes } from "@/components/prayer-times"
import { DhikrCounter } from "@/components/dhikr-counter"
import { IslamicCalendar } from "@/components/islamic-calendar"
import { DailyVerse } from "@/components/daily-verse"
import { useCMS } from "@/components/cms-provider"

export default function HomePage() {
  const { posts } = useCMS()

  const published = posts.filter((p) => p.published)
  const toCard = (p: any) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt || p.content?.slice(0, 140) || "",
    category: p.category || "General",
    created_at: p.publishedAt || p.createdAt,
    quranic_verse: p.quranic_verse,
    verse_reference: p.verse_reference,
  })

  const recentPosts = published
    .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime())
    .slice(0, 6)
    .map(toCard)

  const featuredPosts = published.slice(0, 3).map(toCard)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />

        <section className="py-12 bg-gradient-to-b from-amber-50/50 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-center mb-8 gradient-text">Islamic Tools & Resources</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DailyVerse />
              <PrayerTimes />
              <IslamicCalendar />
              <DhikrCounter />
            </div>
          </div>
        </section>

        <FeaturedPosts posts={featuredPosts} />
        <RecentPosts posts={recentPosts} />
      </main>
      <Footer />
    </div>
  )
}
