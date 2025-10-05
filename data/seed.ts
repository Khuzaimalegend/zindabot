import type { CMSData } from "@/lib/cms-types"

export const seedData: CMSData = {
  settings: {
    siteTitle: "Ayesha Quran",
    tagline: "Reflections, Tafsir, and Islamic Guidance",
    navLinks: [
      { id: "home", label: "Home", href: "/" },
      { id: "blog", label: "Blog", href: "/blog" },
      { id: "categories", label: "Categories", href: "/categories" },
      { id: "about", label: "About", href: "/about" },
      { id: "contact", label: "Contact", href: "/contact" },
      { id: "admin", label: "Admin", href: "/admin" },
    ],
    footerLinks: [
      { id: "f1", label: "Home", href: "/" },
      { id: "f2", label: "All Articles", href: "/blog" },
      { id: "f3", label: "About", href: "/about" },
      { id: "f4", label: "Contact", href: "/contact", variant: "button" },
    ],
  },
  posts: [
    {
      id: "p1",
      title: "Beauty of Patience in Islam",
      slug: "beauty-of-patience-in-islam",
      excerpt:
        "Sabr (patience) is not passive; it is a luminous strength that transforms trials into closeness with Allah.",
      content: `
Patience (Sabr) is a radiant virtue in Islam. Allah says in the Quran: 
"He is with the patient." 

Patience is not merely waiting but meeting tests with steadfastness, trust, and purposeful action. 
From the Prophet Ayyub (AS) to the Prophet Muhammad (ﷺ), patience was a lantern through hardship. 

Practical ways to cultivate sabr:
- Breathe and remember: "Inna lillahi wa inna ilayhi raji'un."
- Anchor your day with salah on time.
- Pair patience with shukr (gratitude) — count what is present, not only what is missing.
- Keep hopeful company and hopeful words.

May Allah beautify our character with sabr and grant relief to every heart. Ameen.
      `.trim(),
      category: "Character",
      tags: ["sabr", "character", "spirituality"],
      coverImage: "/patience-and-light.jpg",
      published: true,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "p2",
      title: "Power of Du‘a: Connecting with Allah",
      slug: "power-of-dua-connecting-with-allah",
      excerpt:
        "Du‘a is the essence of worship — the intimate conversation where the servant opens their heart to the Lord of Mercy.",
      content: `
Du‘a is a gift and a command: "Call upon Me; I will respond to you." (Quran)

Tips to deepen your du‘a:
- Make wudu and choose a quiet moment before Fajr or after prayer.
- Praise Allah, send salawat upon the Prophet (ﷺ), then ask.
- Ask with certainty and humility; no du‘a is wasted.
- Keep a du‘a journal to witness Allah’s responses over time.

May our tongues soften with remembrance, and our hearts glow with hope. Ameen.
      `.trim(),
      category: "Worship",
      tags: ["dua", "worship"],
      coverImage: "/dua-hands-night.jpg",
      published: true,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "p3",
      title: "Seeking Knowledge with Adab",
      slug: "seeking-knowledge-with-adab",
      excerpt: "Adab (etiquette) is the fragrance of knowledge — it carries the message further than words.",
      content: `
Islamic learning is both information and transformation. 
Adab polishes the heart so knowledge can settle and shine.

Etiquettes to revive:
- Sincerity: learn to please Allah, not people.
- Continuity: small, consistent steps are beloved.
- Respect: honor teachers, texts, and time.
- Implementation: act on what you learn.

May Allah increase us in knowledge that benefits. Ameen.
      `.trim(),
      category: "Knowledge",
      tags: ["adab", "knowledge"],
      coverImage: "/books-and-calligraphy.jpg",
      published: true,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
}
