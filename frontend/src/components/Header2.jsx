import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Bell, ChevronDown, Menu, Search,Moon,Sun, UserCheck } from 'lucide-react'
import { UserContext } from '@/providers/UserProvider';
import { useRouter } from 'next/navigation';

const Header = ({ setSidebarOpen }) => {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true)
    const {setUser, setIsAuth} = useContext(UserContext);
    const router = useRouter();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])


  const handleLogout = useCallback(() => {
    try {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null)
        setIsAuth(false);
        router.push('/')
    } catch (error) {
        
    }
  },[])
    return (
        <header className="flex items-center justify-between p-4 ">

            <div className="flex items-center">
                <button className="lg:hidden mr-4" onClick={() => setSidebarOpen(true)}>
                    <Menu className="h-6 w-6" />
                </button>
                <div className="relative max-w-xl">
                    <input type="text" placeholder="Search here..." className="w-full  bg-white dark:bg-gray-7 dark:text-white rounded-md py-2 px-4 pl-10 outline-none" />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
            </div>
            <div className="flex items-center">
                <button
                    className="mr-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                
            </div>
        </header>
    )
}

export default Header