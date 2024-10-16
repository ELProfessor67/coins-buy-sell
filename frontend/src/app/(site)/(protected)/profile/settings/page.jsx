'use client'
import { useContext, useState } from 'react'
import { User, Lock, Bell, Globe, ChevronLeft, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react'
import { UserContext } from '@/providers/UserProvider'

export default function AccountSettingsPage() {

  const {user} = useContext(UserContext)


  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setUser(prevUser => ({
      ...prevUser,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    // Implement password change logic here
    console.log('Password change attempted')
  }

  const handleSaveChanges = (e) => {
    e.preventDefault()
    // Implement save changes logic here
    console.log('Save changes attempted', user)
  }

  const handleVerifyPhone = () => {
    // Implement phone verification logic here
    console.log('Phone verification initiated')
    // For demonstration, we'll just toggle the verification status
    setUser(prevUser => ({ ...prevUser, phoneVerified: true }))
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
          <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
        </div>
        <div className="p-4 sm:p-6 space-y-6">
          <form onSubmit={handleSaveChanges}>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={user?.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={user?.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="flex items-center">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={user?.phone}
                        onChange={handleInputChange}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                      <div className="ml-2 flex items-center">
                        {user?.phoneVerified ? (
                          <span className="text-green-500 flex items-center">
                            <CheckCircle className="w-5 h-5 mr-1" />
                            Verified
                          </span>
                        ) : (
                          <div className="flex items-center">
                            <XCircle className="w-5 h-5 mr-1 text-red-500" />
                            <button
                              type="button"
                              onClick={handleVerifyPhone}
                              className="ml-2 bg-purple-600 text-white px-3 py-1 rounded-md text-sm hover:bg-purple-700 transition duration-300"
                            >
                              Verify Now
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Security</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Lock className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-gray-700">Two-Factor Authentication</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="twoFactor"
                        checked={user?.twoFactor}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Change Password</h3>
                    <form onSubmit={handlePasswordChange} className="space-y-3">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                          type="password"
                          id="newPassword"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
                      >
                        Change Password
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Preferences</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select
                      id="language"
                      name="language"
                      value={user?.language}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeZone" className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                    <select
                      id="timeZone"
                      name="timeZone"
                      value={user?.timeZone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                    >
                      <option>UTC-5 (Eastern Time)</option>
                      <option>UTC-6 (Central Time)</option>
                      <option>UTC-7 (Mountain Time)</option>
                      <option>UTC-8 (Pacific Time)</option>
                    </select>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Notifications</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          checked={user?.emailNotifications}
                          onChange={handleInputChange}
                          className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4 mr-2"
                        />
                        <span className="text-gray-700">Email Notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="pushNotifications"
                          checked={user?.pushNotifications}
                          onChange={handleInputChange}
                          className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4 mr-2"
                        />
                        <span className="text-gray-700">Push Notifications</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}