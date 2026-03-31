import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Home() {
  const services = [
    {
      icon: '✈️',
      title: 'Flight Booking',
      description: 'Book international and domestic flights with competitive rates'
    },
    {
      icon: '🗺️',
      title: 'Travel Consulting',
      description: 'Expert travel advice and visa assistance'
    },
    {
      icon: '📦',
      title: 'Cargo Shipping',
      description: 'Secure and timely delivery of shipments'
    },
    {
      icon: '⚡',
      title: 'Express Delivery',
      description: 'Fast-track delivery for urgent shipments'
    },
    {
      icon: '🚚',
      title: 'Freight Forwarding',
      description: 'Professional handling of large cargo'
    },
    {
      icon: '🏠',
      title: 'Door-to-Door',
      description: 'Complete pickup and delivery service'
    },
  ]

  const stats = [
    { number: '1000+', label: 'Shipments Delivered' },
    { number: '15+', label: 'Years Experience' },
    { number: '100%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Customer Support' },
  ]

  return (
    <>
      <Navigation />

      <main>
        <section className="min-h-[600px] bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-10 w-96 h-96 bg-gold-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-navy-400 rounded-full blur-3xl"></div>
          </div>

          <div className="container-custom py-20 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Travel & Cargo Excellence
                </h1>
                <p className="text-xl text-navy-200 mb-8">
                  Professional flight bookings, travel consulting, and cargo logistics services. Trusted by thousands across Nigeria.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/track" className="btn-primary text-center">
                    Track Your Cargo
                  </Link>
                  <Link href="/services" className="btn-outline text-center">
                    Explore Services
                  </Link>
                </div>
              </div>

              <div className="animate-slide-in-left">
                <div className="relative">
                  <div className="w-full aspect-square bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl shadow-2xl flex items-center justify-center">
                    <span className="text-9xl">✈</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container-custom">
            <h2 className="section-title text-center">Our Services</h2>
            <p className="section-subtitle text-center">Comprehensive solutions for all your travel and cargo needs</p>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="card p-8 text-center hover:border-gold-500">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-navy-900">{service.title}</h3>
                  <p className="text-navy-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-navy-50">
          <div className="container-custom">
            <h2 className="section-title text-center">Why Choose Us?</h2>

            <div className="grid md:grid-cols-4 gap-8 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-gold-600 mb-2">{stat.number}</div>
                  <p className="text-navy-700 font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-16">
              <div className="card p-8">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-bold mb-3">Secure & Reliable</h3>
                <p className="text-navy-600">
                  Your shipments are handled with utmost care and professionalism. Real-time tracking ensures complete transparency.
                </p>
              </div>
              <div className="card p-8">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3">Fast & Efficient</h3>
                <p className="text-navy-600">
                  Quick processing and delivery times. We prioritize speed without compromising on safety and quality.
                </p>
              </div>
              <div className="card p-8">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold mb-3">Competitive Pricing</h3>
                <p className="text-navy-600">
                  Affordable rates for all services. Transparent pricing with no hidden charges or surprise fees.
                </p>
              </div>
              <div className="card p-8">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold mb-3">Expert Support</h3>
                <p className="text-navy-600">
                  24/7 customer support with experienced professionals. We're always ready to help with your questions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container-custom text-center">
            <h2 className="section-title">Ready to Get Started?</h2>
            <p className="text-navy-600 text-lg mb-8 max-w-2xl mx-auto">
              Whether you need flight bookings or cargo shipping, we're here to help. Contact us today for a personalized quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Contact Us
              </Link>
              <Link href="/auth/login" className="btn-secondary">
                Create Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
