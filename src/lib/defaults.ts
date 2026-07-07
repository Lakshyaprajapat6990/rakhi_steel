export const PRODUCT_IMAGES = [
  '/images/products/IMG_20260706_211138.png',
  '/images/products/IMG_20260706_211215.png',
  '/images/products/IMG_20260706_211245.png',
  '/images/products/IMG_20260706_211315.png',
  '/images/products/IMG_20260706_211445.jpg.jpeg',
  '/images/products/IMG_20260706_211505.jpg.jpeg',
  '/images/products/IMG_20260706_221842.jpg.jpeg',
  '/images/products/Screenshot_2026-07-06-22-16-38-98_1c337646f29875672b5a61192b9010f9.jpg.jpeg',
  '/images/products/Screenshot_2026-07-06-22-16-54-99_1c337646f29875672b5a61192b9010f9.jpg.jpeg',
  '/images/products/file_000000001054720686fbc026ff9fee45.png',
  '/images/products/file_000000001c4871fb803bf360d1a0d568.png',
  '/images/products/file_0000000048807209ba39e3e2e59b3683.png',
  '/images/products/file_00000000687c71fb861e9625dfd8f462.png',
] as const

export function isBrokenProductImageUrl(url: string | undefined): boolean {
  if (!url) return true
  if (url.includes('WhatsApp')) return true
  if (url.includes('/images/gallery/')) return true
  return !PRODUCT_IMAGES.includes(url as (typeof PRODUCT_IMAGES)[number])
}

export function resolveProductImage(url: string | undefined, order = 0): string {
  if (url && !isBrokenProductImageUrl(url)) return url
  return PRODUCT_IMAGES[Math.abs(order) % PRODUCT_IMAGES.length]
}

export function removeRailingWords(text: string): string {
  return text
    .replace(/Railing and /gi, '')
    .replace(/ railings/gi, '')
    .replace(/ railing/gi, '')
    .replace(/railings/gi, '')
    .replace(/railing/gi, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/ ,/g, ',')
    .replace(/,\s*,/g, ',')
    .trim()
}

export const DEFAULT_SETTINGS: Record<string, string> = {
  phone1: '+91 98765 43210',
  phone2: '+91 98765 43211',
  email: 'info@rakhisteelfurniture.com',
  address: 'Industrial Area, Sector 25, Indore, Madhya Pradesh - 452001',
  whatsapp: '919876543210',
  hero_title: 'राखी Steel and Fabrications',
  hero_subtitle:
    'Premium stainless steel, glass, balcony & staircase solutions. Expert fabrication with precision installation across Madhya Pradesh.',
  about_text:
    'राखी Steel and Fabrications is a trusted name in premium steel manufacturing and custom fabrication. We specialize in stainless steel, glass, balcony, staircase, and bespoke steel fabrication for homes, apartments, offices, and commercial projects.',
  company_name: 'राखी Steel Furniture',
}

export const DEFAULT_PRODUCTS = [
  {
    name: '2 Door Steel Almirah',
    description: 'Premium quality steel construction with powder coating',
    price: '₹12,999',
    category: 'Bestseller',
    imageUrls: ['/images/products/IMG_20260706_211138.png'],
    isFeatured: true,
    order: 0,
  },
  {
    name: '3 Door Steel Almirah',
    description: 'Premium quality steel construction with powder coating',
    price: '₹18,999',
    category: 'Popular',
    imageUrls: ['/images/products/IMG_20260706_211215.png'],
    isFeatured: true,
    order: 1,
  },
  {
    name: 'Mirror Almirah',
    description: 'Premium quality steel construction with powder coating',
    price: '₹15,999',
    category: 'New',
    imageUrls: ['/images/products/IMG_20260706_211245.png'],
    isFeatured: true,
    order: 2,
  },
  {
    name: 'Premium Designer Almirah',
    description: 'Premium quality steel construction with powder coating',
    price: '₹24,999',
    category: 'Premium',
    imageUrls: ['/images/products/IMG_20260706_211315.png'],
    isFeatured: true,
    order: 3,
  },
  {
    name: 'Steel Wardrobe',
    description: 'Premium quality steel construction with powder coating',
    price: '₹22,999',
    category: 'Trending',
    imageUrls: ['/images/products/IMG_20260706_211445.jpg.jpeg'],
    isFeatured: true,
    order: 4,
  },
  {
    name: 'Office Cabinet',
    description: 'Premium quality steel construction with powder coating',
    price: '₹14,999',
    category: 'Commercial',
    imageUrls: ['/images/products/IMG_20260706_211505.jpg.jpeg'],
    isFeatured: true,
    order: 5,
  },
]

export const DEFAULT_TESTIMONIALS = [
  {
    name: 'Rajesh Kumar',
    role: 'Homeowner',
    company: 'Indore',
    message:
      'Excellent quality steel almirah. The powder coating finish is amazing and the product is very durable. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Interior Designer',
    company: 'Bhopal',
    message:
      'I have been recommending राखी Steel Furniture to all my clients. Their custom manufacturing service is exceptional.',
    rating: 5,
  },
  {
    name: 'Amit Patel',
    role: 'School Administrator',
    company: 'Ujjain',
    message:
      'We ordered 50+ almirahs for our school hostel. Great quality, timely delivery, and excellent after-sales service.',
    rating: 5,
  },
]
