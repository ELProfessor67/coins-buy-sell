import Image from 'next/image'
import Link from 'next/link'


export default function page() {
  

  return (
  <>
      {/* <main className='bg-gradient-to-br from-purple-500 to-pink-500 relative pt-16 md:pt-0'> */}
      {/* <main className='bg-[#57a6a1] relative pt-16 md:pt-0'> */}
      <main className='bg-[#d4cda1] relative pt-16 md:pt-0'>
        <div className='h-[3rem] hidden sm:block xl:hidden'>

        </div>
        <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
             Real Estate Investment: The Future of Wealth Creation!
            </h1>
            <p className="text-white text-lg mb-8">
            Discover how real estate investment can pave your path to financial freedom and lasting wealth creation!
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300">
              <Link href={'/login'}>
              Get Started
              </Link>
            </button>
          </div>
          <div className="md:w-1/2">
          <img src='/images/bulding.png'/>
          </div>

          
          </section>
          {/* <div className='absolute bottom-0 left-0 right-0 h-[19rem] bg-white clip-path z-1'>

          </div> */}
          <div className='absolute bottom-0 left-0 right-0 '>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,224L48,234.7C96,245,192,267,288,245.3C384,224,480,160,576,154.7C672,149,768,203,864,202.7C960,203,1056,149,1152,106.7C1248,64,1344,32,1392,16L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
          </div>
          
        </main>

        <section className="bg-white  px-4 py-16">
          <div className="container mx-auto">

            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                InvestWell Realty is the Future of Wealth Creation
                </h2>
                <p className="text-gray-600 mb-6">
                Unlock the potential of real estate investing with our expert strategies. Build your wealth and secure your future!
                </p>
                <ul className="space-y-2">
                  {['FutureNest Realty', 'WealthSphere Investments', 'Prosperity Partners Realty'].map((feature) => (
                    <li key={feature} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-purple-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <img src='/images/bulding.png'/>
                </div>
              </div>
            </div>
          </div>
   
        </section>

        <div className="container mx-auto px-4 py-16 space-y-24">
      {/* Section 1: Image Left, Text Right */}
      <section className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2">
          <Image
            src="/images/building.jpg"
            alt="Stock market graph"
            width={600}
            height={400}
            className="rounded-lg shadow-lg h-[25rem]"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold text-primary text-gray-800">Smart Real Estate Investments</h2>
          <p className="text-lg text-muted-foreground text-gray-600">
          Our platform offers innovative strategies and insights for investors looking to thrive in the real estate market. With comprehensive market analysis and collaborative funding options, you'll be equipped to make informed decisions in the evolving landscape of property investment.
          </p>
          <ul className="list-disc list-inside text-muted-foreground text-gray-600">
            <li>Collaborative investment opportunities</li>
            <li>In-depth market analysis</li>
            <li>Tailored property recommendations</li>
            <li>Risk management strategies</li>
          </ul>
        </div>
      </section>

      {/* Section 2: Text Left, Image Right */}
      <section className="flex flex-col md:flex-row-reverse items-center gap-8">
        <div className="w-full md:w-1/2">
          <Image
            src="/images/share-market-investment.jpg"
            alt="Investor using laptop"
            width={600}
            height={400}
            className="rounded-lg shadow-lg h-[25rem]"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold text-primary text-gray-800">NextGen Property Investments</h2>
          <p className="text-lg text-muted-foreground text-gray-600">
          Our platform empowers investors with innovative tools and expert insights to navigate the real estate market. With data-driven strategies and community-driven funding, you'll confidently build your wealth in the property sector.
          </p>
          <ul className="list-disc list-inside text-muted-foreground text-gray-600">
            <li>Crowdfunding opportunities</li>
            <li>Market trend analytics</li>
            <li>Customized investment plans</li>
            <li>Portfolio diversification strategies</li>
          </ul>
        </div>
      </section>


      {/* Section 3: Image Left, Text Right */}
      <section className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2">
          <Image
            src="/images/bulding-2.png"
            alt="Stock market graph"
            width={600}
            height={400}
            className="rounded-lg shadow-lg h-[25rem]"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold text-primary text-gray-800">WealthBridge Realty Solutions</h2>
          <p className="text-lg text-muted-foreground text-gray-600">
          At WealthBridge, we connect investors with lucrative real estate opportunities. Our comprehensive platform offers valuable insights and a collaborative approach, helping you maximize your investment potential in today's dynamic market.
          </p>
          <ul className="list-disc list-inside text-muted-foreground text-gray-600">
            <li>Exclusive property listings</li>
            <li>Data-backed investment insights</li>
            <li>Personalized investment guidance</li>
            <li>Financial performance tracking</li>
          </ul>
        </div>
      </section>
    </div>

      
    </>
  )
}