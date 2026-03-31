'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navigation />

      <main>
        <div className="bg-gradient-to-r from-navy-900 to-navy-800 text-white py-16">
          <div className="container-custom">
            <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-navy-200">
              Get in touch with our team - we're here to help
            </p>
          </div>
        </div>

        <div className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <div className="card p-8 text-center">
                <div className="text-5xl mb-4">📍</div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">Address</h3>
                <p className="text-navy-600">
                  Suite S12-2B ABM Plaza, Opposite Utako Market, Abuja FCT, Nigeria
                </p>
              </div>
              <div className="card p-8 text-center">
                <div className="text-5xl mb-4">📧</div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">Email</h3>
                <a href="mailto:subhanallah.importandexport@gmail.com" className="text-gold-600 hover:text-gold-700">
                  subhanallah.importandexport@gmail.com
                </a>
              </div>
              <div className="card p-8 text-center">
                <div className="text-5xl mb-4">📱</div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">Phone</h3>
                <a href="tel:+2348022551864" className="text-gold-600 hover:text-gold-700">
                  +234 802 255 1864
                </a>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <h2 className="section-title mb-8 text-center">Send us a Message</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-navy-900 font-semibold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:border-gold-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-navy-900 font-semibold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:border-gold-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-navy-900 font-semibold mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:border-gold-500"
                      placeholder="+234..."
                    />
                  </div>
                  <div>
                    <label className="block text-navy-900 font-semibold mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:border-gold-500"
                    >
                      <option value="">Select subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="flight">Flight Booking</option>
                      <option value="cargo">Cargo Shipping</option>
                      <option value="support">Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-navy-900 font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:border-gold-500"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>

              <div className="mt-12 p-8 bg-navy-50 rounded-lg">
                <h3 className="text-xl font-bold text-navy-900 mb-4">Quick Contact</h3>
                <p className="text-navy-600 mb-4">
                  For urgent matters, you can also reach us via WhatsApp:
                </p>
                <a
                  href="https://wa.me/2348022551864?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block btn-secondary"
                >
                  💬 Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
