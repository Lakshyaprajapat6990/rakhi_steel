import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, inquiryType, productName } = body

    // Validate required fields
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Name, phone, and message are required' },
        { status: 400 }
      )
    }

    // Create inquiry in database
    const inquiry = await db.inquiry.create({
      data: {
        name,
        email: email || '',
        phone,
        message,
        inquiryType: inquiryType || 'general',
        productName: productName || null,
        status: 'new'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: inquiry
    })
  } catch (error) {
    console.error('Error creating inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const inquiries = await db.inquiry.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 100
    })

    return NextResponse.json({
      success: true,
      data: inquiries
    })
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}
