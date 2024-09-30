  import './App.css'
  import NavBar from './components/NavBar'
  import SignUp from './pages/SignUp'
  import { BrowserRouter as Router,Route, Routes  } from "react-router-dom";
  import ContactUs from './pages/ContactUs';
  import Pincode from './pages/Pincode';
  import Cart from './pages/Cart';
  //import Carousel from './components/Carousel';
  import React, { useState } from "react";
  import { baseURL } from './env';
  import axios from 'axios';
  import AdminPage from './pages/AdminPage';
  import Carousel from './components/Carousel';

  function App() {

  return <>
    <Router>
    <NavBar role="admin"  />
    {/* <Carousel /> */}
        {/* Define your routes here */}
        <Routes>
        <Route path="/pincode" element={<Pincode />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin-dashboard/*" element={<AdminPage />} />
        </Routes>
      </Router>
      {/* <Carousel></Carousel> */}
  </>
  }

export default App;
