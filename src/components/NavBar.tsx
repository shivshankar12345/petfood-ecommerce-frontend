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
import darklogo from "../../src/assets/supertails-logo-for-dark-theme_200x_2x_200x_2x_909b1df1-0f68-4734-9eeb-1d0e0a39c91f.avif";
import lightlogo from "../../src/assets/unnamed.ico";

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

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const handleClick = () => {
    navigate("/");
  };


  async function handleLogout(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    e.preventDefault();
    const confirm = await userConfirm(
      "Are you Sure",
      "Do you want to Logout?",
      "Yes, logout!!",
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
    //localStorage.setItem("onClick","clicked");
    localStorage.removeItem("onClick");
    navigate("/signout");
  }

  const isAdminPage = location.pathname.startsWith("/admin-dashboard");

  return (
    <>
      {/* Navbar */}
      <nav
        className={`${
          theme === "light"
            ? "bg-gradient-to-r from-white to-indigo-100 text-black shadow-lg border-b-2 border-gray-300"
            : "bg-gray-900 text-white shadow-lg"
        } p-4 transition-all ease-in-out duration-300`}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-4 cursor-pointer">
            {/* Logo with conditional image source */}
            <img
              src={theme === "light" ? lightlogo : darklogo} // Use light logo in light mode, dark logo otherwise
              alt="Logo"
              className={`h-10 ${theme === "light" ? "max-h-14" : ""}`} // Increased logo height for better visibility in light mode
              onClick={handleClick}
            />
            
            {/* Text Logo - Only visible in light mode */}
            {theme === "light" && (
              <span className="text-3xl font-extrabold text-black drop-shadow-lg">
                SuperTails
              </span>
            )}
          </div>

          {/* Search */}
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
                className={`p-2 w-full rounded-l-md border ${
                  theme === "light"
                    ? "border-gray-300 focus:ring-indigo-500"
                    : "border-gray-600 focus:ring-gray-800"
                } focus:outline-none focus:ring-2`}
              />
              <button
                type="submit"
                className={`p-2 rounded-r-md transition duration-300 ${
                  theme === "light"
                    ? "bg-indigo-500 text-white hover:bg-indigo-600"
                    : "bg-gray-700 text-white hover:bg-gray-800"
                }`}
              >
                Search
              </button>
            </form>
          )}

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 items-center">
            <NavLink
              to="/pincode"
              onClick={() => setIsModalOpen(true)}
              className={({ isActive }) =>
                `transition duration-300 ${
                  isActive
                    ? "font-bold"
                    : theme === "light"
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-gray-300 hover:text-white"
                }`
              }
            >
              Pincode
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `transition duration-300 ${
                  isActive
                    ? "font-bold"
                    : theme === "light"
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-gray-300 hover:text-white"
                }`
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `transition duration-300 ${
                  isActive
                    ? "font-bold"
                    : theme === "light"
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-gray-300 hover:text-white"
                }`
              }
            >
              Cart
            </NavLink>

            {/* Auth Links */}
            {!isAuth ? (
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `transition duration-300 ${
                    isActive
                      ? "font-bold"
                      : theme === "light"
                      ? "text-gray-700 hover:text-gray-900"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                Sign Up
              </NavLink>
            ) : (
              <NavLink
                to="/signout"
                className={({ isActive }) =>
                  `transition duration-300 ${
                    isActive
                      ? "font-bold"
                      : theme === "light"
                      ? "text-gray-700 hover:text-gray-900"
                      : "text-gray-300 hover:text-white"
                  }`
                }
                onClick={handleLogout}
              >
                Signout
              </NavLink>
            )}

            {/* Theme Toggle */}
            <div
              onClick={handleToggle}
              className="cursor-pointer transition duration-300"
            >
              {theme === "light" ? (
                <FaMoon className="text-gray-600 hover:text-gray-800" size={20} />
              ) : (
                <FaSun className="text-gray-300 hover:text-gray-100" size={20} />
              )}
            </div>

            {/* Admin/Seller Button */}
            {role === "admin" ? (
              <NavLink to="/admin-dashboard/">
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300">
                  Admin Panel
                </button>
              </NavLink>
            ) : role === "seller" ? (
              <NavLink to="/seller-dashboard/*">
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300">
                  Seller Panel
                </button>
              </NavLink>
            ) : null}
          </div>

          {/* Sidebar Toggle Button */}
          <button
            className="lg:hidden text-gray-600 dark:text-gray-300"
            onClick={toggleSidebar}
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




