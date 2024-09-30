import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import ManageUsers from './ManageUsers';
import ManageSellers from './ManageSellers';
import Roles from './Roles';
//import Permissions from './Permissions';

const AdminPage: React.FC = () => {
  return (
    <div className="flex">
      {/* Admin Sidebar on left */}
      <AdminSidebar />

      {/* Content area on right */}
      <div className="content-area flex-grow p-6 bg-gray-100">
        <Routes>
          {/* AdminPage routes */}
          <Route path="/manage-users" element={<ManageUsers />} />
           <Route path="/manage-sellers" element={<ManageSellers />} />
           <Route path="/roles" element={<Roles />} />
          {/* <Route path="/permissions" element={<Permissions />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;

