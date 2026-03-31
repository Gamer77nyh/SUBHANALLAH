import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function ServicesPage() {
  const travelServices = [
    {
      title: 'International Flight Booking',
      icon: '✈️',
      description: 'Book flights to any destination worldwide with competitive rates and hassle-free service.',
      features: ['Best rate guarantee', 'Flexible booking', 'Visa assistance', 'Travel insurance']
    },
    {
      title: 'Domestic Flight Booking',
      icon: '🛫',
      description: 'Fast and reliable domestic flight bookings across Nigeria and neighboring countries.',
      features: ['Quick booking', 'Same-day confirmation', 'Airport pickup', 'Multiple options']
    },
    {
      title: 'Travel Consultations',
      icon: '🗺️',
      description: 'Expert travel advice, itinerary planning, and destination recommendations.',
      features: ['Custom itineraries', 'Visa guidance', 'Hotel recommendations', 'Travel tips']
    },
  ]

  const cargoServices = [
    {
      title: 'Standard Cargo Shipping',
      icon: '📦',
      description: 'Secure and reliable cargo shipping for all types of goods and packages.',
      features: ['Insurance coverage', 'Real-time tracking', 'Safe packaging', 'Flexible scheduling']
    },
    {
      title: 'Express Delivery',
      icon: '⚡',
      description: 'Fast-track delivery for time-sensitive and urgent shipments.',
      features: ['24-48 hour delivery', 'Priority handling', 'Guaranteed delivery', 'Full insurance']
    },
    {
      title: 'Freight Forwarding',
      icon: '🚚',
      description: 'Professional handling of large shipments and bulk cargo with full logistics support.',
      features: ['Large capacity', 'Door-to-door service', 'Customs clearance', 'Competitive rates']
    },
    {
      title: 'Door-to-Door Delivery',
      icon: '🏠',
      description: 'Complete pickup and delivery service with personal handling and care.',
      features: ['Pickup service', 'Safe delivery', 'Customer confirmation', 'Professional handling']
    },
    {
      title: 'Storage Solutions',
      icon: '🏭',
      description: 'Secure storage facilities for short and long-term cargo needs.',
      features: ['Climate controlled', 'Security 24/7', 'Flexible duration', 'Inventory management']
    },
    {
      title: 'Customs Clearance',
      icon: '🔒',
      description: 'Expert assistance with customs documentation and clearance procedures.',
      features: ['Documentation handling', 'Compliance guidance', 'Quick clearance', 'Expert support']
    },
  ]

  const ServiceCard = ({ service }: { service: any }) => (
    <div className="card p-8 hover:shadow-xl transition-all hover:border-gold-500">
      <div className="text-5xl mb-4">{service.icon}</div>
      <h3 className="text-2xl font-bold text-navy-900 mb-3">{service.title}</h3>
      <p className="text-navy-600 mb-6">{service.description}</p>
      <ul className="space-y-2">
        {service.features.map((feature: string, index: number) => (
          <li key={index} className="flex items-center gap-2 text-navy-700">
            <span className="text-gold-500 font-bold">✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <>
      <Navigation />

      <main>
        <div className="bg-gradient-to-r from-navy-900 to-navy-800 text-white py-16">
          <div className="container-custom">
            <h1 className="text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-navy-200">
              Comprehensive travel and cargo solutions tailored to your needs
            </p>
          </div>
        </div>

        <div className="py-20 bg-white">
          <div className="container-custom">
            <h2 className="section-title mb-12">Travel Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {travelServices.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </div>
        </div>

        <div className="py-20 bg-navy-50">
          <div className="container-custom">
            <h2 className="section-title mb-12">Cargo & Logistics Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {cargoServices.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </div>
        </div>

        <div className="py-20 bg-white">
          <div className="container-custom">
            <h2 className="section-title text-center mb-8">How Our Services Work</h2>

            <div className="grid md:grid-cols-4 gap-6 mt-12">
              {[
                {
                  step: '1',
                  title: 'Request Quote',
                  description: 'Provide your shipment or travel details'
                },
                {
                  step: '2',
                  title: 'Confirmation',
                  description: 'Receive instant quote and booking confirmation'
                },
                {
                  step: '3',
                  title: 'Track & Monitor',
                  description: 'Real-time tracking and status updates'
                },
                {
                  step: '4',
                  title: 'Delivery',
                  description: 'Safe delivery and customer satisfaction'
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gold-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-navy-900 mb-2">{item.title}</h3>
                  <p className="text-navy-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-20 bg-navy-900 text-white">
          <div className="container-custom text-center">
            <h2 className="text-4xl font-bold mb-6">Get Started Today</h2>
            <p className="text-navy-200 text-lg mb-8 max-w-2xl mx-auto">
              Contact us for a personalized quote or to book your service today. Our expert team is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Request Quote
              </Link>
              <Link href="/track" className="btn-outline">
                Track Cargo
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
