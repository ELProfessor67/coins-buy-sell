'use client'

import CoinCard from '@/components/PlansCard'
import { BACKEND_URL } from '@/constants/URLS';
import { checkoutRequest, getRazorpayKeyRequest, verifyPaymentRequest } from '@/http/user';
import { UserContext } from '@/providers/UserProvider';
import { useContext, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import {load} from '@cashfreepayments/cashfree-js';
import { useRouter } from 'next/navigation';

const coinPlans = [
  { coins: 59, price: 5000, extra: 2 },
  { coins: 119, price: 10000, extra: 5 },
  { coins: 178, price: 15000, extra: 10 },
  { coins: 238, price: 20000, extra: 15 },
]



export default function page() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(-1);
  const cashfreeRef = useRef(null);
  const router = useRouter();

  const loadSDK = async () => {
    cashfreeRef.current = await load({
      mode: process.env.NEXT_PUBLIC_MODE == 'dev' ? "sandbox" : 'production'
    });
  }
  loadSDK();

  const checkoutHandler = async (amount, coins,index) => {
    setLoading(index);

    // const { data: { key } } = await getRazorpayKeyRequest();
    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("coins", coins);
      const { data: { order } } = await checkoutRequest(formData);
      console.log(order)
      const checkoutOption = {
        paymentSessionId: order.payment_session_id,
        redirectTarget: "_modal"
      }

      cashfreeRef.current?.checkout(checkoutOption).then(async () => {
        const formData = new FormData();
        formData.append('order_id',order.order_id);
        formData.append('payment_id',order.payment_session_id);
        formData.append('sign',order.cf_order_id);

        const res = await verifyPaymentRequest(formData);
        router.push(res.data.url);
      })

      // const options = {
      //   key,
      //   amount: order.amount,
      //   currency: "INR",
      //   name: "Coins By Sells",
      //   description: `${user.name} buy ${coins} coins`,
      //   image: "/images/grow-land.png",
      //   order_id: order.id,
      //   callback_url: `${BACKEND_URL}/api/v1/razarpay/paymentverification`,
      //   prefill: {
      //     name: user.name,
      //     email: user.email,
      //     contact: user.phone
      //   },
      //   notes: {
      //     "address": user.address
      //   },
      //   theme: {
      //     "color": "#121212"
      //   },
      //   options: {
      //     checkout: {
      //       method: {
      //         "netbanking": "1",
      //         "card": "0",
      //         "upi": "1",
      //         "wallet": "0"
      //       }
      //     }
      //   }
        
      // };
      // if (typeof window !== "undefined") {
      //   setLoading(-1);
      //   const razor = new window.Razorpay(options);
      //   razor.open();
      // }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message)
    }finally{
      setLoading(-1)
    }

  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500 py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-4">
          Power Up Your Wallet
        </h2>
        <p className="text-xl text-center text-white mb-12">Choose the perfect coin package for your needs</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coinPlans.map((plan, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CoinCard {...plan} isPopular={index === 1} isHovered={hoveredIndex === index} checkoutHandler={checkoutHandler} loading={loading} index={index}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}