"use client"

import { useEffect, useMemo, useState, useCallback } from "react"
import { seedData } from "@/data/seed"
import type { CMSData, Post, SiteSettings, NavLink, FooterLink } from "@/lib/cms-types"

const STORAGE_KEY = "ayesha-quran-cms-v1"

function readStorage(): CMSData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as CMSData
  } catch {
    return null
  }
}

function writeStorage(data: CMSData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // ignore
  }
}

export function useLocalCMS() {
  const [data, setData] = useState<CMSData>(seedData)

  useEffect(() => {
    const loaded = readStorage()
    if (loaded) {
      setData(loaded)
    } else {
      writeStorage(seedData)
    }
  }, [])

  const posts = data.posts
  const settings = data.settings

  const save = useCallback((next: CMSData) => {
    setData(next)
    writeStorage(next)
  }, [])

  // Settings mutations
  const updateSettings = useCallback(
    (partial: Partial<SiteSettings>) => {
      save({ ...data, settings: { ...data.settings, ...partial } })
    },
    [data, save],
  )

  const setNavLinks = useCallback(
    (links: NavLink[]) => {
      save({ ...data, settings: { ...data.settings, navLinks: links } })
    },
    [data, save],
  )

  const setFooterLinks = useCallback(
    (links: FooterLink[]) => {
      save({ ...data, settings: { ...data.settings, footerLinks: links } })
    },
    [data, save],
  )

  // Post mutations
  const addPost = useCallback(
    (post: Omit<Post, "id" | "createdAt" | "updatedAt">) => {
      const now = new Date().toISOString()
      const id = crypto.randomUUID()
      const nextPost: Post = { ...post, id, createdAt: now, updatedAt: now }
      save({ ...data, posts: [nextPost, ...data.posts] })
      return nextPost
    },
    [data, save],
  )

  const updatePost = useCallback(
    (id: string, changes: Partial<Post>) => {
      const now = new Date().toISOString()
      const next = data.posts.map((p) => (p.id === id ? { ...p, ...changes, updatedAt: now } : p))
      save({ ...data, posts: next })
    },
    [data, save],
  )

  const deletePost = useCallback(
    (id: string) => {
      save({ ...data, posts: data.posts.filter((p) => p.id !== id) })
    },
    [data, save],
  )

  const value = useMemo(
    () => ({
      data,
      posts,
      settings,
      updateSettings,
      setNavLinks,
      setFooterLinks,
      addPost,
      updatePost,
      deletePost,
    }),
    [data, posts, settings, updateSettings, setNavLinks, setFooterLinks, addPost, updatePost, deletePost],
  )

  return value
}
