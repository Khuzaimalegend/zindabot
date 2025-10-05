import BlogPageClient from "./page.client"

export const metadata = {
  title: "Blog - Islamic Reflections & Spiritual Insights",
  description:
    "Explore our collection of Islamic reflections, Quranic insights, and spiritual guidance for the modern Muslim soul.",
  keywords: ["Islamic blog", "Quran studies", "Islamic reflections", "spiritual guidance", "Islamic teachings"],
  openGraph: {
    title: "Blog - Noor Writings",
    description: "Explore our collection of Islamic reflections, Quranic insights, and spiritual guidance.",
    type: "website",
  },
  alternates: {
    canonical: "https://noorwritings.com/blog",
  },
}

export default function BlogPage() {
  return <BlogPageClient />
}
