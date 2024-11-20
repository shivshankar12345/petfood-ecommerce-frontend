import React from "react";
import { Route, Routes } from "react-router-dom";
import SellerLayout from "../layout/SellerLayout";
import ManageProduct from "../pages/seller/ManageProduct";

const SellerRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<SellerLayout />}>
        <Route path="manage-product" element={<ManageProduct />} />
        <Route path="manage-orders" element={<></>} />
        <Route path="reports" element={<></>} />
        {/* Fallback for not found routes */}
      </Route>
    </Routes>
  );
};

export default SellerRoutes;
