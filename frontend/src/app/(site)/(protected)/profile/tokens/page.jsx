'use client';

import { UserContext } from '@/providers/UserProvider';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useCallback, useContext } from 'react';




export default function Page() {

    const {user} = useContext(UserContext);
    const router = useRouter();

    const handleClickToken = useCallback((id) => {
        router.push(`/tokens/${id}`);
      },[])

  return (
    <main className='bg-gradient-to-br from-purple-500 to-pink-500 relative pt-16 md:pt-0'>
      <div className='h-[5rem]'>

      </div>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-white text-center mb-8">My Tokens</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {user?.tokens?.map((nft) => (
              <div key={nft._id} className="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105" onClick={() => handleClickToken(nft._id)}>
                <Image
                  src={nft?.image?.url}
                  alt={nft.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-contain"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{nft.title}</h2>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Price: <span className="font-bold">${nft.price}</span></p>
                    
                  </div>
                </div>
              </div>
            ))}

            
          </div>
          {
                user?.tokens?.length == 0 &&
                <div className='flex items-center justify-center my-20'>
                    <h3 className='text-white text-3xl'>I Have 0 Tokens</h3>
                </div>
            }
        </div>
      </div>
    </main>
  )
}