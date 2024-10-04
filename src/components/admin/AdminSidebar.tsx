import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
  return ( 
    <div className="fixed top-18 left-0 h-full w-64 bg-gray-800 text-white z-50">
      <div className="p-4">
        <ul className="space-y-4">
          <li>
             <NavLink
            to="/admin-dashboard/manage-users" 
            className={({ isActive }) =>
              isActive ? 'bg-gray-600 p-2 block' : 'p-2 block'
            }
          >
            Manage Users
          </NavLink>
          </li>  
          <li>
            <NavLink to="/admin-dashboard/manage-sellers" className={({ isActive }) =>
              isActive ? 'bg-gray-600 p-2 block' : 'p-2 block'
            }>
              Manage Sellers
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin-dashboard/manage-product" className={({ isActive }) =>
              isActive ? 'bg-gray-600 p-2 block' : 'p-2 block'
            }>
              Manage Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin-dashboard/roles" className={({ isActive }) =>
              isActive ? 'bg-gray-600 p-2 block' : 'p-2 block'
            }>
              Roles
            </NavLink>
          </li>
          <li>
    <NavLink to="/admin-dashboard/permisions" className={({ isActive }) =>
              isActive ? 'bg-gray-600 p-2 block' : 'p-2 block'
            }>
      Permissions
    </NavLink>
  </li>
  <li>
    <NavLink to="/admin-dashboard/notifications" className={({ isActive }) =>
              isActive ? 'bg-gray-600 p-2 block' : 'p-2 block'
            }>
      Notifications
    </NavLink>
  </li>
  <li>
    <NavLink to="/admin-dashboard/task-management" className={({ isActive }) =>
              isActive ? 'bg-gray-600 p-2 block' : 'p-2 block'
            }>
      Task Management
    </NavLink>
  </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;


