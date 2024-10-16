'use client'
import { loginUserRequest } from '@/http/user'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData();

      formData.append('email',email);
      formData.append('password',password);


      const res = await loginUserRequest(formData);
      router.push('/verify');
   
      toast.success(res.data?.message);
    } catch (error) {
      toast.success(error?.response?.data?.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500 flex flex-col justify-center items-center p-4 !w-screen ">
      <div className="w-full max-w-md">
       
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-purple-600">Login to Cryptoland</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                           focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                           focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Sign In
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-purple-600 hover:underline">Forgot password?</a>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Don't have an account?</p>
            <Link href="/register" className="text-sm text-purple-600 hover:underline">Sign up now</Link>
          </div>
        </div>
      </div>
      
    </div>
  )
}