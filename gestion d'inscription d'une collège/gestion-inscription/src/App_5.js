import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import "./index.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterAdmin from "./pages/RegisterAdmin";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardUser from "./pages/DashboardUser";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/register-admin";

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {!hideLayout && <Header />}
      <main className="flex-1">{children}</main>
      {!hideLayout && <Footer />}
    </div>
  );
};

const AppRoutes = () => {
  const { token, role } = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/register-admin"
          element={token && role === "admin" ? <RegisterAdmin /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin"
          element={token && role === "admin" ? <DashboardAdmin /> : <Navigate to="/login" />}
        />

        <Route
          path="/user"
          element={token && role === "user" ? <DashboardUser /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Layout>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
//à améliorer avec les pages