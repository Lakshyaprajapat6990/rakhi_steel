import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, role, company, message, rating, imageUrl, projectType } = body

    const testimonial = await db.testimonial.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(role !== undefined && { role }),
        ...(company !== undefined && { company }),
        ...(message !== undefined && { message }),
        ...(rating !== undefined && { rating }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(projectType !== undefined && { projectType }),
      },
    })

    return NextResponse.json({ success: true, data: testimonial })
  } catch (error) {
    console.error('Error updating testimonial:', error)
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.testimonial.delete({ where: { id } })
    return NextResponse.json({ success: true, message: 'Testimonial deleted' })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 })
  }
}
