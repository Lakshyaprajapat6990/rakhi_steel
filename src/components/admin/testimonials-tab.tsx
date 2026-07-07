'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Pencil, Plus, Save, Trash2 } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string | null
  company: string | null
  message: string
  rating: number
}

const emptyTestimonial = {
  name: '',
  role: '',
  company: '',
  message: '',
  rating: 5,
}

export function TestimonialsTab() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [form, setForm] = useState(emptyTestimonial)
  const [message, setMessage] = useState('')

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials')
      const data = await res.json()
      if (data.success) setTestimonials(data.data)
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyTestimonial)
    setShowForm(true)
    setMessage('')
  }

  const openEdit = (testimonial: Testimonial) => {
    setEditing(testimonial)
    setForm({
      name: testimonial.name,
      role: testimonial.role || '',
      company: testimonial.company || '',
      message: testimonial.message,
      rating: testimonial.rating,
    })
    setShowForm(true)
    setMessage('')
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const res = editing
        ? await fetch(`/api/testimonials/${editing.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
          })
        : await fetch('/api/testimonials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
          })

      const data = await res.json()
      if (data.success) {
        setMessage('Testimonial saved! Changes will appear on the website.')
        setEditing(null)
        setForm(emptyTestimonial)
        setShowForm(false)
        fetchTestimonials()
      } else {
        setMessage('Failed to save testimonial.')
      }
    } catch {
      setMessage('Failed to save testimonial.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
    fetchTestimonials()
  }

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading testimonials...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Testimonials</h2>
          <p className="text-gray-400 text-sm">Manage customer reviews shown on the website.</p>
        </div>
        <Button onClick={openCreate} className="bg-amber-500 hover:bg-amber-600 text-white">
          <Plus size={16} className="mr-2" />
          Add Testimonial
        </Button>
      </div>

      {showForm && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-gray-700 border-gray-600 text-white mt-1" />
              </div>
              <div>
                <Label className="text-gray-300">Role</Label>
                <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="bg-gray-700 border-gray-600 text-white mt-1" />
              </div>
            </div>
            <div>
              <Label className="text-gray-300">Location</Label>
              <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="bg-gray-700 border-gray-600 text-white mt-1" />
            </div>
            <div>
              <Label className="text-gray-300">Message</Label>
              <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="bg-gray-700 border-gray-600 text-white mt-1" rows={4} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saving} className="bg-amber-500 hover:bg-amber-600 text-white">
                <Save size={16} className="mr-2" />
                {saving ? 'Saving...' : 'Save Testimonial'}
              </Button>
              <Button variant="outline" onClick={() => { setShowForm(false); setEditing(null) }} className="border-gray-600 text-gray-300">
                Cancel
              </Button>
            </div>
            {message && <p className="text-green-400 text-sm">{message}</p>}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 flex justify-between gap-4">
              <div>
                <div className="text-white font-semibold">{testimonial.name}</div>
                <div className="text-gray-400 text-sm">{testimonial.role}, {testimonial.company}</div>
                <p className="text-gray-300 mt-2 italic">&ldquo;{testimonial.message}&rdquo;</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => openEdit(testimonial)} className="text-gray-400 hover:text-white">
                  <Pencil size={16} />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(testimonial.id)} className="text-gray-400 hover:text-red-400">
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
