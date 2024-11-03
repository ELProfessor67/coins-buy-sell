import React from 'react'
import Link from 'next/link'
import { Atom, Brain, ChartLine, ChartNoAxesColumn, Coins, ContactRound, Home, LayoutGrid, MessageCircle, Settings, User, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const pathname = usePathname();
    return (


        <aside className={`${sidebarOpen ? 'block' : 'hidden'} fixed inset-y-0 left-0 z-50 w-64 bg-gray-6 dark:bg-black p-4 lg:static lg:block text-white`}>
            <div className="flex items-center justify-between mb-8">
                <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                    <X className="h-6 w-6" />
                </button>
            </div>
            <nav className='space-y-2'>
                <Link href="/dashboard" className={`flex items-center gap-2 py-2 px-4 rounded hover:bg-white hover:text-black ${pathname == '/dashboard' ? 'bg-white text-black' : ''}`}>
                    <span><LayoutGrid size={20} /></span>
                    Dashboard
                </Link>


                <Link href="/dashboard/users" className={`flex items-center gap-2 py-2 px-4 rounded hover:bg-white hover:text-black ${pathname.includes('campaigns') ? 'bg-white text-black' : ''}`}>
                    <span><User size={20}/></span>
                    Users
                </Link>

                <Link href="/dashboard/widthraw-request" className={`flex items-center gap-2 py-2 px-4 rounded  hover:bg-white hover:text-black ${pathname.includes('bill-management') ? 'bg-white text-black' : ''}`}>
                    <span><ChartNoAxesColumn size={20}/></span>
                    Widthraw Requests
                </Link>

                <Link href="/dashboard/tokens" className={`flex items-center gap-2 py-2 px-4 rounded  hover:bg-white hover:text-black ${pathname.includes('bill-management') ? 'bg-white text-black' : ''}`}>
                    <span><Coins size={20}/></span>
                    Token
                </Link>


                <Link href="/dashboard/messages" className={`flex items-center gap-2 py-2 px-4 rounded hover:bg-white hover:text-black ${pathname.includes('mailbox') ? 'bg-white text-black' : ''}`}>
                    <span><MessageCircle size={20}/></span>
                    Messages
                </Link>

                <Link href="/" className={`flex items-center gap-2 py-2 px-4 rounded hover:bg-white hover:text-black ${pathname.includes('mailbox') ? 'bg-white text-black' : ''}`}>
                    <span><Home size={20}/></span>
                    Home
                </Link>
            </nav>
        </aside>
    )
}

export default Sidebar