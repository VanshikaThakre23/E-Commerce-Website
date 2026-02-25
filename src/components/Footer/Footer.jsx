import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FiPhoneCall, FiMail, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaShippingFast } from "react-icons/fa";



const Footer = () => {


    return (
        <>


            <footer className="bg-gray-200 text-gray-700 pt-12 pb-6 rounded-2xl mt-7   ">
                <div className=" footerBox container mx-auto px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 ">

                    {/* Logo + About */}
                    <div>
                        <img src="/images/logo.svg" alt="" className="w-60 mb-5" />

                        <p className="text-sm leading-6 text-black">
                            Your one-stop destination for quality products at the best prices.
                            We deliver happiness to your doorstep.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4 mt-4">
                            <a href="#" className="hover:text-black transition hover:scale-120"><FaFacebookF /></a>
                            <a href="#" className="hover:text-black transition hover:scale-120"><FaInstagram /></a>
                            <a href="#" className="hover:text-black transition hover:scale-120"><FaTwitter /></a>
                            <a href="#" className="hover:text-black transition hover:scale-120"><FaLinkedinIn /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="translate hover:text-black hover:scale-150">Home</Link></li>
                            <li><Link to="/shop" className="hover:text-black">Shop</Link></li>
                            <li><Link to="/about" className="hover:text-black">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-black">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-4">Customer Service</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/faq" className="hover:text-black">FAQ</Link></li>
                            <li><Link to="/returns" className="hover:text-black">Returns</Link></li>
                            <li><Link to="/privacy" className="hover:text-black">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-black">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <FiMapPin /> Nagpur, Maharashtra
                            </li>
                            <li className="flex items-center gap-2">
                                <FiPhoneCall /> +91 98765 43210
                            </li>
                            <li className="flex items-center gap-2">
                                <FiMail /> support@shopease.com
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
                    © {new Date().getFullYear()} ShopEase. All rights reserved.
                </div>
            </footer>

        </>
    );
};

export default Footer;