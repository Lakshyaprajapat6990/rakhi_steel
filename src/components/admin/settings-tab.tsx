'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Save } from 'lucide-react'
import { DEFAULT_SETTINGS } from '@/lib/defaults'

export function SettingsTab() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSettings({ ...DEFAULT_SETTINGS, ...data.data })
      })
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      })
      const data = await res.json()
      if (data.success) {
        setSettings(data.data)
        setMessage('Settings saved! Changes will appear on the website.')
      } else {
        setMessage('Failed to save settings.')
      }
    } catch {
      setMessage('Failed to save settings.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading settings...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Website Settings</h2>
        <p className="text-gray-400 text-sm">Update contact info and hero content shown on the live website.</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Phone 1</Label>
              <Input value={settings.phone1} onChange={(e) => setSettings({ ...settings, phone1: e.target.value })} className="bg-gray-700 border-gray-600 text-white mt-1" />
            </div>
            <div>
              <Label className="text-gray-300">Phone 2</Label>
              <Input value={settings.phone2} onChange={(e) => setSettings({ ...settings, phone2: e.target.value })} className="bg-gray-700 border-gray-600 text-white mt-1" />
            </div>
          </div>
          <div>
            <Label className="text-gray-300">Email</Label>
            <Input value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="bg-gray-700 border-gray-600 text-white mt-1" />
          </div>
          <div>
            <Label className="text-gray-300">Address</Label>
            <Textarea value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} className="bg-gray-700 border-gray-600 text-white mt-1" />
          </div>
          <div>
            <Label className="text-gray-300">WhatsApp Number (without +)</Label>
            <Input value={settings.whatsapp} onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })} className="bg-gray-700 border-gray-600 text-white mt-1" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-300">Hero Title</Label>
            <Input value={settings.hero_title} onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })} className="bg-gray-700 border-gray-600 text-white mt-1" />
          </div>
          <div>
            <Label className="text-gray-300">Hero Subtitle</Label>
            <Textarea value={settings.hero_subtitle} onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })} className="bg-gray-700 border-gray-600 text-white mt-1" rows={3} />
          </div>
          <div>
            <Label className="text-gray-300">About Text</Label>
            <Textarea value={settings.about_text} onChange={(e) => setSettings({ ...settings, about_text: e.target.value })} className="bg-gray-700 border-gray-600 text-white mt-1" rows={4} />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving} className="bg-amber-500 hover:bg-amber-600 text-white">
        <Save size={16} className="mr-2" />
        {saving ? 'Saving...' : 'Save Settings'}
      </Button>
      {message && <p className="text-green-400 text-sm">{message}</p>}
    </div>
  )
}
