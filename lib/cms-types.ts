export type NavLink = {
  id: string
  label: string
  href: string
}

export type FooterLink = {
  id: string
  label: string
  href: string
  variant?: "default" | "button"
}

export type SiteSettings = {
  siteTitle: string
  tagline?: string
  navLinks: NavLink[]
  footerLinks: FooterLink[]
}

export type Post = {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  category?: string
  tags?: string[]
  coverImage?: string
  published: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export type CMSData = {
  settings: SiteSettings
  posts: Post[]
}
