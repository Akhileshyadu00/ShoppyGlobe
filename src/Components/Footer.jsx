import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-[#0f0c27] text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">ShoppyGlobe</h2>
          <p className="text-sm text-gray-400">
            Your one-stop destination for everything awesome. Shop smart, shop better.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-red-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-red-400 transition">Shop</a></li>
            <li><a href="#" className="hover:text-red-400 transition">About</a></li>
            <li><a href="#" className="hover:text-red-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" className="hover:text-red-400 transition"><Facebook /></a>
            <a href="#" className="hover:text-red-400 transition"><Instagram /></a>
            <a href="#" className="hover:text-red-400 transition"><Twitter /></a>
            <a href="mailto:info@shoppyglobe.com" className="hover:text-red-400 transition"><Mail /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-10 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} ShoppyGlobe. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;