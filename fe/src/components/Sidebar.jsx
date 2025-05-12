import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Toggle Button (Mobile) */}
      <button
        className="md:hidden p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 p-6 z-40 transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:block`}
      >
        <h2 className="text-2xl font-bold mb-8">MyApp</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/" className="block hover:text-blue-300">Home</Link>
          </li>
          <li>
            <Link to="/dashboard" className="block hover:text-blue-300">Dashboard</Link>
          </li>
          <li>
            <Link to="/profile" className="block hover:text-blue-300">Profile</Link>
          </li>
          <li>
            <Link to="/login" className="block hover:text-red-400">Logout</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
