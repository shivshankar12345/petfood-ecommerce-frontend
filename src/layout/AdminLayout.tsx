import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar'; // Adjust the import based on your folder structure

const AdminLayout: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <AdminSidebar />
      <div className="flex-1 p-4  bg-gray-100 min-h-screen transition-all duration-300">
        <Outlet /> {/* This renders the matched child route component */}
      </div>
    </div>
  );
};

export default AdminLayout;
