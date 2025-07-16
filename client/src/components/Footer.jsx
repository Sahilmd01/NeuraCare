import React from 'react';
import { assets } from '../assets/assets';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';


const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-white to-blue-50 pt-16 pb-8 px-6 md:px-10 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <div className="flex items-center mb-6">
                            <img
                                src={assets.logo}
                                alt="Prescripto Logo"
                                className="w-44 h-auto transition-transform hover:scale-105 duration-300"
                            />
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-6 max-w-md">
                            Your trusted healthcare companion for easy and secure doctor appointments. We connect patients with top medical professionals.
                        </p>
                        <div className="flex space-x-4">
                            {/* Facebook */}
                            <a href="#" className="text-blue-600 hover:text-white hover:bg-blue-600 p-2 rounded-full transition-all duration-300">
                                <FaFacebookF className="w-5 h-5" />
                            </a>

                            {/* Twitter */}
                            <a href="#" className="text-sky-500 hover:text-white hover:bg-sky-500 p-2 rounded-full transition-all duration-300">
                                <FaTwitter className="w-5 h-5" />
                            </a>

                            {/* Instagram */}
                            <a href="#" className="text-pink-600 hover:text-white hover:bg-gradient-to-r from-pink-600 to-purple-600 p-2 rounded-full transition-all duration-300">
                                <FaInstagram className="w-5 h-5" />
                            </a>

                            {/* LinkedIn */}
                            <a href="#" className="text-blue-700 hover:text-white hover:bg-blue-700 p-2 rounded-full transition-all duration-300">
                                <FaLinkedinIn className="w-5 h-5" />
                            </a>

                            {/* YouTube */}
                            <a href="#" className="text-red-600 hover:text-white hover:bg-red-600 p-2 rounded-full transition-all duration-300">
                                <FaYoutube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[3px] after:bg-blue-500 after:rounded-full">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {['Home', 'About us', 'Services', 'Doctors', 'Contact us', 'Privacy policy'].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-blue-600 transition-all flex items-center group text-sm font-medium"
                                    >
                                        <span className="mr-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[3px] after:bg-blue-500 after:rounded-full">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="bg-blue-50 p-2 rounded-lg mr-4 flex-shrink-0">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-700 font-medium">+1-212-456-7890</p>
                                    <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9am-6pm</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-blue-50 p-2 rounded-lg mr-4 flex-shrink-0">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-700 font-medium">hello@neuracare.com</p>
                                    <p className="text-sm text-gray-500 mt-1">We reply within 24 hours</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-blue-50 p-2 rounded-lg mr-4 flex-shrink-0">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-700 font-medium">123 Medical Drive</p>
                                    <p className="text-sm text-gray-500 mt-1">New York, NY 10001</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[3px] after:bg-blue-500 after:rounded-full">
                            Health Tips
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm">Subscribe to receive health tips and updates</p>
                        <form className="flex flex-col space-y-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="px-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all flex items-center justify-center space-x-2"
                            >
                                <span>Subscribe</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </button>
                        </form>
                        <p className="text-xs text-gray-500 mt-3">We respect your privacy. Unsubscribe at any time.</p>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm mb-4 md:mb-0">
                            &copy; {new Date().getFullYear()} Neuracare. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Terms of Service</a>
                            <a href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Privacy Policy</a>
                            <a href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Cookie Policy</a>
                            <a href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Sitemap</a>
                        </div>
                        <p className="text-gray-500 text-sm mt-4 md:mt-0">
                            Crafted with <span className="text-red-500">♥</span> by{' '}
                            <a
                                href="https://www.linkedin.com/in/codewithkinu"
                                className="text-blue-500 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Sahil
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;