import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ContactPage from '../pages/ContactPage';
import SignUpPage from '../pages/user/SignUpPage';
import CartPage from '../pages/CartPage';
import PincodePage from '../pages/PincodePage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="pincode" element={<PincodePage isOpen={false} onClose={function (): void {
        throw new Error('Function not implemented.');
      } } />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="cart" element={<CartPage />} />
    </Routes>
  );
};

export default AppRoutes;
