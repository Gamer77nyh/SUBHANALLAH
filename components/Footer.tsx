'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
                <span className="text-navy-900 font-bold text-lg">✈</span>
              </div>
              <div>
                <div className="font-bold text-white">SUBHAN ALLAH</div>
                <div className="text-xs text-gold-400">Travel & Cargo</div>
              </div>
            </div>
            <p className="text-navy-200 text-sm">
              Professional travel agency and cargo logistics services in Nigeria.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-navy-200">
              <li><Link href="/" className="hover:text-gold-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-gold-400 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-gold-400 transition-colors">Services</Link></li>
              <li><Link href="/track" className="hover:text-gold-400 transition-colors">Track Cargo</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-navy-200">
              <li><Link href="/services" className="hover:text-gold-400 transition-colors">Flight Booking</Link></li>
              <li><Link href="/services" className="hover:text-gold-400 transition-colors">Cargo Shipping</Link></li>
              <li><Link href="/services" className="hover:text-gold-400 transition-colors">Express Delivery</Link></li>
              <li><Link href="/services" className="hover:text-gold-400 transition-colors">Freight Forward</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-navy-200">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>Suite S12-2B ABM Plaza, Abuja FCT</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📧</span>
                <a href="mailto:subhanallah.importandexport@gmail.com" className="hover:text-gold-400 transition-colors">
                  subhanallah.importandexport@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>📱</span>
                <a href="tel:+2348022551864" className="hover:text-gold-400 transition-colors">
                  +234 802 255 1864
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-navy-300 text-sm">
              &copy; {currentYear} Subhan Allah Import and Export Limited. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-navy-300">
              <Link href="/terms" className="hover:text-gold-400 transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy</Link>
              <Link href="/contact" className="hover:text-gold-400 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
