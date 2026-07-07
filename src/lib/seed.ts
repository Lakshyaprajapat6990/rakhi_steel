import { db } from '@/lib/db'
import {
  DEFAULT_PRODUCTS,
  DEFAULT_SETTINGS,
  DEFAULT_TESTIMONIALS,
  isBrokenProductImageUrl,
  resolveProductImage,
} from '@/lib/defaults'

function parseImageUrls(imageUrls: string): string[] {
  try {
    const parsed = JSON.parse(imageUrls)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function syncProductImages() {
  const products = await db.product.findMany({ orderBy: { order: 'asc' } })

  for (const product of products) {
    const currentUrl = parseImageUrls(product.imageUrls)[0]
    if (!isBrokenProductImageUrl(currentUrl)) continue

    const nextUrl = resolveProductImage(undefined, product.order)
    await db.product.update({
      where: { id: product.id },
      data: { imageUrls: JSON.stringify([nextUrl]) },
    })
  }
}

async function syncBrandingSettings() {
  const settings = await db.siteSettings.findMany()

  for (const setting of settings) {
    if (!setting.value.includes('Aditya Steel')) continue

    await db.siteSettings.update({
      where: { key: setting.key },
      data: { value: setting.value.replaceAll('Aditya Steel', 'राखी Steel') },
    })
  }

  await db.siteSettings.upsert({
    where: { key: 'company_name' },
    update: { value: 'राखी Steel Furniture' },
    create: { key: 'company_name', value: 'राखी Steel Furniture' },
  })
}

export async function ensureSeedData() {
  const productCount = await db.product.count()
  if (productCount === 0) {
    for (const product of DEFAULT_PRODUCTS) {
      await db.product.create({
        data: {
          name: product.name,
          description: product.description,
          features: '[]',
          specifications: '{}',
          imageUrls: JSON.stringify(product.imageUrls),
          category: product.category,
          price: product.price,
          isFeatured: product.isFeatured,
          order: product.order,
        },
      })
    }
  } else {
    await syncProductImages()
  }

  await syncBrandingSettings()

  const testimonialCount = await db.testimonial.count()
  if (testimonialCount === 0) {
    for (const testimonial of DEFAULT_TESTIMONIALS) {
      await db.testimonial.create({ data: testimonial })
    }
  }

  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    await db.siteSettings.upsert({
      where: { key },
      update: {},
      create: { key, value },
    })
  }
}
