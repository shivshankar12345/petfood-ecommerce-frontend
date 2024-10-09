import { NavLink} from 'react-router-dom';
import Sidebar from './Sidebar';
import { NavbarProps } from '../types/common.types';
import useNavbar from '../hooks/useNavBar';

import PincodeModal from '../pages/PincodePage';
import { useState } from 'react';



const Navbar: React.FC<NavbarProps> = ({ role}) => {
    const {
      isSidebarOpen,
      toggleSidebar,
      searchQuery,
      handleSearchChange,
      handleSearchSubmit,
    } = useNavbar();


    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-indigo-600 p-4 shadow-md ">
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
              onClick={() => setIsModalOpen(true)}
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
              to="/cart"
              className={({ isActive }) =>
                `text-white hover:text-gray-200 transition duration-300 ${isActive ? 'font-bold' : ''}`
              }
            >
              Cart
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `text-white hover:text-gray-200 transition duration-300 ${isActive ? 'font-bold' : ''}`
              }
            >
              Sign Up
            </NavLink>
 
            {/* Admin Button (Visible only if the role is admin or seller) */}
            {(role === 'admin' || role === 'seller') && (
              <NavLink to="/admin-dashboard/*">
          <div className="flex justify-center">
          <button
  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300">
  Admin
</button>
 
        </div>
        </NavLink>
        )}
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
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}  role={role}/>


      {/* Pincode Modal */}
      <PincodeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </>
  );
};
 
export default Navbar;
 
 
 
 