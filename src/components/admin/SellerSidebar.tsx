import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUsers,
  FaProductHunt,
  FaUserShield,
  FaBell,
  FaTasks,
  FaBars,
  FaTimes,
  FaCogs,
  FaChartLine,
  FaSignOutAlt,
  FaAddressBook,
} from "react-icons/fa";

const SellerSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-[120%] w-64 bg-gray-800 text-white z-50 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static`}
    >
      {/* Toggle Button for Mobile */}
      <button className="p-2 text-white lg:hidden" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <h1 className="text-2xl font-bold">Seller Panel</h1>
        </div>
        {/* Navigation Links */}
        <div className="flex-1 overflow-y-hidden p-4">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/seller-dashboard/manage-product"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
                    : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                }
              >
                <FaProductHunt className="mr-2" /> {/* Product Icon */}
                Manage Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/seller-dashboard/orders"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
                    : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                }
              >
                <FaTasks className="mr-2" /> {/* Orders Icon */}
                Manage Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/seller-dashboard/reporting"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
                    : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                }
              >
                <FaChartLine className="mr-2" /> {/* Reporting Icon */}
                Reports
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/seller-dashboard/settings"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
                    : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                }
              >
                <FaCogs className="mr-2" /> {/* Settings Icon */}
                Settings
              </NavLink>
            </li>
          </ul>
        </div>
        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <NavLink
            to="/logout"
            className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
          >
            <FaSignOutAlt className="mr-2" /> {/* Logout Icon */}
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SellerSidebar;
