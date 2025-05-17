import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

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
      setQuery(''); // ✅ Clear input field after search
    }
  };

  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <nav className="flex items-center gap-12">
        <Link to="/" className="text-lg font-bold text-blue-600">ShoppyGlobe</Link>
        <Link to="/" className="text-lg text-blue-600 hover:font-bold hover:underline">Home</Link>
        <Link to="/product" className="text-blue-500 hover:underline hover:font-bold">Products</Link>
        <Link to="/about" className="text-blue-500 hover:underline hover:font-bold">About</Link>
        <Link to="/contact" className="text-blue-500 hover:underline hover:font-bold">Contact Us</Link>
        <Link to="/cart" className="text-blue-500 hover:underline hover:font-bold">Cart</Link>
      </nav>
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search..."
          className="border px-4 py-1 rounded-md w-64 focus:outline-none focus:ring focus:border-blue-300"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
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
