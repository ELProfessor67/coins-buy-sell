"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Component({searchParams}) {
  const [animate, setAnimate] = useState(false)
  
  useEffect(() => {
    setAnimate(true)
  }, [])

  // These would typically come from props or a global state
  const coinsAmount = searchParams.coins
  const referenceId = searchParams.reference

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center overflow-hidden relative">
        <div 
          className={`text-6xl mb-6 transition-all duration-1000 ease-out ${
            animate ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
        >
          🎉
        </div>
        <h1 
          className={`text-3xl font-bold text-pink-500 mb-4 transition-all duration-700 delay-300 ${
            animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          Payment Successful!
        </h1>
        <p 
          className={`text-gray-600 mb-2 transition-all duration-700 delay-500 ${
            animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          You bought <span className="font-bold text-pink-500">{coinsAmount} coins</span> successfully!
        </p>
        <p 
          className={`text-sm text-gray-500 mb-8 transition-all duration-700 delay-700 ${
            animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          Payment Reference ID: {referenceId}
        </p>
       
        <Link href="/profile" 
          className={`bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 ${
            animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: '1s' }}
        >
          Return to Profile
        </Link>
        <div 
          className={`absolute inset-0 bg-purple-500 transition-all duration-1000 ease-in-out ${
            animate ? 'scale-0' : 'scale-100'
          }`}
          style={{ transformOrigin: 'center' }}
        ></div>
      </div>
    </div>
  )
}