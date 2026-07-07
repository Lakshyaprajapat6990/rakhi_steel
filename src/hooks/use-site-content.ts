'use client'

import { useEffect, useState } from 'react'
import { DEFAULT_SETTINGS } from '@/lib/defaults'

export interface SiteProduct {
  id: string
  name: string
  description: string
  price: string | null
  category: string
  imageUrls: string
  isFeatured: boolean
  order: number
}

export interface SiteTestimonial {
  id: string
  name: string
  role: string | null
  company: string | null
  message: string
  rating: number
}

export type SiteSettings = Record<string, string>

export function useSiteContent() {
  const [products, setProducts] = useState<SiteProduct[]>([])
  const [testimonials, setTestimonials] = useState<SiteTestimonial[]>([])
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [productsRes, testimonialsRes, settingsRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/testimonials'),
          fetch('/api/settings'),
        ])

        const [productsData, testimonialsData, settingsData] = await Promise.all([
          productsRes.json(),
          testimonialsRes.json(),
          settingsRes.json(),
        ])

        if (productsData.success) setProducts(productsData.data)
        if (testimonialsData.success) setTestimonials(testimonialsData.data)
        if (settingsData.success) setSettings({ ...DEFAULT_SETTINGS, ...settingsData.data })
      } catch (error) {
        console.error('Failed to load site content:', error)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return { products, testimonials, settings, loading }
}

export function parseImageUrls(imageUrls: string): string[] {
  try {
    const parsed = JSON.parse(imageUrls)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
