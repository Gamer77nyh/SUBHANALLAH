'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { User, Shipment } from '@/types'

export default function AdminDashboard() {
  const [admin, setAdmin] = useState<User | null>(null)
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [customers, setCustomers] = useState<User[]>([])
  const [activeTab, setActiveTab] = useState<'shipments' | 'customers' | 'create'>('shipments')
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    trackingNumber: '',
    customerEmail: '',
    shipmentType: 'cargo',
    origin: '',
    destination: '',
    status: 'pending',
    cost: '',
  })
  const router = useRouter()

  useEffect(() => {
    const checkAdminAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push('/auth/login')
        return
      }

      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle()

      if (!userData || userData.user_type !== 'admin') {
        router.push('/')
        return
      }

      setAdmin(userData)

      const { data: shipmentsData } = await supabase
        .from('shipments')
        .select('*')
        .order('created_at', { ascending: false })

      if (shipmentsData) {
        setShipments(shipmentsData)
      }

      const { data: customersData } = await supabase
        .from('users')
        .select('*')
        .eq('user_type', 'customer')

      if (customersData) {
        setCustomers(customersData)
      }

      setLoading(false)
    }

    checkAdminAuth()
  }, [router])

  const handleCreateShipment = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { data: customerData } = await supabase
        .from('users')
        .select('id')
        .eq('email', formData.customerEmail)
        .maybeSingle()

      if (!customerData) {
        alert('Customer not found')
        return
      }

      const { error } = await supabase
        .from('shipments')
        .insert([
          {
            tracking_number: formData.trackingNumber,
            customer_id: customerData.id,
            shipment_type: formData.shipmentType,
            origin_location: formData.origin,
            destination_location: formData.destination,
            status: formData.status,
            cost: parseFloat(formData.cost) || 0,
          },
        ])

      if (error) {
        alert('Error creating shipment: ' + error.message)
        return
      }

      alert('Shipment created successfully!')
      setFormData({
        trackingNumber: '',
        customerEmail: '',
        shipmentType: 'cargo',
        origin: '',
        destination: '',
        status: 'pending',
        cost: '',
      })

      const { data: shipmentsData } = await supabase
        .from('shipments')
        .select('*')
        .order('created_at', { ascending: false })

      if (shipmentsData) {
        setShipments(shipmentsData)
      }
    } catch (error) {
      console.error(error)
      alert('An error occurred')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-50 flex items-center justify-center">
        <div className="text-navy-900">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy-50">
      <nav className="bg-white border-b border-navy-200 shadow">
        <div className="container-custom flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">✈</span>
            </div>
            <span className="font-bold text-navy-900">SUBHAN ALLAH ADMIN</span>
          </Link>
          <button
            onClick={handleLogout}
            className="text-navy-900 hover:text-gold-600 font-semibold"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="container-custom py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy-900 mb-4">Admin Dashboard</h1>
          <p className="text-navy-600">Welcome, {admin?.full_name}</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            <p className="text-blue-600 text-sm font-semibold">Total Shipments</p>
            <p className="text-3xl font-bold text-blue-900 mt-2">{shipments.length}</p>
          </div>
          <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100">
            <p className="text-green-600 text-sm font-semibold">Delivered</p>
            <p className="text-3xl font-bold text-green-900 mt-2">
              {shipments.filter(s => s.status === 'delivered').length}
            </p>
          </div>
          <div className="card p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <p className="text-yellow-600 text-sm font-semibold">In Transit</p>
            <p className="text-3xl font-bold text-yellow-900 mt-2">
              {shipments.filter(s => s.status === 'in_transit').length}
            </p>
          </div>
          <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100">
            <p className="text-purple-600 text-sm font-semibold">Total Customers</p>
            <p className="text-3xl font-bold text-purple-900 mt-2">{customers.length}</p>
          </div>
        </div>

        <div className="card p-8 mb-12">
          <div className="flex gap-4 border-b border-navy-200 mb-6">
            <button
              onClick={() => setActiveTab('shipments')}
              className={`pb-3 font-semibold transition-colors ${
                activeTab === 'shipments'
                  ? 'text-gold-600 border-b-2 border-gold-600'
                  : 'text-navy-600 hover:text-navy-900'
              }`}
            >
              Shipments
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`pb-3 font-semibold transition-colors ${
                activeTab === 'customers'
                  ? 'text-gold-600 border-b-2 border-gold-600'
                  : 'text-navy-600 hover:text-navy-900'
              }`}
            >
              Customers
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`pb-3 font-semibold transition-colors ${
                activeTab === 'create'
                  ? 'text-gold-600 border-b-2 border-gold-600'
                  : 'text-navy-600 hover:text-navy-900'
              }`}
            >
              Create Shipment
            </button>
          </div>

          {activeTab === 'shipments' && (
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-6">All Shipments</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-navy-200">
                      <th className="text-left py-3 px-4 font-semibold text-navy-900">Tracking</th>
                      <th className="text-left py-3 px-4 font-semibold text-navy-900">Customer</th>
                      <th className="text-left py-3 px-4 font-semibold text-navy-900">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-navy-900">Route</th>
                      <th className="text-left py-3 px-4 font-semibold text-navy-900">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-navy-900">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipments.map((shipment) => (
                      <tr key={shipment.id} className="border-b border-navy-100 hover:bg-navy-50">
                        <td className="py-3 px-4 font-mono text-navy-900">{shipment.tracking_number}</td>
                        <td className="py-3 px-4 text-navy-700">
                          {customers.find(c => c.id === shipment.customer_id)?.full_name || '-'}
                        </td>
                        <td className="py-3 px-4 capitalize text-navy-700">{shipment.shipment_type}</td>
                        <td className="py-3 px-4 text-navy-700 text-xs">
                          {shipment.origin_location.slice(0, 10)} → {shipment.destination_location.slice(0, 10)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                            shipment.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            shipment.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                            shipment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {shipment.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-navy-900">${shipment.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Customers</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {customers.map((customer) => (
                  <div key={customer.id} className="border border-navy-200 rounded-lg p-6">
                    <h3 className="font-bold text-navy-900">{customer.full_name}</h3>
                    <p className="text-navy-600 text-sm">{customer.email}</p>
                    <p className="text-navy-600 text-sm">{customer.phone || '-'}</p>
                    <p className="text-navy-500 text-xs mt-2">
                      Joined: {new Date(customer.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'create' && (
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Create New Shipment</h2>
              <form onSubmit={handleCreateShipment} className="space-y-4 max-w-2xl">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-navy-900 font-semibold mb-2 text-sm">
                      Tracking Number
                    </label>
                    <input
                      type="text"
                      value={formData.trackingNumber}
                      onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-gold-500 text-sm"
                      placeholder="TRK-2024-001"
                    />
                  </div>
                  <div>
                    <label className="block text-navy-900 font-semibold mb-2 text-sm">
                      Customer Email
                    </label>
                    <input
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-gold-500 text-sm"
                      placeholder="customer@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-navy-900 font-semibold mb-2 text-sm">
                      Type
                    </label>
                    <select
                      value={formData.shipmentType}
                      onChange={(e) => setFormData({ ...formData, shipmentType: e.target.value })}
                      className="w-full px-3 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-gold-500 text-sm"
                    >
                      <option value="cargo">Cargo</option>
                      <option value="travel">Travel</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-navy-900 font-semibold mb-2 text-sm">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-gold-500 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="in_transit">In Transit</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-navy-900 font-semibold mb-2 text-sm">
                      Origin
                    </label>
                    <input
                      type="text"
                      value={formData.origin}
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-gold-500 text-sm"
                      placeholder="Abuja"
                    />
                  </div>
                  <div>
                    <label className="block text-navy-900 font-semibold mb-2 text-sm">
                      Destination
                    </label>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-gold-500 text-sm"
                      placeholder="Lagos"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-navy-900 font-semibold mb-2 text-sm">
                    Cost
                  </label>
                  <input
                    type="number"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                    step="0.01"
                    className="w-full px-3 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-gold-500 text-sm"
                    placeholder="0.00"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Create Shipment
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
