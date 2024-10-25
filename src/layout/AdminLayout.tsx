import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar"; // Adjust path if needed

const AdminLayout: React.FC = () => {
  return (
    <div className="flex h-screen ">
      {/* Sidebar - Fixed on the left */}

      <AdminSidebar />

      <Outlet />
    </div>
  );
};

export default AdminLayout;
