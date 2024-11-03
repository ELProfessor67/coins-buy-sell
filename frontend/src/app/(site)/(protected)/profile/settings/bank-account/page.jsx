'use client'
import { useContext, useState } from 'react'
import { User, Lock, Bell, Globe, ChevronLeft, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react'
import { UserContext } from '@/providers/UserProvider'
import { addBankAccountRequest } from '@/http/user';
import { toast } from 'react-toastify';

export default function Page() {

    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const formData = new FormData(e.target);
            const res = await addBankAccountRequest(formData);
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500 flex flex-col items-center p-4">
            <div className='h-[10rem]'>

            </div>
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-purple-100 p-4 sm:p-6 flex items-center">
                    <button className="mr-4 text-purple-600 hover:text-purple-800 transition duration-300">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">Bank Account</h1>
                </div>
                <div className="p-4 sm:p-6 space-y-6">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
                                    <input
                                        type="text"
                                        id="accountHolderName"
                                        name="accountHolderName"
                                        defaultValue={user?.bankAccount?.accountHolderName}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                                    <input
                                        type="text"
                                        id="accountNumber"
                                        name="accountNumber"
                                        defaultValue={user?.bankAccount?.accountNumber}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                                    <input
                                        type="text"
                                        id="ifscCode"
                                        name="ifscCode"
                                        defaultValue={user?.bankAccount?.ifscCode}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                                    <input
                                        type="text"
                                        id="bankName"
                                        name="bankName"
                                        defaultValue={user?.bankAccount?.bankName}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
                            >
                                {loading ? "Loading..." : user?.bankAccount ? "Save Account":"Add Bank Account"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}