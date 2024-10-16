'use client'
import { useCallback, useContext, useEffect, useState } from 'react'
import Navlink from 'next/link';
import { User, Wallet, Settings, LogOut, ChevronRight, Bitcoin, Copy,Link, UserCheck,Landmark,BadgeDollarSign } from 'lucide-react'
import { UserContext } from '@/providers/UserProvider';
import { toast } from 'react-toastify';
import { getUserBalanceRequest, logoutUserRequest } from '@/http/user';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [balance, setBalance] = useState("****");
  const {user,setUser,setIsAuth} = useContext(UserContext);
  const router = useRouter();

  const [copied, setCopied] = useState(false)

  const copyReferralLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/register?refferalBy=${user?.refreral}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }



  const handleLogout = async () => {
    try {
      const res = await logoutUserRequest();
      setIsAuth(false);
      setUser(null);
      toast.success(res?.data?.message);
      
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  const getUserBalance = useCallback(async () => {
    try {
        const res = await getUserBalanceRequest();
        setBalance(res.data?.balance);
    } catch (error) {
      console.log("Error getting balance : ",error.message)
    }
  },[])
  useEffect(() => {
    getUserBalance()
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500 flex flex-col items-center p-4">
        <div className='h-[10rem]'>

        </div>
      <div className="w-full max-w-3xl">
        

        {/* Balance Card */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Your Balance</h2>
            <Bitcoin className="text-yellow-500 w-10 h-10" />
          </div>
          <div className="text-4xl font-bold text-purple-600 mb-2">
            ${balance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-gray-600">Available in your wallet</p>
          <div className="mt-6 flex justify-between">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300">
              <Navlink href='/plans'>
                Deposit
              </Navlink>
            </button>
            <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-300">
              <Navlink href='/widthraw-coins'>
                Withdraw
              </Navlink>
            </button>
          </div>
        </div>

        {/* Referral Link Card */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Your Referral Link</h2>
            <Link className="text-purple-500 w-6 h-6" />
          </div>
          <p className="text-gray-600 mb-4">Share this link and earn rewards when new users sign up!</p>
          <div className="flex items-center bg-gray-100 rounded-md p-2">
            <input 
              type="text" 
              value={`${window.location.origin}/register?refferalBy=${user?.refreral}`} 
              readOnly 
              className="bg-transparent flex-grow text-gray-700 mr-2 outline-none"
            />
            <button 
              onClick={copyReferralLink}
              className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition duration-300 flex items-center"
            >
              {copied ? 'Copied!' : 'Copy'}
              <Copy className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 bg-purple-100">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-purple-300 rounded-full flex items-center justify-center mr-4">
                <User className="text-purple-600 w-12 h-12" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center py-3 border-b">
              <div className="flex items-center">
                <Wallet className="text-purple-500 w-5 h-5 mr-3" />
                <span className="text-gray-700">Account Tier</span>
              </div>
              <div className="flex items-center">
                <span className="text-purple-600 font-semibold mr-2">{user?.tier}</span>
                <ChevronRight className="text-gray-400 w-5 h-5" />
              </div>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <div className="flex items-center">
                <User className="text-purple-500 w-5 h-5 mr-3" />
                <span className="text-gray-700">Member Since</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">{user?.createdAt}</span>
                <ChevronRight className="text-gray-400 w-5 h-5" />
              </div>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <div className="flex items-center">
                <Settings className="text-purple-500 w-5 h-5 mr-3" />
                <span className="text-gray-700">Account Settings</span>
              </div>
             <Navlink href={'/profile/settings'}>
              <ChevronRight className="text-gray-400 w-5 h-5" />
             </Navlink>
            </div>

            <div className="flex justify-between items-center py-3 border-b">
              <div className="flex items-center">
                <Landmark className="text-purple-500 w-5 h-5 mr-3" />
                <span className="text-gray-700">Bank Account</span>
                <span className="text-red-400 ml-3">{!user?.bankAccount && "(Not Added)"}</span>
              </div>
             <Navlink href={'/profile/settings/bank-account'}>
              <ChevronRight className="text-gray-400 w-5 h-5" />
             </Navlink>
            </div>


            <div className="flex justify-between items-center py-3 border-b">
              <div className="flex items-center">
                <BadgeDollarSign className="text-purple-500 w-5 h-5 mr-3" />
                <span className="text-gray-700">Transactions History</span>
              </div>
             <Navlink href={'/transactions'}>
              <ChevronRight className="text-gray-400 w-5 h-5" />
             </Navlink>
            </div>

          </div>
          <div className="p-6 bg-gray-50">
            <button className="flex items-center text-red-500 hover:text-red-600 transition duration-300" onClick={handleLogout}>
              <LogOut className="w-5 h-5 mr-2" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}