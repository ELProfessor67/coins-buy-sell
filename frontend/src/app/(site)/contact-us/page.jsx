// pages/contact-us.js
import Head from 'next/head';

export default function ContactUsPage() {
  return (
    <div className='bg-gradient-to-br from-purple-500 to-pink-500 relative pt-16 md:pt-0 min-h-screen text-white px-5 md:px-20 space-y-4 py-10'>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Get in touch with MOHAMMAD NABI KHAN for any inquiries." />
      </Head>
      
      <div className='h-[8rem] md:h-[10rem]'></div>
      
      <h1 className='text-4xl text-center mb-5'>Contact Us</h1>
      <p><strong>Last updated on 29-11-2024 01:46:39</strong></p>
      
      <p>
        You may contact us using the information below:
      </p>

      <div className='space-y-4 mt-6'>
        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>Merchant Legal Entity Name:</h2>
          <p>MOHAMMAD NABI KHAN</p>
        </div>

        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>Registered Address:</h2>
          <p>Nakatia Bareilly, Bareilly, Uttar Pradesh, PIN: 243123</p>
        </div>

        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>Operational Address:</h2>
          <p>Nakatia Bareilly, Bareilly, Uttar Pradesh, PIN: 243123</p>
        </div>

        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>Telephone No:</h2>
          <p>9808281078</p>
        </div>

        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>E-Mail ID:</h2>
          <p>Nabiiict786@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
