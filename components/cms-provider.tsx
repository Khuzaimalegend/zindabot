"use client"

import type React from "react"

import { createContext, useContext } from "react"
import { useLocalCMS } from "@/lib/local-cms"

type CMSContext = ReturnType<typeof useLocalCMS>

const Ctx = createContext<CMSContext | null>(null)

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const value = useLocalCMS()
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCMS() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useCMS must be used within CMSProvider")
  return ctx
}
