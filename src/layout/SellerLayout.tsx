import React from "react";
import SellerSidebar from "../components/admin/SellerSidebar";
import { Outlet } from "react-router-dom";

const SellerLayout: React.FC = () => {
  return  <div className="flex h-screen ">
  {/* Sidebar - Fixed on the left */}

  <SellerSidebar />

  <Outlet />
</div>
};

export default SellerLayout;
