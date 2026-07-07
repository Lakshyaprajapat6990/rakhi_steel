import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { DEFAULT_SETTINGS } from '@/lib/defaults'
import { ensureSeedData } from '@/lib/seed'

export async function GET() {
  try {
    await ensureSeedData()

    const settings = await db.siteSettings.findMany()
    const data: Record<string, string> = { ...DEFAULT_SETTINGS }

    for (const setting of settings) {
      data[setting.key] = setting.value
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { success: true, data: DEFAULT_SETTINGS },
      { status: 200 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const updates = body.settings as Record<string, string>

    if (!updates || typeof updates !== 'object') {
      return NextResponse.json({ error: 'Invalid settings data' }, { status: 400 })
    }

    for (const [key, value] of Object.entries(updates)) {
      await db.siteSettings.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    }

    const settings = await db.siteSettings.findMany()
    const data: Record<string, string> = { ...DEFAULT_SETTINGS }
    for (const setting of settings) {
      data[setting.key] = setting.value
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
