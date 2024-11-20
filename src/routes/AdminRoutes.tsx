import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Roles from "../pages/admin/RolesPage";
import ManageUsersPage from "../pages/admin/ManageUsersPage";
import ManageSellersPage from "../pages/admin/ManageSellersPage";
import ManageProductPage from "../pages/admin/ManageProductPage";
import ManageContactPage from "../pages/admin/ManageContactPage";
import ManagePetPage from "../pages/admin/ManagePetPage";
import ManageCarouselPage from "../pages/admin/ManageCarouselPage";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<AdminLayout />}>
        <Route path="manage-users" element={<ManageUsersPage />} />
        <Route path="manage-sellers" element={<ManageSellersPage />} />
        <Route path = "manage-pet" element={<ManagePetPage/>}/>
        <Route path="manage-product" element={<ManageProductPage />} />
        <Route path="manage-contact" element={<ManageContactPage />} />
        <Route path="manage-carousel" element={<ManageCarouselPage />} />
        <Route path="roles" element={<Roles />} />
        {/* Fallback for not found routes */}
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
