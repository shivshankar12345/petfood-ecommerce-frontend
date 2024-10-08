import './App.css'
import"react-toastify/dist/ReactToastify.css";
import NavBar from './components/NavBar'
import { BrowserRouter as Router,Route, Routes  } from "react-router-dom";
import HomePage from './pages/HomePage';
import AdminRoutes from './routes/AdminRoutes';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';

  function App() {

  return <>
   <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick />
    <Router>
    <NavBar role="admin"  />
        {/* Define your routes here */}
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<AppRoutes />} />
        <Route path="/admin-dashboard/*" element={<AdminRoutes />} />
        </Routes>
      </Router>
  </>
  }

export default App;
