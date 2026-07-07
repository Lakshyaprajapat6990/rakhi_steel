'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Package, MessageSquare, Settings,
  LogOut, Bell, Search, Eye, Trash2, CheckCircle,
  Clock, Factory, Menu, X, Mail, ExternalLink, Quote
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ProductsTab } from '@/components/admin/products-tab'
import { TestimonialsTab } from '@/components/admin/testimonials-tab'
import { SettingsTab } from '@/components/admin/settings-tab'

interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  message: string
  inquiryType: string
  status: string
  productName: string | null
  createdAt: string
}

type Tab = 'dashboard' | 'inquiries' | 'products' | 'testimonials' | 'settings'

const navItems: { id: Tab; icon: typeof LayoutDashboard; label: string }[] = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'inquiries', icon: MessageSquare, label: 'Inquiries' },
  { id: 'products', icon: Package, label: 'Products' },
  { id: 'testimonials', icon: Quote, label: 'Testimonials' },
  { id: 'settings', icon: Settings, label: 'Settings' },
]

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const router = useRouter()

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiry')
      const data = await res.json()
      if (data.success) {
        setInquiries(data.data)
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/inquiry/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      fetchInquiries()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const deleteInquiry = async (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await fetch(`/api/inquiry/${id}`, { method: 'DELETE' })
        fetchInquiries()
      } catch (error) {
        console.error('Error deleting inquiry:', error)
      }
    }
  }

  const handleLogout = () => {
    router.push('/admin')
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      new: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      contacted: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      negotiation: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      converted: 'bg-green-500/10 text-green-400 border-green-500/20',
      closed: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    }
    return styles[status] || styles.new
  }

  const stats = [
    { title: 'Total Inquiries', value: inquiries.length, icon: MessageSquare, color: 'from-blue-500 to-cyan-500' },
    { title: 'New', value: inquiries.filter((i) => i.status === 'new').length, icon: Bell, color: 'from-amber-500 to-orange-500' },
    { title: 'Converted', value: inquiries.filter((i) => i.status === 'converted').length, icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
    { title: 'Pending', value: inquiries.filter((i) => i.status === 'contacted' || i.status === 'negotiation').length, icon: Clock, color: 'from-purple-500 to-pink-500' },
  ]

  const renderInquiriesTable = () => (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Recent Inquiries</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8 text-gray-400">
            <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
            Loading inquiries...
          </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <MessageSquare className="mx-auto mb-4 opacity-50" size={48} />
            No inquiries yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Contact</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry, index) => (
                  <motion.tr
                    key={inquiry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-700/50 hover:bg-gray-700/30"
                  >
                    <td className="py-3 px-4">
                      <div className="text-white font-medium">{inquiry.name}</div>
                      <div className="text-gray-400 text-sm truncate max-w-[200px]">{inquiry.message}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-gray-300 text-sm">
                        <Mail size={14} />
                        {inquiry.email || 'N/A'}
                      </div>
                      <div className="text-gray-400 text-sm">{inquiry.phone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="capitalize">
                        {inquiry.inquiryType}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Select value={inquiry.status} onValueChange={(value) => updateStatus(inquiry.id, value)}>
                        <SelectTrigger className={`w-32 ${getStatusBadge(inquiry.status)}`}>
                          <SelectValue className="capitalize" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="negotiation">Negotiation</SelectItem>
                          <SelectItem value="converted">Converted</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-sm">
                      {new Date(inquiry.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Eye size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-red-400"
                          onClick={() => deleteInquiry(inquiry.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <motion.aside
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Factory className="text-white" size={20} />
            </div>
            <div>
              <div className="font-bold text-white text-sm">राखी Steel</div>
              <div className="text-gray-400 text-xs">Admin Panel</div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 space-y-2">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
              <ExternalLink size={18} className="mr-2" />
              Go to Website
            </Button>
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-gray-800 border-b border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400">
                <Menu size={24} />
              </button>
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input placeholder="Search..." className="pl-10 bg-gray-700 border-gray-600 text-white w-64" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="/" target="_blank" rel="noopener noreferrer" className="hidden sm:block">
                <Button variant="outline" className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10">
                  <ExternalLink size={16} className="mr-2" />
                  Go to Website
                </Button>
              </a>
              <button className="relative text-gray-400 hover:text-white">
                <Bell size={24} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  {inquiries.filter((i) => i.status === 'new').length}
                </span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <span className="text-white hidden sm:block">Admin</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {(activeTab === 'dashboard' || activeTab === 'inquiries') && (
            <>
              {activeTab === 'dashboard' && (
                <>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
                    <p className="text-gray-400">Welcome back! Here&apos;s your business overview.</p>
                  </motion.div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="bg-gray-800 border-gray-700">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-gray-400 text-sm">{stat.title}</p>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                              </div>
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                <stat.icon className="text-white" size={24} />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'inquiries' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-white">Inquiries</h1>
                  <p className="text-gray-400">Manage customer inquiries from the website contact form.</p>
                </motion.div>
              )}

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                {renderInquiriesTable()}
              </motion.div>
            </>
          )}

          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'testimonials' && <TestimonialsTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
