'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import { Shipment, TrackingUpdate } from '@/types'

export default function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [shipment, setShipment] = useState<Shipment | null>(null)
  const [updates, setUpdates] = useState<TrackingUpdate[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setShipment(null)
    setUpdates([])

    try {
      const { data: shipmentData, error: shipmentError } = await supabase
        .from('shipments')
        .select('*')
        .eq('tracking_number', trackingNumber)
        .maybeSingle()

      if (shipmentError) throw shipmentError

      if (!shipmentData) {
        setError('Tracking number not found. Please check and try again.')
        return
      }

      setShipment(shipmentData)

      const { data: updatesData, error: updatesError } = await supabase
        .from('tracking_updates')
        .select('*')
        .eq('shipment_id', shipmentData.id)
        .order('timestamp', { ascending: false })

      if (updatesError) throw updatesError

      setUpdates(updatesData || [])
    } catch (err) {
      setError('Error tracking shipment. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'in_transit':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <>
      <Navigation />

      <main>
        <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-800 text-white py-20">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Cargo</h1>
            <p className="text-navy-200 text-lg mb-12">
              Enter your tracking number to get real-time updates on your shipment
            </p>

            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl mx-auto mb-12">
              <form onSubmit={handleTrack} className="space-y-4">
                <div>
                  <label className="block text-navy-900 font-semibold mb-2">
                    Tracking Number
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                      placeholder="e.g., TRK-2024-001"
                      className="flex-1 px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:border-gold-500 text-navy-900"
                      required
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary disabled:opacity-50"
                    >
                      {loading ? 'Tracking...' : 'Track'}
                    </button>
                  </div>
                </div>
              </form>

              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              {shipment && (
                <div className="mt-8 space-y-6">
                  <div className="border-t pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-navy-600 text-sm font-semibold">From</p>
                        <p className="text-navy-900 text-lg font-bold">{shipment.origin_location}</p>
                      </div>
                      <div>
                        <p className="text-navy-600 text-sm font-semibold">To</p>
                        <p className="text-navy-900 text-lg font-bold">{shipment.destination_location}</p>
                      </div>
                      <div>
                        <p className="text-navy-600 text-sm font-semibold">Current Location</p>
                        <p className="text-navy-900 text-lg font-bold">{shipment.current_location || 'Processing'}</p>
                      </div>
                      <div>
                        <p className="text-navy-600 text-sm font-semibold">Status</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold mt-1 ${getStatusColor(shipment.status)}`}>
                          {shipment.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-navy-600 text-sm font-semibold">Expected Delivery</p>
                        <p className="text-navy-900 text-lg font-bold">
                          {shipment.estimated_delivery_date
                            ? new Date(shipment.estimated_delivery_date).toLocaleDateString()
                            : 'TBD'}
                        </p>
                      </div>
                      <div>
                        <p className="text-navy-600 text-sm font-semibold">Type</p>
                        <p className="text-navy-900 text-lg font-bold capitalize">
                          {shipment.shipment_type}
                        </p>
                      </div>
                    </div>
                  </div>

                  {updates.length > 0 && (
                    <div className="border-t pt-6">
                      <h3 className="text-navy-900 font-bold mb-4">Tracking History</h3>
                      <div className="space-y-4">
                        {updates.map((update, index) => (
                          <div key={update.id} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-4 h-4 bg-gold-500 rounded-full"></div>
                              {index < updates.length - 1 && (
                                <div className="w-1 h-12 bg-navy-200"></div>
                              )}
                            </div>
                            <div className="pb-4">
                              <p className="text-navy-900 font-semibold capitalize">
                                {update.status.replace('_', ' ')} - {update.location}
                              </p>
                              <p className="text-navy-600 text-sm">{update.description}</p>
                              <p className="text-navy-500 text-xs mt-1">
                                {formatDate(update.timestamp)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
