import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

const App = () => {
  const { token, role } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-100">
        <Header />

        <main className="flex-1">
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
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
//amboarina;tsy afficher-na ny header sy footer @ login sy register