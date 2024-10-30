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

const AdminSidebar: React.FC = () => {
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
        {" "}
        {/* Disable scrolling */}
        {/* Logo Section */}
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        {/* Navigation Links */}
        <div className="flex-1 overflow-y-hidden p-4">
          {" "}
          {/* Remove vertical scrollbar */}
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/admin-dashboard/manage-users"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
                    : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                }
              >
                <FaUsers className="mr-2" /> {/* Users Icon */}
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-dashboard/manage-sellers"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
                    : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                }
              >
                <FaUserShield className="mr-2" /> {/* Sellers Icon */}
                Manage Sellers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-dashboard/manage-product"
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
                to="/admin-dashboard/orders"
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
                to="/admin-dashboard/roles"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
                    : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                }
              >
                <FaUserShield className="mr-2" /> {/* Roles Icon */}
                Roles
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-dashboard/permissions"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
                    : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                }
              >
                <FaBell className="mr-2" /> {/* Permissions Icon */}
                Permissions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-dashboard/manage-carousel"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
                    : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                }
              >
                <FaBell className="mr-2" /> {/* Notifications Icon */}
                Manage Carousel
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-dashboard/manage-contact"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
                    : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                }
              >
                <FaAddressBook className="mr-2" />
                Manage Contacts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-dashboard/reporting"
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
                to="/admin-dashboard/settings"
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

export default AdminSidebar;
