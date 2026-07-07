import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, description, features, specifications, imageUrls, category, price, isFeatured, order } = body

    const product = await db.product.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(features !== undefined && { features: JSON.stringify(features) }),
        ...(specifications !== undefined && { specifications: JSON.stringify(specifications) }),
        ...(imageUrls !== undefined && { imageUrls: JSON.stringify(imageUrls) }),
        ...(category !== undefined && { category }),
        ...(price !== undefined && { price }),
        ...(isFeatured !== undefined && { isFeatured }),
        ...(order !== undefined && { order }),
      },
    })

    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.product.delete({ where: { id } })
    return NextResponse.json({ success: true, message: 'Product deleted' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
