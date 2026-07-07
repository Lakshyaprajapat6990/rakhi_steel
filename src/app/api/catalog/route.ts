import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email } = body

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      )
    }

    const catalogRequest = await db.catalogRequest.create({
      data: {
        name,
        phone,
        email: email || null
      }
    })

    // In a real app, you would send the catalog via email or provide a download link
    return NextResponse.json({
      success: true,
      message: 'Catalog request received. We will send it to you shortly.',
      data: catalogRequest
    })
  } catch (error) {
    console.error('Error creating catalog request:', error)
    return NextResponse.json(
      { error: 'Failed to request catalog' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const requests = await db.catalogRequest.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 100
    })

    return NextResponse.json({
      success: true,
      data: requests
    })
  } catch (error) {
    console.error('Error fetching catalog requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch catalog requests' },
      { status: 500 }
    )
  }
}
