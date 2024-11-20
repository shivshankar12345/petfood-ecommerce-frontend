import React from "react";
import { NavLink } from "react-router-dom";
import { SidebarProps } from "../types/common.types";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { role, isAuth } = useSelector((state: RootState) => state.auth);
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-indigo-700 text-white transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
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
            {!isAuth ? (
              <NavLink to="/signup" className="block hover:bg-indigo-600 p-2">
                Sign Up
              </NavLink>
            ) : (
              <NavLink to="/signout" className="block hover:bg-indigo-600 p-2">
                Sign Out
              </NavLink>
            )}
          </li>
          <li>
            <NavLink to="/cart" className="block hover:bg-indigo-600 p-2">
              Cart
            </NavLink>
          </li>
          {/* Admin Button (Visible only if the role is admin or seller) */}
          {role === "admin"  ? (
            <div className="flex justify-center">
              <li>
                <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300">
                  <NavLink
                    to="/admin-dashboard"
                    className="block hover:bg-red-600 p-2"
                  >
                    Admin
                  </NavLink>
                </button>
              </li>
            </div>
          ): role === "seller"?(<div className="flex justify-center">
            <li>
              <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition duration-300">
                <NavLink
                  to="/admin-dashboard"
                  className="block hover:bg-yellow-600 p-2"
                >
                  Seller
                </NavLink>
              </button>
            </li>
          </div>):(<></>)}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
