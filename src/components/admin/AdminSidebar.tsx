// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FaUsers, FaProductHunt, FaUserShield, FaBell, FaTasks, FaBars, FaTimes, FaCogs, FaChartLine, FaSignOutAlt, FaAddressBook,
// } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { RootState } from "../../Redux/store";

// const AdminSidebar: React.FC<{ isOpen?: boolean, toggleSidebar?: () => void }> = ({ isOpen, toggleSidebar }) => {
 
//   const handleLinkClick = () => {
//     if (isOpen && toggleSidebar) {
//       toggleSidebar();  // Close the sidebar when a link is clicked
//     }
//   };
  
//   return (
//     <div
//       className={`fixed top-0 left-0 h-full w-[20%] bg-gray-800 text-white z-50 transition-transform transform ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       } lg:translate-x-0 lg:static`}
//       style={{ flexShrink: 0 }}
//     >
      
//       <button className="p-2 text-white lg:hidden" onClick={toggleSidebar}>
//         {isOpen ? <FaTimes /> : <FaBars />}
//       </button>

//       <div className="flex flex-col h-full overflow-y-auto">
//         <div className="flex items-center justify-center h-16 bg-gray-900">
//           <NavLink to="">
//             <h1 className="text-2xl font-bold">Admin Panel</h1>
//           </NavLink>
//         </div>
//         <div className="flex-1 space-y-4 p-4">
//           <ul className="space-y-4">
//             {/* Sidebar Links */}
//             <li>
//               <NavLink to="/admin-dashboard/manage-users" className="flex items-center p-2 rounded-lg hover:bg-gray-700"  onClick={handleLinkClick}>
//                 <FaUsers className="mr-2" /> Manage Users
//               </NavLink>
//             </li>
//             {/* Additional Sidebar Links */}
//             <li>
//               <NavLink
//                 to="manage-sellers"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
//                     : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
//                 }  onClick={handleLinkClick}
//               >
//                 <FaUserShield className="mr-2" /> {/* Sellers Icon */}
//                 Manage Sellers
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="manage-product"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
//                     : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
//                 }  onClick={handleLinkClick}
//               >
//                 <FaProductHunt className="mr-2" /> {/* Product Icon */}
//                 Manage Products
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="manage-orders"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
//                     : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
//                 }  onClick={handleLinkClick}
//               >
//                 <FaTasks className="mr-2" /> {/* Orders Icon */}
//                 Manage Orders
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="manage-pet"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
//                     : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
//                 }  onClick={handleLinkClick}
//               >
//                 <FaUserShield className="mr-2" /> {/* Roles Icon */}
//                 ManagePets
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="manage-roles"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
//                     : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
//                 }  onClick={handleLinkClick}
//               >
//                 <FaUserShield className="mr-2" /> {/* Roles Icon */}
//                 Roles
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="manage-permissions"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
//                     : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
//                 }  onClick={handleLinkClick}
//               >
//                 <FaBell className="mr-2" /> {/* Permissions Icon */}
//                 Permissions
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="manage-carousel"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
//                     : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
//                 }  onClick={handleLinkClick}
//               >
//                 <FaBell className="mr-2" /> {/* Notifications Icon */}
//                 Manage Carousel
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="manage-contact"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
//                     : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
//                 }  onClick={handleLinkClick}
//               >
//                 <FaAddressBook className="mr-2" />
//                 Manage Contacts
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="manage-reports"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
//                     : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
//                 }  onClick={handleLinkClick}
//               >
//                 <FaChartLine className="mr-2" /> {/* Reporting Icon */}
//                 Reports
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="settings"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
//                     : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
//                 } onClick={handleLinkClick}
//               >
//                 <FaCogs className="mr-2" /> {/* Settings Icon */}
//                 Settings
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//         <div className="p-4 border-t border-gray-700">
//           <NavLink to="/logout" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
//             <FaSignOutAlt className="mr-2" /> Logout
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;





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
  FaBell,
  FaAddressBook,
  FaChartLine,
  FaCogs,
} from "react-icons/fa";

const AdminSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar visibility
  const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar collapse state
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // Detect mobile screens

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
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
          flexShrink: 0, // Adjust width based on collapse state
        }}
      >
        {/* Toggle Button for Small Devices */}
        <button
         className="absolute   top-4 right-[-35px] bg-gray-900 text-white rounded-full p-2 hover:bg-gray-700 lg:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button> 
        {/* Collapse Button (visible only on larger screens) */}
        {!isMobile && (
          <button
            className="absolute  right-[-1px] bg-gray-900 text-white rounded-full p-2 hover:bg-gray-700"
            onClick={toggleCollapse}
          >
            {isCollapsed ? <FaChevronRight size={20}  /> : <FaChevronLeft size={20} />}
          </button>
        )}

        {/* Sidebar Content */}
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center h-16 bg-gray-900">
            <h1 className={`text-3xl font-bold ml-4 ${isCollapsed ? "hidden" : ""}`}>
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
                <FaUserShield className="mr-2" />
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
                <FaUserShield className="mr-2" />
                <span className={`${isCollapsed ? "hidden" : ""}`}>Pets</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-roles"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
                onClick={handleLinkClick}
              >
                <FaUserShield className="mr-2" />
                <span className={`${isCollapsed ? "hidden" : ""}`}>Roles</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-permissions"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
                onClick={handleLinkClick}
              >
                <FaBell className="mr-2" />
                <span className={`${isCollapsed ? "hidden" : ""}`}>Permissions</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-carousel"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
                onClick={handleLinkClick}
              >
                <FaBell className="mr-2" />
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




