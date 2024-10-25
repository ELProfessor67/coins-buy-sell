import Image from 'next/image'
import { MapPin, TrendingUp, Building2 } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-40 flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Investing in Real World Assets</h1>
          <p className="text-xl max-w-2xl mb-8">We specialize in strategic investments in land and other tangible assets, building wealth through smart, long-term strategies.</p>
          <a href="#" className="bg-white text-purple-500 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition duration-300">
            Learn More
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Our Investment Strategy</h2>
            <p className="text-gray-600 mb-4">
              At our core, we believe in the power of tangible investments. Our focus is on acquiring and managing real-world assets, particularly land and properties with strong growth potential.
            </p>
            <p className="text-gray-600 mb-6">
              With years of experience and a keen eye for value, we help our clients build robust portfolios that stand the test of time.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-blue-600 mr-2" />
                <span className="text-gray-700">Strategic Locations</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
                <span className="text-gray-700">Growth Focused</span>
              </div>
            </div>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/land-1.jpg"
              alt="Real estate investment"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      </section>


      {/* Portfolio Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Investment Portfolio</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Downtown Office Complex', location: 'New York, NY', image: '/images/land-2.jpg' },
              { title: 'Beachfront Resort', location: 'Miami, FL', image: '/images/land-3.jpg' },
              { title: 'Industrial Park', location: 'Chicago, IL', image: '/images/land-4.jpg' },
              { title: 'Residential Development', location: 'Austin, TX', image: '/images/land-5.jpg' },
              { title: 'Tech Hub', location: 'San Francisco, CA', image: '/images/land-6.jpg' },
              { title: 'Mixed-Use Urban Project', location: 'Seattle, WA', image: '/images/land-7.jpg' },
            ].map((project) => (
              <div key={project.title} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <div className="flex items-center text-gray-600">
                    <Building2 className="h-5 w-5 mr-2" />
                    <span>{project.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-br from-purple-500 to-pink-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Invest in Your Future?</h2>
          <p className="text-xl mb-8">Join us in building wealth through strategic real estate investments.</p>
          <Link href="/plans" className="bg-white text-purple-500 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition duration-300">
            Invest Now
          </Link>
        </div>
      </section>
    </main>
  )
}