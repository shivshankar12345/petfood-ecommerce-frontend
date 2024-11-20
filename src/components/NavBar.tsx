import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import useNavbar from "../hooks/useNavBar";

import PincodeModal from "../pages/PincodePage";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import {
  clearAccessToken,
  clearRefreshToken,
  clearRole,
} from "../Redux/Slice/auth.slice";
import { userConfirm } from "../utils/Confirmation";
import { toggleTheme } from "../Redux/Slice/theme.slice";
import { FaMoon, FaSun } from "react-icons/fa";
import React from "react";

const Navbar: React.FC = () => {
  const {
    isSidebarOpen,
    toggleSidebar,
    searchQuery,
    handleSearchChange,
    handleSearchSubmit,
  } = useNavbar();
  const { role, isAuth } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  // Manage theme in the document root
  
  React.useEffect(() => {
    document.documentElement.className = theme; // Apply theme class to `html`
  }, [theme]);


  const handleToggle = () => {
    dispatch(toggleTheme()); // This will toggle between light and dark themes
  };

  const handleClick = () => {
    navigate("/");
  };

  async function handleLogout(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    e.preventDefault();
    const confirm = await userConfirm(
      "Are you Sure ",
      "Do you want to Logout .?",
      "Yes, logout !!",
      "warning",
      true,
      "#3085d6",
      "#d33"
    );
    if (!confirm) {
      return;
    }
    dispatch(clearAccessToken());
    dispatch(clearRefreshToken());
    dispatch(clearRole());
    navigate("/signout");
  }

  const isAdminPage = location.pathname.startsWith("/admin-dashboard");

  return (
    <>
      {/* Navbar */}
      <nav className="bg-indigo-600 dark:bg-indigo-900 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4 cursor-pointer">
            <img
              src="https://supertails.com/cdn/shop/files/supertails-logo-for-dark-theme_200x_2x_200x_2x_909b1df1-0f68-4734-9eeb-1d0e0a39c91f.webp?v=1705757214&width=200" // Replace with your logo path
              alt="Logo"
              className="h-8"
              onClick={handleClick}
            />
          </div>

          {!isAdminPage && (
            <form
              onSubmit={handleSearchSubmit}
              className="hidden lg:flex items-center"
            >
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
          )}

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6">
            <NavLink
              to="/pincode"
              onClick={() => setIsModalOpen(true)}
              className={({ isActive }) =>
                `text-white hover:text-gray-200 transition duration-300 ${
                  isActive ? "font-bold" : ""
                }`
              }
            >
              Pincode
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-white hover:text-gray-200 transition duration-300 ${
                  isActive ? "font-bold" : ""
                }`
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `text-white hover:text-gray-200 transition duration-300 ${
                  isActive ? "font-bold" : ""
                }`
              }
            >
              Cart
            </NavLink>

            {/* Theme Toggle */}
            <div
              onClick={handleToggle}
              className="cursor-pointer text-white hover:text-gray-300 transition duration-300"
            >
              {theme === "light" ? <FaMoon size={24} /> : <FaSun size={24} />}
            </div>

            {/* Auth Links */}
            {!isAuth ? (
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `text-white hover:text-gray-200 transition duration-300 ${
                    isActive ? "font-bold" : ""
                  }`
                }
              >
                Sign Up
              </NavLink>
            ) : (
              <NavLink
                to="/signout"
                className={({ isActive }) =>
                  `text-white hover:text-gray-200 transition duration-300 ${
                    isActive ? "font-bold" : ""
                  }`
                }
                onClick={handleLogout}
              >
                Signout
              </NavLink>
            )}

            {/* Admin Button (Visible only if the role is admin or seller) */}
            {role === "admin" ? (
              <NavLink to="/admin-dashboard/">
                <div className="flex justify-center">
                  <button className="bg-red-500 text-white px-6 py-1 rounded shadow-md hover:bg-red-600 hover:scale-105 transition duration-300 ease-in-out transform cursor-pointer">
                    Admin Panel
                  </button>
                </div>
              </NavLink>
            ) : role === "seller" ? (
              <NavLink to="/seller-dashboard/*">
                <div className="flex justify-center">
                  <button className="bg-yellow-500 text-white px-6 py-1 rounded-lg shadow-md hover:bg-yellow-600 hover:scale-105 transition duration-300 ease-in-out transform cursor-pointer">
                    Seller Panel
                  </button>
                </div>
              </NavLink>
            ) : (
              <></>
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
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        role={role}
      />

      {/* Pincode Modal */}
      <PincodeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default Navbar;
