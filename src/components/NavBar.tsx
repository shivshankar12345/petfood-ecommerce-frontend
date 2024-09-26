import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here, e.g., redirect or fetch results based on searchQuery
    console.log("Search Query:", searchQuery);
  };

  return (
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
        
        <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="p-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="p-2 bg-indigo-500 text-white rounded-r-md hover:bg-indigo-600 transition duration-300"
          >
            Search
          </button>
        </form>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          <NavLink
            to="/pincode"
            className={({ isActive }) =>
              `text-white hover:text-gray-200 transition duration-300 ${isActive ? "font-bold" : ""}`
            }
          >
            Pincode
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-white hover:text-gray-200 transition duration-300 ${isActive ? "font-bold" : ""}`
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `text-white hover:text-gray-200 transition duration-300 ${isActive ? "font-bold" : ""}`
            }
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `text-white hover:text-gray-200 transition duration-300 ${isActive ? "font-bold" : ""}`
            }
          >
            Cart
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}  
          >
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
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden mt-4">
          <div className="space-y-4 text-center">
            <NavLink to="/pincode" className="block text-white hover:text-gray-200 transition duration-300">
              Pincode
            </NavLink>
            <NavLink to="/contact" className="block text-white hover:text-gray-200 transition duration-300">
              Contact
            </NavLink>
            <NavLink to="/signup" className="block text-white hover:text-gray-200 transition duration-300">
              Sign Up
            </NavLink>
            <NavLink to="/cart" className="block text-white hover:text-gray-200 transition duration-300">
              Cart
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
