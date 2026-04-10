import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import './index.css';

import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterAdmin from "./pages/RegisterAdmin";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardUser from "./pages/DashboardUser";
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const { token, role } = useContext(AuthContext);
  

  return (
    <BrowserRouter>
      <Routes>
       

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin only */}
        <Route
          path="/register-admin"
          element={
            token && role === "admin" ? (
              <RegisterAdmin />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/admin"
          element={
            token && role === "admin" ? (
              <DashboardAdmin />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* User dashboard */}
        <Route
          path="/user"
          element={
            token && role === "user" ? (
              <DashboardUser />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Default */}
        <Route path="*" element={<Navigate to="/login" />} />
    
      </Routes>
    </BrowserRouter>
  );
};

export default App;
//à améliorer la vue