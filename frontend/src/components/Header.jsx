'use client'
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { UserContext } from '@/providers/UserProvider';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {user} = useContext(UserContext)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <header className="container mx-auto px-4 py-6 flex items-center justify-between absolute top-0 left-0 right-0 w-full z-50">
            <div className="flex items-center text-white">
                <img src='/images/logo.svg' className='w-14'/>
                <span className="text-xl font-bold">Cryptoland</span>
            </div>
            <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-full left-0 right-0 bg-purple-500 md:bg-transparent p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-6`}>
                {['About', 'Services', 'Road Map', 'Statistics', 'Team', 'FAQ'].map((item) => (
                    <Link key={item} href="#" className="text-white hover:text-gray-200 transition duration-300">
                        {item}
                    </Link>
                ))}
            </nav>
            <div className="flex items-center space-x-4">
           
                {
                    user ?
                    <Link href={'/profile'} className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
                        Profile
                    </Link>
                    :
                    <Link href={'/login'} className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
                        Sign In
                    </Link>
                }
                
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    )
}

export default Header