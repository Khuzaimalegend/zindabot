"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryCard } from "@/components/category-card"
import { useCMS } from "@/components/cms-provider"

export function CategoriesClient() {
  const { posts } = useCMS()

  const map = new Map<string, number>()
  posts
    .filter((p) => p.published)
    .forEach((p) => {
      const key = p.category || "General"
      map.set(key, (map.get(key) || 0) + 1)
    })

  const categories = Array.from(map.entries()).map(([name, count]) => ({
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    blog_posts: [{ count }],
  }))

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-20 islamic-pattern">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 gradient-text">Explore by Category</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Discover Islamic wisdom organized by spiritual themes and topics
              </p>

              {/* Quranic Verse */}
              <div className="p-6 bg-card rounded-lg border border-amber-200/50 max-w-2xl mx-auto">
                <blockquote className="font-serif text-lg italic text-foreground mb-2">
                  "And We made from them leaders guiding by Our command when they were patient and were certain of Our
                  signs."
                </blockquote>
                <cite className="text-amber-600 font-medium text-sm">— Quran 32:24</cite>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category as any} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
