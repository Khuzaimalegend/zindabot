"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogGrid } from "@/components/blog-grid"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { useCMS } from "@/components/cms-provider"

export default function BlogPageClient() {
  const { posts } = useCMS()
  const toCard = (p: any) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt || p.content?.slice(0, 140) || "",
    category: p.category || "General",
    created_at: p.publishedAt || p.createdAt,
  })

  const published = posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime())
    .map(toCard)

  const breadcrumbItems = [{ label: "Blog" }]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-20 islamic-pattern">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 gradient-text">Islamic Reflections</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Discover spiritual insights, Quranic wisdom, and guidance for the modern Muslim journey
              </p>
              <div className="p-6 bg-card rounded-lg border border-amber-200/50 max-w-2xl mx-auto">
                <blockquote className="font-serif text-lg italic text-foreground mb-2">
                  {'"And whoever fears Allah - He will make for him a way out."'}
                </blockquote>
                <cite className="text-amber-600 font-medium text-sm">{"— Quran 65:2"}</cite>
              </div>
            </div>
          </div>
        </section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        <BlogGrid posts={published} />
      </main>
      <Footer />
    </div>
  )
}

export { BlogPageClient }
