import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <>
      <Navigation />

      <main>
        <div className="bg-gradient-to-r from-navy-900 to-navy-800 text-white py-16">
          <div className="container-custom">
            <h1 className="text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl text-navy-200">
              Professional travel and cargo services since 2020
            </p>
          </div>
        </div>

        <div className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="section-title">Our Story</h2>
                <p className="text-navy-600 text-lg mb-6">
                  Subhan Allah Import and Export Limited was established on August 4, 2020, with a vision to provide premium travel and cargo services to Nigerian businesses and individuals.
                </p>
                <p className="text-navy-600 text-lg mb-6">
                  Registered with the Corporate Affairs Commission (CAC Registration No. 1693721), we have built a reputation for reliability, professionalism, and customer satisfaction.
                </p>
                <p className="text-navy-600 text-lg">
                  Our team combines years of experience in international logistics, travel planning, and customer service to deliver exceptional results for every client.
                </p>
              </div>
              <div className="bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl h-96 flex items-center justify-center">
                <span className="text-9xl">🌍</span>
              </div>
            </div>

            <div className="border-t pt-20">
              <h2 className="section-title mb-12">Our Mission & Values</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="card p-8">
                  <div className="text-5xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold text-navy-900 mb-4">Our Mission</h3>
                  <p className="text-navy-600">
                    To provide reliable, efficient, and professional travel and cargo services that exceed customer expectations and drive business growth.
                  </p>
                </div>
                <div className="card p-8">
                  <div className="text-5xl mb-4">💪</div>
                  <h3 className="text-2xl font-bold text-navy-900 mb-4">Our Values</h3>
                  <ul className="space-y-2 text-navy-600">
                    <li>✓ Integrity & Transparency</li>
                    <li>✓ Customer First</li>
                    <li>✓ Professional Excellence</li>
                    <li>✓ Continuous Improvement</li>
                  </ul>
                </div>
                <div className="card p-8">
                  <div className="text-5xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold text-navy-900 mb-4">Our Vision</h3>
                  <p className="text-navy-600">
                    To become the leading travel and cargo service provider in Nigeria, known for innovation, reliability, and customer satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-20 bg-navy-50">
          <div className="container-custom">
            <h2 className="section-title mb-12">Leadership</h2>
            <p className="text-center text-navy-600 text-lg mb-12 max-w-3xl mx-auto">
              Our company is led by experienced professionals dedicated to delivering the highest standards of service.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Aisha Sunusi Muhammad',
                  role: 'Director',
                  email: 'subhanallah.importandexport@gmail.com'
                },
                {
                  name: 'Rafiu Adebisi Raheem',
                  role: 'Director',
                  email: 'aboloremuhd@gmail.com'
                },
                {
                  name: 'Moradeyo Arafat Abdulhakeem',
                  role: 'Advisor',
                  email: 'subhanallah.importandexport@gmail.com'
                },
              ].map((leader, index) => (
                <div key={index} className="card p-8 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">👤</span>
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">{leader.name}</h3>
                  <p className="text-gold-600 font-semibold mb-3">{leader.role}</p>
                  <a href={`mailto:${leader.email}`} className="text-navy-600 hover:text-gold-600 text-sm">
                    {leader.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-20 bg-white">
          <div className="container-custom">
            <h2 className="section-title text-center mb-12">Why Partner With Us?</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: '📜',
                  title: 'Officially Registered',
                  description: 'Registered with the Corporate Affairs Commission (CAC) - Registration No. 1693721'
                },
                {
                  icon: '🏆',
                  title: 'Proven Track Record',
                  description: 'Years of successful service delivery to satisfied customers across Nigeria'
                },
                {
                  icon: '👥',
                  title: 'Expert Team',
                  description: 'Experienced professionals in travel, logistics, and customer service'
                },
                {
                  icon: '💼',
                  title: 'Business Solutions',
                  description: 'Customized solutions for both individual and corporate clients'
                },
                {
                  icon: '🔄',
                  title: 'Real-time Tracking',
                  description: 'Advanced tracking system for complete transparency and peace of mind'
                },
                {
                  icon: '🤝',
                  title: '24/7 Support',
                  description: 'Dedicated customer support team available anytime you need assistance'
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="text-4xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-navy-900 mb-2">{item.title}</h3>
                    <p className="text-navy-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-20 bg-navy-900 text-white">
          <div className="container-custom text-center">
            <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
            <p className="text-navy-200 text-lg mb-8 max-w-2xl mx-auto">
              Have questions about our services? Contact us today and let our team help you.
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
