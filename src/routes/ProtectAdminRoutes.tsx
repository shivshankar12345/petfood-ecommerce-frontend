import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../Redux/store";

                                       
const ProtectedRoute: React.FC = () => {

  const role = useSelector((state: RootState) => state.auth.role);
  if (role !== "admin") {
    return <Navigate to="/403" replace />;
  }
  return <><Outlet></Outlet></>;

};

export default ProtectedRoute;
