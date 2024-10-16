'use client'
import { useState, useRef, useEffect, useContext } from 'react'
import { Shield, ArrowLeft } from 'lucide-react'
import { verifyUserRequest } from '@/http/user'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { UserContext } from '@/providers/UserProvider'

export default function OTPPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef([])

  const router = useRouter();
  const {setUser,setIsAuth} = useContext(UserContext);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (element, index) => {
    if (isNaN(Number(element.value))) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    // Focus next input
    if (element.value !== '') {
      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleBackspace = (event, index) => {
    if (event.key === 'Backspace') {
      if (index > 0 && otp[index] === '' && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpValue = otp.join('');

    try {
      const formData = new FormData();
      formData.append('OTP',otpValue);

      const res = await verifyUserRequest(formData);
      setIsAuth(true);
      setUser(res?.data?.user)
      router.push('/profile');
   
      toast.success(res.data?.message);
    } catch (error) {
      toast.success(error?.response?.data?.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-purple-100 p-4 flex items-center justify-between">
          <button className="text-purple-600 hover:text-purple-800 transition duration-300">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-center text-gray-800">Enter OTP</h1>
          <div className="w-6"></div> {/* Spacer for centering */}
        </div>
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <Shield className="w-16 h-16 text-purple-500" />
          </div>
          <p className="text-center text-gray-600 mb-6">
            We've sent a 6-digit code to your email. Please enter it below to verify your account.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between mb-6">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  ref={el => inputRefs.current[index] = el}
                  value={data}
                  onChange={e => handleChange(e.target, index)}
                  onKeyDown={e => handleBackspace(e, index)}
                  className="w-12 h-12 border-2 rounded-lg text-center text-xl font-semibold text-gray-800 focus:border-purple-500 focus:outline-none"
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition duration-300"
            >
              Verify
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">Didn't receive the code?</p>
            <button className="text-purple-600 font-semibold hover:underline mt-1">
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}