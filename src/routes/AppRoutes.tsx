import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ContactPage from "../pages/ContactPage";
import SignUpPage from "../pages/user/SignUpPage";
import CartPage from "../pages/CartPage";
import PincodeModal from "../pages/PincodePage";
import LogOutPage from "../pages/user/LogOutPage";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import ReturnOrder from "../pages/Contact/ReturnOrder";
import TrackOrder from "../pages/Contact/TrackOrder";
import OrderFAQ from "../pages/Contact/OrderFAQ";
import ReturnsAndCancellationsFAQ from "../pages/Contact/ReturnFAQ";
import PaymentFAQ from "../pages/Contact/PaymentFAQ";
import CouponFAQ from "../pages/Contact/CouponFAQ";
import GeneralFAQ from "../pages/Contact/GeneralFAQ";

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
      <Route path="/track-order" element={<TrackOrder></TrackOrder>} />
      <Route path="/return-order" element={<ReturnOrder></ReturnOrder>} />
      <Route path="/orders" element={< OrderFAQ />} />
      <Route path="/returns-cancellations" element={< ReturnsAndCancellationsFAQ />} />
      <Route path="/payments-refunds" element={< PaymentFAQ />} />
      <Route path="/coupons-discounts" element={< CouponFAQ />} />
      <Route path="/general-enquiry" element={< GeneralFAQ />} />
    </Routes>
  );
};

export default AppRoutes;

