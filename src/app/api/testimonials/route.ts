import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 20
    })

    return NextResponse.json({
      success: true,
      data: testimonials
    })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, role, company, message, rating, imageUrl, projectType } = body

    const testimonial = await db.testimonial.create({
      data: {
        name,
        role: role || null,
        company: company || null,
        message,
        rating: rating || 5,
        imageUrl: imageUrl || null,
        projectType: projectType || null
      }
    })

    return NextResponse.json({
      success: true,
      data: testimonial
    })
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}
