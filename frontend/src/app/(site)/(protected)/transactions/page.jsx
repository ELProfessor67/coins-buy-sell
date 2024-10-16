'use client'

import TransactionCard from '@/components/TransactionCard';
import { getUserWidthrawRequestRequest } from '@/http/widthraw';
import React, { useEffect, useState } from 'react'




const Page = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("all")



    const filteredTransactions = transactions.filter(transaction =>
        activeTab === "all" || transaction.status === activeTab
    )

    const tabs = [
        { id: 'all', label: 'All' },
        { id: 'processing', label: 'Processing' },
        { id: 'completed', label: 'Completed' },
        { id: 'rejected', label: 'Rejected' },
    ]


    //get all transactions
    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const res = await getUserWidthrawRequestRequest();
            setTransactions(res.data.withdrawRequests);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTransactions();
    }, []);


    return (
        <div className="bg-gradient-to-b from-purple-500 to-pink-500 p-4">
        <div className='h-[7rem]'>

        </div>
        <div className="min-h-screen max-w-7xl mx-auto">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-white">Transaction History</h1>
                <div className="space-y-6">
                    <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 text-xs md:text-sm font-medium py-2 px-3 md:py-2 md:px-4 rounded-md transition-colors duration-200 ${activeTab === tab.id
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-500 hover:bg-gray-100'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredTransactions.map((transaction) => (
                            <TransactionCard key={transaction._id} transaction={transaction} />
                        ))}
                    </div>
                    {filteredTransactions.length === 0 && (
                        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                            <p className="text-gray-500">No transactions found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </div>
    )
}

export default Page