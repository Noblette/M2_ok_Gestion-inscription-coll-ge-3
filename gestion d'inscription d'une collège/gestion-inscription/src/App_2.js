import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardUser from "./pages/DashboardUser";

import { AuthContext } from "./context/AuthContext";

function App() {
  // const { user, role } = useContext(AuthContext);
  const { token, role } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER */}
        <Route
          path="/dashboard-user"
          element={user && role === "user" ? <DashboardUser /> : <Navigate to="/login" />}
        />

        {/* ADMIN */}
        <Route
          path="/dashboard-admin"
          element={user && role === "admin" ? <DashboardAdmin /> : <Navigate to="/login" />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;