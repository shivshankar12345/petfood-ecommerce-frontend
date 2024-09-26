import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from './Sidebar'; // Import the Sidebar component

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search Query:", searchQuery);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-indigo-600 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src="/path-to-your-logo.png" // Replace with your logo path
              alt="Logo"
              className="h-8"
            />
            <span className="text-white text-2xl font-bold">Website</span>
          </div>

          {/* Search Field */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="p-2 w-full rounded-l-md border border-gray-300 border-r-0 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="p-2 bg-indigo-500 text-white rounded-r-md border border-indigo-500 border-l-0 hover:bg-indigo-600 transition duration-300"
            >
              Search
            </button>
          </form>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6">
            <NavLink
              to="/pincode"
              className={({ isActive }) =>
                `text-white hover:text-gray-200 transition duration-300 ${isActive ? 'font-bold' : ''}`
              }
            >
              Pincode
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-white hover:text-gray-200 transition duration-300 ${isActive ? 'font-bold' : ''}`
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `text-white hover:text-gray-200 transition duration-300 ${isActive ? 'font-bold' : ''}`
              }
            >
              Sign Up
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `text-white hover:text-gray-200 transition duration-300 ${isActive ? 'font-bold' : ''}`
              }
            >
              Cart
            </NavLink>
          </div>

          {/* Sidebar Toggle Button */}
          <button className="lg:hidden text-white" onClick={toggleSidebar}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;

