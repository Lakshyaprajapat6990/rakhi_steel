'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Pencil, Plus, Save, Trash2 } from 'lucide-react'
import { parseImageUrls } from '@/hooks/use-site-content'

interface Product {
  id: string
  name: string
  description: string
  price: string | null
  category: string
  imageUrls: string
  isFeatured: boolean
  order: number
}

const emptyProduct = {
  name: '',
  description: '',
  price: '',
  category: 'New',
  imageUrls: [''],
  isFeatured: true,
  order: 0,
}

export function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState(emptyProduct)
  const [message, setMessage] = useState('')

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products?all=true')
      const data = await res.json()
      if (data.success) setProducts(data.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const openCreate = () => {
    setEditing(null)
    setForm({ ...emptyProduct, order: products.length })
    setShowForm(true)
    setMessage('')
  }

  const openEdit = (product: Product) => {
    setEditing(product)
    setForm({
      name: product.name,
      description: product.description,
      price: product.price || '',
      category: product.category,
      imageUrls: parseImageUrls(product.imageUrls).length ? parseImageUrls(product.imageUrls) : [''],
      isFeatured: product.isFeatured,
      order: product.order,
    })
    setShowForm(true)
    setMessage('')
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: form.price,
        category: form.category,
        imageUrls: form.imageUrls.filter(Boolean),
        isFeatured: form.isFeatured,
        order: form.order,
      }

      const res = editing
        ? await fetch(`/api/products/${editing.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        : await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })

      const data = await res.json()
      if (data.success) {
        setMessage('Product saved! Changes will appear on the website.')
        setEditing(null)
        setForm(emptyProduct)
        setShowForm(false)
        fetchProducts()
      } else {
        setMessage('Failed to save product.')
      }
    } catch {
      setMessage('Failed to save product.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    fetchProducts()
  }

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading products...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Products</h2>
          <p className="text-gray-400 text-sm">Manage featured products shown on the website.</p>
        </div>
        <Button onClick={openCreate} className="bg-amber-500 hover:bg-amber-600 text-white">
          <Plus size={16} className="mr-2" />
          Add Product
        </Button>
      </div>

      {(showForm) && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">{editing ? 'Edit Product' : 'Add Product'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white mt-1"
                />
              </div>
              <div>
                <Label className="text-gray-300">Price</Label>
                <Input
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white mt-1"
                />
              </div>
            </div>
            <div>
              <Label className="text-gray-300">Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white mt-1"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Badge / Category</Label>
                <Input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white mt-1"
                />
              </div>
              <div>
                <Label className="text-gray-300">Image URL</Label>
                <Input
                  value={form.imageUrls[0] || ''}
                  onChange={(e) => setForm({ ...form, imageUrls: [e.target.value] })}
                  className="bg-gray-700 border-gray-600 text-white mt-1"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saving} className="bg-amber-500 hover:bg-amber-600 text-white">
                <Save size={16} className="mr-2" />
                {saving ? 'Saving...' : 'Save Product'}
              </Button>
              <Button variant="outline" onClick={() => { setShowForm(false); setEditing(null); setForm(emptyProduct) }} className="border-gray-600 text-gray-300">
                Cancel
              </Button>
            </div>
            {message && <p className="text-green-400 text-sm">{message}</p>}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {products.map((product) => {
          const image = parseImageUrls(product.imageUrls)[0]
          return (
            <Card key={product.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex gap-4 items-center">
                  {image && (
                    <img src={image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                  )}
                  <div>
                    <div className="text-white font-semibold">{product.name}</div>
                    <div className="text-gray-400 text-sm">{product.description}</div>
                    <div className="flex gap-2 mt-2">
                      <Badge className="bg-amber-500/20 text-amber-400">{product.category}</Badge>
                      <span className="text-amber-400 font-bold">{product.price}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(product)} className="text-gray-400 hover:text-white">
                    <Pencil size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(product.id)} className="text-gray-400 hover:text-red-400">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
