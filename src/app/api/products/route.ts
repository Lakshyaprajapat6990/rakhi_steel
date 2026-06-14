import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const products = await db.product.findMany({
      where: {
        isFeatured: true
      },
      orderBy: {
        order: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      data: products
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, features, specifications, imageUrls, category, price, isFeatured, order } = body

    const product = await db.product.create({
      data: {
        name,
        description: description || '',
        features: JSON.stringify(features || []),
        specifications: JSON.stringify(specifications || {}),
        imageUrls: JSON.stringify(imageUrls || []),
        category: category || 'general',
        price: price || null,
        isFeatured: isFeatured ?? false,
        order: order ?? 0
      }
    })

    return NextResponse.json({
      success: true,
      data: product
    })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
