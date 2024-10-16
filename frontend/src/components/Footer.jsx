import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 w-[100vw] ">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <img src='/images/logo.svg' className='w-14'/>
                            <span className="text-xl font-bold">Cryptoland</span>
                        </div>
                        <p className="text-gray-400">
                            Empowering the future of digital finance through blockchain technology.
                        </p>
                        <div className="flex space-x-4">
                            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                                <a key={social} href="#" className="text-gray-400 hover:text-white transition duration-300">
                                    <span className="sr-only">{social}</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {['Home', 'About Us', 'Services', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-400 hover:text-white transition duration-300">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            {['Blog', 'Whitepaper', 'FAQ', 'Support'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-400 hover:text-white transition duration-300">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                        <p className="text-gray-400 mb-4">Stay updated with our latest news and offers.</p>
                        {/* <form className="flex w-[10rem]">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button
                                type="submit"
                                className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 transition duration-300"
                            >
                                Subscribe
                            </button>
                        </form> */}
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                    <p>© 2023 Cryptoland. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer