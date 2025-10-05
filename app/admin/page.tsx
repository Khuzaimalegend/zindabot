"use client"

import { useMemo, useState } from "react"
import { useCMS } from "@/components/cms-provider"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

type EditingPost = {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  published: boolean
}

export default function AdminDashboard() {
  const { posts, settings, updateSettings, setNavLinks, setFooterLinks, addPost, updatePost, deletePost } = useCMS()

  // Posts manager state
  const [form, setForm] = useState<EditingPost>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    published: false,
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  const sortedPosts = useMemo(
    () =>
      [...posts].sort(
        (a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime(),
      ),
    [posts],
  )

  const genSlug = (t: string) =>
    t
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()

  const startEdit = (id: string) => {
    const p = posts.find((x) => x.id === id)
    if (!p) return
    setEditingId(id)
    setForm({
      id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || "",
      content: p.content,
      category: p.category || "",
      published: p.published,
    })
  }

  const resetForm = () => {
    setEditingId(null)
    setForm({ title: "", slug: "", excerpt: "", content: "", category: "", published: false })
  }

  const submitPost = () => {
    if (editingId) {
      updatePost(editingId, {
        title: form.title,
        slug: form.slug || genSlug(form.title),
        excerpt: form.excerpt,
        content: form.content,
        category: form.category,
        published: form.published,
        publishedAt: form.published ? new Date().toISOString() : undefined,
      })
    } else {
      const created = addPost({
        title: form.title,
        slug: form.slug || genSlug(form.title),
        excerpt: form.excerpt,
        content: form.content,
        category: form.category,
        tags: [],
        coverImage: undefined,
        published: form.published,
        publishedAt: form.published ? new Date().toISOString() : undefined,
      } as any)
      setEditingId(created.id)
    }
    resetForm()
  }

  return (
    <AdminLayout>
      <div className="space-y-10">
        {/* Site Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Site Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="siteTitle">Site Title</Label>
                <Input
                  id="siteTitle"
                  value={settings.siteTitle}
                  onChange={(e) => updateSettings({ siteTitle: e.target.value })}
                  placeholder="Site title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={settings.tagline || ""}
                  onChange={(e) => updateSettings({ tagline: e.target.value })}
                  placeholder="Short tagline"
                />
              </div>
            </div>

            <Separator />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold">Navigation Links</h3>
                {settings.navLinks.map((link, idx) => (
                  <div className="grid grid-cols-5 gap-2" key={link.id}>
                    <Input
                      className="col-span-2"
                      value={link.label}
                      onChange={(e) => {
                        const dup = [...settings.navLinks]
                        dup[idx] = { ...dup[idx], label: e.target.value }
                        setNavLinks(dup)
                      }}
                      placeholder="Label"
                    />
                    <Input
                      className="col-span-2"
                      value={link.href}
                      onChange={(e) => {
                        const dup = [...settings.navLinks]
                        dup[idx] = { ...dup[idx], href: e.target.value }
                        setNavLinks(dup)
                      }}
                      placeholder="/path"
                    />
                    <Button
                      variant="destructive"
                      onClick={() => setNavLinks(settings.navLinks.filter((l) => l.id !== link.id))}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() =>
                    setNavLinks([...settings.navLinks, { id: crypto.randomUUID(), label: "New", href: "/about" }])
                  }
                >
                  Add Nav Link
                </Button>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Footer Links</h3>
                {settings.footerLinks.map((link, idx) => (
                  <div className="grid grid-cols-6 gap-2" key={link.id}>
                    <Input
                      className="col-span-2"
                      value={link.label}
                      onChange={(e) => {
                        const dup = [...settings.footerLinks]
                        dup[idx] = { ...dup[idx], label: e.target.value }
                        setFooterLinks(dup)
                      }}
                      placeholder="Label"
                    />
                    <Input
                      className="col-span-2"
                      value={link.href}
                      onChange={(e) => {
                        const dup = [...settings.footerLinks]
                        dup[idx] = { ...dup[idx], href: e.target.value }
                        setFooterLinks(dup)
                      }}
                      placeholder="/path"
                    />
                    <select
                      className="col-span-1 border rounded px-2 py-1"
                      value={link.variant || "default"}
                      onChange={(e) => {
                        const dup = [...settings.footerLinks]
                        dup[idx] = { ...dup[idx], variant: e.target.value as any }
                        setFooterLinks(dup)
                      }}
                    >
                      <option value="default">Default</option>
                      <option value="button">Button</option>
                    </select>
                    <Button
                      variant="destructive"
                      onClick={() => setFooterLinks(settings.footerLinks.filter((l) => l.id !== link.id))}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() =>
                    setFooterLinks([
                      ...settings.footerLinks,
                      { id: crypto.randomUUID(), label: "Contact", href: "/contact", variant: "button" },
                    ])
                  }
                >
                  Add Footer Link
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Manager */}
        <Card>
          <CardHeader>
            <CardTitle>Posts Manager</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: genSlug(e.target.value) }))}
                  placeholder="Article title"
                />
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="beauty-of-patience"
                />
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  placeholder="e.g. Worship"
                />
                <div className="flex items-center gap-2">
                  <Switch
                    id="published"
                    checked={form.published}
                    onCheckedChange={(v) => setForm((f) => ({ ...f, published: v }))}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={form.excerpt}
                  onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  placeholder="Short summary of the article..."
                  rows={4}
                />
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  placeholder="Write your article content..."
                  rows={10}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={submitPost}>{editingId ? "Update Post" : "Create Post"}</Button>
              {editingId ? (
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              ) : null}
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold">All Posts</h3>
              <div className="grid gap-3">
                {sortedPosts.map((p) => (
                  <div
                    key={p.id}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-3 border rounded-md p-3"
                  >
                    <div>
                      <div className="font-medium">{p.title}</div>
                      <div className="text-xs text-muted-foreground">
                        /blog/{p.slug} • {p.category || "General"} • {p.published ? "Published" : "Draft"}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => startEdit(p.id)}>
                        Edit
                      </Button>
                      <Button
                        variant={p.published ? "outline" : "default"}
                        onClick={() =>
                          updatePost(p.id, {
                            published: !p.published,
                            publishedAt: !p.published ? new Date().toISOString() : undefined,
                          })
                        }
                      >
                        {p.published ? "Unpublish" : "Publish"}
                      </Button>
                      <Button variant="destructive" onClick={() => deletePost(p.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
