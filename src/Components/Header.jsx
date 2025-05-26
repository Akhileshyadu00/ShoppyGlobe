import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  // Check if link is active for styling
  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-3xl font-bold text-gray-400">
             <span className='text-teal-600 font-extrabold text-4xl'>S</span>hoppy
             <span className='text-teal-600 font-extrabold text-4xl'>G</span>lobe
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 items-center ">
            <Link
              to="/product"
              className={`text-lg font-medium hover:underline ${
                isActive('/product') ? 'text-teal-700 underline' : 'text-teal-500'
              }`}
            >
              Products
            </Link>

            <Link
              to="/cart"
              className="relative text-teal-500 hover:underline flex items-center"
            >
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="text-teal-500 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white shadow-inner px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/product"
            onClick={() => setMenuOpen(false)}
            className={`block text-lg font-medium hover:underline ${
              isActive('/product') ? 'text-teal-700 underline' : 'text-teal-500'
            }`}
          >
            Products
          </Link>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="relative text-teal-500 hover:underline flex items-center"
          >
            <FaShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
            <span className="ml-2">Cart</span>
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
