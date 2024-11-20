import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Roles from "../pages/admin/ManageRolesPage";
import ManageUsersPage from "../pages/admin/ManageUsersPage";
import ManageSellersPage from "../pages/admin/ManageSellersPage";

import ManageProductPage from "../pages/admin/ManageProductPage";
import ManageContactPage from "../pages/admin/ManageContactPage";
import ManagePetPage from "../pages/admin/ManagePetPage";
import ManageCarouselPage from "../pages/admin/ManageCarouselPage";
import AdminPage from "../pages/admin/AdminPage";
import ManageOrderPage from "../pages/admin/ManageOrderPage";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<AdminLayout />}>
        <Route index={true} element={<AdminPage />} />
        <Route path="manage-users" element={<ManageUsersPage />} />
        <Route path="manage-sellers" element={<ManageSellersPage />} />
        <Route path="manage-pet" element={<ManagePetPage />} />
        <Route path="manage-product" element={<ManageProductPage />} />
        <Route path="manage-contact" element={<ManageContactPage />} />
        <Route path="manage-carousel" element={<ManageCarouselPage />} />
        <Route path="manage-roles" element={<Roles />} />
        <Route path="manage-orders" element={<ManageOrderPage />} />
        <Route
          path="manage-permissions"
          element={
            <>
              <div>Manage Permission</div>
            </>
          }
        />

        <Route
          path="manage-reports"
          element={
            <>
              <div>Reports</div>
            </>
          }
        />
        <Route
          path="settings"
          element={
            <>
              <div>Settings</div>
            </>
          }
        />
        <Route element={<>Hello</>} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
