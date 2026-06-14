import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body

    const validStatuses = ['new', 'contacted', 'negotiation', 'converted', 'closed']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const inquiry = await db.inquiry.update({
      where: { id },
      data: { status }
    })

    return NextResponse.json({
      success: true,
      data: inquiry
    })
  } catch (error) {
    console.error('Error updating inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to update inquiry' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await db.inquiry.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Inquiry deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to delete inquiry' },
      { status: 500 }
    )
  }
}
