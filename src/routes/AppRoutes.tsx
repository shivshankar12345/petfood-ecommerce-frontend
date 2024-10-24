import React from "react";
import { Route, Routes } from "react-router-dom";
import ContactPage from "../pages/ContactPage";
import SignUpPage from "../pages/user/SignUpPage";
import CartPage from "../pages/CartPage";
import PincodeModal from "../pages/PincodePage";
import LogOutPage from "../pages/user/LogOutPage";

const AppRoutes: React.FC = () => {
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
      <Route path="signup" element={<SignUpPage />} />
      <Route path="signout" element={<LogOutPage />} />
      <Route path="cart" element={<CartPage />} />
    </Routes>
  );
};

export default AppRoutes;
