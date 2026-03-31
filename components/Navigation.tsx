'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-navy-200 shadow-md">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">✈</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-navy-900 text-sm">SUBHAN ALLAH</div>
              <div className="text-xs text-gold-600">Travel & Cargo</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-navy-900 hover:text-gold-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-navy-900 hover:text-gold-600 transition-colors">
              About
            </Link>
            <Link href="/services" className="text-navy-900 hover:text-gold-600 transition-colors">
              Services
            </Link>
            <Link href="/track" className="text-navy-900 hover:text-gold-600 transition-colors">
              Track Cargo
            </Link>
            <Link href="/contact" className="text-navy-900 hover:text-gold-600 transition-colors">
              Contact
            </Link>
            <Link href="/auth/login" className="btn-primary text-sm">
              Login
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-navy-200">
            <Link href="/" className="block py-2 text-navy-900 hover:text-gold-600">
              Home
            </Link>
            <Link href="/about" className="block py-2 text-navy-900 hover:text-gold-600">
              About
            </Link>
            <Link href="/services" className="block py-2 text-navy-900 hover:text-gold-600">
              Services
            </Link>
            <Link href="/track" className="block py-2 text-navy-900 hover:text-gold-600">
              Track Cargo
            </Link>
            <Link href="/contact" className="block py-2 text-navy-900 hover:text-gold-600">
              Contact
            </Link>
            <Link href="/auth/login" className="block py-2 btn-primary text-sm w-full text-center mt-2">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
