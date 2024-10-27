import Image from 'next/image'
import Link from 'next/link'


export default function page() {
  

  return (
  <>
      <main className='bg-gradient-to-br from-purple-500 to-pink-500 relative pt-16 md:pt-0'>
        <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Blockchain is future of the business technology!
            </h1>
            <p className="text-white text-lg mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
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
                  Cryptoland Theme is the best for your ICO
                </h2>
                <p className="text-gray-600 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
                </p>
                <ul className="space-y-2">
                  {['Feature 1', 'Feature 2', 'Feature 3'].map((feature) => (
                    <li key={feature} className="flex items-center">
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
          <h2 className="text-3xl font-bold text-primary">Expert Stock Market Analysis</h2>
          <p className="text-lg text-muted-foreground">
            Our platform provides cutting-edge tools and insights for independent investors. 
            With real-time data and advanced analytics, you'll have the power to make informed 
            decisions in the dynamic world of stock trading.
          </p>
          <ul className="list-disc list-inside text-muted-foreground">
            <li>Real-time market data</li>
            <li>Advanced charting tools</li>
            <li>Personalized stock recommendations</li>
            <li>Risk assessment algorithms</li>
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
          <h2 className="text-3xl font-bold text-primary">Empowering Independent Investors</h2>
          <p className="text-lg text-muted-foreground">
            Take control of your financial future with our comprehensive suite of investment tools. 
            Whether you're a seasoned trader or just starting out, our platform is designed to help 
            you navigate the stock market with confidence.
          </p>
          <ul className="list-disc list-inside text-muted-foreground">
            <li>Educational resources and webinars</li>
            <li>Portfolio tracking and optimization</li>
            <li>Customizable alerts and notifications</li>
            <li>Secure and user-friendly interface</li>
          </ul>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
            Start Investing Now
          </button>
        </div>
      </section>
    </div>

      
    </>
  )
}