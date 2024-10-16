'use client'
import { getSingleWidthrawRequestRequest } from "@/http/widthraw";
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react";



const statusColors = {
  processing: 'bg-yellow-500',
  rejected: 'bg-red-500',
  completed: 'bg-green-500',
}

export default function TransactionDetails({params}) {
  const [transaction, setTransaction] = useState(null);


  //get single transaction
  useEffect(() => {
    const fetchTransaction = async () => {
      const res = await getSingleWidthrawRequestRequest(params.id);
      setTransaction(res.data.withdrawRequest);
    };
    fetchTransaction();
  }, [params.id]);


  return (
    <div className="bg-gradient-to-b from-purple-500 to-pink-500 p-4">
        <div className='h-[7rem]'>

        </div>
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto">
        <Link href="/transactions" className="inline-flex items-center text-white mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Transactions
        </Link>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Transaction Details</h1>
          </div>
          
          <div className="px-6 py-4">
            <div className="flex justify-between items-center mb-6">
              <span className="text-3xl font-bold text-gray-900">₹{transaction?.amount}</span>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold text-white ${statusColors[transaction?.status]}`}>
                {transaction?.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Transaction ID</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">{transaction?._id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">User ID</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">{transaction?.user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Bank Account</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">{transaction?.bankAccount.accountNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Method</p>
                <p className="mt-1 text-lg font-semibold text-gray-900 capitalize">{transaction?.method}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Coins</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">${transaction?.coins}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Created At</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {new Date(transaction?.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}