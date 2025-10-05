"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogPost } from "@/components/blog-post"
import { RelatedPosts } from "@/components/related-posts"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { IslamicElements } from "@/components/islamic-elements"
import { useCMS } from "@/components/cms-provider"

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>()
  const { posts } = useCMS()

  const { post, related } = useMemo(() => {
    const current = posts.find((p) => p.slug === params.slug && p.published)
    if (!current) return { post: null, related: [] as any[] }
    const related = posts
      .filter((p) => p.published && p.category === current.category && p.id !== current.id)
      .slice(0, 3)
    return { post: current, related }
  }, [posts, params.slug])

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-semibold text-foreground">Post not found</h1>
              <p className="mt-2 text-muted-foreground">
                The post you&apos;re looking for doesn&apos;t exist or was unpublished.
              </p>
              <a href="/blog" className="mt-6 inline-flex text-primary underline">
                Back to Blog
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const postForView = {
    id: post.id,
    title: post.title,
    content: post.content,
    category: post.category || "General",
    created_at: post.publishedAt || post.createdAt,
    author_name: (post as any).author_name,
    quranic_verse: (post as any).quranic_verse,
    verse_reference: (post as any).verse_reference,
    tags: post.tags || [],
  }

  const relatedCards = related.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt || p.content?.slice(0, 140) || "",
    category: p.category || "General",
    created_at: p.publishedAt || p.createdAt,
  }))

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              {
                label: post.category || "General",
                href: `/blog?category=${encodeURIComponent(post.category || "General")}`,
              },
              { label: post.title },
            ]}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <BlogPost post={postForView} />
              <RelatedPosts posts={relatedCards} />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <IslamicElements />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
