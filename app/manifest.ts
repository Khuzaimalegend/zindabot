import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Noor Writings - Islamic Reflections & Spiritual Insights",
    short_name: "Noor Writings",
    description: "Islamic reflections, Quranic insights, and spiritual guidance for the modern Muslim soul",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#d4a574",
    orientation: "portrait",
    scope: "/",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["education", "lifestyle", "religion"],
    lang: "en",
    dir: "ltr",
  }
}
