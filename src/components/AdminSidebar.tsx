import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
  return (
    <div className="fixed top-18 left-0 h-full w-64 bg-gray-800 text-white z-50">
      <div className="p-4">
        <ul className="space-y-4">
          <li>
            <NavLink to="/admin-dashboard" className="block hover:bg-gray-600 p-2">
              Admin Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage-users" className="block hover:bg-gray-600 p-2">
              Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" className="block hover:bg-gray-600 p-2">
              Reports
            </NavLink>
          </li>
          <li>
    <NavLink to="/audit-logs" className="block hover:bg-gray-600 p-2">
      Audit Logs
    </NavLink>
  </li>
  <li>
    <NavLink to="/settings" className="block hover:bg-gray-600 p-2">
      Settings
    </NavLink>
  </li>
  <li>
    <NavLink to="/notifications" className="block hover:bg-gray-600 p-2">
      Notifications
    </NavLink>
  </li>
  <li>
    <NavLink to="/task-list" className="block hover:bg-gray-600 p-2">
      Task Management
    </NavLink>
  </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;


