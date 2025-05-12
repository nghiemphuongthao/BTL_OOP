// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo or Title */}
        <Link to="/" className="text-xl font-bold">MyApp</Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link></li>
          <li><Link to="/profile" className="hover:text-gray-300">Profile</Link></li>
          <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 space-y-2 px-4">
          <Link to="/" className="block hover:text-gray-300">Home</Link>
          <Link to="/dashboard" className="block hover:text-gray-300">Dashboard</Link>
          <Link to="/profile" className="block hover:text-gray-300">Profile</Link>
          <Link to="/login" className="block hover:text-gray-300">Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
