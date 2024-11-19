import React from "react";
import { Route, Routes } from "react-router-dom";
import SellerLayout from "../layout/SellerLayout";

const SellerRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<SellerLayout />}>
        <Route path="manage-products" element={<></>} />
        <Route path="manage-orders" element={<></>} />
        <Route path="reports" element={<></>} />
        {/* Fallback for not found routes */}
      </Route>
    </Routes>
  );
};

export default SellerRoutes;
