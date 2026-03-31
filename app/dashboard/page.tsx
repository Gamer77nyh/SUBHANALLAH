'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { User, Shipment } from '@/types'

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
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

      if (userData) {
        setUser(userData)

        const { data: shipmentsData } = await supabase
          .from('shipments')
          .select('*')
          .eq('customer_id', session.user.id)
          .order('created_at', { ascending: false })

        if (shipmentsData) {
          setShipments(shipmentsData)
        }
      }

      setLoading(false)
    }

    checkAuth()
  }, [router])

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
            <span className="font-bold text-navy-900">SUBHAN ALLAH</span>
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
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="card p-6">
            <div className="text-4xl mb-2">👤</div>
            <p className="text-navy-600 text-sm">Welcome back,</p>
            <p className="text-2xl font-bold text-navy-900">{user?.full_name}</p>
          </div>
          <div className="card p-6">
            <div className="text-4xl mb-2">📦</div>
            <p className="text-navy-600 text-sm">Total Shipments</p>
            <p className="text-2xl font-bold text-navy-900">{shipments.length}</p>
          </div>
          <div className="card p-6">
            <div className="text-4xl mb-2">⚡</div>
            <p className="text-navy-600 text-sm">In Transit</p>
            <p className="text-2xl font-bold text-gold-600">
              {shipments.filter(s => s.status === 'in_transit').length}
            </p>
          </div>
        </div>

        <div className="card p-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-6">Your Shipments</h2>

          {shipments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-navy-600 mb-6">You don't have any shipments yet.</p>
              <Link href="/contact" className="btn-primary inline-block">
                Request a Shipment
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-200">
                    <th className="text-left py-3 px-4 font-semibold text-navy-900">Tracking #</th>
                    <th className="text-left py-3 px-4 font-semibold text-navy-900">From</th>
                    <th className="text-left py-3 px-4 font-semibold text-navy-900">To</th>
                    <th className="text-left py-3 px-4 font-semibold text-navy-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-navy-900">Est. Delivery</th>
                    <th className="text-left py-3 px-4 font-semibold text-navy-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map((shipment) => (
                    <tr key={shipment.id} className="border-b border-navy-100 hover:bg-navy-50">
                      <td className="py-4 px-4 font-mono text-navy-900">{shipment.tracking_number}</td>
                      <td className="py-4 px-4 text-navy-700">{shipment.origin_location}</td>
                      <td className="py-4 px-4 text-navy-700">{shipment.destination_location}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          shipment.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          shipment.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                          shipment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {shipment.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-navy-700">
                        {shipment.estimated_delivery_date
                          ? new Date(shipment.estimated_delivery_date).toLocaleDateString()
                          : '-'}
                      </td>
                      <td className="py-4 px-4">
                        <Link
                          href={`/track?tracking=${shipment.tracking_number}`}
                          className="text-gold-600 hover:text-gold-700 font-semibold text-sm"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="card p-8">
            <h3 className="text-xl font-bold text-navy-900 mb-4">Profile Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-navy-600 text-sm">Email</p>
                <p className="font-semibold text-navy-900">{user?.email}</p>
              </div>
              <div>
                <p className="text-navy-600 text-sm">Phone</p>
                <p className="font-semibold text-navy-900">{user?.phone || '-'}</p>
              </div>
              <div>
                <p className="text-navy-600 text-sm">Member Since</p>
                <p className="font-semibold text-navy-900">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <h3 className="text-xl font-bold text-navy-900 mb-4">Need Help?</h3>
            <p className="text-navy-600 mb-6">
              Have questions about your shipments or need assistance? Contact our support team.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/contact" className="btn-primary text-center text-sm">
                Contact Support
              </Link>
              <a
                href="https://wa.me/2348022551864"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-center text-sm"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
