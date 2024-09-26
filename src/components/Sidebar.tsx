import React from 'react';
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
 
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-indigo-700 text-white transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } z-50`}
    >
      <div className="p-4">
        <button onClick={toggleSidebar} className="text-white text-lg mb-4">
          Close
        </button>
        <ul className="space-y-4">
          <li>
            <NavLink to="/pincode" className="block hover:bg-indigo-600 p-2">
              Pincode
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="block hover:bg-indigo-600 p-2">
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" className="block hover:bg-indigo-600 p-2">
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className="block hover:bg-indigo-600 p-2">
              Cart
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
