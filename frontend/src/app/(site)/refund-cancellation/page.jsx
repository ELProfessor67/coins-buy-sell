// pages/cancellation-refund.js
import Head from 'next/head';

export default function CancellationRefundPage() {
  return (
    <div className='bg-gradient-to-br from-purple-500 to-pink-500 relative pt-16 md:pt-0 min-h-screen text-white px-5 md:px-20 space-y-4 py-10'>
      <Head>
        <title>Cancellation & Refund Policy</title>
        <meta name="description" content="Review the cancellation and refund policy of MOHAMMAD NABI KHAN." />
      </Head>
      
      <div className='h-[8rem] md:h-[10rem]'></div>
      
      <h1 className='text-4xl text-center mb-5'>Cancellation & Refund Policy</h1>
      <p><strong>Last updated on 29-11-2024 01:44:40</strong></p>
      
      <p>
        MOHAMMAD NABI KHAN believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
      </p>
      
      <h2 className='text-2xl font-semibold mt-6'>Cancellation Policy</h2>
      <ul className='list-disc ml-6 space-y-2'>
        <li>Cancellations will be considered only if the request is made immediately after placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</li>
        <li>MOHAMMAD NABI KHAN does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of the product delivered is not good.</li>
      </ul>
      
      <h2 className='text-2xl font-semibold mt-6'>Refund & Replacement Policy</h2>
      <ul className='list-disc ml-6 space-y-2'>
        <li>In case of receipt of damaged or defective items, please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within <strong>Only same day</strong> days of receipt of the products.</li>
        <li>In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within <strong>Only same day</strong> days of receiving the product. The Customer Service Team, after looking into your complaint, will take an appropriate decision.</li>
        <li>In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.</li>
        <li>In case of any Refunds approved by the MOHAMMAD NABI KHAN, it’ll take <strong>1-2 Days</strong> for the refund to be processed to the end customer.</li>
      </ul>
    </div>
  );
}
