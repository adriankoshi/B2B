import React from "react";
import { Link } from "react-router-dom";
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaApple,
    FaGooglePlay,
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#26004A] w-full rounded-tr-[50px] text-white p-10 md:px-24">
            <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-500 pb-4">
                <div className="flex flex-row gap-5">
                    <Link to="/terms-of-service" className="hover:underline block md:inline">
                        Terms of Service
                    </Link>
                    <Link to="/privacy-policy" className="hover:underline block md:inline">
                        Privacy Policy
                    </Link>
                    <Link to="/site-map" className="hover:underline block md:inline">
                        Site Map
                    </Link>
                </div>

                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <span>Follow us</span>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                        <FaFacebook size={16} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <FaTwitter size={16} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                        <FaInstagram size={16} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                        <FaLinkedin size={16} />
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                {/* About Section */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">About</h4>
                    <ul className="space-y-2">
                        <li><Link to="#" className="hover:underline">Careers</Link></li>
                        <li><Link to="#" className="hover:underline">Press & News</Link></li>
                        <li><Link to="#" className="hover:underline">Partnerships</Link></li>
                        <li><Link to="#" className="hover:underline">Privacy Policy</Link></li>
                        <li><Link to="#" className="hover:underline">Terms of Service</Link></li>
                        <li><Link to="#" className="hover:underline">Investor Relations</Link></li>
                    </ul>
                </div>

                {/* Categories Section */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Categories</h4>
                    <ul className="space-y-2">
                        <li><Link to="#" className="hover:underline">Graphics & Design</Link></li>
                        <li><Link to="#" className="hover:underline">Digital Marketing</Link></li>
                        <li><Link to="#" className="hover:underline">Writing & Translation</Link></li>
                        <li><Link to="#" className="hover:underline">Video & Animation</Link></li>
                        <li><Link to="#" className="hover:underline">Music & Audio</Link></li>
                        <li><Link to="#" className="hover:underline">Programming & Tech</Link></li>
                        <li><Link to="#" className="hover:underline">Data</Link></li>
                        <li><Link to="#" className="hover:underline">Business</Link></li>
                        <li><Link to="#" className="hover:underline">Lifestyle</Link></li>
                    </ul>
                </div>

                {/* Support Section */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Support</h4>
                    <ul className="space-y-2">
                        <li><Link to="#" className="hover:underline">Help & Support</Link></li>
                        <li><Link to="#" className="hover:underline">Trust & Safety</Link></li>
                        <li><Link to="#" className="hover:underline">Selling on Freelo</Link></li>
                        <li><Link to="#" className="hover:underline">Buying on Freelo</Link></li>
                    </ul>
                </div>

                {/* Subscribe & Apps Section */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
                    <div className="flex mb-4">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-l"
                        />
                        <button className="bg-blue-600 text-white p-2 rounded-r">Send</button>
                    </div>

                    <h4 className="text-lg font-semibold mb-4">Apps</h4>
                    <div className="space-y-2">
                        <Link to="#" className="flex items-center space-x-2 hover:underline">
                            <FaApple size={14} />
                            <span>iOS App</span>
                        </Link>
                        <Link to="#" className="flex items-center space-x-2 hover:underline">
                            <FaGooglePlay size={14} />
                            <span>Android App</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t border-gray-500 pt-4 flex flex-col md:flex-row justify-between">
                <span className="text-center md:text-left">©UBT TEAM All rights reserved.</span>
                <div className="flex justify-center md:justify-start mt-4 md:mt-0 space-x-4">
                    <Link to="#" className="hover:underline">US$ USD</Link>
                    <Link to="#" className="hover:underline">English</Link>
                </div>
            </div>
        </footer>
    );
}
