'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (signupError) {
        setError(signupError.message)
        return
      }

      if (data.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: formData.email,
              full_name: formData.fullName,
              phone: formData.phone,
              user_type: 'customer',
            },
          ])

        if (profileError) {
          setError('Failed to create profile')
          return
        }

        router.push('/dashboard')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">✈</span>
          </div>
          <h1 className="text-3xl font-bold text-navy-900">Create Account</h1>
          <p className="text-navy-600 text-sm mt-1">Join Subhan Allah services</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-navy-900 font-semibold mb-2 text-sm">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-gold-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-navy-900 font-semibold mb-2 text-sm">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-gold-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-navy-900 font-semibold mb-2 text-sm">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-gold-500"
              placeholder="+234..."
            />
          </div>

          <div>
            <label className="block text-navy-900 font-semibold mb-2 text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-gold-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-navy-900 font-semibold mb-2 text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-gold-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 font-semibold mt-6"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-navy-600 text-sm">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-gold-600 hover:text-gold-700 font-semibold">
              Login here
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-navy-600 hover:text-navy-900 text-sm font-semibold">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
