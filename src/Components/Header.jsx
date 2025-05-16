import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        <li>
          <Link to="/cart" className="hover:underline">Cart</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;

