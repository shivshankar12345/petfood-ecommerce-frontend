import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUsers, FaProductHunt, FaUserShield, FaBell, FaTasks, FaBars, FaTimes, FaCogs, FaChartLine, FaSignOutAlt, FaAddressBook,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const AdminSidebar: React.FC<{ isOpen?: boolean, toggleSidebar?: () => void }> = ({ isOpen, toggleSidebar }) => {
 
  const handleLinkClick = () => {
    if (isOpen && toggleSidebar) {
      toggleSidebar();  // Close the sidebar when a link is clicked
    }
  };
  
  return (
    <div
      className={`fixed top-0 left-0 h-full w-[20%] bg-gray-800 text-white z-50 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static`}
      style={{ flexShrink: 0 }}
    >
      
      <button className="p-2 text-white lg:hidden" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className="flex flex-col h-full overflow-y-auto">
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <NavLink to="">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </NavLink>
        </div>
        <div className="flex-1 space-y-4 p-4">
          <ul className="space-y-4">
            {/* Sidebar Links */}
            <li>
              <NavLink to="/admin-dashboard/manage-users" className="flex items-center p-2 rounded-lg hover:bg-gray-700"  onClick={handleLinkClick}>
                <FaUsers className="mr-2" /> Manage Users
              </NavLink>
            </li>
            {/* Additional Sidebar Links */}
            <li>
              <NavLink
                to="manage-sellers"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
                    : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                }  onClick={handleLinkClick}
              >
                <FaUserShield className="mr-2" /> {/* Sellers Icon */}
                Manage Sellers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-product"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
                    : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                }  onClick={handleLinkClick}
              >
                <FaProductHunt className="mr-2" /> {/* Product Icon */}
                Manage Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-orders"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
                    : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                }  onClick={handleLinkClick}
              >
                <FaTasks className="mr-2" /> {/* Orders Icon */}
                Manage Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-pet"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
                    : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                }  onClick={handleLinkClick}
              >
                <FaUserShield className="mr-2" /> {/* Roles Icon */}
                ManagePets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-roles"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
                    : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                }  onClick={handleLinkClick}
              >
                <FaUserShield className="mr-2" /> {/* Roles Icon */}
                Roles
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-permissions"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
                    : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                }  onClick={handleLinkClick}
              >
                <FaBell className="mr-2" /> {/* Permissions Icon */}
                Permissions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-carousel"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
                    : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                }  onClick={handleLinkClick}
              >
                <FaBell className="mr-2" /> {/* Notifications Icon */}
                Manage Carousel
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-contact"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
                    : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                }  onClick={handleLinkClick}
              >
                <FaAddressBook className="mr-2" />
                Manage Contacts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-reports"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
                    : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                }  onClick={handleLinkClick}
              >
                <FaChartLine className="mr-2" /> {/* Reporting Icon */}
                Reports
              </NavLink>
            </li>
            <li>
              <NavLink
                to="settings"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
                    : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                } onClick={handleLinkClick}
              >
                <FaCogs className="mr-2" /> {/* Settings Icon */}
                Settings
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="p-4 border-t border-gray-700">
          <NavLink to="/logout" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
            <FaSignOutAlt className="mr-2" /> Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;

// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FaUsers, FaProductHunt, FaUserShield, FaBell, FaTasks, FaBars, FaTimes, FaCogs, FaChartLine, FaSignOutAlt, FaAddressBook,
// } from "react-icons/fa";

// const AdminSidebar: React.FC<{ isOpen?: boolean, toggleSidebar?: () => void }> = ({ isOpen, toggleSidebar }) => {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const handleLinkClick = () => {
//     if (isOpen && toggleSidebar) {
//       toggleSidebar(); // Close the sidebar when a link is clicked
//     }
//   };

//   return (
//     <div
//       className={`fixed top-0 left-0 h-full  bg-gray-800 text-white z-50 transition-transform transform 
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static
//         ${isCollapsed ? "w-16" : "w-[20%]"}`}

//     >
//       {/* Sidebar Toggle Button */}
//       <button
//         className="absolute top-4 right-[-12px] w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-white
//           lg:hidden"
//         onClick={toggleSidebar}
//       >
//         {isOpen ? <FaTimes /> : <FaBars />}
//       </button>

//       <div className="flex flex-col h-full overflow-y-auto">
//         {/* Collapse/Expand Toggle */}
//         <button
//           className="p-2 text-white bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
//           onClick={() => setIsCollapsed(!isCollapsed)}
//         >
//           {isCollapsed ? ">" : "<"}
//         </button>

//         <div className="flex items-center justify-center h-16 bg-gray-900">
//           <NavLink to="">
//             <h1 className={`text-2xl font-bold ${isCollapsed ? "hidden" : "block"}`}>Admin Panel</h1>
//           </NavLink>
//         </div>
//         <div className="flex-1 space-y-4 p-4">
//           <ul className="space-y-4">
//             {/* Sidebar Links */}
//             <li>
//               <NavLink
//                 to="/admin-dashboard/manage-users"
//                 className="flex items-center p-2 rounded-lg hover:bg-gray-700"
//                 onClick={handleLinkClick}
//               >
//                 <FaUsers className="mr-2" />
//                 <span className={isCollapsed ? "hidden" : "block"}>Manage Users</span>
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="manage-sellers"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
//                     : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
//                 }
//                 onClick={handleLinkClick}
//               >
//                 <FaUserShield className="mr-2" />
//                 <span className={isCollapsed ? "hidden" : "block"}>Manage Sellers</span>
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="manage-product"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
//                     : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
//                 }
//                 onClick={handleLinkClick}
//               >
//                 <FaProductHunt className="mr-2" />
//                 <span className={isCollapsed ? "hidden" : "block"}>Manage Products</span>
//               </NavLink>
//             </li>
//             {/* Add remaining links similarly */}
//           </ul>
//         </div>
//         <div className="p-4 border-t border-gray-700">
//           <NavLink to="/logout" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
//             <FaSignOutAlt className="mr-2" />
//             <span className={isCollapsed ? "hidden" : "block"}>Logout</span>
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;

// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FaUsers,
//   FaProductHunt,
//   FaUserShield,
//   FaSignOutAlt,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";

// const AdminSidebar: React.FC<{ isOpen?: boolean; toggleSidebar?: () => void }> = ({
//   isOpen,
//   toggleSidebar,
// }) => {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const handleLinkClick = () => {
//     if (isOpen && toggleSidebar) {
//       toggleSidebar(); // Close the sidebar when a link is clicked
//     }
//   };

//   return (
//     <div
//       className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-50 transition-transform transform 
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static
//         ${isCollapsed ? "w-16" : "w-[20%]"}`}
//     >
//       {/* Sidebar Links */}
//       <div className="flex flex-col h-full overflow-y-auto relative">
//         {/* Collapse/Expand Toggle */}
//         <button
//           className="absolute top-4 -right-0 bg-gray-700 text-white w-6 h-6 rounded-full flex items-center justify-center z-10
//           hover:bg-gray-600 focus:outline-none"
//           onClick={() => setIsCollapsed(!isCollapsed)}
//         >
//           {isCollapsed ? ">" : "<"}
//         </button>

//         {/* Sidebar Header */}
//         <div className="flex items-center justify-center h-16 bg-gray-900">
//           <NavLink to="">
//             <h1 className={`text-2xl font-bold ${isCollapsed ? "hidden" : "block"}`}>Admin Panel</h1>
//           </NavLink>
//         </div>

//         <div className="flex-1 space-y-4 p-4">
//           <ul className="space-y-4">
//             <li>
//               <NavLink
//                 to="/admin-dashboard/manage-users"
//                 className="flex items-center p-2 rounded-lg hover:bg-gray-700"
//                 onClick={handleLinkClick}
//               >
//                 <FaUsers className="mr-2" />
//                 <span className={isCollapsed ? "hidden" : "block"}>Manage Users</span>
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="manage-sellers"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
//                     : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
//                 }
//                 onClick={handleLinkClick}
//               >
//                 <FaUserShield className="mr-2" />
//                 <span className={isCollapsed ? "hidden" : "block"}>Manage Sellers</span>
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="manage-product"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "flex items-center bg-gray-600 p-2 rounded-lg transition-all duration-300"
//                     : "flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
//                 }
//                 onClick={handleLinkClick}
//               >
//                 <FaProductHunt className="mr-2" />
//                 <span className={isCollapsed ? "hidden" : "block"}>Manage Products</span>
//               </NavLink>
//             </li>
//           </ul>
//         </div>

//         {/* Logout */}
//         <div className="p-4 border-t border-gray-700">
//           <NavLink
//             to="/logout"
//             className="flex items-center p-2 rounded-lg hover:bg-gray-700"
//           >
//             <FaSignOutAlt className="mr-2" />
//             <span className={isCollapsed ? "hidden" : "block"}>Logout</span>
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;



