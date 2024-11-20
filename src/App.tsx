import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminRoutes from "./routes/AdminRoutes";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import Spinner from "./components/Spinner";
import SellerRoutes from "./routes/SellerRoutes";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
      {/* <Spinner /> */}
      <Router>
        <NavBar />
        {/* Define your routes here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<AppRoutes />} />
          <Route path="/admin-dashboard/*" element={<AdminRoutes />} />
          <Route path="/seller-dashboard/*" element={<SellerRoutes />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
