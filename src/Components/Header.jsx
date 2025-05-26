import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";

function Header() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Redux: get total count of items in cart
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  // Persist search query in localStorage
  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) setQuery(savedQuery);
  }, []);

  useEffect(() => {
    localStorage.setItem('searchQuery', query);
  }, [query]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
      setQuery(''); // clear after search
    }
  };

  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <nav className="flex items-center gap-12">
        <Link to="/" className="text-lg font-bold text-blue-600">
          ShoppyGlobe
        </Link>
        <Link to="/product" className="text-blue-500 hover:underline hover:font-bold">
          Products
        </Link>
        <Link to="/cart" className="relative text-blue-500 hover:underline hover:font-bold">
         <FaShoppingCart />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search..."
          className="border px-4 py-1 rounded-md w-64 focus:outline-none focus:ring focus:border-blue-300"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </header>
  );
}

export default Header;
