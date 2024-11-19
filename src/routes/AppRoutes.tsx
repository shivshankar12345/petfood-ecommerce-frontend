import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ContactPage from "../pages/ContactPage";
import SignUpPage from "../pages/user/SignUpPage";
import CartPage from "../pages/CartPage";
import PincodeModal from "../pages/PincodePage";
import LogOutPage from "../pages/user/LogOutPage";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

const AppRoutes: React.FC = () => {
    const isAuthenticated =Boolean( useSelector((state: RootState) => state.auth.role));
    const isClicked = Boolean(localStorage.getItem("onClick"));
    console.log(isAuthenticated);
  return (
    <Routes>
      <Route
        path="pincode"
        element={
          <PincodeModal
            isOpen={false}
            onClose={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        }
      />
      <Route path="contact" element={<ContactPage />} />
      <Route path="signup" element={ isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <SignUpPage />)} />
      <Route path="signout" element={isAuthenticated ? (
            <Navigate to="/" replace />
          ) :(<LogOutPage /> )}  />
      <Route path="cart" element={<CartPage />} />
    </Routes>
  );
};

export default AppRoutes;

