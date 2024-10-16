"use client"

import { act, useCallback, useContext, useEffect, useState } from "react"
import { Coins, ArrowRight } from "lucide-react"
import Link from "next/link";
import { UserContext } from "@/providers/UserProvider"
import { getUserBalanceRequest } from "@/http/user";
import { createWithdrawRequestRequest } from "@/http/widthraw";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Page() {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState("");
    const [coinAmount, setCoinAmount] = useState("");
    const [method, setMethod] = useState("bank");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [exchangeRate, setExchangeRate] = useState(84);
    const router = useRouter();


    // get user balance
    const getUserBalance = useCallback(async () => {
        try {
            const res = await getUserBalanceRequest();
            setBalance(res.data?.balance);
        } catch (error) {
            console.log("Error getting balance : ", error.message)
        }
    }, [])


    useEffect(() => {
        getUserBalance()
    }, [])



    //calculate amount
    useEffect(() => {
        if (!coinAmount) return setAmount(0)
        setAmount(coinAmount * exchangeRate)
    }, [coinAmount, exchangeRate]);


    //amount validation
    useEffect(() => {
        if (!amount) return setError("")
        if (amount < 10) {
            setError("You can't withdraw less than 10 coins")
        } else if (balance < coinAmount) {
            setError(`You don't have enough coins to withdraw`)
        } else {
            setError("")
        }

    }, [amount, coinAmount])

    const { user } = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!user.bankAccount) {
                toast.error("Please add your bank account first")
                return
            }

            setIsSubmitting(true);
            const formData = new FormData();
            formData.append("amount", amount);
            formData.append("method", method);
            formData.append("coins", coinAmount);
            const res = await createWithdrawRequestRequest(formData);
            toast.success(res.data.message);
            setCoinAmount("")
            setMethod("bank")
            setCoinAmount("");
            router.push(`/widthraw-success?transactionId=${res.data.withdrawRequest._id}`)


        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500 py-28 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-20">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-2">Withdraw Coins</h2>
                        <p className="text-gray-600 mb-6">Enter the amount and choose your withdrawal method.</p>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                                        Amount
                                    </label>
                                    <div className="relative ">
                                        <div className="border w-full relative border-gray-300  rounded-md flex items-center focus:ring-2 focus:ring-blue-500 px-3 py-2">
                                            <Coins className=" text-gray-400" />
                                            <input
                                                id="amount"
                                                type="number"
                                                placeholder="Enter amount"
                                                value={coinAmount}
                                                onChange={(e) => setCoinAmount(e.target.value)}
                                                className="w-full outline-none ml-3"
                                                required
                                            />
                                        </div>

                                        <div className="flex justify-end items-center mt-1">
                                            <span className="text-sm text-gray-500">Balance: {balance}</span>
                                        </div>
                                        {
                                            error && <span className="text-red-500">{error}</span>
                                        }
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-1">
                                        Withdrawal Method
                                    </label>
                                    <select
                                        id="method"
                                        value={method}
                                        onChange={(e) => setMethod(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select method</option>
                                        <option value="bank" selected>Bank Transfer</option>
                                        <option value="paypal" disabled>UPI</option>
                                        <option value="crypto" disabled>PayTM</option>
                                        <option value="crypto" disabled>PhonePe</option>
                                        <option value="crypto" disabled>Google Pay</option>
                                    </select>
                                </div>
                            </div>
                            {
                                method === "bank" && !user?.bankAccount && (
                                    <div className="mt-6 p-4 bg-gray-100 rounded-md">
                                        <p className="text-sm text-gray-600">You don't have a bank account added. Please add your bank account first.</p>
                                        <Link href="/profile/settings/bank-account" className="text-blue-500 hover:text-blue-600">Add Bank Account</Link>
                                    </div>
                                )
                            }
                            {coinAmount && method && (
                                <div className="mt-6 p-4 bg-gray-100 rounded-md">
                                    <h3 className="font-semibold mb-2">Transaction Summary</h3>
                                    <p>Coins: ${coinAmount}</p>
                                    <p>Method: {method}</p>
                                    <p>Exchange Rate: 1 coin = ₹{exchangeRate}</p>
                                    <p>You will receive: ₹{amount}</p>

                                    <p className="text-sm text-gray-600 mt-2">
                                        Please review the details before confirming.
                                    </p>
                                </div>

                            )}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-6 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                {isSubmitting ? (
                                    "Processing..."
                                ) : (
                                    <span className="flex items-center justify-center">
                                        Confirm Withdrawal <ArrowRight className="ml-2 h-4 w-4" />
                                    </span>
                                )}
                            </button>
                        </form>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Withdrawals are typically processed within 1-3 business days.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}