import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUsers,
  FaProductHunt,
  FaUserShield,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaBars,
  FaTasks,
  FaUsersCog,
  FaAddressBook,
  FaCogs,
  FaChartLine,
} from "react-icons/fa";
import { FaUsersRays } from "react-icons/fa6";
import { MdOutlinePets, MdViewCarousel } from "react-icons/md";

const AdminSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar visibility
  const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar collapse state
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // Detect mobile screens

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 1024;
      setIsMobile(mobileView);
      if (!mobileView) setIsOpen(true); // Expand on larger screens
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleLinkClick = () => {
    if (isMobile) setIsOpen(false); // Close sidebar on mobile after link click
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
        style={{
          width: isCollapsed ? "8rem" : "16rem",
          flexShrink: 0,
        }}
      >
        {/* Toggle Button for Small Devices */}
        <button
          className="absolute top-4 right-[-35px] bg-gray-900 text-white rounded-full p-2 hover:bg-gray-700 lg:hidden"
          onClick={toggleSidebar}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Collapse Button */}
        {
          <button
            className={`absolute top-[1rem] right-[-0.5px] bg-gray-900 text-white rounded-full p-2 hover:bg-gray-700 
            }`}
            onClick={toggleCollapse}
          >
            {isCollapsed ? (
              <FaChevronRight size={18} />
            ) : (
              <FaChevronLeft size={18} />
            )}
          </button>
        }

        {/* Sidebar Content */}
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center h-16 bg-gray-900">
            <h1
              className={`text-3xl font-bold ml-4 ${
                isCollapsed ? "hidden" : ""
              }`}
            >
              Admin Panel
            </h1>
          </div>

          {/* Menu */}
          <ul className="flex-1 space-y-4 p-4">
            <li>
              <NavLink
                to="manage-users"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
                onClick={handleLinkClick}
              >
                <FaUsers className="mr-2" />
                <span className={`${isCollapsed ? "hidden" : ""}`}>Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-sellers"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
                onClick={handleLinkClick}
              >
                <FaUsersRays className="mr-2" />
                <span className={`${isCollapsed ? "hidden" : ""}`}>Sellers</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-product"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
                onClick={handleLinkClick}
              >
                <FaProductHunt className="mr-2" />
                <span className={`${isCollapsed ? "hidden" : ""}`}>Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-orders"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
                onClick={handleLinkClick}
              >
                <FaTasks className="mr-2" />
                <span className={`${isCollapsed ? "hidden" : ""}`}>Orders</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-pet"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
                onClick={handleLinkClick}
              >
                <MdOutlinePets className="mr-2" />
                <span className={`${isCollapsed ? "hidden" : ""}`}>Pets</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-roles"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
                onClick={handleLinkClick}
              >
                <FaUsersCog className="mr-2" />
                <span className={`${isCollapsed ? "hidden" : ""}`}>Roles</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-permissions"
                 className="flex items-center p-2 rounded-lg hover:bg-gray-700"
                 onClick={handleLinkClick}
               >
                 <FaUserShield className="mr-2" />
                 <span className={`${isCollapsed ? "hidden" : ""}`}>Permissions</span>
               </NavLink>
             </li>
            <li>
              <NavLink
                to="manage-carousel"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
                onClick={handleLinkClick}
              >
                <MdViewCarousel className="mr-2" />
                <span className={`${isCollapsed ? "hidden" : ""}`}>Carousel</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                 to="manage-contact"
                 className="flex items-center p-2 rounded-lg hover:bg-gray-700"
                 onClick={handleLinkClick}
               >
                 <FaAddressBook className="mr-2" />
                 <span className={`${isCollapsed ? "hidden" : ""}`}>Contacts</span>
               </NavLink>
             </li>
             <li>
               <NavLink
                 to="manage-reports"
                 className="flex items-center p-2 rounded-lg hover:bg-gray-700"
                onClick={handleLinkClick}
               >
                 <FaChartLine className="mr-2" />
                 <span className={`${isCollapsed ? "hidden" : ""}`}>Reports</span>
               </NavLink>
             </li>
             <li>
               <NavLink
                 to="settings"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700"
                 onClick={handleLinkClick}
               >
                 <FaCogs className="mr-2" />
                <span className={`${isCollapsed ? "hidden" : ""}`}>Settings</span>
              </NavLink>
            </li>
          </ul>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <NavLink
              to="/logout"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              onClick={handleLinkClick}
            >
              <FaSignOutAlt className="mr-2" />
              <span className={`${isCollapsed ? "hidden" : ""}`}>Logout</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
