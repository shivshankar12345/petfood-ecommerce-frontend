import './App.css'
import NavBar from './components/NavBar'
import SignUp from './pages/SignUp'
import { BrowserRouter as Router,Route, Routes  } from "react-router-dom";
import ContactUs from './pages/ContactUs';
import Pincode from './pages/Pincode';
import Cart from './pages/Cart';
import Carousel from './components/Carousel';
import Sidebar from './components/Sidebar';
import React, { useState } from "react";
import { baseURL } from './env';
import axios from 'axios';


function App() {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };
// const axiosInstance=axios({baseURL:"http://localhost:8080/api"})
// axios.interceptors.request.use((request)=> request)
// axios.interceptors.response.use((response)=> response,(err)=>{
//   const {config, response} = err;
// })
 return <>
   <Router>
   <NavBar role="admin"/>
      {/* Define your routes here */}
      <Routes>
      <Route path="/pincode" element={<Pincode />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
    <Carousel />
 </>
}

export default App
