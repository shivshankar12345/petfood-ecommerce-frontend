import './App.css'
import NavBar from './components/NavBar'
import SignUp from './pages/SignUp'
import { BrowserRouter as Router,Route, Routes  } from "react-router-dom";
import ContactUs from './pages/ContactUs';
import Pincode from './pages/Pincode';
import Cart from './pages/Cart';


function App() {
 return <>
   <Router>
   <NavBar />
      {/* Define your routes here */}
      <Routes>
      <Route path="/pincode" element={<Pincode />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
   {/* <SignUp></SignUp> */}
 </>
}

export default App
